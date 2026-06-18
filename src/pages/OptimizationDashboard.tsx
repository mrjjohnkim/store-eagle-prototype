import React, { useState } from "react";
import Icon from "../components/ui/Icon";

const OptimizationDashboard: React.FC = () => {
  const [metric, setMetric] = useState("Traffic");
  const [view, setView] = useState("Actual");
  const [hours, setHours] = useState("240");
  const [showExclusion, setShowExclusion] = useState(false);
  const [excl, setExcl] = useState({ uwb: false, schedule: false, dwell: true, reentry: true, dwellMins: 45, sessionWin: "60" });

  const days = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  const times = ["9AM","10AM","11AM","12PM","1PM","2PM","3PM","4PM","5PM","6PM","7PM","8PM"];

  const heatData: Record<string, number[][]> = {
    Traffic: [
      [30,45,60,75,80,85,70],[25,40,55,80,90,95,85],[20,35,50,85,95,100,90],
      [35,50,65,90,100,98,95],[30,45,60,85,95,90,88],[25,40,55,80,88,85,80],
      [20,30,45,70,75,80,72],[15,25,40,60,65,68,62],[20,30,45,55,60,62,58],
      [25,35,48,52,55,58,54],[18,24,36,40,42,45,40],[10,15,22,28,30,32,28],
    ],
    "Conversion Rate": [
      [38,35,32,28,25,22,26],[40,38,34,30,27,24,28],[42,40,36,32,29,26,30],
      [44,42,38,34,31,28,32],[46,44,40,36,33,30,34],[44,42,38,34,31,28,32],
      [42,40,36,32,29,26,30],[40,38,34,30,27,24,28],[38,35,32,28,25,22,26],
      [36,33,30,26,23,20,24],[34,31,28,24,21,18,22],[32,29,26,22,19,16,20],
    ],
  };

  const data = heatData[metric] || heatData["Traffic"];
  const allVals = data.flat();
  const minV = Math.min(...allVals), maxV = Math.max(...allVals);
  const intensity = (v: number) => (v - minV) / (maxV - minV || 1);
  const cellColor = (v: number) => {
    const i = intensity(v);
    return metric === "Conversion Rate"
      ? `rgba(34,197,94,${0.1 + i * 0.85})`
      : `rgba(59,130,246,${0.1 + i * 0.85})`;
  };

  const staffPlan = [
    [2,3,3,4,4,5,4],[3,3,4,5,5,6,5],[3,4,4,5,5,6,5],
    [4,4,5,6,6,7,6],[3,4,4,5,5,6,5],[3,3,4,5,5,5,5],
    [2,3,3,4,4,5,4],[2,2,3,3,4,4,3],[2,2,3,3,3,4,3],
    [2,2,2,3,3,3,3],[1,2,2,2,2,3,2],[1,1,2,2,2,2,2],
  ];

  const activeMethods = [excl.uwb, excl.schedule, excl.dwell].filter(Boolean).length;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>Optimization</h2>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Past performance heatmap + staff planning (45-day forecast)</p>
        </div>
        <div style={{ display: "flex", gap: 8 }}>
          {["Traffic", "Conversion Rate"].map((m) => (
            <button key={m} className={`btn ${metric === m ? "btn-primary" : "btn-outline"}`} style={{ padding: "6px 12px", fontSize: 13 }} onClick={() => setMetric(m)}>{m}</button>
          ))}
        </div>
      </div>

      {/* Employee Exclusion Panel */}
      <div style={{ marginBottom: 16, border: "1px solid #e2e8f0", borderRadius: 8, overflow: "hidden" }}>
        <div onClick={() => setShowExclusion((v) => !v)}
          style={{ display: "flex", justifyContent: "space-between", alignItems: "center", padding: "12px 16px", background: showExclusion ? "#f8fafc" : "white", cursor: "pointer" }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <Icon name="user" size={15} color="#64748b" />
            <span style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>Employee Exclusion Settings</span>
            <span className="badge badge-green" style={{ fontSize: 10 }}>
              {activeMethods} method{activeMethods !== 1 ? "s" : ""} active
            </span>
          </div>
          <Icon name={showExclusion ? "chevronDown" : "chevronRight"} size={14} color="#64748b" />
        </div>
        {showExclusion && (
          <div style={{ padding: 16, borderTop: "1px solid #e2e8f0", background: "white" }}>
            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 16, marginBottom: 16 }}>
              {[
                { key: "uwb" as const, label: "UWB Badge", badge: "Beta", desc: "Employees carry a tag — excluded in real time" },
                { key: "schedule" as const, label: "Shift Schedule Import", badge: null, desc: "Upload roster; clocked-in staff auto-flagged" },
                { key: "dwell" as const, label: "Dwell Heuristic", badge: null, desc: "" },
              ].map((m) => (
                <div key={m.key} style={{ padding: 12, border: `1px solid ${excl[m.key] ? "#93c5fd" : "#e2e8f0"}`, borderRadius: 8, background: excl[m.key] ? "#eff6ff" : "#f8fafc" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 6 }}>
                    <span style={{ fontSize: 12, fontWeight: 600, color: "#0f172a" }}>{m.label}</span>
                    <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
                      {m.badge && <span className="badge badge-blue" style={{ fontSize: 9 }}>{m.badge}</span>}
                      <label style={{ position: "relative", width: 32, height: 18, cursor: "pointer" }}>
                        <input type="checkbox" checked={excl[m.key]} onChange={() => setExcl((s) => ({ ...s, [m.key]: !s[m.key] }))} style={{ opacity: 0, width: 0, height: 0 }} />
                        <div style={{ position: "absolute", inset: 0, borderRadius: 9999, background: excl[m.key] ? "#3b82f6" : "#cbd5e1", transition: "background 0.2s" }}>
                          <div style={{ position: "absolute", top: 2, left: excl[m.key] ? 14 : 2, width: 14, height: 14, borderRadius: "50%", background: "white", transition: "left 0.2s" }} />
                        </div>
                      </label>
                    </div>
                  </div>
                  <div style={{ fontSize: 11, color: "#64748b" }}>
                    {m.key === "dwell" ? `Presence >${excl.dwellMins} min flagged as probable employee` : m.desc}
                  </div>
                  {m.key === "uwb" && excl.uwb && (
                    <div style={{ marginTop: 8, padding: "6px 8px", background: "#fef9c3", borderRadius: 4, fontSize: 11, color: "#854d0e" }}>
                      ⚡ 4 badges registered at Fashion Ave
                    </div>
                  )}
                  {m.key === "schedule" && excl.schedule && (
                    <button className="btn btn-outline" style={{ fontSize: 11, padding: "4px 8px", marginTop: 8, width: "100%" }}>+ Import roster CSV</button>
                  )}
                  {m.key === "dwell" && excl.dwell && (
                    <div style={{ marginTop: 8, display: "flex", alignItems: "center", gap: 8 }}>
                      <input type="range" min={15} max={90} value={excl.dwellMins} onChange={(e) => setExcl((s) => ({ ...s, dwellMins: +e.target.value }))} style={{ flex: 1 }} />
                      <span style={{ fontSize: 11, fontWeight: 600, color: "#0f172a", width: 40 }}>{excl.dwellMins} min</span>
                    </div>
                  )}
                </div>
              ))}
            </div>
            <div style={{ display: "flex", alignItems: "center", gap: 16, padding: "10px 14px", background: "#f8fafc", borderRadius: 8 }}>
              <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                <Icon name="filter" size={13} color="#64748b" />
                <span style={{ fontSize: 12, color: "#64748b" }}>Re-entry deduplication</span>
                <label style={{ position: "relative", width: 32, height: 18, cursor: "pointer" }}>
                  <input type="checkbox" checked={excl.reentry} onChange={() => setExcl((s) => ({ ...s, reentry: !s.reentry }))} style={{ opacity: 0, width: 0, height: 0 }} />
                  <div style={{ position: "absolute", inset: 0, borderRadius: 9999, background: excl.reentry ? "#3b82f6" : "#cbd5e1" }}>
                    <div style={{ position: "absolute", top: 2, left: excl.reentry ? 14 : 2, width: 14, height: 14, borderRadius: "50%", background: "white" }} />
                  </div>
                </label>
              </div>
              <span style={{ fontSize: 12, color: "#64748b" }}>Session window:</span>
              {["30", "60", "90"].map((w) => (
                <button key={w} onClick={() => setExcl((s) => ({ ...s, sessionWin: w }))}
                  className={`btn ${excl.sessionWin === w ? "btn-primary" : "btn-outline"}`} style={{ padding: "4px 10px", fontSize: 11 }}>{w} min</button>
              ))}
              {excl.reentry && <span style={{ fontSize: 11, color: "#16a34a", marginLeft: "auto" }}>~6.2% traffic reclassified</span>}
            </div>
          </div>
        )}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16 }}>
        {/* Past heatmap */}
        <div className="card">
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#0f172a" }}>Last Week — {metric}</div>
          <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7,1fr)", gap: 2 }}>
            <div />
            {days.map((d) => <div key={d} style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", fontWeight: 600 }}>{d}</div>)}
            {times.map((t, ti) => (
              <React.Fragment key={t}>
                <div style={{ fontSize: 10, color: "#94a3b8", paddingRight: 4, textAlign: "right", alignSelf: "center" }}>{t}</div>
                {days.map((d, di) => (
                  <div key={d} className="heatmap-cell" style={{ height: 22, background: cellColor(data[ti][di]), borderRadius: 3 }} title={`${d} ${t}: ${data[ti][di]}${metric === "Conversion Rate" ? "%" : ""}`} />
                ))}
              </React.Fragment>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 12, alignItems: "center", fontSize: 11, color: "#94a3b8" }}>
            <span>Low</span>
            {[0.1, 0.3, 0.5, 0.7, 0.9].map((i) => (
              <div key={i} style={{ width: 20, height: 12, borderRadius: 2, background: metric === "Conversion Rate" ? `rgba(34,197,94,${i})` : `rgba(59,130,246,${i})` }} />
            ))}
            <span>High</span>
          </div>
        </div>

        {/* Staff planning */}
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 12 }}>
            <div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>Staff Planning — {view === "Actual" ? "Predicted Traffic" : "Labor Hours"}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Up to 45 days ahead</div>
            </div>
            <div style={{ display: "flex", gap: 6, alignItems: "center" }}>
              {["Actual", "Labor Hours"].map((v) => (
                <button key={v} className={`btn ${view === v ? "btn-primary" : "btn-outline"}`} style={{ padding: "4px 10px", fontSize: 12 }} onClick={() => setView(v)}>{v}</button>
              ))}
            </div>
          </div>
          {view === "Labor Hours" && (
            <div style={{ display: "flex", gap: 8, alignItems: "center", marginBottom: 12, padding: "8px 10px", background: "#f8fafc", borderRadius: 6 }}>
              <span style={{ fontSize: 13, color: "#64748b" }}>Weekly hours budget:</span>
              <input className="input" style={{ width: 80 }} value={hours} onChange={(e) => setHours(e.target.value)} />
              <button className="btn btn-outline" style={{ padding: "6px 10px", fontSize: 12 }}>Apply</button>
            </div>
          )}
          <div style={{ display: "grid", gridTemplateColumns: "60px repeat(7,1fr)", gap: 2 }}>
            <div />
            {days.map((d) => <div key={d} style={{ fontSize: 11, color: "#94a3b8", textAlign: "center", fontWeight: 600 }}>{d}</div>)}
            {times.map((t, ti) => (
              <React.Fragment key={t}>
                <div style={{ fontSize: 10, color: "#94a3b8", paddingRight: 4, textAlign: "right", alignSelf: "center" }}>{t}</div>
                {days.map((d, di) => {
                  const staff = staffPlan[ti][di];
                  const bg = staff >= 6 ? "#1d4ed8" : staff >= 5 ? "#3b82f6" : staff >= 4 ? "#93c5fd" : staff >= 3 ? "#bfdbfe" : "#dbeafe";
                  return (
                    <div key={d} className="heatmap-cell" style={{ height: 22, background: bg, borderRadius: 3, display: "flex", alignItems: "center", justifyContent: "center" }}>
                      <span style={{ fontSize: 9, color: staff >= 5 ? "white" : "#1e3a8a", fontWeight: 600 }}>{staff}</span>
                    </div>
                  );
                })}
              </React.Fragment>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default OptimizationDashboard;
