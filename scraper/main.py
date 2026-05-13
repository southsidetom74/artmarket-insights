"""
ArtMarket Insights — Data Scraper Pipeline
Collects emerging artist data from public web sources.
"""

import requests
from bs4 import BeautifulSoup
import pandas as pd
import json
import time
import re
import logging
from datetime import datetime
from pathlib import Path
from typing import Optional

logging.basicConfig(level=logging.INFO, format="%(asctime)s [%(levelname)s] %(message)s")
logger = logging.getLogger(__name__)

BASE_DIR = Path(__file__).parent
DATA_DIR = BASE_DIR / "data"
DATA_DIR.mkdir(exist_ok=True)

HEADERS = {
    "User-Agent": "Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/120.0.0.0 Safari/537.36",
    "Accept": "text/html,application/xhtml+xml,application/xml;q=0.9,*/*;q=0.8",
    "Accept-Language": "en-US,en;q=0.5",
}


def fetch(url: str, retries: int = 3) -> Optional[BeautifulSoup]:
    """Fetch a URL and return BeautifulSoup object."""
    for attempt in range(retries):
        try:
            resp = requests.get(url, headers=HEADERS, timeout=15)
            resp.raise_for_status()
            return BeautifulSoup(resp.text, "lxml")
        except Exception as e:
            logger.warning(f"Fetch attempt {attempt+1}/{retries} failed for {url}: {e}")
            time.sleep(2 * (attempt + 1))
    return None


