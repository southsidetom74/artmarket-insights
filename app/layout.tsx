import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "ArtMarket Insights — Discover Tomorrow's Masterpieces",
  description: "AI-powered art market analytics. Predict the most promising emerging painters by country, track financial projections, and make data-driven collecting decisions.",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
