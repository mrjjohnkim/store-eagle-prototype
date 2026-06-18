import React, { useState } from "react";
import Icon from "../components/ui/Icon";
import VideoClipModal from "../components/modals/VideoClipModal";
import { Alert, VideoClipContext } from "../types";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

const alerts: Alert[] = [
  { time: "2:14 PM", zone: "Zone 3 — Accessories", severity: "high", message: "Conversion dropped 22% · 2–3PM", detail: "8 customers dwelled 2+ min, no associate contact" },
  { time: "1:48 PM", zone: "Checkout", severity: "medium", message: "3 void/override events in 15 min", detail: "2× baseline POS exception rate" },
  { time: "12:30 PM", zone: "Zone 1 — Apparel", severity: "low", message: "Associate coverage gap at noon peak", detail: "0 associates in zone during 12–1PM" },
];

interface Zone {
  name: string;
  dwell: number;
  covered: boolean;
  traffic: number;
  type: "normal" | "alert" | "exception" | "gap";
}

const zones: Zone[] = [
  { name: "Entrance",    dwell: 0.8, covered: true,  traffic: 92, type: "normal" },
  { name: "Apparel",     dwell: 3.2, covered: true,  traffic: 74, type: "normal" },
  { name: "Footwear",    dwell: 2.1, covered: false, traffic: 48, type: "gap" },
  { name: "Accessories", dwell: 4.8, covered: false, traffic: 61, type: "alert" },
  { name: "Checkout",    dwell: 1.4, covered: true,  traffic: 55, type: "exception" },
  { name: "Back Wall",   dwell: 0.4, covered: false, traffic: 22, type: "gap" },
];

const zoneBg: Record<string, string> = { normal: "rgba(59,130,246,0.12)", alert: "#fef2f2", exception: "#fffbeb", gap: "rgba(59,130,246,0.06)" };
const zoneBorder: Record<string, string> = { normal: "#93c5fd", alert: "#fca5a5", exception: "#fcd34d", gap: "#e2e8f0" };

