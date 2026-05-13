import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { getArtistBySlug } from "@/lib";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Award, MapPin, Building2, Eye, Share2, Bookmark, ExternalLink } from "lucide-react";
import PredictionChart from "@/components/PredictionChart";
import { EPIGauge } from "@/components/EPIGauge";

export default function ArtistPage({ params }: { params: { slug: string } }) {
  const artist = getArtistBySlug(params.slug);
  if (!artist) notFound();

  const growth = artist.priceHistory.length >= 2
    ? Math.round(((artist.priceHistory[artist.priceHistory.length - 1].price - artist.priceHistory[0].price) / artist.priceHistory[0].price) * 100)
    : 0;

  const projectedGrowth = artist.projectedPrices.length >= 2
    ? Math.round(((artist.projectedPrices[artist.projectedPrices.length - 1].price - artist.projectedPrices[0].price) / artist.projectedPrices[0].price) * 100)
    : 0;

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "32px 20px" }}>
        <Link href={`/country/${artist.countryCode}`} style={{ color: "var(--muted)", textDecoration: "none", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
          <ArrowLeft size={14} /> Back to {artist.country}
        </Link>

        {/* Artist Header */}
        <div style={{ display: "flex", gap: 24, alignItems: "flex-start", marginBottom: 36, flexWrap: "wrap" }}>
          <div style={{ width: 120, height: 120, borderRadius: "50%", background: artist.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 36, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
            {artist.avatar}
          </div>
          <div style={{ flex: 1, minWidth: 240 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 12, marginBottom: 4 }}>
              <h1 style={{ margin: 0, fontSize: 28, fontWeight: 700 }}>{artist.name}</h1>
              <span style={{ fontSize: 24 }}>{artist.countryCode === "US" ? "🇺🇸" : ""}</span>
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 8, flexWrap: "wrap" }}>
              <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--muted)", fontSize: 14 }}>
                <MapPin size={14} /> {artist.city}, {artist.country}
              </span>
              <span style={{ color: "var(--muted)" }}>·</span>
              <span style={{ color: "var(--muted)", fontSize: 14 }}>Age {artist.age}</span>
              <span style={{ color: "var(--muted)" }}>·</span>
              <span style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--muted)", fontSize: 14 }}>
                <Building2 size={14} /> {artist.gallery}
              </span>
            </div>
            <p style={{ color: "var(--muted)", lineHeight: 1.6, fontSize: 14, margin: "0 0 12px" }}>{artist.bio}</p>
            <div style={{ display: "flex", gap: 8, flexWrap: "wrap" }}>
              <span style={{ background: "rgba(230,160,90,0.15)", color: "var(--accent)", padding: "3px 10px", borderRadius: 6, fontSize: 12, fontWeight: 500 }}>{artist.style}</span>
              <span style={{ background: "rgba(255,255,255,0.06)", color: "var(--muted)", padding: "3px 10px", borderRadius: 6, fontSize: 12 }}>{artist.medium}</span>
              {artist.tags.map(tag => (
                <span key={tag} style={{ background: "rgba(255,255,255,0.04)", color: "var(--muted)", padding: "3px 10px", borderRadius: 6, fontSize: 12 }}>{tag}</span>
              ))}
            </div>
          </div>
          <EPIGauge score={artist.epiScore} />
        </div>

        {/* Key Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 36 }}>
          {[
            { label: "EPI Score", value: String(artist.epiScore), sub: "out of 100", color: artist.epiScore >= 85 ? "#5ae65a" : "var(--accent)" },
            { label: "Avg Price", value: `$${artist.currentAvgPrice.toLocaleString()}`, sub: "USD", color: "#fff" },
            { label: "12-Month Growth", value: `${growth > 0 ? "+" : ""}${growth}%`, sub: "price trajectory", color: growth > 0 ? "#5ae65a" : "#e65a5a" },
            { label: "Projected Growth", value: `+${projectedGrowth}%`, sub: "next 12 months", color: "#e6a05a" },
            { label: "Exhibitions", value: String(artist.exhibitions), sub: "total", color: "#fff" },
            { label: "Auction Appearances", value: String(artist.auctionAppearances), sub: "verified", color: "#fff" },
          ].map((s, i) => (
            <div key={i} style={{ background: "var(--card)", borderRadius: 12, padding: 18, border: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 6 }}>{s.label}</div>
              <div style={{ fontSize: 22, fontWeight: 700, color: s.color }}>{s.value}</div>
              <div style={{ color: "var(--muted)", fontSize: 11, marginTop: 2 }}>{s.sub}</div>
            </div>
          ))}
        </div>

        {/* Financial Projection Chart */}
        <div style={{ background: "var(--card)", borderRadius: 14, padding: 24, marginBottom: 36, border: "1px solid rgba(255,255,255,0.04)" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
            <div>
              <h2 style={{ margin: 0, fontSize: 18, fontWeight: 700 }}>Financial Projection</h2>
              <p style={{ color: "var(--muted)", fontSize: 13, margin: "4px 0 0" }}>Historical prices and 12-month forecast</p>
            </div>
            <div style={{ display: "flex", gap: 16, fontSize: 12 }}>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 20, height: 2, background: "#e6a05a", display: "inline-block" }} /> Historical
              </span>
              <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <span style={{ width: 20, height: 2, background: "repeating-linear-gradient(90deg, #e6a05a 0, #e6a05a 4px, transparent 4px, transparent 8px)", display: "inline-block" }} /> Projected
              </span>
            </div>
          </div>
          <PredictionChart historical={artist.priceHistory} projected={artist.projectedPrices} />
        </div>

        {/* Market Signals */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16, marginBottom: 36 }}>
          <div style={{ background: "var(--card)", borderRadius: 14, padding: 24, border: "1px solid rgba(255,255,255,0.04)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 600, color: "var(--accent)" }}>Market Signals</h3>
            {[
              { label: "Exhibition Activity", value: artist.exhibitions, max: 20, color: "#e6a05a" },
              { label: "Auction Presence", value: artist.auctionAppearances, max: 15, color: "#5ae6a0" },
              { label: "Press Mentions", value: artist.pressMentions, max: 60, color: "#5a9ae6" },
              { label: "Social Growth", value: artist.socialGrowth, max: 600, color: "#e65a9a" },
            ].map((s, i) => (
              <div key={i} style={{ marginBottom: 14 }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                  <span style={{ fontSize: 13, color: "var(--muted)" }}>{s.label}</span>
                  <span style={{ fontSize: 13, fontWeight: 600 }}>{s.value}</span>
                </div>
                <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                  <div style={{ height: "100%", width: `${Math.min(100, (s.value / s.max) * 100)}%`, background: s.color, borderRadius: 2 }} />
                </div>
              </div>
            ))}
          </div>

          <div style={{ background: "var(--card)", borderRadius: 14, padding: 24, border: "1px solid rgba(255,255,255,0.04)" }}>
            <h3 style={{ margin: "0 0 16px", fontSize: 16, fontWeight: 600, color: "var(--accent)" }}>Collector Interest</h3>
            <div style={{ display: "flex", justifyContent: "center", marginBottom: 16 }}>
              <EPIGauge score={Math.min(100, Math.round(artist.socialGrowth / 5))} />
            </div>
            <div style={{ textAlign: "center", marginBottom: 16 }}>
              <div style={{ fontSize: 14, color: "var(--muted)" }}>Interest Level</div>
              <div style={{ fontSize: 18, fontWeight: 700, color: artist.socialGrowth > 300 ? "#5ae65a" : "var(--accent)" }}>
                {artist.socialGrowth > 400 ? "Very High" : artist.socialGrowth > 250 ? "High" : "Growing"}
              </div>
            </div>
            <div style={{ display: "flex", justifyContent: "space-around", textAlign: "center" }}>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{artist.pressMentions}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Press</div>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{artist.exhibitions}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Shows</div>
              </div>
              <div>
                <div style={{ fontSize: 16, fontWeight: 700 }}>{artist.auctionAppearances}</div>
                <div style={{ fontSize: 11, color: "var(--muted)" }}>Auctions</div>
              </div>
            </div>
          </div>
        </div>

        {/* Subscription CTA */}
        <div style={{ background: "linear-gradient(135deg, rgba(230,160,90,0.08), rgba(230,160,90,0.03))", border: "1px solid rgba(230,160,90,0.12)", borderRadius: 14, padding: "32px 24px", textAlign: "center" }}>
          <h3 style={{ margin: "0 0 8px", fontSize: 18, fontWeight: 700 }}>Want the Full Report?</h3>
          <p style={{ color: "var(--muted)", fontSize: 14, margin: "0 0 16px" }}>
            Get detailed financial projections, comparable analysis, and early alerts for {artist.name}.
          </p>
          <Link href="/pricing" style={{ background: "var(--accent)", color: "#111", padding: "10px 24px", borderRadius: 8, textDecoration: "none", fontWeight: 600, fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6 }}>
            <Award size={16} /> Upgrade to Collector
          </Link>
        </div>
      </main>
      <Footer />
    </>
  );
}
