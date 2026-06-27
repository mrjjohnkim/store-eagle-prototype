import React, { useState } from "react";
import { Tooltip } from "../components/ui/Charts";
import { PageId } from "../types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface OperationsPageProps {
  navigate: (p: PageId) => void;
}

type HoveredBar = { metric: string; day: number; isCurrent: boolean } | null;

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];

const dayMetrics = [
  {
    key: "sales", title: "Sales by Day of Week", color: "#3b82f6",
    format: (v: number) => `$${(v / 1000).toFixed(1)}k`,
    current: [21000, 19800, 20500, 22300, 24800, 28900, 24200],
    lastWeek: [20100, 18950, 19800, 21500, 23900, 27800, 23100],
    lastYear: [19500, 18900, 19800, 21000, 23200, 27100, 22800],
  },
  {
    key: "conversion", title: "Conversion by Day of Week", color: "#22c55e",
    format: (v: number) => `${v.toFixed(1)}%`,
    current: [27.4, 26.8, 27.9, 28.5, 29.2, 31.0, 28.8],
    lastWeek: [26.8, 26.1, 27.2, 27.9, 28.6, 30.2, 28.0],
    lastYear: [25.9, 25.4, 26.5, 27.0, 27.8, 29.5, 27.2],
  },
  {
    key: "traffic", title: "Traffic by Day of Week", color: "#f59e0b",
    format: (v: number) => v.toLocaleString(),
    current: [1180, 1120, 1240, 1340, 1520, 1980, 1580],
    lastWeek: [1150, 1090, 1205, 1300, 1470, 1920, 1530],
    lastYear: [1240, 1180, 1300, 1390, 1580, 2050, 1640],
  },
  {
    key: "atv", title: "ATV by Day of Week", color: "#6366f1",
    format: (v: number) => `$${v.toFixed(0)}`,
    current: [56.10, 58.40, 57.20, 60.80, 62.30, 65.90, 63.50],
    lastWeek: [55.30, 57.60, 56.40, 59.90, 61.50, 65.10, 62.70],
    lastYear: [54.20, 56.10, 55.40, 58.30, 59.80, 63.10, 60.90],
  },
  {
    key: "upt", title: "UPT by Day of Week", color: "#8b5cf6",
    format: (v: number) => v.toFixed(1),
    current: [2.1, 2.2, 2.1, 2.3, 2.4, 2.6, 2.5],
    lastWeek: [2.05, 2.15, 2.05, 2.25, 2.35, 2.55, 2.45],
    lastYear: [2.0, 2.1, 2.0, 2.2, 2.3, 2.4, 2.3],
  },
];

const comparePeriods = ["Last Week", "Last Year", "Last Last Year"] as const;

const getCompareData = (m: typeof dayMetrics[number], period: string) => {
  if (period === "Last Week") return m.lastWeek;
  if (period === "Last Last Year") return m.lastYear.map((v) => +(v * 0.96).toFixed(2));
  return m.lastYear;
};

