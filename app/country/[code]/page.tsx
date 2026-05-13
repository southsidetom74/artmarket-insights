import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { notFound } from "next/navigation";
import { getArtistsByCountry, getCountryByCode, countries } from "@/lib";
import Link from "next/link";
import { ArrowLeft, TrendingUp, Award, MapPin } from "lucide-react";
import { Sparkline } from "@/components/Sparkline";

export default function CountryPage({ params }: { params: { code: string } }) {
  const country = getCountryByCode(params.code);
  if (!country) notFound();

  const artists = getArtistsByCountry(params.code).slice(0, 10);

  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "32px 20px" }}>
        <Link href="/" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 14, display: "inline-flex", alignItems: "center", gap: 6, marginBottom: 24 }}>
          <ArrowLeft size={14} /> Back to Home
        </Link>

        {/* Country Header */}
        <div style={{ display: "flex", alignItems: "center", gap: 16, marginBottom: 32 }}>
          <div style={{ fontSize: 48 }}>{country.flag}</div>
          <div>
            <h1 style={{ margin: 0, fontSize: 32, fontWeight: 700 }}>{country.name}</h1>
            <p style={{ color: "var(--muted)", margin: "4px 0 0", fontSize: 14 }}>
              {country.artistCount.toLocaleString()} artists tracked · Avg EPI {country.avgEPI}
            </p>
          </div>
        </div>

        {/* Stats */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))", gap: 12, marginBottom: 32 }}>
          {[
            { label: "Artists Tracked", value: country.artistCount.toLocaleString() },
            { label: "Avg EPI Score", value: String(country.avgEPI) },
            { label: "Top Artist", value: country.topArtist },
            { label: "Market Growth", value: "+12.4%" },
          ].map((s, i) => (
            <div key={i} style={{ background: "var(--card)", borderRadius: 10, padding: 16, border: "1px solid rgba(255,255,255,0.04)" }}>
              <div style={{ color: "var(--muted)", fontSize: 12, marginBottom: 4 }}>{s.label}</div>
              <div style={{ fontSize: 18, fontWeight: 700 }}>{s.value}</div>
            </div>
          ))}
        </div>

        {/* Top 10 List */}
        <h2 style={{ fontSize: 20, fontWeight: 700, marginBottom: 20, color: "var(--accent)" }}>
          Top {artists.length} Emerging Painters
        </h2>

        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {artists.map((artist, idx) => (
            <Link key={artist.slug} href={`/artist/${artist.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
              <div style={{ display: "flex", alignItems: "center", gap: 16, background: "var(--card)", borderRadius: 12, padding: "16px 20px", border: "1px solid rgba(255,255,255,0.04)", transition: "transform 0.15s, box-shadow 0.15s", cursor: "pointer" }}
                onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateX(4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.3)"; }}
                onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateX(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
              >
                {/* Rank */}
                <div style={{ width: 32, height: 32, borderRadius: 8, background: idx < 3 ? "rgba(230,160,90,0.2)" : "rgba(255,255,255,0.06)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: idx < 3 ? "var(--accent)" : "var(--muted)", flexShrink: 0 }}>
                  {idx + 1}
                </div>

                {/* Avatar */}
                <div style={{ width: 48, height: 48, borderRadius: "50%", background: artist.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 16, fontWeight: 700, color: "#fff", flexShrink: 0 }}>
                  {artist.avatar}
                </div>

                {/* Info */}
                <div style={{ flex: 1, minWidth: 0 }}>
                  <div style={{ fontWeight: 600, fontSize: 15 }}>{artist.name}</div>
                  <div style={{ display: "flex", alignItems: "center", gap: 8, marginTop: 2 }}>
                    <span style={{ display: "flex", alignItems: "center", gap: 3, color: "var(--muted)", fontSize: 12 }}>
                      <MapPin size={10} /> {artist.city}
                    </span>
                    <span style={{ color: "var(--muted)", fontSize: 12 }}>·</span>
                    <span style={{ color: "var(--muted)", fontSize: 12 }}>{artist.style}</span>
                    <span style={{ color: "var(--muted)", fontSize: 12 }}>·</span>
                    <span style={{ color: "var(--muted)", fontSize: 12 }}>{artist.medium}</span>
                  </div>
                </div>

                {/* EPI Bar */}
                <div style={{ width: 120, flexShrink: 0 }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
                    <span style={{ fontSize: 11, color: "var(--muted)" }}>EPI</span>
                    <span style={{ fontSize: 12, fontWeight: 600, color: artist.epiScore >= 85 ? "#5ae65a" : "var(--accent)" }}>{artist.epiScore}</span>
                  </div>
                  <div style={{ height: 4, background: "rgba(255,255,255,0.06)", borderRadius: 2, overflow: "hidden" }}>
                    <div style={{ height: "100%", width: `${artist.epiScore}%`, background: artist.epiScore >= 85 ? "#5ae65a" : "var(--accent)", borderRadius: 2 }} />
                  </div>
                </div>

                {/* Sparkline */}
                <div style={{ width: 80, flexShrink: 0, display: "none" }} className="desktop-only">
                  <Sparkline data={artist.priceHistory.map(p => p.price)} color={artist.color} />
                </div>

                {/* Price */}
                <div style={{ textAlign: "right", flexShrink: 0, minWidth: 80 }}>
                  <div style={{ fontWeight: 600, fontSize: 14 }}>${artist.currentAvgPrice.toLocaleString()}</div>
                  <div style={{ fontSize: 11, color: "#5ae65a", display: "flex", alignItems: "center", justifyContent: "flex-end", gap: 2 }}>
                    <TrendingUp size={10} /> +{Math.round(((artist.priceHistory[artist.priceHistory.length - 1].price - artist.priceHistory[0].price) / artist.priceHistory[0].price) * 100)}%
                  </div>
                </div>
              </div>
            </Link>
          ))}
        </div>

        {artists.length === 0 && (
          <div style={{ textAlign: "center", padding: 60, color: "var(--muted)" }}>
            <p>No artists tracked for this country yet. Check back soon!</p>
          </div>
        )}
      </main>
      <Footer />
    </>
  );
}
