import React, { useState } from "react";
import { Tooltip } from "../components/ui/Charts";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
const compareOptions = ["Last Year", "Peers", "Targets"] as const;
type CompareOption = typeof compareOptions[number];
const seriesByOption: Record<CompareOption, "ly" | "peers" | "targets"> = {
  "Last Year": "ly", "Peers": "peers", "Targets": "targets",
};
const seriesColor: Record<"ly" | "peers" | "targets", string> = {
  ly: "#991b1b", peers: "#7dd3fc", targets: "#d97706",
};
const seriesLabel: Record<"ly" | "peers" | "targets", string> = {
  ly: "Last Year", peers: "Peers", targets: "Targets",
};

type HoveredCell = { metric: string; day: number; series: "actual" | "peers" | "ly" | "targets" } | null;

interface MetricChartConfig {
  key: string;
  label: string;
  barColor: string;
  data: number[];
  ly: number[];
  peers: number[];
  targets: number[];
  niceMax: number;
  tickStep: number;
  aggregate: "sum" | "avg";
  deltaUnit: "pct" | "pt";
  yFormat: (v: number) => string;
  pointFormat: (v: number) => string;
  totalFormat: (v: number) => string;
}

const sum = (arr: number[]) => arr.reduce((a, b) => a + b, 0);
const avg = (arr: number[]) => sum(arr) / arr.length;

const metricCharts: MetricChartConfig[] = [
  {
    key: "sales", label: "Sales", barColor: "#0ea5b7",
    data: [4200, 3800, 4100, 3600, 4500, 5800, 6400],
    ly: [4800, 4100, 4500, 4200, 4700, 6200, 7000],
    peers: [4500, 4000, 4350, 4000, 4600, 6000, 6700],
    targets: [4600, 4100, 4400, 4000, 4800, 6100, 6800],
    niceMax: 8000, tickStep: 2000, aggregate: "sum", deltaUnit: "pct",
    yFormat: (v) => v === 0 ? "$0" : `$${(v / 1000).toFixed(1)}k`,
    pointFormat: (v) => `$${Math.round(v).toLocaleString()}`,
    totalFormat: (v) => `$${Math.round(v).toLocaleString()}`,
  },
  {
    key: "conversion", label: "Conversion Rate", barColor: "#0ea5b7",
    data: [28, 29, 30, 28, 31, 33, 34],
    ly: [27, 28, 29, 27, 30, 31, 32],
    peers: [29, 30, 31, 29, 32, 34, 35],
    targets: [30, 31, 32, 30, 33, 35, 36],
    niceMax: 40, tickStep: 10, aggregate: "avg", deltaUnit: "pt",
    yFormat: (v) => `${v.toFixed(0)}%`,
    pointFormat: (v) => `${v.toFixed(0)}%`,
    totalFormat: (v) => `${v.toFixed(1)}%`,
  },
  {
    key: "atv", label: "Avg Transaction Value", barColor: "#0ea5b7",
    data: [58, 59, 61, 57, 63, 65, 66],
    ly: [55, 57, 59, 56, 60, 62, 64],
    peers: [60, 61, 63, 59, 65, 67, 68],
    targets: [62, 63, 65, 61, 67, 69, 70],
    niceMax: 80, tickStep: 20, aggregate: "avg", deltaUnit: "pct",
    yFormat: (v) => `$${v.toFixed(0)}`,
    pointFormat: (v) => `$${v.toFixed(0)}`,
    totalFormat: (v) => `$${v.toFixed(2)}`,
  },
];