const AIStoreInsightsPage: React.FC = () => {
  const [showClip, setShowClip] = useState(false);
  const [clipCtx, setClipCtx] = useState<VideoClipContext | null>(null);

  const openClip = (ctx: Alert) => {
    setClipCtx({ zone: ctx.zone, time: ctx.time, message: ctx.message, detail: ctx.detail || "" });
    setShowClip(true);
  };

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>AI Store Insights</h2>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Traffic + customer journey + video — unified operational view</p>
        </div>
        <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
          <Badge variant="destructive">● 2 Active Alerts</Badge>
          <Select defaultValue="Fashion Ave">
            <SelectTrigger className="w-[140px]"><SelectValue /></SelectTrigger>
            <SelectContent>
              {["Fashion Ave","Market Street","Harbor Walk"].map((s) => <SelectItem key={s} value={s}>{s}</SelectItem>)}
            </SelectContent>
          </Select>
          <Button variant="outline" size="sm">Today</Button>
        </div>
      </div>

      {/* Alert banner */}
      <div style={{ marginBottom: 16, padding: "12px 16px", background: "#fef2f2", border: "1px solid #fecaca", borderRadius: 8, display: "flex", alignItems: "center", gap: 12 }}>
        <Icon name="bell" size={16} color="#dc2626" />
        <div style={{ flex: 1, fontSize: 13, color: "#991b1b" }}>
          <strong>Conversion dropped 22%</strong> — Zone 3 (Accessories) 2–3PM · 8 customers dwelled without associate contact
        </div>
        <Button size="sm" style={{ background: "#dc2626" }} onClick={() => openClip(alerts[0])}>Pull Clip →</Button>
      </div>

      {/* 3-panel grid */}
      <div style={{ display: "grid", gridTemplateColumns: "268px 1fr 268px", gap: 14, marginBottom: 14 }}>

        {/* LEFT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          {[
            { label: "Live Traffic", value: "124", delta: "+8.2% vs pace", up: true },
            { label: "Conversion Rate", value: "26.4%", delta: "−3.1% vs pace", up: false },
          ].map((m) => (
            <div key={m.label} className="metric-card" style={{ padding: 14 }}>
              <div className="metric-label">{m.label}</div>
              <div className="metric-value" style={{ fontSize: 24 }}>{m.value}</div>
              <div className={m.up ? "metric-delta-green" : "metric-delta-red"}>{m.up ? "▲" : "▼"} {m.delta}</div>
            </div>
          ))}
          <div className="card" style={{ border: "1px solid #fecaca", background: "#fef9f9", padding: 14 }}>
            <div style={{ fontSize: 11, color: "#7f1d1d", fontWeight: 700, marginBottom: 4 }}>⚠ Revenue Leakage Risk</div>
            <div style={{ fontSize: 26, fontWeight: 700, color: "#dc2626" }}>$1,240</div>
            <div style={{ fontSize: 11, color: "#991b1b" }}>Today — high dwell / no purchase</div>
            <div style={{ fontSize: 11, color: "#64748b", marginTop: 4 }}>Zone 3 Accessories: 8 customers</div>
            <Button variant="outline" size="sm" className="mt-2 w-full text-xs" onClick={() => openClip(alerts[0])}>View zone footage →</Button>
          </div>
          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>Associate Zone Compliance</div>
            {zones.slice(0, 5).map((z) => (
              <div key={z.name} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 5 }}>
                <div style={{ width: 8, height: 8, borderRadius: "50%", background: z.covered ? "#22c55e" : "#f43f5e", flexShrink: 0 }} />
                <div style={{ flex: 1, fontSize: 11, color: "#374151" }}>{z.name}</div>
                <span style={{ fontSize: 10, fontWeight: 600, color: z.covered ? "#16a34a" : "#dc2626" }}>{z.covered ? "Covered" : "Gap"}</span>
              </div>
            ))}
            <div style={{ marginTop: 6, fontSize: 11, color: "#64748b", borderTop: "1px solid #f1f5f9", paddingTop: 6 }}>2 of 5 zones with coverage gaps</div>
          </div>
        </div>

        {/* CENTER — zone map */}
        <div className="card">
          <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 2 }}>Store Zone Map — Live Dwell Intensity</div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 14 }}>Avg dwell in minutes · click alert zone to pull clip</div>
          <div style={{ background: "#f8fafc", borderRadius: 8, padding: 14, border: "1px solid #e2e8f0" }}>
            <div style={{ textAlign: "center", marginBottom: 10 }}>
              <div style={{ display: "inline-block", padding: "7px 20px", background: "#e0f2fe", border: "1px solid #7dd3fc", borderRadius: 6, fontSize: 12, color: "#0369a1", fontWeight: 600 }}>
                🚪 Entrance — 0.8 min
              </div>
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 8, marginBottom: 8 }}>
              {zones.slice(1, 4).map((z) => (
                <div key={z.name}
                  onClick={z.type === "alert" ? () => openClip(alerts[0]) : undefined}
                  style={{ padding: "10px 8px", background: zoneBg[z.type], border: `2px solid ${zoneBorder[z.type]}`, borderRadius: 6, textAlign: "center", cursor: z.type === "alert" ? "pointer" : "default" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>{z.name}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: z.type === "alert" ? "#dc2626" : "#1d4ed8" }}>{z.dwell} min</div>
                  <div style={{ fontSize: 9, fontWeight: 600, color: z.covered ? "#16a34a" : "#dc2626" }}>{z.covered ? "● Covered" : "● No coverage"}</div>
                  {z.type === "alert" && <div style={{ fontSize: 9, color: "#dc2626", marginTop: 2 }}>⚠ Tap to pull clip</div>}
                </div>
              ))}
            </div>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
              {zones.slice(4).map((z) => (
                <div key={z.name} style={{ padding: "10px 8px", background: zoneBg[z.type], border: `2px solid ${zoneBorder[z.type]}`, borderRadius: 6, textAlign: "center" }}>
                  <div style={{ fontSize: 10, fontWeight: 700, color: "#0f172a", marginBottom: 2 }}>{z.name}</div>
                  <div style={{ fontSize: 18, fontWeight: 700, color: z.type === "exception" ? "#d97706" : "#1d4ed8" }}>{z.dwell} min</div>
                  <div style={{ fontSize: 9, fontWeight: 600, color: z.type === "exception" ? "#d97706" : z.covered ? "#16a34a" : "#94a3b8" }}>
                    {z.type === "exception" ? "⚠ POS exceptions" : z.covered ? "● Covered" : "● No coverage"}
                  </div>
                </div>
              ))}
            </div>
            <div style={{ marginTop: 10, display: "flex", gap: 16, fontSize: 10, color: "#64748b" }}>
              <span><span style={{ color: "#1d4ed8" }}>■</span> High dwell</span>
              <span><span style={{ color: "#dc2626" }}>■</span> Alert zone</span>
              <span><span style={{ color: "#d97706" }}>■</span> POS exception</span>
            </div>
          </div>
        </div>

        {/* RIGHT */}
        <div style={{ display: "flex", flexDirection: "column", gap: 10 }}>
          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>Live Alert Feed</div>
            {alerts.map((a, i) => (
              <div key={i} onClick={() => openClip(a)}
                style={{ marginBottom: 8, padding: "9px 10px", background: a.severity === "high" ? "#fef2f2" : a.severity === "medium" ? "#fffbeb" : "#f8fafc", borderRadius: 6, border: `1px solid ${a.severity === "high" ? "#fecaca" : a.severity === "medium" ? "#fde68a" : "#e2e8f0"}`, cursor: "pointer" }}>
                <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 2 }}>
                  <span style={{ fontSize: 10, fontWeight: 700, color: a.severity === "high" ? "#dc2626" : a.severity === "medium" ? "#d97706" : "#64748b" }}>
                    {a.severity === "high" ? "🔴" : a.severity === "medium" ? "🟡" : "🔵"} {a.time}
                  </span>
                  <span style={{ fontSize: 9, color: "#94a3b8" }}>Pull clip →</span>
                </div>
                <div style={{ fontSize: 11, fontWeight: 600, color: "#0f172a" }}>{a.message}</div>
                <div style={{ fontSize: 10, color: "#64748b", marginTop: 1 }}>{a.zone}</div>
              </div>
            ))}
          </div>
          <div className="card" style={{ padding: 14 }}>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 6 }}>Checkout Anomalies</div>
            <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8 }}>POS exceptions vs. checkout traffic</div>
            {[
              { time: "1:30–2:00 PM", exc: 3, traffic: 28, flag: true },
              { time: "12:00–12:30 PM", exc: 1, traffic: 34, flag: false },
              { time: "11:30 AM–12 PM", exc: 0, traffic: 21, flag: false },
            ].map((row, i) => (
              <div key={i} style={{ display: "flex", alignItems: "center", gap: 6, marginBottom: 6 }}>
                <div style={{ fontSize: 10, color: "#64748b", width: 88, flexShrink: 0 }}>{row.time}</div>
                <div style={{ flex: 1, height: 14, background: "#f1f5f9", borderRadius: 3, overflow: "hidden" }}>
                  <div style={{ width: `${(row.traffic / 40) * 100}%`, height: "100%", background: "#3b82f6", borderRadius: 3 }} />
                </div>
                <span style={{ fontSize: 10, fontWeight: 700, color: row.flag ? "#dc2626" : "#94a3b8", width: 34, textAlign: "right" }}>
                  {row.exc > 0 ? `${row.exc} exc` : "—"}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Cross-product story */}
      <div className="card" style={{ background: "#f0f9ff", border: "1px solid #bae6fd", padding: 16 }}>
        <div style={{ fontSize: 13, fontWeight: 700, color: "#0369a1", marginBottom: 10 }}>💡 The Store Ops Closure Loop</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
          {[
            { n: "1", label: "Traffic predicts busy 3–5PM Saturday", icon: "traffic", color: "#3b82f6" },
            { n: "2", label: "Workforce planning schedules extra associates", icon: "user", color: "#8b5cf6" },
            { n: "3", label: "Zone compliance confirms staff was on floor", icon: "check", color: "#16a34a" },
          ].map((s) => (
            <div key={s.n} style={{ display: "flex", gap: 10, alignItems: "flex-start" }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: s.color, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                <Icon name={s.icon} size={14} color="white" />
              </div>
              <div style={{ fontSize: 12, color: "#0f172a", lineHeight: 1.5 }}>{s.label}</div>
            </div>
          ))}
        </div>
      </div>

      {showClip && clipCtx && <VideoClipModal context={clipCtx} onClose={() => setShowClip(false)} />}
    </div>
  );
};

export default AIStoreInsightsPage;
