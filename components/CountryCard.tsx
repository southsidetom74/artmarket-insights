"use client";
import Link from "next/link";
import type { Country } from "@/lib";

export default function CountryCard({ country }: { country: Country }) {
  return (
    <Link href={`/country/${country.code}`} style={{ textDecoration: "none", color: "inherit" }}>
      <div style={{ minWidth: 160, background: "var(--card)", borderRadius: 12, padding: "16px 20px", textAlign: "center", cursor: "pointer", transition: "transform 0.2s, box-shadow 0.2s", border: "1px solid rgba(255,255,255,0.04)" }}
        onMouseEnter={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(-3px)"; (e.currentTarget as HTMLElement).style.boxShadow = "0 8px 24px rgba(0,0,0,0.4)"; }}
        onMouseLeave={e => { (e.currentTarget as HTMLElement).style.transform = "translateY(0)"; (e.currentTarget as HTMLElement).style.boxShadow = "none"; }}
      >
        <div style={{ fontSize: 32, marginBottom: 8 }}>{country.flag}</div>
        <div style={{ fontWeight: 600, fontSize: 14, marginBottom: 4 }}>{country.name}</div>
        <div style={{ color: "var(--muted)", fontSize: 12 }}>{country.artistCount.toLocaleString()} artists</div>
        <div style={{ marginTop: 6, background: "rgba(230,160,90,0.15)", color: "var(--accent)", padding: "2px 8px", borderRadius: 6, fontSize: 11, fontWeight: 600, display: "inline-block" }}>
          Avg EPI {country.avgEPI}
        </div>
      </div>
    </Link>
  );
}
