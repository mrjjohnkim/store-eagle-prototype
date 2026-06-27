import React, { useState } from "react";
import { SparkLine } from "../components/ui/Charts";
import { Tooltip } from "../components/ui/Charts";
import { PageId } from "../types";

interface OperationsPageProps {
  navigate: (p: PageId) => void;
}

const OperationsPage: React.FC<OperationsPageProps> = ({ navigate }) => {
  const [dateRange, setDateRange] = useState("This Week");
  const metrics = [
    { label: "Sales", value: "$142,830", delta: "+3.2%", up: true },
    { label: "Traffic", value: "8,421", delta: "-1.4%", up: false },
    { label: "Conversion", value: "28.6%", delta: "+2.1%", up: true },
    { label: "Avg Transaction", value: "$59.24", delta: "+4.8%", up: true },
    { label: "Shopper Yield", value: "$16.96", delta: "+5.7%", up: true },
    { label: "UPT", value: "2.3", delta: "-0.2%", up: false },
  ];
  const stores = [
    { name: "Fashion Ave", region: "Northeast", conv: 34.2, traffic: 2210 },
    { name: "Market Street", region: "West", conv: 31.8, traffic: 1890 },
    { name: "Harbor Walk", region: "South", conv: 27.4, traffic: 1640 },
    { name: "Downtown Core", region: "Midwest", conv: 25.1, traffic: 1480 },
    { name: "Lakeside Mall", region: "Midwest", conv: 22.8, traffic: 1201 },
  ];
  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const atvByDay = [56.10, 58.40, 57.20, 60.80, 62.30, 65.90, 63.50];
  const uptByDay = [2.1, 2.2, 2.1, 2.3, 2.4, 2.6, 2.5];

  const DayBarChart: React.FC<{ title: string; data: number[]; format: (v: number) => string; color: string }> = ({ title, data, format, color }) => {
    const max = Math.max(...data);
    return (
      <div>
        <div style={{ fontSize: 12, color: "#64748b", marginBottom: 18 }}>{title}</div>
        <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 90 }}>
          {data.map((v, i) => (
            <div key={days[i]} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center" }}>
              <div style={{ width: "100%", display: "flex", flexDirection: "column", justifyContent: "flex-end", height: 70, position: "relative" }}>
                <div style={{ position: "absolute", top: -16, left: 0, right: 0, textAlign: "center", fontSize: 10, fontWeight: 700, color: "#0f172a" }}>
                  {format(v)}
                </div>
                <div style={{ width: "100%", height: `${(v / max) * 100}%`, background: color, borderRadius: "3px 3px 0 0", minHeight: 3 }} />
              </div>
              <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 4 }}>{days[i]}</div>
            </div>
          ))}
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
        <div style={{ display: "flex", gap: 8 }}>
          {["Today", "Yesterday", "This Week", "This Month"].map((r) => (
            <button key={r} className={`btn ${dateRange === r ? "btn-primary" : "btn-outline"}`} style={{ padding: "6px 12px", fontSize: 13 }} onClick={() => setDateRange(r)}>{r}</button>
          ))}
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

      <div style={{ display: "grid", gridTemplateColumns: "1fr 320px", gap: 16, marginBottom: 16 }}>
        <div className="card">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#0f172a" }}>Weekly Trend vs Last Year</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16 }}>
            {[
              { label: "Traffic", data: [7200,7800,8100,7600,8421,8200,8500], ly: [7100,7400,7900,7800,8550,8400,8600] },
              { label: "Conversion", data: [26,27,28,27.5,28.6,28,29], ly: [25,26,27,27,26.5,27,28] },
              { label: "Sales ($k)", data: [128,134,138,131,142,138,145], ly: [125,130,135,133,138,136,142] },
            ].map((s) => (
              <div key={s.label}>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{s.label}</div>
                <SparkLine data={s.data} lastYear={s.ly} />
                <div style={{ display: "flex", gap: 8, marginTop: 4, fontSize: 11 }}>
                  <span style={{ color: "#3b82f6" }}>— This period</span>
                  <span style={{ color: "#94a3b8" }}>- - Last year</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#0f172a" }}>Store Hierarchy</div>
          {["All Regions", "Northeast", "West", "South", "Midwest"].map((r) => (
            <div key={r} style={{ padding: "6px 8px", borderRadius: 4, fontSize: 13, cursor: "pointer", color: r === "All Regions" ? "#1d4ed8" : "#374151", background: r === "All Regions" ? "#dbeafe" : "transparent", marginBottom: 2 }}>
              {r !== "All Regions" && <span style={{ marginRight: 8, color: "#94a3b8" }}>▸</span>}{r}
            </div>
          ))}
        </div>
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
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 16, color: "#0f172a" }}>ATV &amp; UPT by Day of Week</div>
          <div style={{ display: "flex", flexDirection: "column", gap: 28 }}>
            <DayBarChart title="ATV by Day of Week" data={atvByDay} format={(v) => `$${v.toFixed(0)}`} color="#3b82f6" />
            <DayBarChart title="UPT by Day of Week" data={uptByDay} format={(v) => v.toFixed(1)} color="#8b5cf6" />
          </div>
        </div>
      </div>
    </div>
  );
};

export default OperationsPage;
