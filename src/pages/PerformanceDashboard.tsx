import React, { useState } from "react";
import { SparkLine } from "../components/ui/Charts";
import { Tooltip } from "../components/ui/Charts";

const PerformanceDashboard: React.FC = () => {
  const [store, setStore] = useState("Fashion Ave");
  const [week, setWeek] = useState("This Week");
  const [signals, setSignals] = useState({ weather: true, events: false, promo: false });
  const toggleSignal = (k: keyof typeof signals) => setSignals((s) => ({ ...s, [k]: !s[k] }));
  const signalLabels: Record<string, string> = { weather: "🌧 Weather", events: "📅 Local Events", promo: "🏷 Promotions" };
  const powerHours = [
    { hour: "9AM", traffic: 42, isPower: false }, { hour: "10AM", traffic: 68, isPower: false },
    { hour: "11AM", traffic: 85, isPower: false }, { hour: "12PM", traffic: 124, isPower: true },
    { hour: "1PM", traffic: 138, isPower: true }, { hour: "2PM", traffic: 131, isPower: true },
    { hour: "3PM", traffic: 112, isPower: false }, { hour: "4PM", traffic: 98, isPower: false },
    { hour: "5PM", traffic: 88, isPower: false }, { hour: "6PM", traffic: 72, isPower: false },
    { hour: "7PM", traffic: 54, isPower: false }, { hour: "8PM", traffic: 38, isPower: false },
  ];
  const maxT = Math.max(...powerHours.map((h) => h.traffic));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>Performance</h2>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Single-store weekly view vs last year</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select className="select" value={store} onChange={(e) => setStore(e.target.value)}>
            {["Fashion Ave","Market Street","Harbor Walk","Downtown Core","Lakeside Mall"].map((s) => <option key={s}>{s}</option>)}
          </select>
          <select className="select" value={week} onChange={(e) => setWeek(e.target.value)}>
            {["This Week","Last Week","Two Weeks Ago"].map((w) => <option key={w}>{w}</option>)}
          </select>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12, marginBottom: 20 }}>
        {[
          { label: "Sales", thisW: "$28,410", delta: "-4.2%", up: false, data: [4200,3800,4100,3600,4500,5800,6400], ly: [4800,4100,4500,4200,4700,6200,7000] },
          { label: "Conversion", thisW: "31.2%", delta: "+2.8%", up: true, data: [28,29,30,28,31,33,34], ly: [27,28,29,27,30,31,32] },
          { label: "Avg Transaction", thisW: "$62.40", delta: "+5.1%", up: true, data: [58,59,61,57,63,65,66], ly: [55,57,59,56,60,62,64] },
        ].map((m) => (
          <div key={m.label} className="metric-card">
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
              <div className="metric-label">{m.label}</div>
              <div className={m.up ? "metric-delta-green" : "metric-delta-red"}>{m.up ? "▲" : "▼"} {m.delta} vs LY</div>
            </div>
            <div className="metric-value" style={{ fontSize: 22, marginBottom: 8 }}>{m.thisW}</div>
            <SparkLine data={m.data} lastYear={m.ly} color={m.up ? "#3b82f6" : "#f43f5e"} />
            <div style={{ display: "flex", gap: 8, marginTop: 4, fontSize: 11, color: "#94a3b8" }}>
              <span style={{ color: m.up ? "#3b82f6" : "#f43f5e" }}>— This week</span>
              <span>— Last year</span>
            </div>
          </div>
        ))}
        <div className="metric-card" style={{ border: "1px solid #fecaca", background: "#fef9f9" }}>
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start" }}>
            <div className="metric-label">Revenue at Risk</div>
            <Tooltip text="Customers who dwelled 2+ min without associate contact and left without purchasing">
              <span style={{ fontSize: 11, color: "#94a3b8", cursor: "help" }}>?</span>
            </Tooltip>
          </div>
          <div className="metric-value" style={{ fontSize: 22, color: "#dc2626" }}>$840</div>
          <div className="metric-delta-red">▼ 14 uncontacted dwellers today</div>
        </div>
      </div>

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
          {powerHours.map((h) => (
            <div key={h.hour} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "100%", height: 80, display: "flex", flexDirection: "column", justifyContent: "flex-end" }}>
                <div style={{ width: "100%", height: `${(h.traffic / maxT) * 100}%`, background: h.isPower ? "#22c55e" : "#3b82f6", borderRadius: "3px 3px 0 0", opacity: h.isPower ? 1 : 0.6, position: "relative" }}>
                  {h.isPower && <div style={{ position: "absolute", top: -16, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "#16a34a", fontWeight: 700, whiteSpace: "nowrap" }}>★ Peak</div>}
                </div>
              </div>
              <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>{h.hour}</div>
            </div>
          ))}
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 10 }}>AI Recommendations</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
            {[
              { signal: "Response time averaging 3.4 min in Section B", action: "Move 1 associate from stockroom to floor before 2PM", confidence: "High", color: "#dc2626", bg: "#fef2f2", border: "#fecaca" },
              { signal: "12 customers dwelled 2+ min in accessories without contact", action: "Reposition associate near center fixture — peak dwell window open now", confidence: "High", color: "#d97706", bg: "#fffbeb", border: "#fde68a" },
              { signal: "Traffic historically +18% on Thursdays vs. Mon–Wed", action: "Schedule 1 extra floor associate Thu 12–3PM", confidence: "Medium", color: "#2563eb", bg: "#eff6ff", border: "#bfdbfe" },
            ].map((r, i) => (
              <div key={i} style={{ padding: "10px 14px", background: r.bg, border: `1px solid ${r.border}`, borderRadius: 8, display: "flex", gap: 12, alignItems: "flex-start" }}>
                <div style={{ width: 6, borderRadius: 3, alignSelf: "stretch", background: r.color, flexShrink: 0 }} />
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 11, color: "#64748b", marginBottom: 2 }}>Signal: {r.signal}</div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>→ {r.action}</div>
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, padding: "2px 8px", borderRadius: 9999, background: r.color, color: "white", flexShrink: 0 }}>{r.confidence}</span>
              </div>
            ))}
          </div>
        </div>

        <div style={{ marginTop: 16 }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>Coaching Moments</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
            {[
              { time: "Tue 2–3PM", event: "Response time spike — 3.4 min avg", metric: "vs. 1.8 min baseline" },
              { time: "Mon 12–1PM", event: "Associate coverage gap — Zone 3", metric: "8 uncontacted dwellers" },
            ].map((c, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 12px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
                <div style={{ fontSize: 11, color: "#64748b", width: 90, flexShrink: 0 }}>{c.time}</div>
                <div style={{ flex: 1 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{c.event}</div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>{c.metric}</div>
                </div>
                <button className="btn btn-outline" style={{ fontSize: 11, padding: "4px 10px", display: "flex", alignItems: "center", gap: 4 }}>
                  🎥 Pull clip
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default PerformanceDashboard;
