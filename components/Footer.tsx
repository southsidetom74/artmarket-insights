import Link from "next/link";

export default function Footer() {
  return (
    <footer style={{ borderTop: "1px solid rgba(255,255,255,0.06)", marginTop: 60, padding: "40px 20px" }}>
      <div style={{ maxWidth: "var(--maxw)", margin: "0 auto" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(200px, 1fr))", gap: 32, marginBottom: 32 }}>
          <div>
            <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: 6, background: "linear-gradient(135deg, #e6a05a, #c4834a)", display: "flex", alignItems: "center", justifyContent: "center", fontWeight: 700, fontSize: 11, color: "#111" }}>AI</div>
              <span style={{ fontWeight: 600, fontSize: 14 }}>ArtMarket<span style={{ color: "var(--accent)" }}>Insights</span></span>
            </div>
            <p style={{ color: "var(--muted)", fontSize: 13, lineHeight: 1.6 }}>
              AI-powered art market analytics. Discover emerging painters before they break through.
            </p>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Product</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <Link href="/search" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 13 }}>Explore Artists</Link>
              <Link href="/pricing" style={{ color: "var(--muted)", textDecoration: "none", fontSize: 13 }}>Pricing</Link>
              <span style={{ color: "var(--muted)", fontSize: 13, opacity: 0.5 }}>API (Coming Soon)</span>
            </div>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Company</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ color: "var(--muted)", fontSize: 13, opacity: 0.5 }}>About</span>
              <span style={{ color: "var(--muted)", fontSize: 13, opacity: 0.5 }}>Blog</span>
              <span style={{ color: "var(--muted)", fontSize: 13, opacity: 0.5 }}>Careers</span>
            </div>
          </div>
          <div>
            <h4 style={{ color: "#fff", fontSize: 14, fontWeight: 600, marginBottom: 12 }}>Legal</h4>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              <span style={{ color: "var(--muted)", fontSize: 13, opacity: 0.5 }}>Privacy</span>
              <span style={{ color: "var(--muted)", fontSize: 13, opacity: 0.5 }}>Terms</span>
              <span style={{ color: "var(--muted)", fontSize: 13, opacity: 0.5 }}>Cookies</span>
            </div>
          </div>
        </div>
        <div style={{ borderTop: "1px solid rgba(255,255,255,0.06)", paddingTop: 20, display: "flex", justifyContent: "space-between", alignItems: "center", flexWrap: "wrap", gap: 12 }}>
          <span style={{ color: "var(--muted)", fontSize: 12 }}>© 2025 ArtMarket Insights. All rights reserved.</span>
          <span style={{ color: "var(--muted)", fontSize: 12 }}>Data is for informational purposes only. Not investment advice.</span>
        </div>
      </div>
    </footer>
  );
}