const PerformanceDashboard: React.FC = () => {
  const [store, setStore] = useState("Cedar Crossing");
  const [week, setWeek] = useState("This Week");
  const [compareWith, setCompareWith] = useState<CompareOption[]>(["Last Year", "Peers"]);
  const [showCompareMenu, setShowCompareMenu] = useState(false);
  const [signals, setSignals] = useState({ weather: true, events: false, promo: false });
  const [hoveredBar, setHoveredBar] = useState<number | null>(null);
  const [hoveredCell, setHoveredCell] = useState<HoveredCell>(null);
  const toggleSignal = (k: keyof typeof signals) => setSignals((s) => ({ ...s, [k]: !s[k] }));
  const toggleCompare = (opt: CompareOption) => setCompareWith((prev) => prev.includes(opt) ? prev.filter((x) => x !== opt) : [...prev, opt]);
  const signalLabels: Record<string, string> = { weather: "🌧 Weather", events: "📅 Local Events", promo: "🏷 Promotions" };

  const activeSeries = compareWith.map((o) => seriesByOption[o]);

  const powerHours = [
    { hour: "9AM",  traffic: 42,  isPower: false },
    { hour: "10AM", traffic: 68,  isPower: false },
    { hour: "11AM", traffic: 85,  isPower: false },
    { hour: "12PM", traffic: 124, isPower: true  },
    { hour: "1PM",  traffic: 138, isPower: true  },
    { hour: "2PM",  traffic: 131, isPower: true  },
    { hour: "3PM",  traffic: 112, isPower: false },
    { hour: "4PM",  traffic: 98,  isPower: false },
    { hour: "5PM",  traffic: 88,  isPower: false },
    { hour: "6PM",  traffic: 72,  isPower: false },
    { hour: "7PM",  traffic: 54,  isPower: false },
    { hour: "8PM",  traffic: 38,  isPower: false },
  ];
  const maxT = Math.max(...powerHours.map((h) => h.traffic));

  const MetricBarChart: React.FC<{ cfg: MetricChartConfig }> = ({ cfg }) => {
    const aggFn = cfg.aggregate === "sum" ? sum : avg;
    const totalVal = aggFn(cfg.data);
    const valBySeries: Record<"ly" | "peers" | "targets", number> = {
      ly: aggFn(cfg.ly), peers: aggFn(cfg.peers), targets: aggFn(cfg.targets),
    };
    const arrBySeries: Record<"ly" | "peers" | "targets", number[]> = {
      ly: cfg.ly, peers: cfg.peers, targets: cfg.targets,
    };
    const fmtDelta = (d: number) => cfg.deltaUnit === "pt" ? `${Math.abs(d).toFixed(1)}pt` : `${Math.abs(Math.round(d))}%`;
    const ticks = [0, cfg.tickStep, cfg.tickStep * 2, cfg.tickStep * 3, cfg.niceMax];
    const chartHeight = 150;

    return (
      <div className="card" style={{ marginBottom: 16 }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16, flexWrap: "wrap", gap: 8 }}>
          <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>{cfg.label}</div>
          <div style={{ display: "flex", gap: 16, alignItems: "center", fontSize: 12 }}>
            {activeSeries.map((s) => {
              const d = cfg.deltaUnit === "pt" ? totalVal - valBySeries[s] : ((totalVal - valBySeries[s]) / valBySeries[s]) * 100;
              return (
                <span key={s} className={d >= 0 ? "metric-delta-green" : "metric-delta-red"}>
                  {d >= 0 ? "▲" : "▼"} {fmtDelta(d)} vs {seriesLabel[s]}
                </span>
              );
            })}
            <span style={{ fontWeight: 700, color: "#0f172a" }}>Total: {cfg.totalFormat(totalVal)}</span>
          </div>
        </div>

        <div style={{ display: "flex" }}>
          <div style={{ width: 50, display: "flex", flexDirection: "column", justifyContent: "space-between", height: chartHeight, fontSize: 10, color: "#94a3b8", textAlign: "right", paddingRight: 8, flexShrink: 0 }}>
            {[...ticks].reverse().map((t) => <div key={t}>{cfg.yFormat(t)}</div>)}
          </div>
          <div style={{ flex: 1, position: "relative", height: chartHeight }}>
            {ticks.map((t, ti) => (
              <div key={ti} style={{ position: "absolute", left: 0, right: 0, top: `${100 - (t / cfg.niceMax) * 100}%`, borderTop: ti === 0 ? "1px solid #cbd5e1" : "1px solid #f1f5f9" }} />
            ))}
            <div style={{ position: "absolute", inset: 0, display: "flex", alignItems: "flex-end" }}>
              {days.map((d, i) => (
                <div key={d} style={{ flex: 1, height: "100%", position: "relative" }}>
                  <div
                    style={{ position: "absolute", bottom: 0, left: "30%", right: "30%", height: `${(cfg.data[i] / cfg.niceMax) * 100}%`, background: cfg.barColor, borderRadius: "3px 3px 0 0", cursor: "default" }}
                    onMouseEnter={() => setHoveredCell({ metric: cfg.key, day: i, series: "actual" })}
                    onMouseLeave={() => setHoveredCell(null)}
                  >
                    {hoveredCell?.metric === cfg.key && hoveredCell.day === i && hoveredCell.series === "actual" && (
                      <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", zIndex: 10 }}>
                        {cfg.pointFormat(cfg.data[i])}
                      </div>
                    )}
                  </div>
                  {activeSeries.map((s) => (
                    <div
                      key={s}
                      style={{ position: "absolute", left: "12%", right: "12%", height: 3, background: seriesColor[s], bottom: `${(arrBySeries[s][i] / cfg.niceMax) * 100}%`, borderRadius: 2, cursor: "default" }}
                      onMouseEnter={() => setHoveredCell({ metric: cfg.key, day: i, series: s })}
                      onMouseLeave={() => setHoveredCell(null)}
                    >
                      {hoveredCell?.metric === cfg.key && hoveredCell.day === i && hoveredCell.series === s && (
                        <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", background: seriesColor[s], color: "white", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", zIndex: 10 }}>
                          {seriesLabel[s]}: {cfg.pointFormat(arrBySeries[s][i])}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              ))}
            </div>
          </div>
        </div>
        <div style={{ display: "flex", marginLeft: 58 }}>
          {days.map((d) => <div key={d} style={{ flex: 1, textAlign: "center", fontSize: 11, color: "#94a3b8" }}>{d}</div>)}
        </div>
        <div style={{ display: "flex", gap: 16, marginTop: 10, marginLeft: 58, fontSize: 11, color: "#64748b" }}>
          <span><span style={{ color: cfg.barColor }}>■</span> This Week</span>
          {activeSeries.map((s) => (
            <span key={s}><span style={{ color: seriesColor[s] }}>▬</span> {seriesLabel[s]}</span>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>Performance</h2>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Single-store weekly view vs last year</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <Select value={store} onValueChange={(v) => v && setStore(v)}>
            <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Cedar Crossing","Bayfront Promenade","Maple Grove Plaza","Union Heights","Brookhaven Center"].map((s) => (
                <SelectItem key={s} value={s}>{s}</SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 360px", gap: 16, alignItems: "start" }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 16, fontSize: 13, color: "#64748b" }}>
            <span>Compare</span>
            <Select value={week} onValueChange={(v) => v && setWeek(v)}>
              <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
              <SelectContent>
                {["This Week","Last Week","Two Weeks Ago"].map((w) => (
                  <SelectItem key={w} value={w}>{w}</SelectItem>
                ))}
              </SelectContent>
            </Select>
            <span>against</span>
            <div style={{ position: "relative" }}>
              <button className="btn btn-outline" style={{ fontSize: 13, minWidth: 180, justifyContent: "space-between" }} onClick={() => setShowCompareMenu((v) => !v)}>
                {compareWith.length ? compareWith.join(", ") : "Select..."}
                <span style={{ marginLeft: 8 }}>▾</span>
              </button>
              {showCompareMenu && (
                <>
                  <div style={{ position: "fixed", inset: 0, zIndex: 90 }} onClick={() => setShowCompareMenu(false)} />
                  <div className="dropdown-menu" style={{ position: "absolute", top: "100%", left: 0, marginTop: 4, zIndex: 100 }}>
                    {compareOptions.map((opt) => (
                      <label key={opt} className="dropdown-item" style={{ display: "flex", alignItems: "center", gap: 8 }}>
                        <input type="checkbox" className="checkbox" checked={compareWith.includes(opt)} onChange={() => toggleCompare(opt)} />
                        <span style={{ width: 14, height: 3, borderRadius: 2, background: seriesColor[seriesByOption[opt]], flexShrink: 0 }} />
                        {opt}
                      </label>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>

          {metricCharts.map((cfg) => <MetricBarChart key={cfg.key} cfg={cfg} />)}

          <div className="card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>Power Hours — Today</div>
                <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Green = predicted peak. Staff accordingly.</div>
              </div>
              <div style={{ display: "flex", gap: 8, alignItems: "center", flexWrap: "wrap" }}>
                {Object.entries(signalLabels).map(([k, label]) => (
                  <button key={k} onClick={() => toggleSignal(k as keyof typeof signals)}
                    style={{ padding: "4px 10px", fontSize: 11, fontWeight: 600, borderRadius: 9999, border: `1px solid ${signals[k as keyof typeof signals] ? "#3b82f6" : "#e2e8f0"}`, background: signals[k as keyof typeof signals] ? "#eff6ff" : "white", color: signals[k as keyof typeof signals] ? "#1d4ed8" : "#64748b", cursor: "pointer" }}>
                    {label}
                  </button>
                ))}
                <Tooltip text={`Baseline: 340 · ${signals.weather ? "+15% Saturday · −8% rain · " : ""}${signals.events ? "+5% local event · " : ""}${signals.promo ? "+22% sale event · " : " "}= ${signals.weather && signals.promo ? "412" : signals.weather ? "380" : "340"} predicted`}>
                  <span style={{ fontSize: 13, color: "#64748b", cursor: "help" }}>
                    Predicted: <strong style={{ color: "#0f172a" }}>{signals.weather && signals.promo ? "1,412" : signals.weather ? "1,380" : "1,248"} visitors</strong> ⓘ
                  </span>
                </Tooltip>
              </div>
            </div>
            <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 100 }}>
              {powerHours.map((h, i) => (
                <div key={h.hour} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
                  <div style={{ width: "100%", height: 80, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                    <div
                      style={{ width: "100%", height: `${(h.traffic / maxT) * 100}%`, background: h.isPower ? "#22c55e" : "#3b82f6", borderRadius: "3px 3px 0 0", opacity: h.isPower ? 1 : 0.6, position: "relative", cursor: "default" }}
                      onMouseEnter={() => setHoveredBar(i)}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {h.isPower && hoveredBar !== i && <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "#16a34a", fontWeight: 700, whiteSpace: "nowrap" }}>★ Peak</div>}
                      {hoveredBar === i && (
                        <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", zIndex: 10 }}>
                          {h.traffic}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>{h.hour}</div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div>
          <div className="card" style={{ marginBottom: 16, border: "1px solid #fecaca", background: "#fef9f9", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
            <div>
              <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
                <div className="metric-label">Revenue at Risk</div>
                <Tooltip text="Customers who dwelled 2+ min without associate contact and left without purchasing">
                  <span style={{ fontSize: 11, color: "#94a3b8", cursor: "help" }}>?</span>
                </Tooltip>
              </div>
              <div className="metric-value" style={{ fontSize: 22, color: "#dc2626" }}>$840</div>
            </div>
            <div className="metric-delta-red">▼ 14 uncontacted dwellers today</div>
          </div>

          <div className="card" style={{ marginBottom: 16 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 10 }}>AI Recommendations</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {[
                { signal: "Response time averaging 3.4 min in Section B", action: "Move 1 associate from stockroom to floor before 2PM", confidence: "High",   color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
                { signal: "12 customers dwelled 2+ min in accessories without contact", action: "Reposition associate near center fixture — peak dwell window open now", confidence: "High",   color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
                { signal: "Traffic historically +18% on Thursdays vs. Mon–Wed",         action: "Schedule 1 extra floor associate Thu 12–3PM",                        confidence: "Medium", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
              ].map((r, i) => (
                <div key={i} style={{ padding: "10px 14px", background: r.bg, border: `1px solid ${r.border}`, borderRadius: 8, display: "flex", gap: 12, alignItems: "flex-start" }}>
                  <div style={{ width: 6, borderRadius: 3, alignSelf: "stretch", background: r.color, flexShrink: 0 }} />
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>Signal: {r.signal}</div>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>→ {r.action}</div>
                  </div>
                  <Badge style={{ background: r.color, color: "white", border: 0, fontSize: 10 }}>{r.confidence}</Badge>
                </div>
              ))}
            </div>
          </div>

          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 10 }}>Coaching Moments</div>
            <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
              {[
                { time: "Tue 2–3PM",  event: "Response time spike — 3.4 min avg",      metric: "vs. 1.8 min baseline" },
                { time: "Mon 12–1PM", event: "Associate coverage gap — Zone 3",          metric: "8 uncontacted dwellers" },
              ].map((c, i) => (
                <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                  <div style={{ fontSize: 11, color: "#64748b", width: 90, flexShrink: 0 }}>{c.time}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{c.event}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{c.metric}</div>
                  </div>
                  <Button variant="outline" size="sm" className="text-xs gap-1">🎥 Pull clip</Button>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
