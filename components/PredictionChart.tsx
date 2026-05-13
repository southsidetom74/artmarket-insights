"use client";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from "recharts";

export default function PredictionChart({ historical, projected }: { historical: { month: string; price: number }[]; projected: { month: string; price: number }[] }) {
  const data = [
    ...historical.map(d => ({ month: d.month, price: d.price, projected: null as number | null })),
    ...projected.map(d => ({ month: d.month, price: null as number | null, projected: d.price })),
  ];

  return (
    <div style={{ width: "100%", height: 320 }}>
      <ResponsiveContainer width="100%" height="100%">
        <LineChart data={data} margin={{ top: 10, right: 20, left: 10, bottom: 0 }}>
          <CartesianGrid strokeDasharray="3 3" stroke="rgba(255,255,255,0.06)" />
          <XAxis dataKey="month" tick={{ fill: "#bdbdbd", fontSize: 10 }} tickLine={false} axisLine={{ stroke: "rgba(255,255,255,0.08)" }} interval={3} />
          <YAxis tick={{ fill: "#bdbdbd", fontSize: 10 }} tickLine={false} axisLine={{ stroke: "rgba(255,255,255,0.08)" }} tickFormatter={v => `$${(v/1000).toFixed(0)}k`} />
          <Tooltip
            contentStyle={{ background: "#1a1a1e", border: "1px solid rgba(255,255,255,0.1)", borderRadius: 8, fontSize: 12 }}
            labelStyle={{ color: "#bdbdbd" }}
            formatter={(value: unknown) => [`$${Number(value ?? 0).toLocaleString()}`, ""]}
          />
          <ReferenceLine x="Dec 2025" stroke="var(--accent)" strokeDasharray="4 4" label={{ value: "Now", fill: "var(--accent)", fontSize: 11, position: "top" }} />
          <Line type="monotone" dataKey="price" stroke="#e6a05a" strokeWidth={2} dot={false} name="Historical" connectNulls={false} />
          <Line type="monotone" dataKey="projected" stroke="#e6a05a" strokeWidth={2} strokeDasharray="6 3" dot={false} name="Projected" connectNulls={false} />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}
