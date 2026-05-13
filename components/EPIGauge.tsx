"use client";
import { PieChart, Pie, Cell, ResponsiveContainer } from "recharts";

export function EPIGauge({ score }: { score: number }) {
  const data = [{ value: score }, { value: 100 - score }];
  const color = score >= 85 ? "#5ae65a" : score >= 70 ? "#e6a05a" : "#e65a5a";

  return (
    <div style={{ position: "relative", width: 80, height: 80 }}>
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie data={data} cx="50%" cy="50%" innerRadius={28} outerRadius={38} startAngle={90} endAngle={-270} dataKey="value" strokeWidth={0}>
            <Cell fill={color} />
            <Cell fill="rgba(255,255,255,0.05)" />
          </Pie>
        </PieChart>
      </ResponsiveContainer>
      <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "center", justifyContent: "center", flexDirection: "column" }}>
        <span style={{ fontSize: 18, fontWeight: 700, color }}>{score}</span>
        <span style={{ fontSize: 9, color: "var(--muted)", marginTop: -2 }}>EPI</span>
      </div>
    </div>
  );
}
