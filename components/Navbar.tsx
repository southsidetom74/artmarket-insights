"use client";
import Link from "next/link";
import { Search, BarChart3, TrendingUp, Globe, ArrowRight, Check, Star, Menu, X } from "lucide-react";
import { useState } from "react";

export default function Navbar() {
  const [open, setOpen] = useState(false);
  return (
    <nav style={{ position: "sticky", top: 0, zIndex: 100, background: "rgba(11,11,12,0.95)", backdropFilter: "blur(12px)", borderBottom: "1px solid rgba(255,255,255,0.06)" }}>
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "14px 20px", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
        <Link href="/" style={{ display: "flex", alignItems: "center", gap: "10px", textDecoration: "none", color: "#fff" }}>
          <div style={{ width: 36, height: 36, borderRadius: 8, background: "linear-gradient(135deg, #e6a05a, #c4834a)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 14, color: "#111" }}>AI</div>
          <span style={{ fontWeight: 600, fontSize: 16, letterSpacing: "-0.2px" }}>ArtMarket<span style={{ color: "var(--accent)" }}>Insights</span></span>
        </Link>
        <div className="nav-links" style={{ display: "flex", alignItems: "center", gap: 24 }}>
          <Link href="/search" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Explore</Link>
          <Link href="/pricing" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Pricing</Link>
          <Link href="/search" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Search</Link>
        </div>
        <div className="nav-actions" style={{ display: "flex", alignItems: "center", gap: 12 }}>
          <Link href="/pricing" style={{ color: "#fff", textDecoration: "none", fontSize: 14, fontWeight: 500 }}>Sign In</Link>
          <Link href="/pricing" style={{ background: "var(--accent)", color: "#111", padding: "8px 18px", borderRadius: 8, textDecoration: "none", fontSize: 14, fontWeight: 600, transition: "background 0.2s" }}>Get Started</Link>
        </div>
        <button className="mobile-menu" onClick={() => setOpen(!open)} style={{ display: "none", background: "none", border: "none", color: "#fff", cursor: "pointer" }}>
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>
      {open && (
        <div style={{ padding: "12px 20px", borderTop: "1px solid rgba(255,255,255,0.06)", display: "flex", flexDirection: "column", gap: 12 }}>
          <Link href="/search" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 14 }}>Explore</Link>
          <Link href="/pricing" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 14 }}>Pricing</Link>
          <Link href="/search" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 14 }}>Search</Link>
        </div>
      )}
    </nav>
  );
}
