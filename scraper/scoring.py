"""
Emerging Potential Index (EPI) Scoring Engine
Computes a 0-100 score for each artist based on multiple market signals.
"""

import json
import math
from datetime import datetime
from pathlib import Path
from typing import Optional

DATA_DIR = Path(__file__).parent / "data"


class EPIScorer:
    """
    Computes the Emerging Potential Index (EPI) — a composite score (0-100)
    that predicts an emerging painter's likelihood of significant market growth.

    Signal weights:
      - Market Momentum (30%): Auction results, price trajectory, sales volume
      - Institutional Recognition (25%): Gallery representation, museum shows, biennials
      - Critical Attention (20%): Press mentions, reviews, art publication features
      - Collector Interest (15%): Social media growth, search trends, waitlist signals
      - Career Trajectory (10%): Education, awards, residency history
    """

    WEIGHTS = {
        "market_momentum": 0.30,
        "institutional_recognition": 0.25,
        "critical_attention": 0.20,
        "collector_interest": 0.15,
        "career_trajectory": 0.10,
    }

    @classmethod
    def score_market_momentum(cls, price_history: list, auction_appearances: int,
                              current_avg_price: int) -> float:
        """Score based on price trajectory and auction activity. Returns 0-100."""
        if not price_history or len(price_history) < 2:
            return 10.0  # Minimal score for unknown

        # Price growth rate (annualized)
        first_price = price_history[0].get("price", 0)
        last_price = price_history[-1].get("price", 0)
        if first_price <= 0:
            return 10.0

        months = len(price_history)
        total_growth = (last_price - first_price) / first_price
        monthly_growth = total_growth / max(months, 1)
        annualized_growth = monthly_growth * 12

        # Score components
        growth_score = min(50, max(0, annualized_growth * 100))  # 0-50 for growth rate
        auction_score = min(30, auction_appearances * 5)  # 0-30 for auction presence
        price_level_score = min(20, current_avg_price / 2000)  # 0-20 for price level

        return growth_score + auction_score + price_level_score

    @classmethod
    def score_institutional(cls, exhibitions: int, gallery_tier: int = 2,
                            museum_shows: int = 0, biennials: int = 0) -> float:
        """Score based on institutional recognition. Returns 0-100."""
        exh_score = min(30, exhibitions * 3)  # 0-30
        gallery_score = gallery_tier * 10  # 0-30 (tier 1-3)
        museum_score = min(25, museum_shows * 8)  # 0-25
        biennial_score = min(15, biennials * 5)  # 0-15
        return exh_score + gallery_score + museum_score + biennial_score

    @classmethod
    def score_critical_attention(cls, press_mentions: int, review_count: int = 0,
                                  features: int = 0) -> float:
        """Score based on critical/press attention. Returns 0-100."""
        press_score = min(40, press_mentions * 2)  # 0-40
        review_score = min(30, review_count * 5)  # 0-30
        feature_score = min(30, features * 6)  # 0-30
        return press_score + review_score + feature_score

    @classmethod
    def score_collector_interest(cls, social_growth: int, search_trend: float = 50,
                                 waitlist_signals: int = 0) -> float:
        """Score based on collector demand signals. Returns 0-100."""
        social_score = min(40, social_growth / 15)  # 0-40
        search_score = min(35, search_trend * 0.35)  # 0-35
        waitlist_score = min(25, waitlist_signals * 5)  # 0-25
        return social_score + search_score + waitlist_score

    @classmethod
    def score_career(cls, education_tier: int = 2, awards: int = 0,
                     residencies: int = 0, years_active: int = 3) -> float:
        """Score based on career foundation. Returns 0-100."""
        edu_score = education_tier * 15  # 0-30 (tier 1-2 for top schools)
        award_score = min(30, awards * 6)  # 0-30
        residency_score = min(20, residencies * 5)  # 0-20
        experience_score = min(20, years_active * 3)  # 0-20
        return edu_score + award_score + residency_score + experience_score

    @classmethod
    def compute_epi(cls, artist_data: dict) -> dict:
        """
        Compute full EPI score for an artist.
        Returns dict with component scores and total.
        """
        price_history = artist_data.get("price_history", [])
        auction_app = artist_data.get("auction_appearances", 0)
        avg_price = artist_data.get("current_avg_price", 0)
        exhibitions = artist_data.get("exhibitions", 0)
        press = artist_data.get("press_mentions", 0)
        social = artist_data.get("social_growth", 0)

        market = cls.score_market_momentum(price_history, auction_app, avg_price)
        institutional = cls.score_institutional(exhibitions)
        critical = cls.score_critical_attention(press)
        collector = cls.score_collector_interest(social)
        career = cls.score_career()

        # Weighted total
        total = (
            market * cls.WEIGHTS["market_momentum"] +
            institutional * cls.WEIGHTS["institutional_recognition"] +
            critical * cls.WEIGHTS["critical_attention"] +
            collector * cls.WEIGHTS["collector_interest"] +
            career * cls.WEIGHTS["career_trajectory"]
        )

        return {
            "total": round(min(100, max(0, total)), 1),
            "market_momentum": round(market, 1),
            "institutional_recognition": round(institutional, 1),
            "critical_attention": round(critical, 1),
            "collector_interest": round(collector, 1),
            "career_trajectory": round(career, 1),
            "grade": cls._grade(total),
            "computed_at": datetime.now().isoformat(),
        }

    @staticmethod
    def _grade(score: float) -> str:
        if score >= 90: return "A+"
        if score >= 80: return "A"
        if score >= 70: return "B+"
        if score >= 60: return "B"
        if score >= 50: return "C+"
        if score >= 40: return "C"
        return "D"


def score_all_artists(artists: list) -> list:
    """Score all artists and add EPI data."""
    for artist in artists:
        artist["epi"] = EPIScorer.compute_epi(artist)
    return sorted(artists, key=lambda a: a["epi"]["total"], reverse=True)


def get_top_by_country(artists: list, limit: int = 10) -> dict:
    """Get top N artists per country."""
    by_country = {}
    for a in artists:
        cc = a.get("country_code", a.get("countryCode", ""))
        if cc not in by_country:
            by_country[cc] = []
        by_country[cc].append(a)

    result = {}
    for cc, country_artists in by_country.items():
        sorted_artists = sorted(country_artists, key=lambda a: a["epi"]["total"], reverse=True)
        result[cc] = sorted_artists[:limit]
    return result


if __name__ == "__main__":
    # Demo scoring with mock data
    from main import get_artist_list

    print("🧮 EPI Scoring Engine — Demo\n")
    print("Scoring weights:")
    for k, v in EPIScorer.WEIGHTS.items():
        print(f"  {k}: {v*100:.0f}%")
    print()

    # Score a sample artist
    sample = {
        "name": "Adaeze Okafor",
        "price_history": [{"month": f"M{i}", "price": 4000 + i * 1500} for i in range(24)],
        "auction_appearances": 4,
        "current_avg_price": 18500,
        "exhibitions": 12,
        "press_mentions": 28,
        "social_growth": 340,
    }
    result = EPIScorer.compute_epi(sample)
    print(f"Sample: {sample['name']}")
    print(f"  Total EPI: {result['total']} ({result['grade']})")
    for k, v in result.items():
        if k not in ("total", "grade", "computed_at"):
            print(f"  {k}: {v}")
