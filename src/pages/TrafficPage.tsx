import React, { useState } from "react";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

type HoveredBar = { chart: string; i: number; isCurrent: boolean } | null;

const TrafficPage: React.FC = () => {
  const [compare, setCompare] = useState("Last Year");
  const [site, setSite] = useState("Fashion Ave");
  const [hourPeriod, setHourPeriod] = useState("Last Year");
  const [monthPeriod, setMonthPeriod] = useState("Last Year");
  const [hoveredBar, setHoveredBar] = useState<HoveredBar>(null);
  const [hoveredPoint, setHoveredPoint] = useState<number | null>(null);

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const thisWeek = [1240, 1180, 1350, 1420, 1680, 2210, 1890];
  const lastWeek = [1100, 1050, 1280, 1360, 1600, 2100, 1750];
  const lastYearW = [1280, 1210, 1390, 1450, 1720, 2280, 1940];
  const dayCompare = compare === "Last Week" ? lastWeek : lastYearW;

  const locations = [
    { name: "Fashion Ave", current: [1240, 1180, 1350, 1420, 1680, 2210, 1890], ly: [1280, 1210, 1390, 1450, 1720, 2280, 1940] },
    { name: "Market Street", current: [890, 840, 920, 980, 1120, 1560, 1320], ly: [1050, 990, 1080, 1150, 1310, 1820, 1550] },
    { name: "Harbor Walk", current: [640, 610, 680, 720, 850, 1180, 980], ly: [620, 590, 660, 700, 820, 1140, 950] },
  ];

  const hours = ["9AM", "10AM", "11AM", "12PM", "1PM", "2PM", "3PM", "4PM", "5PM", "6PM", "7PM", "8PM"];
  const hourToday = [180, 340, 420, 510, 610, 680, 720, 690, 610, 520, 430, 310];
  const hourLastWeek = hourToday.map((v) => Math.round(v * 0.92));
  const hourLastYear = [160, 300, 380, 460, 560, 630, 670, 640, 560, 480, 400, 290];
  const hourLastLastYear = hourLastYear.map((v) => Math.round(v * 0.95));
  const hourCompare = hourPeriod === "Last Week" ? hourLastWeek : hourPeriod === "Last Last Year" ? hourLastLastYear : hourLastYear;

  const months = ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"];
  const monthThisYear = [9.8, 9.2, 10.4, 10.9, 11.6, 12.8, 13.4, 13.0, 12.1, 11.8, 12.6, 14.2];
  const monthLastYear = [9.1, 8.7, 9.6, 10.1, 10.8, 11.9, 12.6, 12.2, 11.3, 11.0, 11.8, 13.3];
  const monthLastLastYear = [8.6, 8.2, 9.0, 9.5, 10.1, 11.1, 11.7, 11.4, 10.6, 10.3, 11.0, 12.4];
  const monthCompare = monthPeriod === "Last Last Year" ? monthLastLastYear : monthLastYear;

  const ComparisonBarChart: React.FC<{
    chartId: string; labels: string[]; current: number[]; compareData: number[]; format: (v: number) => string; height?: number;
  }> = ({ chartId, labels, current, compareData, format, height = 76 }) => {
    const maxV = Math.max(...current, ...compareData);
    return (
      <div style={{ display: "flex", gap: 8, alignItems: "flex-end" }}>
        {labels.map((l, i) => {
          const delta = current[i] - compareData[i];
          const pct = Math.round((delta / compareData[i]) * 100);
          const up = delta >= 0;
          return (
            <div key={l} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
              <div style={{ fontSize: 9, fontWeight: 700, color: up ? "#16a34a" : "#dc2626", background: up ? "#dcfce7" : "#fee2e2", padding: "1px 4px", borderRadius: 3, whiteSpace: "nowrap", marginBottom: 2 }}>
                {up ? "+" : ""}{pct}%
              </div>
              <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", height }}>
                <div
                  style={{ flex: 1, background: "#3b82f6", borderRadius: "3px 3px 0 0", height: `${(current[i] / maxV) * 100}%`, position: "relative", cursor: "default" }}
                  onMouseEnter={() => setHoveredBar({ chart: chartId, i, isCurrent: true })}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {hoveredBar?.chart === chartId && hoveredBar.i === i && hoveredBar.isCurrent && (
                    <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", zIndex: 10 }}>
                      {format(current[i])}
                    </div>
                  )}
                </div>
                <div
                  style={{ flex: 1, background: "#e2e8f0", borderRadius: "3px 3px 0 0", height: `${(compareData[i] / maxV) * 100}%`, position: "relative", cursor: "default" }}
                  onMouseEnter={() => setHoveredBar({ chart: chartId, i, isCurrent: false })}
                  onMouseLeave={() => setHoveredBar(null)}
                >
                  {hoveredBar?.chart === chartId && hoveredBar.i === i && !hoveredBar.isCurrent && (
                    <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", zIndex: 10 }}>
                      {format(compareData[i])}
                    </div>
                  )}
                </div>
              </div>
              <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 2 }}>{l}</div>
            </div>
          );
        })}
      </div>
    );
  };

  const LineChart: React.FC<{ labels: string[]; today: number[]; compareData: number[]; format: (v: number) => string }> = ({ labels, today, compareData, format }) => {
    const W = 600, H = 140, pad = 12;
    const all = [...today, ...compareData];
    const min = Math.min(...all), max = Math.max(...all);
    const n = labels.length;
    const x = (i: number) => pad + (i / (n - 1)) * (W - pad * 2);
    const y = (v: number) => H - pad - ((v - min) / (max - min || 1)) * (H - pad * 2);
    const pts = (arr: number[]) => arr.map((v, i) => `${x(i)},${y(v)}`).join(" ");
    return (
      <div>
        <div style={{ position: "relative" }}>
          <svg width="100%" height={H} viewBox={`0 0 ${W} ${H}`} preserveAspectRatio="none" style={{ display: "block", overflow: "visible" }}>
            <polyline points={pts(compareData)} fill="none" stroke="#cbd5e1" strokeWidth="2" strokeDasharray="4,4" />
            <polyline points={pts(today)} fill="none" stroke="#3b82f6" strokeWidth="2.5" />
            {compareData.map((v, i) => <circle key={`c${i}`} cx={x(i)} cy={y(v)} r="3" fill="#cbd5e1" />)}
            {today.map((v, i) => <circle key={`t${i}`} cx={x(i)} cy={y(v)} r="3.5" fill="#3b82f6" />)}
          </svg>
          <div style={{ position: "absolute", inset: 0, display: "flex" }}>
            {labels.map((_, i) => (
              <div
                key={i}
                style={{ flex: 1, position: "relative" }}
                onMouseEnter={() => setHoveredPoint(i)}
                onMouseLeave={() => setHoveredPoint(null)}
              >
                {hoveredPoint === i && (
                  <div style={{ position: "absolute", top: `${(y(today[i]) / H) * 100}%`, left: "50%", transform: "translate(-50%, -135%)", background: "#0f172a", color: "white", padding: "3px 7px", borderRadius: 4, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", zIndex: 10 }}>
                    {format(today[i])} · {format(compareData[i])} comp.
                  </div>
                )}
              </div>
            ))}
          </div>
        </div>
        <div style={{ display: "flex", marginTop: 6 }}>
          {labels.map((l) => <div key={l} style={{ flex: 1, textAlign: "center", fontSize: 10, color: "#94a3b8" }}>{l}</div>)}
        </div>
      </div>
    );
  };

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

      <div style={{ display: "grid", gridTemplateColumns: "repeat(5,1fr)", gap: 12, marginBottom: 20 }}>
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
        <div className="metric-card">
          <div className="metric-label">Occupancy Count</div>
          <div className="metric-value" style={{ fontSize: 24 }}>5</div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>8 (inc. employees)</div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
        <div className="card">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#0f172a" }}>Traffic by Location</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            {locations.map((loc) => {
              const total = loc.current.reduce((a, b) => a + b, 0);
              const totalLY = loc.ly.reduce((a, b) => a + b, 0);
              const maxTotal = Math.max(...locations.map((l) => Math.max(l.current.reduce((a, b) => a + b, 0), l.ly.reduce((a, b) => a + b, 0))));
              const delta = total - totalLY;
              const pct = Math.round((delta / totalLY) * 100);
              const up = delta >= 0;
              return (
                <div key={loc.name} style={{ display: "flex", alignItems: "center", gap: 12 }}>
                  <div style={{ width: 110, fontSize: 13, fontWeight: 600, color: "#0f172a", flexShrink: 0 }}>{loc.name}</div>
                  <div style={{ flex: 1, height: 22, background: "#f1f5f9", borderRadius: 4, overflow: "hidden" }}>
                    <div style={{ width: `${(total / maxTotal) * 100}%`, height: "100%", background: up ? "#3b82f6" : "#f43f5e", borderRadius: 4, display: "flex", alignItems: "center", paddingLeft: 8 }}>
                      <span style={{ fontSize: 11, color: "white", fontWeight: 600 }}>{total.toLocaleString()}</span>
                    </div>
                  </div>
                  <span style={{ fontSize: 11, fontWeight: 700, color: up ? "#16a34a" : "#dc2626", whiteSpace: "nowrap", width: 44, textAlign: "right", flexShrink: 0 }}>
                    {up ? "+" : ""}{pct}%
                  </span>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 16, marginTop: 14, fontSize: 12 }}>
            <span><span style={{ color: "#3b82f6" }}>■</span> Above LY</span>
            <span><span style={{ color: "#f43f5e" }}>■</span> Below LY</span>
          </div>
        </div>

        <div className="card">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#0f172a" }}>Traffic by Day — This Week</div>
          <ComparisonBarChart chartId="day" labels={days} current={thisWeek} compareData={dayCompare} format={(v) => v.toLocaleString()} />
          <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12 }}>
            <span><span style={{ color: "#3b82f6" }}>■</span> This Week</span>
            <span><span style={{ color: "#cbd5e1" }}>■</span> {compare}</span>
          </div>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>Traffic by Hour — Today vs.</div>
            <Select value={hourPeriod} onValueChange={(v) => v && setHourPeriod(v)}>
              <SelectTrigger className="w-[140px]" size="sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Last Week", "Last Year", "Last Last Year"].map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <LineChart labels={hours} today={hourToday} compareData={hourCompare} format={(v) => v.toLocaleString()} />
          <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12 }}>
            <span><span style={{ color: "#3b82f6" }}>━</span> Today</span>
            <span><span style={{ color: "#cbd5e1" }}>┄</span> {hourPeriod}</span>
          </div>
        </div>

        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, gap: 8 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>Traffic by Month — This Year vs.</div>
            <Select value={monthPeriod} onValueChange={(v) => v && setMonthPeriod(v)}>
              <SelectTrigger className="w-[140px]" size="sm"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["Last Year", "Last Last Year"].map((p) => (
                  <SelectItem key={p} value={p}>{p}</SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <ComparisonBarChart chartId="month" labels={months} current={monthThisYear} compareData={monthCompare} format={(v) => `${v.toFixed(1)}k`} height={70} />
          <div style={{ display: "flex", gap: 16, marginTop: 10, fontSize: 12 }}>
            <span><span style={{ color: "#3b82f6" }}>■</span> This Year</span>
            <span><span style={{ color: "#cbd5e1" }}>■</span> {monthPeriod}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TrafficPage;