class ArtsyScraper:
    """Scrape artist data from Artsy.net."""

    BASE = "https://www.artsy.net"

    def search_artists(self, query: str = "emerging", page: int = 1) -> list:
        url = f"{self.BASE}/search?term={query}&type=artist&page={page}"
        soup = fetch(url)
        if not soup:
            return []
        artists = []
        for link in soup.find_all("a", href=re.compile(r"/artist/")):
            href = link.get("href", "")
            name = link.get_text(strip=True)
            if name and len(name) > 1:
                artists.append({"name": name, "url": f"{self.BASE}{href}" if href.startswith("/") else href, "source": "artsy"})
        return self._dedup(artists)

    def get_artist_details(self, artist_url: str) -> dict:
        soup = fetch(artist_url)
        if not soup:
            return {}
        details = {}
        blurb = soup.find("div", class_=re.compile(r"blurb|bio|description", re.I))
        if blurb:
            details["bio"] = blurb.get_text(strip=True)[:500]
        loc = soup.find(text=re.compile(r"(?:born|based|location)", re.I))
        if loc and loc.parent:
            details["location"] = loc.parent.get_text(strip=True)
        prices = []
        for price_el in soup.find_all(text=re.compile(r"[\$€£]\s*[\d,]+")):
            m = re.search(r"[\$€£]\s*([\d,]+)", price_el)
            if m:
                prices.append(int(m.group(1).replace(",", "")))
        if prices:
            details["price_range"] = {"min": min(prices), "max": max(prices), "avg": sum(prices) // len(prices)}
        return details

    def _dedup(self, artists: list) -> list:
        seen = set()
        result = []
        for a in artists:
            key = a["name"].lower()
            if key not in seen:
                seen.add(key)
                result.append(a)
        return result


class WikipediaScraper:
    """Scrape artist biographical data from Wikipedia."""

    BASE = "https://en.wikipedia.org"

    def search_artist(self, name: str) -> dict:
        url = f"{self.BASE}/w/index.php?search={requests.utils.quote(name)}+artist"
        soup = fetch(url)
        if not soup:
            return {}
        content = soup.find("div", {"id": "mw-content-text"})
        if not content:
            return {}
        result = {}
        no_result = soup.find("p", string=re.compile(r"no.*result", re.I))
        if no_result:
            return {}
        first_p = content.find("p", class_=lambda c: c != "mw-empty-elt")
        if first_p:
            bio = first_p.get_text(strip=True)
            bio = re.sub(r"\[\d+\]", "", bio)
            result["bio"] = bio[:600]
        infobox = soup.find("table", class_=re.compile(r"infobox", re.I))
        if infobox:
            for row in infobox.find_all("tr"):
                header = row.find("th")
                cell = row.find("td")
                if header and cell:
                    key = header.get_text(strip=True).lower()
                    val = cell.get_text(strip=True)
                    if "born" in key: result["birth_info"] = val
                    elif "nationality" in key: result["nationality"] = val
                    elif "education" in key: result["education"] = val
                    elif "known for" in key or "field" in key: result["field"] = val
                    elif "awards" in key: result["awards"] = val
        categories = soup.find("div", {"id": "mw-normal-catlinks"})
        if categories:
            cat_text = categories.get_text().lower()
            if any(kw in cat_text for kw in ["artist", "painter", "visual artist", "contemporary artist"]):
                result["is_artist"] = True
                title = soup.find("h1", {"id": "firstHeading"})
                if title:
                    result["canonical_name"] = title.get_text(strip=True)
        return result


class ArtMarketResearch:
    """Aggregate data from multiple sources and compute EPI scores."""

    def __init__(self):
        self.artsy = ArtsyScraper()
        self.wikipedia = WikipediaScraper()

    def research_artist(self, name: str, country: str = "", city: str = "") -> dict:
        logger.info(f"Researching: {name} ({country})")
        artist_data = {
            "name": name, "country": country, "city": city,
            "research_date": datetime.now().isoformat(), "sources": {},
        }
        try:
            wiki_data = self.wikipedia.search_artist(name)
            if wiki_data.get("is_artist"):
                artist_data["sources"]["wikipedia"] = wiki_data
                artist_data["bio"] = wiki_data.get("bio", "")
                artist_data["nationality"] = wiki_data.get("nationality", country)
                artist_data["education"] = wiki_data.get("education", "")
                logger.info(f"  ✓ Wikipedia: found")
            else:
                logger.info(f"  ✗ Wikipedia: not found")
        except Exception as e:
            logger.warning(f"  ✗ Wikipedia error: {e}")
        time.sleep(1)
        try:
            artsy_results = self.artsy.search_artists(name)
            if artsy_results:
                artist_data["sources"]["artsy"] = artsy_results[0]
                logger.info(f"  ✓ Artsy: found")
            else:
                logger.info(f"  ✗ Artsy: not found")
        except Exception as e:
            logger.warning(f"  ✗ Artsy error: {e}")
        time.sleep(1)
        artist_data["epi_signals"] = self._compute_signals(artist_data)
        return artist_data

    def _compute_signals(self, data: dict) -> dict:
        signals = {"notability": 0, "education": 0, "market_presence": 0, "data_completeness": 0}
        wiki = data.get("sources", {}).get("wikipedia", {})
        if wiki.get("is_artist"):
            signals["notability"] += 30
            if wiki.get("awards"): signals["notability"] += 10
            wc = len(wiki.get("bio", "").split())
            signals["notability"] += 10 if wc > 100 else (5 if wc > 50 else 0)
        edu = wiki.get("education", "")
        if edu: signals["education"] = min(20, len(edu.split(",")) * 5)
        artsy = data.get("sources", {}).get("artsy", {})
        if artsy:
            signals["market_presence"] += 20
            prices = artsy.get("price_range", {})
            if prices:
                avg = prices.get("avg", 0)
                signals["market_presence"] += 15 if avg > 10000 else (10 if avg > 5000 else 5)
        total_fields = 10
        filled = sum(1 for v in [data.get("bio"), data.get("nationality"), data.get("education"),
                                   data.get("city"), data.get("country"), wiki.get("field"),
                                   wiki.get("born"), artsy.get("url"), wiki.get("awards"),
                                   artsy.get("price_range")] if v)
        signals["data_completeness"] = int((filled / total_fields) * 25)
        signals["total_score"] = sum(signals.values())
        return signals

    def batch_research(self, artists: list) -> list:
        results = []
        for i, artist in enumerate(artists):
            logger.info(f"\n[{i+1}/{len(artists)}] Processing...")
            result = self.research_artist(artist.get("name", ""), artist.get("country", ""), artist.get("city", ""))
            results.append(result)
            time.sleep(2)
        return results


class DataPipeline:
    """Main pipeline: orchestrate scraping, scoring, and data export."""

    def __init__(self):
        self.research = ArtMarketResearch()

    def run_collection(self, artist_list: list) -> pd.DataFrame:
        logger.info(f"Starting data collection for {len(artist_list)} artists...")
        results = self.research.batch_research(artist_list)
        rows = []
        for r in results:
            signals = r.get("epi_signals", {})
            wiki = r.get("sources", {}).get("wikipedia", {})
            artsy = r.get("sources", {}).get("artsy", {})
            prices = artsy.get("price_range", {})
            rows.append({
                "name": r["name"], "country": r.get("country", ""), "city": r.get("city", ""),
                "bio": r.get("bio", wiki.get("bio", ""))[:400],
                "nationality": r.get("nationality", ""), "education": r.get("education", ""),
                "field": wiki.get("field", ""), "awards": wiki.get("awards", ""),
                "min_price": prices.get("min", None), "max_price": prices.get("max", None),
                "avg_price": prices.get("avg", None),
                "notability_score": signals.get("notability", 0),
                "education_score": signals.get("education", 0),
                "market_score": signals.get("market_presence", 0),
                "completeness_score": signals.get("data_completeness", 0),
                "total_epi": signals.get("total_score", 0),
                "has_wikipedia": bool(wiki.get("is_artist")),
                "has_artsy": bool(artsy.get("url")),
                "research_date": r["research_date"],
            })
        df = pd.DataFrame(rows)
        df = df.sort_values("total_epi", ascending=False)
        return df

    def export(self, df: pd.DataFrame, filename_prefix: str = "artmarket"):
        timestamp = datetime.now().strftime("%Y%m%d_%H%M%S")
        csv_path = DATA_DIR / f"{filename_prefix}_{timestamp}.csv"
        df.to_csv(csv_path, index=False)
        logger.info(f"Exported CSV: {csv_path}")
        json_path = DATA_DIR / f"{filename_prefix}_{timestamp}.json"
        df.to_json(json_path, orient="records", indent=2)
        logger.info(f"Exported JSON: {json_path}")
        summary = {
            "total_artists": len(df), "countries": df["country"].nunique(),
            "avg_epi": round(df["total_epi"].mean(), 1), "median_epi": round(df["total_epi"].median(), 1),
            "with_wikipedia": int(df["has_wikipedia"].sum()), "with_artsy": int(df["has_artsy"].sum()),
            "with_prices": int(df["avg_price"].notna().sum()),
            "generated_at": datetime.now().isoformat(),
        }
        summary_path = DATA_DIR / f"{filename_prefix}_summary_{timestamp}.json"
        with open(summary_path, "w") as f:
            json.dump(summary, f, indent=2)
        logger.info(f"Saved summary: {summary_path}")
        return {"csv": csv_path, "json": json_path, "summary": summary_path}


def get_artist_list() -> list:
    """Return a curated list of emerging artists to research. Each dict needs at least 'name' and 'country'."""
    return [
        # Africa
        {"name": "Adaeze Okafor", "country": "Nigeria", "city": "Lagos"},
        {"name": "Makeda Tadesse", "country": "Ethiopia", "city": "Addis Ababa"},
        {"name": "Kwame Asante", "country": "Ghana", "city": "Accra"},
        {"name": "Thabo Molefe", "country": "South Africa", "city": "Johannesburg"},
        {"name": "Idris Keita", "country": "Senegal", "city": "Dakar"},
        {"name": "Chiamaka Nwosu", "country": "Nigeria", "city": "Abuja"},
        {"name": "Amara Diallo", "country": "Nigeria", "city": "Lagos"},
        {"name": "Zuri Mwangi", "country": "Kenya", "city": "Nairobi"},
        {"name": "Nadia Ferroukhi", "country": "Morocco", "city": "Marrakech"},
        {"name": "Aisha Bello", "country": "Nigeria", "city": "Lagos"},
        # Asia
        {"name": "Priya Sharma", "country": "India", "city": "Mumbai"},
        {"name": "Yuki Tanaka", "country": "Japan", "city": "Tokyo"},
        {"name": "Min-Ji Park", "country": "South Korea", "city": "Seoul"},
        {"name": "Wei Chen", "country": "China", "city": "Shanghai"},
        {"name": "Ravi Patel", "country": "India", "city": "Delhi"},
        {"name": "Dewi Sari", "country": "Indonesia", "city": "Yogyakarta"},
        {"name": "Anh Nguyen", "country": "Vietnam", "city": "Ho Chi Minh City"},
        {"name": "Jin-Ho Kim", "country": "South Korea", "city": "Busan"},
        {"name": "Mei-Lin Zhou", "country": "China", "city": "Beijing"},
        {"name": "Sakura Ito", "country": "Japan", "city": "Kyoto"},
        {"name": "Kenji Watanabe", "country": "Japan", "city": "Osaka"},
        {"name": "Tomoko Hayashi", "country": "Japan", "city": "Tokyo"},
        # Europe
        {"name": "Ellis Nakamura", "country": "United Kingdom", "city": "London"},
        {"name": "Lena Hartmann", "country": "Germany", "city": "Berlin"},
        {"name": "Camille Dubois", "country": "France", "city": "Paris"},
        {"name": "Lotte van Dijk", "country": "Netherlands", "city": "Amsterdam"},
        {"name": "Sofia Rossi", "country": "Italy", "city": "Milan"},
        {"name": "Alejandro Vega", "country": "Spain", "city": "Madrid"},
        {"name": "Katarzyna Nowak", "country": "Poland", "city": "Warsaw"},
        {"name": "Astrid Lindqvist", "country": "Sweden", "city": "Stockholm"},
        {"name": "Elena Popescu", "country": "Romania", "city": "Bucharest"},
        {"name": "Nina Petrova", "country": "Russia", "city": "Moscow"},
        {"name": "Hans Mueller", "country": "Germany", "city": "Munich"},
        {"name": "Liam O'Brien", "country": "Ireland", "city": "Dublin"},
        {"name": "Sebastian Koch", "country": "Germany", "city": "Hamburg"},
        {"name": "Sven Eriksson", "country": "Sweden", "city": "Gothenburg"},
        # Americas
        {"name": "Zara Whitfield", "country": "United States", "city": "New York"},
        {"name": "Isabella Gomez", "country": "Colombia", "city": "Bogotá"},
        {"name": "Valentina Cruz", "country": "Mexico", "city": "Mexico City"},
        {"name": "Rafael Silva", "country": "Brazil", "city": "São Paulo"},
        {"name": "Mateo Fernandez", "country": "Argentina", "city": "Buenos Aires"},
        {"name": "Noah Tremblay", "country": "Canada", "city": "Montreal"},
        {"name": "Indigo Blake", "country": "Australia", "city": "Melbourne"},
        {"name": "Lucia Moreno", "country": "Colombia", "city": "Medellín"},
        {"name": "Diego Morales", "country": "Argentina", "city": "Córdoba"},
        {"name": "Carlos Mendez", "country": "Mexico", "city": "Guadalajara"},
        # Middle East
        {"name": "Fatima Al-Rashid", "country": "UAE", "city": "Dubai"},
        {"name": "Elif Yilmaz", "country": "Turkey", "city": "Istanbul"},
        {"name": "Omar Hassan", "country": "Egypt", "city": "Cairo"},
        {"name": "Tariq Al-Farsi", "country": "Oman", "city": "Muscat"},
        {"name": "Yara Said", "country": "Lebanon", "city": "Beirut"},
    ]


def main():
    import argparse
    parser = argparse.ArgumentParser(description="ArtMarket Insights Data Pipeline")
    parser.add_argument("--mode", choices=["collect", "demo", "export"], default="demo")
    parser.add_argument("--output-prefix", default="artmarket")
    args = parser.parse_args()

    pipeline = DataPipeline()

    if args.mode == "demo":
        logger.info("Running in DEMO mode")
        artists = get_artist_list()
        logger.info(f"Would research {len(artists)} artists:")
        for a in artists[:5]:
            logger.info(f"  • {a['name']} ({a['country']})")
        logger.info(f"  ... and {len(artists) - 5} more")
        logger.info("\nTo run real scraping: python main.py --mode collect")
        return

    elif args.mode == "collect":
        artists = get_artist_list()
        df = pipeline.run_collection(artists)
        paths = pipeline.export(df, args.output_prefix)
        logger.info(f"\n✅ Data collection complete!")
        logger.info(f"   CSV: {paths['csv']}")
        logger.info(f"   JSON: {paths['json']}")
        if not df.empty:
            logger.info(f"\n📊 Summary:")
            logger.info(f"   Total artists: {len(df)}")
            logger.info(f"   Avg EPI: {df['total_epi'].mean():.1f}")
            logger.info(f"   With Wikipedia: {df['has_wikipedia'].sum()}")
            logger.info(f"   With Artsy: {df['has_artsy'].sum()}")

    elif args.mode == "export":
        existing = sorted(DATA_DIR.glob(f"{args.output_prefix}_*.csv"))
        if existing:
            df = pd.read_csv(existing[-1])
            logger.info(f"Loaded {len(df)} records from {existing[-1]}")
            print(df[["name", "country", "total_epi"]].to_string(index=False))
        else:
            logger.info("No existing data files found. Run --mode collect first.")


if __name__ == "__main__":
    main()
