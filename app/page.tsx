import Link from "next/link";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SearchBar from "@/components/SearchBar";
import ArtistCard from "@/components/ArtistCard";
import CountryCard from "@/components/CountryCard";
import { getTopArtists, countries } from "@/lib";
import { TrendingUp, Globe, BarChart3, Shield, Zap, ArrowRight } from "lucide-react";

export default function HomePage() {
  const topArtists = getTopArtists(6);
  const trendingCountries = countries.slice(0, 12);

  return (
    <>
      <Navbar />
      <main>
        {/* Hero */}
        <section style={{ padding: "80px 20px 60px", textAlign: "center", maxWidth: 800, margin: "0 auto" }}>
          <div style={{ display: "inline-flex", alignItems: "center", gap: 6, background: "rgba(230,160,90,0.1)", border: "1px solid rgba(230,160,90,0.2)", borderRadius: 20, padding: "4px 14px", marginBottom: 24 }}>
            <Zap size={12} color="#e6a05a" />
            <span style={{ fontSize: 12, color: "var(--accent)", fontWeight: 500 }}>AI-Powered Art Market Intelligence</span>
          </div>
          <h1 style={{ fontSize: "clamp(28px, 5vw, 48px)", fontWeight: 700, lineHeight: 1.15, marginBottom: 16, letterSpacing: "-0.5px" }}>
            Discover Tomorrow&apos;s<br />
            <span style={{ color: "var(--accent)" }}>Masterpieces</span> Today
          </h1>
          <p style={{ color: "var(--muted)", fontSize: 18, maxWidth: 560, margin: "0 auto 32px", lineHeight: 1.6 }}>
            Data-driven predictions of the most promising emerging painters worldwide. Track financial projections, collector interest, and market signals.
          </p>
          <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
            <SearchBar large />
          </div>
          <div style={{ display: "flex", justifyContent: "center", gap: 16, flexWrap: "wrap" }}>
            <Link href="/pricing" style={{ background: "var(--accent)", color: "#111", padding: "12px 28px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 6 }}>
              Start Free <ArrowRight size={16} />
            </Link>
            <Link href="/search" style={{ background: "rgba(255,255,255,0.06)", color: "#fff", padding: "12px 28px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 15, display: "inline-flex", alignItems: "center", gap: 6 }}>
              Explore Artists
            </Link>
          </div>
        </section>

        {/* Stats Bar */}
        <section style={{ maxWidth: "var(--maxw)", margin: "0 auto 60px", padding: "0 20px" }}>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 16, background: "var(--card)", borderRadius: 14, padding: "24px 32px", border: "1px solid rgba(255,255,255,0.04)" }}>
            {[
              { icon: <Globe size={20} />, label: "Countries Tracked", value: "195" },
              { icon: <BarChart3 size={20} />, label: "Artists Analyzed", value: "12,400+" },
              { icon: <TrendingUp size={20} />, label: "Predictions Daily", value: "3" },
              { icon: <Shield size={20} />, label: "Data Points/Artist", value: "200+" },
            ].map((s, i) => (
              <div key={i} style={{ textAlign: "center", color: "var(--accent)" }}>
                <div style={{ display: "flex", justifyContent: "center", marginBottom: 6, color: "var(--accent)" }}>{s.icon}</div>
                <div style={{ fontSize: 22, fontWeight: 700, color: "#fff" }}>{s.value}</div>
                <div style={{ fontSize: 12, color: "var(--muted)" }}>{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* Top Emerging Artists */}
        <section style={{ maxWidth: "var(--maxw)", margin: "0 auto 60px", padding: "0 20px" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 24 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Top Emerging Artists</h2>
              <p style={{ color: "var(--muted)", fontSize: 14, margin: "4px 0 0" }}>This week&apos;s highest-rated emerging painters</p>
            </div>
            <Link href="/search" style={{ color: "var(--accent)", textDecoration: "none", fontSize: 14, fontWeight: 500, display: "flex", alignItems: "center", gap: 4 }}>
              View All <ArrowRight size={14} />
            </Link>
          </div>
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(280px, 1fr))", gap: 20 }}>
            {topArtists.map(a => <ArtistCard key={a.slug} artist={a} />)}
          </div>
        </section>

        {/* Trending Countries */}
        <section style={{ maxWidth: "var(--maxw)", margin: "0 auto 60px", padding: "0 20px" }}>
          <div style={{ marginBottom: 24 }}>
            <h2 style={{ margin: 0, fontSize: 24, fontWeight: 700 }}>Trending Countries</h2>
            <p style={{ color: "var(--muted)", fontSize: 14, margin: "4px 0 0" }}>Markets with the fastest-growing emerging talent</p>
          </div>
          <div className="scroll-x" style={{ display: "flex", gap: 14, paddingBottom: 8 }}>
            {trendingCountries.map(c => <CountryCard key={c.code} country={c} />)}
          </div>
        </section>

        {/* CTA */}
        <section style={{ maxWidth: "var(--maxw)", margin: "0 auto 60px", padding: "0 20px" }}>
          <div style={{ background: "linear-gradient(135deg, rgba(230,160,90,0.1), rgba(230,160,90,0.05))", border: "1px solid rgba(230,160,90,0.15)", borderRadius: 16, padding: "48px 32px", textAlign: "center" }}>
            <h2 style={{ fontSize: 28, fontWeight: 700, marginBottom: 12 }}>Ready to Invest Smarter?</h2>
            <p style={{ color: "var(--muted)", fontSize: 16, maxWidth: 480, margin: "0 auto 24px" }}>
              Join collectors and galleries using data-driven insights to discover the next generation of art world stars.
            </p>
            <Link href="/pricing" style={{ background: "var(--accent)", color: "#111", padding: "14px 32px", borderRadius: 10, textDecoration: "none", fontWeight: 600, fontSize: 16, display: "inline-flex", alignItems: "center", gap: 6 }}>
              Explore Plans <ArrowRight size={18} />
            </Link>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
