import React, { useState } from "react";

const BenchmarksPage: React.FC = () => {
  const [region, setRegion] = useState("US");
  const [category, setCategory] = useState("Specialty Apparel");
  const [hoveredBar, setHoveredBar] = useState<{ month: number; isYours: boolean } | null>(null);
  const benchmarks = [
    { month: "Jan", yours: 82, industry: 100 }, { month: "Feb", yours: 88, industry: 95 },
    { month: "Mar", yours: 95, industry: 105 }, { month: "Apr", yours: 91, industry: 98 },
    { month: "May", yours: 102, industry: 108 }, { month: "Jun", yours: 98, industry: 103 },
    { month: "Jul", yours: 105, industry: 110 }, { month: "Aug", yours: 108, industry: 107 },
    { month: "Sep", yours: 112, industry: 115 }, { month: "Oct", yours: 118, industry: 112 },
    { month: "Nov", yours: 124, industry: 118 }, { month: "Dec", yours: 130, industry: 125 },
  ];
  const maxB = Math.max(...benchmarks.map((b) => Math.max(b.yours, b.industry)));

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>Benchmarks</h2>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Compare your footfall index against industry peers</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["US", "Europe & Middle East"].map((r) => (
            <button key={r} className={`btn ${region === r ? "btn-primary" : "btn-outline"}`} style={{ padding: "6px 12px", fontSize: 13 }} onClick={() => setRegion(r)}>{r}</button>
          ))}
        </div>
      </div>
      <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16 }}>
        <div className="card">
          <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "#0f172a" }}>Category</div>
          {["All Retail", "Specialty Apparel", "Footwear", "Home & Garden", "Electronics", "Luxury"].map((c) => (
            <div key={c} style={{ padding: "7px 8px", borderRadius: 4, fontSize: 13, cursor: "pointer", color: category === c ? "#1d4ed8" : "#374151", background: category === c ? "#dbeafe" : "transparent", marginBottom: 2 }} onClick={() => setCategory(c)}>{c}</div>
          ))}
        </div>
        <div className="card">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 4, color: "#0f172a" }}>Footfall Index — {category} ({region})</div>
          <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>Index 100 = same period baseline. Your stores vs. industry average.</div>
          <div style={{ display: "flex", gap: 6, alignItems: "flex-end" }}>
            {benchmarks.map((b, i) => {
              const delta = b.yours - b.industry;
              const up = delta >= 0;
              return (
                <div key={b.month} style={{ flex: 1, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                  {/* Delta badge */}
                  <div style={{ fontSize: 9, fontWeight: 700, color: up ? "#16a34a" : "#dc2626", background: up ? "#dcfce7" : "#fee2e2", padding: "1px 4px", borderRadius: 3, whiteSpace: "nowrap", marginBottom: 2 }}>
                    {up ? "+" : ""}{delta}
                  </div>
                  {/* Bars */}
                  <div style={{ width: "100%", display: "flex", gap: 2, alignItems: "flex-end", height: 120 }}>
                    <div
                      style={{ flex: 1, background: "#3b82f6", borderRadius: "3px 3px 0 0", height: `${(b.yours / maxB) * 100}%`, position: "relative", cursor: "default" }}
                      onMouseEnter={() => setHoveredBar({ month: i, isYours: true })}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {hoveredBar?.month === i && hoveredBar.isYours && (
                        <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", zIndex: 10 }}>
                          {b.yours}
                        </div>
                      )}
                    </div>
                    <div
                      style={{ flex: 1, background: "#e2e8f0", borderRadius: "3px 3px 0 0", height: `${(b.industry / maxB) * 100}%`, position: "relative", cursor: "default" }}
                      onMouseEnter={() => setHoveredBar({ month: i, isYours: false })}
                      onMouseLeave={() => setHoveredBar(null)}
                    >
                      {hoveredBar?.month === i && !hoveredBar.isYours && (
                        <div style={{ position: "absolute", top: -22, left: "50%", transform: "translateX(-50%)", background: "#0f172a", color: "white", padding: "2px 6px", borderRadius: 4, fontSize: 10, fontWeight: 700, whiteSpace: "nowrap", zIndex: 10 }}>
                          {b.industry}
                        </div>
                      )}
                    </div>
                  </div>
                  <div style={{ fontSize: 10, color: "#94a3b8", marginTop: 2 }}>{b.month}</div>
                </div>
              );
            })}
          </div>
          <div style={{ display: "flex", gap: 24, marginTop: 12 }}>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 12, height: 12, background: "#3b82f6", borderRadius: 2 }} />
              <span style={{ fontSize: 12, color: "#64748b" }}>Your Stores</span>
            </div>
            <div style={{ display: "flex", gap: 8, alignItems: "center" }}>
              <div style={{ width: 12, height: 12, background: "#e2e8f0", borderRadius: 2 }} />
              <span style={{ fontSize: 12, color: "#64748b" }}>Industry Average</span>
            </div>
          </div>
          <div style={{ marginTop: 16, padding: "12px 14px", background: "#f0f9ff", borderRadius: 6, border: "1px solid #bae6fd", fontSize: 13, color: "#0369a1" }}>
            <strong>Nov–Dec:</strong> Your stores outperformed the {category} industry average by 5–6 index points. Strong holiday season execution.
          </div>
        </div>
      </div>
    </div>
  );
};

export default BenchmarksPage;
