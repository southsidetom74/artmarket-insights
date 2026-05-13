"use client";
import { useState, useMemo } from "react";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ArtistCard from "@/components/ArtistCard";
import { artists, countries, allStyles, allMediums, searchArtists } from "@/lib";
import { SlidersHorizontal, X } from "lucide-react";

export default function SearchPage({ searchParams }: { searchParams: { q?: string } }) {
  const [query, setQuery] = useState(searchParams.q || "");
  const [showFilters, setShowFilters] = useState(false);
  const [country, setCountry] = useState("");
  const [style, setStyle] = useState("");
  const [medium, setMedium] = useState("");
  const [sortBy, setSortBy] = useState<"epi" | "growth" | "price" | "name">("epi");

  const results = useMemo(() => {
    let r = searchArtists(query, { country, style, medium });
    switch (sortBy) {
      case "growth":
        r.sort((a, b) => {
          const ga = a.priceHistory.length >= 2 ? (a.priceHistory[a.priceHistory.length - 1].price - a.priceHistory[0].price) / a.priceHistory[0].price : 0;
          const gb = b.priceHistory.length >= 2 ? (b.priceHistory[b.priceHistory.length - 1].price - b.priceHistory[0].price) / b.priceHistory[0].price : 0;
          return gb - ga;
        });
        break;
      case "price":
        r.sort((a, b) => b.currentAvgPrice - a.currentAvgPrice);
        break;
      case "name":
        r.sort((a, b) => a.name.localeCompare(b.name));
        break;
      default:
        r.sort((a, b) => b.epiScore - a.epiScore);
    }
    return r;
  }, [query, country, style, medium, sortBy]);

  const activeFilters = [country, style, medium].filter(Boolean).length;

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "32px 20px" }}>
        <h1 style={{ margin: "0 0 8px", fontSize: 28, fontWeight: 700 }}>Explore Artists</h1>
        <p style={{ color: "var(--muted)", margin: "0 0 24px", fontSize: 14 }}>Search and filter from {artists.length}+ emerging painters worldwide</p>

        {/* Search & Filter Bar */}
        <div style={{ display: "flex", gap: 12, marginBottom: 20, flexWrap: "wrap" }}>
          <div style={{ flex: 1, minWidth: 240 }}>
            <SearchBar />
          </div>
          <button onClick={() => setShowFilters(!showFilters)}
            style={{ display: "flex", alignItems: "center", gap: 6, background: showFilters ? "rgba(230,160,90,0.15)" : "rgba(255,255,255,0.06)", border: `1px solid ${showFilters ? "rgba(230,160,90,0.3)" : "rgba(255,255,255,0.08)"}`, borderRadius: 10, padding: "10px 16px", color: showFilters ? "var(--accent)" : "#fff", cursor: "pointer", fontSize: 14, fontWeight: 500 }}>
            <SlidersHorizontal size={14} /> Filters {activeFilters > 0 && `(${activeFilters})`}
          </button>
          <select value={sortBy} onChange={e => setSortBy(e.target.value as typeof sortBy)}
            style={{ background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 10, padding: "10px 16px", color: "#fff", fontSize: 14, cursor: "pointer" }}>
            <option value="epi">Sort: EPI Score</option>
            <option value="growth">Sort: Growth</option>
            <option value="price">Sort: Price</option>
            <option value="name">Sort: Name</option>
          </select>
        </div>

        {/* Filters Panel */}
        {showFilters && (
          <div style={{ background: "var(--card)", borderRadius: 12, padding: 20, marginBottom: 20, border: "1px solid rgba(255,255,255,0.04)", display: "flex", gap: 16, flexWrap: "wrap", alignItems: "flex-end" }}>
            <div style={{ minWidth: 160, flex: 1 }}>
              <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Country</label>
              <select value={country} onChange={e => setCountry(e.target.value)}
                style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 14 }}>
                <option value="">All Countries</option>
                {countries.map(c => <option key={c.code} value={c.code}>{c.flag} {c.name}</option>)}
              </select>
            </div>
            <div style={{ minWidth: 160, flex: 1 }}>
              <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Style</label>
              <select value={style} onChange={e => setStyle(e.target.value)}
                style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 14 }}>
                <option value="">All Styles</option>
                {allStyles.map(s => <option key={s} value={s}>{s}</option>)}
              </select>
            </div>
            <div style={{ minWidth: 160, flex: 1 }}>
              <label style={{ display: "block", fontSize: 12, color: "var(--muted)", marginBottom: 6 }}>Medium</label>
              <select value={medium} onChange={e => setMedium(e.target.value)}
                style={{ width: "100%", background: "rgba(255,255,255,0.06)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 8, padding: "8px 12px", color: "#fff", fontSize: 14 }}>
                <option value="">All Mediums</option>
                {allMediums.map(m => <option key={m} value={m}>{m}</option>)}
              </select>
            </div>
            {activeFilters > 0 && (
              <button onClick={() => { setCountry(""); setStyle(""); setMedium(""); }}
                style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, padding: "8px 14px", color: "var(--muted)", cursor: "pointer", fontSize: 13 }}>
                <X size={12} /> Clear
              </button>
            )}
          </div>
        )}

        {/* Results Count */}
        <div style={{ marginBottom: 16, color: "var(--muted)", fontSize: 13 }}>
          {results.length} artist{results.length !== 1 ? "s" : ""} found
          {query && ` for "${query}"`}
        </div>

        {/* Results Grid */}
        {results.length > 0 ? (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {results.map(a => <ArtistCard key={a.slug} artist={a} />)}
          </div>
        ) : (
          <div style={{ textAlign: "center", padding: 60, color: "var(--muted)" }}>
            <p style={{ fontSize: 16, marginBottom: 8 }}>No artists found</p>
            <p style={{ fontSize: 13 }}>Try adjusting your search or filters</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
