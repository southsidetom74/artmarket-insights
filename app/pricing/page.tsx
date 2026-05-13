import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import { Check, X, Zap, Crown, Building, ArrowRight } from "lucide-react";
import Link from "next/link";

const tiers = [
  {
    name: "Free",
    price: "€0",
    period: "forever",
    description: "Explore the platform with basic access",
    icon: <Zap size={20} />,
    features: [
      { text: "Top 3 artists per country", included: true },
      { text: "Basic EPI scores", included: true },
      { text: "Limited search", included: true },
      { text: "Financial projections", included: false },
      { text: "Watchlists & alerts", included: false },
      { text: "Exportable reports", included: false },
      { text: "API access", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Get Started",
    popular: false,
  },
  {
    name: "Collector",
    price: "€19",
    period: "/month",
    description: "For serious collectors and art enthusiasts",
    icon: <Zap size={20} />,
    features: [
      { text: "Full top 10 per country", included: true },
      { text: "Detailed EPI scores & breakdown", included: true },
      { text: "Full search & filters", included: true },
      { text: "Financial projections", included: true },
      { text: "Watchlists & email alerts", included: true },
      { text: "Exportable reports", included: false },
      { text: "API access", included: false },
      { text: "Priority support", included: false },
    ],
    cta: "Start Free Trial",
    popular: true,
  },
  {
    name: "Professional",
    price: "€49",
    period: "/month",
    description: "For galleries, advisors, and professionals",
    icon: <Crown size={20} />,
    features: [
      { text: "Everything in Collector", included: true },
      { text: "API access", included: true },
      { text: "Exportable reports (PDF/CSV)", included: true },
      { text: "Portfolio tracking", included: true },
      { text: "Early alerts (24h ahead)", included: true },
      { text: "Comparable artist analysis", included: true },
      { text: "Priority support", included: true },
      { text: "White-label options", included: false },
    ],
    cta: "Start Free Trial",
    popular: false,
  },
  {
    name: "Institutional",
    price: "Custom",
    period: "pricing",
    description: "For museums, funds, and large organizations",
    icon: <Building size={20} />,
    features: [
      { text: "Everything in Professional", included: true },
      { text: "White-label dashboards", included: true },
      { text: "Bulk data exports", included: true },
      { text: "Custom integrations", included: true },
      { text: "Dedicated account manager", included: true },
      { text: "SLA guarantee", included: true },
      { text: "On-premise deployment", included: true },
      { text: "Custom training", included: true },
    ],
    cta: "Contact Sales",
    popular: false,
  },
];

const faqs = [
  { q: "What data sources do you use?", a: "We aggregate data from public auction records, gallery exhibitions, press coverage, social media signals, and art market databases. Our AI models process 200+ data points per artist." },
  { q: "How accurate are the predictions?", a: "Our models achieve ~78% accuracy in predicting artists who experience significant market growth within 12 months. Past performance doesn't guarantee future results." },
  { q: "Can I cancel anytime?", a: "Yes, all paid plans can be cancelled at any time. You'll retain access until the end of your billing period." },
  { q: "Is there a free trial?", a: "Collector and Professional plans include a 14-day free trial. No credit card required." },
  { q: "Do you offer refunds?", a: "We offer a 30-day money-back guarantee for all paid plans." },
];

export default function PricingPage() {
  return (
    <>
      <Navbar />
      <main style={{ maxWidth: "var(--maxw)", margin: "0 auto", padding: "48px 20px" }}>
        {/* Header */}
        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <h1 style={{ fontSize: 36, fontWeight: 700, marginBottom: 12 }}>Simple, Transparent Pricing</h1>
          <p style={{ color: "var(--muted)", fontSize: 18, maxWidth: 560, margin: "0 auto" }}>
            From curious collectors to institutional investors — find the plan that fits your needs.
          </p>
        </div>

        {/* Pricing Cards */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(260px, 1fr))", gap: 20, marginBottom: 60 }}>
          {tiers.map((tier) => (
            <div key={tier.name} style={{
              background: tier.popular ? "linear-gradient(180deg, rgba(230,160,90,0.08), rgba(230,160,90,0.02))" : "var(--card)",
              border: tier.popular ? "1px solid rgba(230,160,90,0.25)" : "1px solid rgba(255,255,255,0.04)",
              borderRadius: 14,
              padding: 28,
              position: "relative",
              display: "flex",
              flexDirection: "column",
            }}>
              {tier.popular && (
                <div style={{ position: "absolute", top: -10, left: "50%", transform: "translateX(-50%)", background: "var(--accent)", color: "#111", padding: "4px 16px", borderRadius: 20, fontSize: 12, fontWeight: 600 }}>
                  Most Popular
                </div>
              )}
              <div style={{ color: "var(--accent)", marginBottom: 8 }}>{tier.icon}</div>
              <h3 style={{ margin: 0, fontSize: 20, fontWeight: 700 }}>{tier.name}</h3>
              <div style={{ margin: "12px 0" }}>
                <span style={{ fontSize: 32, fontWeight: 700 }}>{tier.price}</span>
                <span style={{ color: "var(--muted)", fontSize: 14 }}>{tier.period}</span>
              </div>
              <p style={{ color: "var(--muted)", fontSize: 14, marginBottom: 20, flex: 1 }}>{tier.description}</p>

              <div style={{ display: "flex", flexDirection: "column", gap: 10, marginBottom: 24 }}>
                {tier.features.map((f, i) => (
                  <div key={i} style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 13 }}>
                    {f.included ? (
                      <Check size={14} color="#5ae65a" style={{ flexShrink: 0 }} />
                    ) : (
                      <X size={14} color="#666" style={{ flexShrink: 0 }} />
                    )}
                    <span style={{ color: f.included ? "#fff" : "var(--muted)" }}>{f.text}</span>
                  </div>
                ))}
              </div>

              <button style={{
                width: "100%",
                background: tier.popular ? "var(--accent)" : "rgba(255,255,255,0.06)",
                color: tier.popular ? "#111" : "#fff",
                border: "none",
                borderRadius: 10,
                padding: "12px",
                fontSize: 15,
                fontWeight: 600,
                cursor: "pointer",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 6,
                transition: "opacity 0.2s",
              }}>
                {tier.cta} <ArrowRight size={16} />
              </button>
            </div>
          ))}
        </div>

        {/* FAQ */}
        <div style={{ maxWidth: 700, margin: "0 auto" }}>
          <h2 style={{ textAlign: "center", fontSize: 24, fontWeight: 700, marginBottom: 32 }}>Frequently Asked Questions</h2>
          <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
            {faqs.map((faq, i) => (
              <div key={i} style={{ background: "var(--card)", borderRadius: 12, padding: 20, border: "1px solid rgba(255,255,255,0.04)" }}>
                <h4 style={{ margin: "0 0 8px", fontSize: 15, fontWeight: 600 }}>{faq.q}</h4>
                <p style={{ margin: 0, color: "var(--muted)", fontSize: 14, lineHeight: 1.6 }}>{faq.a}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Bottom CTA */}
        <div style={{ textAlign: "center", marginTop: 48, padding: "48px 24px", background: "linear-gradient(135deg, rgba(230,160,90,0.06), rgba(230,160,90,0.02))", borderRadius: 16, border: "1px solid rgba(230,160,90,0.1)" }}>
          <h2 style={{ fontSize: 24, fontWeight: 700, marginBottom: 8 }}>Ready to get started?</h2>
          <p style={{ color: "var(--muted)", fontSize: 15, marginBottom: 20 }}>Join 2,400+ collectors and professionals using data-driven insights.</p>
          <button style={{ background: "var(--accent)", color: "#111", padding: "12px 32px", borderRadius: 10, border: "none", fontSize: 16, fontWeight: 600, cursor: "pointer", display: "inline-flex", alignItems: "center", gap: 6 }}>
            Start Free <ArrowRight size={18} />
          </button>
        </div>
      </main>
      <Footer />
    </>
  );
}
