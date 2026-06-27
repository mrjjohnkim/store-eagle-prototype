import React, { useState } from "react";
import { SparkLine } from "../components/ui/Charts";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const TrafficPage: React.FC = () => {
  const [compare, setCompare] = useState("Last Year");
  const [site, setSite] = useState("Fashion Ave");
  const [hoveredBar, setHoveredBar] = useState<{ day: number; isThis: boolean } | null>(null);
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const thisWeek = [1240, 1180, 1350, 1420, 1680, 2210, 1890];
  const lastWeek = [1100, 1050, 1280, 1360, 1600, 2100, 1750];
  const lastYearW = [1280, 1210, 1390, 1450, 1720, 2280, 1940];
  const ly = compare === "Last Week" ? lastWeek : lastYearW;
  const locations = [
    { name: "Fashion Ave", current: [1240,1180,1350,1420,1680,2210,1890], ly: [1280,1210,1390,1450,1720,2280,1940], status: "above" },
    { name: "Market Street", current: [890,840,920,980,1120,1560,1320], ly: [1050,990,1080,1150,1310,1820,1550], status: "below" },
    { name: "Harbor Walk", current: [640,610,680,720,850,1180,980], ly: [620,590,660,700,820,1140,950], status: "above" },
  ];

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>Traffic Dashboard</h2>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Live footfall data across your estate</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <span style={{ fontSize: 13, color: "#64748b", alignSelf: "center" }}>Compare to:</span>
          {["Last Week", "Last Year", "Last Last Year"].map((c) => (
            <button key={c} className={`btn ${compare === c ? "btn-primary" : "btn-outline"}`} style={{ padding: "6px 12px", fontSize: 13 }} onClick={() => setCompare(c)}>{c}</button>
          ))}
          <Select value={site} onValueChange={(v) => v && setSite(v)}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Fashion Ave", "Market Street", "Harbor Walk"].map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Traffic Today", value: "1,842", delta: "+2.1%", up: true },
          { label: "Traffic Yesterday", value: "8,421", delta: "-1.4%", up: false },
          { label: "Traffic This Week", value: "9,760", delta: "+3.2%", up: true },
          { label: "Capture Rate", value: "18.4%", delta: "+0.8%", up: true },
        ].map((m) => (
          <div key={m.label} className="metric-card">
            <div className="metric-label">{m.label}</div>
            <div className="metric-value" style={{ fontSize: 24 }}>{m.value}</div>
            <div className={m.up ? "metric-delta-green" : "metric-delta-red"}>{m.up ? "▲" : "▼"} {m.delta} vs LY</div>
          </div>
        ))}
      </div>

      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#0f172a" }}>Traffic by Day — This Week</div>
        <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
          {days.map((d, i) => {
            const maxV = Math.max(...thisWeek, ...ly);
            const delta = thisWeek[i] - ly[i];
            const pct = Math.round((delta / ly[i]) * 100);
            const up = delta >= 0;
            return (
              <div key={d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                {/* Delta badge */}
                <div style={{ fontSize: 9, fontWeight: 700, color: up ? "#16a34a" : "#dc2626", background: up ? "#dcfce7" : "#fee2e2", padding: "1px 4px", borderRadius: 3, whiteSpace: "nowrap", marginBottom: 2 }}>
                  {up ? "+" : ""}{pct}%
                </div>
                {/* Bars */}
                <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", height: 76 }}>
                  <div
                    style={{ flex: 1, background: "#3b82f6", borderRadius: "3px 3px 0 0", height: `${(thisWeek[i] / maxV) * 100}%`, position: "relative", cursor: "default" }}
                    onMouseEnter={() => setHoveredBar({ day: i, isThis: true })}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {hoveredBar?.day === i && hoveredBar.isThis && (
                      <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", zIndex: 10 }}>
                        {thisWeek[i].toLocaleString()}
                      </div>
                    )}
                  </div>
                  <div
                    style={{ flex: 1, background: "#e2e8f0", borderRadius: "3px 3px 0 0", height: `${(ly[i] / maxV) * 100}%`, position: "relative", cursor: "default" }}
                    onMouseEnter={() => setHoveredBar({ day: i, isThis: false })}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {hoveredBar?.day === i && !hoveredBar.isThis && (
                      <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", zIndex: 10 }}>
                        {ly[i].toLocaleString()}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{d}</div>
              </div>
            );
          })}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12 }}>
          <span><span style={{ color: "#3b82f6" }}>■</span> This Week</span>
          <span><span style={{ color: "#cbd5e1" }}>■</span> {compare}</span>
        </div>
      </div>

      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#0f172a" }}>Traffic by Location</div>
        <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
          {locations.map((loc) => (
            <div key={loc.name}>
              <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{loc.name}</span>
                <span className={`badge ${loc.status === "above" ? "badge-green" : "badge-red"}`}>
                  {loc.status === "above" ? "▲ Above LY" : "▼ Below LY"}
                </span>
              </div>
              <SparkLine data={loc.current} lastYear={loc.ly} color={loc.status === "above" ? "#3b82f6" : "#f43f5e"} />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default TrafficPage;
