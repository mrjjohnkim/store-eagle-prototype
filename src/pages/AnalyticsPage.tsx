import React, { useState } from "react";
import Icon from "../components/ui/Icon";

const AnalyticsPage: React.FC = () => {
  const [groupBy, setGroupBy] = useState(["Date"]);
  const [chartType, setChartType] = useState("Table");
  const [savedViews] = useState(["Monday Morning Check", "Holiday Comparison", "Store vs Region"]);
  const [selectedView, setSelectedView] = useState<string | null>(null);
  const [dates, setDates] = useState([
    { label: "Nov 2025", value: "2025-11-01/2025-11-30" },
    { label: "Nov 2024", value: "2024-11-01/2024-11-30" },
  ]);
  const [metrics, setMetrics] = useState(["Traffic", "Conversion", "Sales"]);
  const [stores, setStores] = useState(["Fashion Ave", "Market Street"]);
  const allMetrics = ["Traffic", "Conversion", "Sales", "Avg Transaction", "UPT", "Shopper Yield", "Capture Rate"];
  const tableData = [
    { date: "Nov 2025", store: "Fashion Ave", traffic: "12,840", conversion: "33.2%", sales: "$84,214" },
    { date: "Nov 2025", store: "Market Street", traffic: "9,210", conversion: "28.6%", sales: "$52,480" },
    { date: "Nov 2024", store: "Fashion Ave", traffic: "13,120", conversion: "31.8%", sales: "$82,100" },
    { date: "Nov 2024", store: "Market Street", traffic: "9,650", conversion: "27.4%", sales: "$51,200" },
  ];

  const toggleGroupBy = (g: string) => setGroupBy((prev) => prev.includes(g) ? prev.filter((x) => x !== g) : [...prev, g]);
  const toggleMetric = (m: string) => setMetrics((prev) => prev.includes(m) ? prev.filter((x) => x !== m) : [...prev, m]);

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>Analytics</h2>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Build custom data sets with flexible filters</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          <select className="select" value={selectedView || ""} onChange={(e) => setSelectedView(e.target.value || null)}>
            <option value="">Saved Views...</option>
            {savedViews.map((v) => <option key={v}>{v}</option>)}
          </select>
          <button className="btn btn-outline"><Icon name="save" size={14} /> Save View</button>
          <button className="btn btn-outline"><Icon name="download" size={14} /> Export Excel</button>
        </div>
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16 }}>
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#0f172a" }}>Output Type</div>
            {["Table", "Bar Chart", "Line Chart"].map((t) => (
              <div key={t} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, cursor: "pointer" }} onClick={() => setChartType(t)}>
                <div style={{ width: 16, height: 16, borderRadius: "50%", border: `2px solid ${chartType === t ? "#3b82f6" : "#e2e8f0"}`, background: chartType === t ? "#3b82f6" : "white", display: "flex", alignItems: "center", justifyContent: "center" }}>
                  {chartType === t && <div style={{ width: 6, height: 6, borderRadius: "50%", background: "white" }} />}
                </div>
                <span style={{ fontSize: 13, color: "#374151" }}>{t}</span>
              </div>
            ))}
          </div>

          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#0f172a" }}>Locations</div>
            {["Fashion Ave", "Market Street", "Harbor Walk", "Downtown Core"].map((s) => (
              <label key={s} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, cursor: "pointer" }}>
                <input type="checkbox" className="checkbox" checked={stores.includes(s)} onChange={() => setStores((prev) => prev.includes(s) ? prev.filter((x) => x !== s) : [...prev, s])} />
                <span style={{ fontSize: 13, color: "#374151" }}>{s}</span>
              </label>
            ))}
          </div>

          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#0f172a" }}>Metrics</div>
            {allMetrics.map((m) => (
              <label key={m} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, cursor: "pointer" }}>
                <input type="checkbox" className="checkbox" checked={metrics.includes(m)} onChange={() => toggleMetric(m)} />
                <span style={{ fontSize: 13, color: "#374151" }}>{m}</span>
              </label>
            ))}
          </div>

          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#0f172a" }}>Date Ranges</div>
            {dates.map((d, i) => (
              <div key={i} style={{ display: "flex", gap: 6, marginBottom: 6, alignItems: "center" }}>
                <input className="input" value={d.label} style={{ flex: 1, fontSize: 12, padding: "5px 8px" }} readOnly />
                <button className="btn btn-ghost" style={{ padding: 4 }} onClick={() => setDates((prev) => prev.filter((_, j) => j !== i))}><Icon name="x" size={12} /></button>
              </div>
            ))}
            <button className="btn btn-outline" style={{ width: "100%", fontSize: 12, padding: "6px 0" }} onClick={() => setDates((prev) => [...prev, { label: "Nov 2023", value: "" }])}>
              <Icon name="plus" size={12} /> Add Date Range
            </button>
          </div>

          <div className="card">
            <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 8, color: "#0f172a" }}>Group By</div>
            {["Date", "Store", "Day of Week", "Time", "Region"].map((g) => (
              <label key={g} style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 6, cursor: "pointer" }}>
                <input type="checkbox" className="checkbox" checked={groupBy.includes(g)} onChange={() => toggleGroupBy(g)} />
                <span style={{ fontSize: 13, color: "#374151" }}>{g}</span>
              </label>
            ))}
          </div>
        </div>

        <div>
          <div className="card">
            <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#0f172a" }}>
              Results — {groupBy.join(", ")} {chartType !== "Table" && `(${chartType})`}
            </div>
            {chartType === "Table" ? (
              <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
                <thead>
                  <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
                    {groupBy.includes("Date") && <th style={{ textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: 600 }}>Date</th>}
                    {groupBy.includes("Store") && <th style={{ textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: 600 }}>Store</th>}
                    {metrics.includes("Traffic") && <th style={{ textAlign: "right", padding: "8px 12px", color: "#64748b", fontWeight: 600 }}>Traffic</th>}
                    {metrics.includes("Conversion") && <th style={{ textAlign: "right", padding: "8px 12px", color: "#64748b", fontWeight: 600 }}>Conversion</th>}
                    {metrics.includes("Sales") && <th style={{ textAlign: "right", padding: "8px 12px", color: "#64748b", fontWeight: 600 }}>Sales</th>}
                  </tr>
                </thead>
                <tbody>
                  {tableData.filter((r) => stores.includes(r.store)).map((r, i) => (
                    <tr key={i} className="table-row" style={{ borderBottom: "1px solid #f1f5f9" }}>
                      {groupBy.includes("Date") && <td style={{ padding: "8px 12px", color: "#374151" }}>{r.date}</td>}
                      {groupBy.includes("Store") && <td style={{ padding: "8px 12px", color: "#374151" }}>{r.store}</td>}
                      {metrics.includes("Traffic") && <td style={{ padding: "8px 12px", textAlign: "right", color: "#0f172a" }}>{r.traffic}</td>}
                      {metrics.includes("Conversion") && <td style={{ padding: "8px 12px", textAlign: "right", color: "#0f172a" }}>{r.conversion}</td>}
                      {metrics.includes("Sales") && <td style={{ padding: "8px 12px", textAlign: "right", color: "#0f172a" }}>{r.sales}</td>}
                    </tr>
                  ))}
                </tbody>
              </table>
            ) : (
              <div style={{ padding: 40, textAlign: "center", color: "#94a3b8" }}>
                <Icon name="analytics" size={48} color="#e2e8f0" />
                <div style={{ marginTop: 12, fontSize: 14 }}>{chartType} visualization</div>
                <div style={{ fontSize: 12 }}>Apply filters and click a view to populate</div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage;
