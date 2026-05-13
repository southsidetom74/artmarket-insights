"use client";
import Link from "next/link";
import { TrendingUp, MapPin } from "lucide-react";
import { Sparkline } from "./Sparkline";
import type { Artist } from "@/lib";

export default function ArtistCard({ artist }: { artist: Artist }) {
  const growth = artist.priceHistory.length >= 2
    ? Math.round(((artist.priceHistory[artist.priceHistory.length - 1].price - artist.priceHistory[0].price) / artist.priceHistory[0].price) * 100)
    : 0;

  return (
    <Link href={`/artist/${artist.slug}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ background: "var(--card)", borderRadius: 12, overflow: "hidden", transition: "transform 0.2s, box-shadow 0.2s", cursor: "pointer", border: "1px solid rgba(255,255,255,0.04)" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-4px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 12px 40px rgba(0,0,0,0.5)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
      >
        {/* Avatar placeholder */}
        <div style={{ height: 180, background: `linear-gradient(135deg, ${artist.color}22, ${artist.color}44)`, display: "flex", alignItems: "center", justifyContent: "center" }}>
          <div style={{ width: 72, height: 72, borderRadius: "50%", background: artist.color, display: "flex", alignItems: "center", justifyContent: "center", fontSize: 24, fontWeight: 700, color: "#fff" }}>
            {artist.avatar}
          </div>
        </div>
        <div style={{ padding: 16 }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 6 }}>
            <h3 style={{ margin: 0, fontSize: 16, fontWeight: 600 }}>{artist.name}</h3>
            <span style={{ background: "rgba(230,160,90,0.15)", color: "var(--accent)", padding: "2px 8px", borderRadius: 6, fontSize: 12, fontWeight: 600 }}>
              {artist.epiScore}
            </span>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 4, color: "var(--muted)", fontSize: 13, marginBottom: 8 }}>
            <MapPin size={12} />
            <span>{artist.city}, {artist.country}</span>
          </div>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 10 }}>
            <span style={{ color: "var(--muted)", fontSize: 12 }}>{artist.style}</span>
            <div style={{ display: "flex", alignItems: "center", gap: 4 }}>
              <TrendingUp size={12} color={growth > 0 ? "#5ae65a" : "#e65a5a"} />
              <span style={{ fontSize: 12, color: growth > 0 ? "#5ae65a" : "#e65a5a", fontWeight: 600 }}>
                {growth > 0 ? "+" : ""}{growth}%
              </span>
            </div>
          </div>
          <Sparkline data={artist.priceHistory.map(p => p.price)} color={artist.color} />
          <div style={{ display: "flex", justifyContent: "space-between", marginTop: 10 }}>
            <span style={{ color: "var(--muted)", fontSize: 11 }}>Avg Price</span>
            <span style={{ fontSize: 13, fontWeight: 600 }}>${artist.currentAvgPrice.toLocaleString()}</span>
          </div>
        </div>
      </div>
    </Link>
  );
}