const OperationsPage: React.FC<OperationsPageProps> = ({ navigate }) => {
  const [dateRange, setDateRange] = useState("This Week");
  const [site, setSite] = useState("Cedar Crossing");
  const [comparePeriod, setComparePeriod] = useState<string>("Last Year");
  const [hoveredBar, setHoveredBar] = useState<HoveredBar>(null);

  const metrics = [
    { label: "Sales", value: "$142,830", delta: "+3.2%", up: true },
    { label: "Traffic", value: "8,421", delta: "-1.4%", up: false },
    { label: "Conversion", value: "28.6%", delta: "+2.1%", up: true },
    { label: "Avg Transaction", value: "$59.24", delta: "+4.8%", up: true },
    { label: "Shopper Yield", value: "$16.96", delta: "+5.7%", up: true },
    { label: "UPT", value: "2.3", delta: "-0.2%", up: false },
  ];
  const stores = [
    { name: "Cedar Crossing", region: "Northeast", conv: 34.2, traffic: 2210 },
    { name: "Bayfront Promenade", region: "West", conv: 31.8, traffic: 1890 },
    { name: "Maple Grove Plaza", region: "South", conv: 27.4, traffic: 1640 },
    { name: "Union Heights", region: "Midwest", conv: 25.1, traffic: 1480 },
    { name: "Brookhaven Center", region: "Midwest", conv: 22.8, traffic: 1201 },
  ];

  const DayComparisonChart: React.FC<{
    metricKey: string; title: string; current: number[]; compare: number[]; format: (v: number) => string; color: string;
  }> = ({ metricKey, title, current, compare, format, color }) => {
    const max = Math.max(...current, ...compare);
    return (
      <div>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{title}</div>
        <div style={{ display: "flex", gap: 4, alignItems: "flex-end" }}>
          {days.map((d, i) => {
            const delta = current[i] - compare[i];
            const pct = Math.round((delta / compare[i]) * 100);
            const up = delta >= 0;
            return (
              <div key={d} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                <div style={{ fontSize: 8, fontWeight: 700, color: up ? "#16a34a" : "#dc2626", background: up ? "#dcfce7" : "#fee2e2", padding: "1px 3px", borderRadius: 3, whiteSpace: "nowrap" }}>
                  {up ? "+" : ""}{pct}%
                </div>
                <div style={{ width: "100%", display: "flex", gap: 1, alignItems: "flex-end", height: 50 }}>
                  <div
                    style={{ flex: 1, background: color, borderRadius: "2px 2px 0 0", height: `${(current[i] / max) * 100}%`, position: "relative", cursor: "default" }}
                    onMouseEnter={() => setHoveredBar({ metric: metricKey, day: i, isCurrent: true })}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {hoveredBar?.metric === metricKey && hoveredBar.day === i && hoveredBar.isCurrent && (
                      <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", padding: "2px 5px", borderRadius: 4, fontSize: 9, fontWeight: 700, whiteSpace: "nowrap", zIndex: 10 }}>
                        {format(current[i])}
                      </div>
                    )}
                  </div>
                  <div
                    style={{ flex: 1, background: "#e2e8f0", borderRadius: "2px 2px 0 0", height: `${(compare[i] / max) * 100}%`, position: "relative", cursor: "default" }}
                    onMouseEnter={() => setHoveredBar({ metric: metricKey, day: i, isCurrent: false })}
                    onMouseLeave={() => setHoveredBar(null)}
                  >
                    {hoveredBar?.metric === metricKey && hoveredBar.day === i && !hoveredBar.isCurrent && (
                      <div style={{ position: "absolute", top: -20, left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", padding: "2px 5px", borderRadius: 4, fontSize: 9, fontWeight: 700, whiteSpace: "nowrap", zIndex: 10 }}>
                        {format(compare[i])}
                      </div>
                    )}
                  </div>
                </div>
                <div style={{ fontSize: 9, color: "#94a3b8", marginTop: 2 }}>{d}</div>
              </div>
            );
          })}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>Operations Dashboard</h2>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Live store performance overview</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          {["Today", "Yesterday", "This Week", "This Month"].map((r) => (
            <button key={r} className={`btn ${dateRange === r ? "btn-primary" : "btn-outline"}`} style={{ padding: "6px 12px", fontSize: 13 }} onClick={() => setDateRange(r)}>{r}</button>
          ))}
          <Select value={site} onValueChange={(v) => v && setSite(v)}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Cedar Crossing", "Bayfront Promenade", "Maple Grove Plaza"].map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(6,1fr)", gap: 12, marginBottom: 20 }}>
        {metrics.map((m) => (
          <div key={m.label} className="metric-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div className="metric-label">{m.label}</div>
              <Tooltip text={`${m.label}: change vs. same period last year`}>
                <span style={{ fontSize: 11, color: "#94a3b8", cursor: "help" }}>?</span>
              </Tooltip>
            </div>
            <div className="metric-value" style={{ fontSize: 22 }}>{m.value}</div>
            <div className={m.up ? "metric-delta-green" : "metric-delta-red"}>{m.up ? "▲" : "▼"} {m.delta} vs LY</div>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 380px", gap: 16 }}>
        <div className="card">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#0f172a" }}>Conversion by Store — Top 5</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {stores.map((s, i) => (
              <div key={s.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                <div style={{ width: 24, fontSize: 13, color: "#94a3b8", fontWeight: 600 }}>#{i + 1}</div>
                <div style={{ width: 140, fontSize: 13, color: "#0f172a" }}>{s.name}</div>
                <div style={{ flex: 1, height: 20, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                  <div style={{ width: `${(s.conv / 40) * 100}%`, height: "100%", background: i < 3 ? "#3b82f6" : "#94a3b8", borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 6 }}>
                    <span style={{ fontSize: 11, color: "white", fontWeight: 600 }}>{s.conv}%</span>
                  </div>
                </div>
                <div style={{ width: 80, fontSize: 12, color: "#64748b", textAlign: "right" }}>{s.traffic.toLocaleString()} visitors</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>Store Performance — Day of Week vs.</div>
            <Select value={comparePeriod} onValueChange={(v) => v && setComparePeriod(v)}>
              <SelectTrigger className="w-[140px]" size="sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {comparePeriods.map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div style={{ display: "flex", flexDirection: "column", gap: 20 }}>
            {dayMetrics.map((m) => (
              <DayComparisonChart
                key={m.key}
                metricKey={m.key}
                title={m.title}
                current={m.current}
                compare={getCompareData(m, comparePeriod)}
                format={m.format}
                color={m.color}
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsPage;
