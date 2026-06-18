import React from "react";
import Icon from "../ui/Icon";
import { Alert } from "../../types";

interface AlertsDrawerProps {
  onClose: () => void;
}

const alerts: Alert[] = [
  { time: "2:14 PM", zone: "Zone 3 — Accessories", severity: "high", message: "Conversion dropped 22% · 2–3PM", store: "Fashion Ave" },
  { time: "1:48 PM", zone: "Checkout", severity: "medium", message: "3 void/override events in 15 min", store: "Fashion Ave" },
  { time: "12:30 PM", zone: "Zone 1 — Apparel", severity: "low", message: "Associate coverage gap 12–1PM", store: "Market Street" },
  { time: "9:02 AM", zone: "Sensor S-004", severity: "medium", message: "Sensor offline — connectivity issue", store: "Harbor Walk" },
];

const AlertsDrawer: React.FC<AlertsDrawerProps> = ({ onClose }) => (
  <div style={{ position: "fixed", inset: 0, zIndex: 999 }} onClick={onClose}>
    <div
      style={{ position: "absolute", top: 0, right: 0, bottom: 0, width: 360, background: "white", boxShadow: "-4px 0 24px rgba(0,0,0,0.12)", display: "flex", flexDirection: "column" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ padding: "16px 20px", borderBottom: "1px solid #e2e8f0", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
        <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>
          Alerts{" "}
          <span style={{ marginLeft: 6, padding: "2px 8px", background: "#fee2e2", color: "#dc2626", borderRadius: 9999, fontSize: 12, fontWeight: 700 }}>2</span>
        </div>
        <button className="btn btn-ghost" style={{ padding: 4 }} onClick={onClose}><Icon name="x" size={16} /></button>
      </div>
      <div style={{ flex: 1, overflow: "auto", padding: 16, display: "flex", flexDirection: "column", gap: 10 }}>
        {alerts.map((a, i) => (
          <div
            key={i}
            style={{
              padding: "12px 14px",
              background: a.severity === "high" ? "#fef2f2" : a.severity === "medium" ? "#fffbeb" : "#f8fafc",
              borderRadius: 8,
              border: `1px solid ${a.severity === "high" ? "#fecaca" : a.severity === "medium" ? "#fde68a" : "#e2e8f0"}`,
            }}
          >
            <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 4 }}>
              <span style={{ fontSize: 11, fontWeight: 700, color: a.severity === "high" ? "#dc2626" : a.severity === "medium" ? "#d97706" : "#64748b" }}>
                {a.severity === "high" ? "🔴" : a.severity === "medium" ? "🟡" : "🔵"} {a.time}
              </span>
              <span style={{ fontSize: 11, color: "#94a3b8" }}>{a.store}</span>
            </div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a", marginBottom: 2 }}>{a.message}</div>
            <div style={{ fontSize: 11, color: "#64748b" }}>{a.zone}</div>
          </div>
        ))}
      </div>
      <div style={{ padding: "12px 20px", borderTop: "1px solid #e2e8f0" }}>
        <button className="btn btn-outline" style={{ width: "100%", fontSize: 13 }}>View all in AI Store Insights →</button>
      </div>
    </div>
  </div>
);

export default AlertsDrawer;
