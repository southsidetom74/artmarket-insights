"use client";
import Link from "next/link";
import { Search } from "lucide-react";
import { useState } from "react";
import { useRouter } from "next/navigation";

export default function SearchBar({ large }: { large?: boolean }) {
  const [query, setQuery] = useState("");
  const router = useRouter();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (query.trim()) router.push(`/search?q=${encodeURIComponent(query.trim())}`);
    else router.push("/search");
  };
  return (
    <form onSubmit={handleSubmit} style={{ display: "flex", alignItems: "center", background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)", borderRadius: 12, padding: large ? "14px 20px" : "10px 16px", gap: 10, width: "100%", maxWidth: large ? 600 : 400, transition: "border-color 0.2s" }}>
      <Search size={large ? 20 : 16} color="#bdbdbd" />
      <input
        type="text"
        placeholder={large ? "Search artists, countries, styles..." : "Search..."}
        value={query}
        onChange={e => setQuery(e.target.value)}
        style={{ flex: 1, background: "transparent", border: "none", outline: "none", color: "#fff", fontSize: large ? 16 : 14, fontFamily: "inherit" }}
      />
      {large && (
        <button type="submit" style={{ background: "var(--accent)", color: "#111", border: "none", borderRadius: 8, padding: "10px 20px", fontWeight: 600, fontSize: 14, cursor: "pointer" }}>
          Search
        </button>
      )}
    </form>
  );
}
