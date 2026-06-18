import React, { useState } from "react";
import Icon from "../components/ui/Icon";
import { Tooltip } from "../components/ui/Charts";
import { Experiment } from "../types";

const experimentsData: Record<string, Experiment[]> = {
  active: [
    { id: "E-004", name: "North Wall Endcap Redesign", stores: "Fashion Ave (test) vs. Market Street (control)", period: "Dec 1 – Dec 31", metric: "Zone dwell", status: "In progress", lift: "+12% running" },
    { id: "E-005", name: "Self-Checkout Expansion — 2 lanes", stores: "Harbor Walk", period: "Nov 15 – Dec 15", metric: "Checkout throughput", status: "In progress", lift: "Collecting data" },
  ],
  completed: [
    {
      id: "E-001", name: "NFL Season Activation — Apparel Zone", stores: "Fashion Ave", period: "Sep 1 – Nov 30", metric: "Zone traffic + dwell", status: "Complete", lift: "+24% zone traffic",
      results: { labels: ["Traffic","Avg Dwell","Conversion","Revenue/sqft"], test: [47,3.8,35,22.6], control: [38,2.1,29,18.2] },
      annotations: [{ date: "Sep 5", label: "NFL kickoff" }, { date: "Oct 10", label: "Fixture relocated" }],
    },
    {
      id: "E-002", name: "Accessories Fixture Relocation", stores: "3 test vs. 3 control", period: "Oct 1 – Oct 31", metric: "Zone conversion", status: "Complete", lift: "+8% conversion",
      results: { labels: ["Traffic","Avg Dwell","Conversion","Revenue/sqft"], test: [61,3.1,30,16.8], control: [52,1.8,22,14.1] },
      annotations: [{ date: "Oct 1", label: "Fixtures moved" }],
    },
  ],
  drafts: [
    { id: "E-006", name: "Holiday Window Display A/B", stores: "TBD", period: "Dec 15 – Jan 15", metric: "Capture rate", status: "Draft", lift: "—" },
  ],
};

const LiftLabsPage: React.FC = () => {
  const [tab, setTab] = useState<"active" | "completed" | "drafts">("active");
  const [selectedExp, setSelectedExp] = useState<Experiment | null>(null);
  const [showWizard, setShowWizard] = useState(false);
  const [wizardStep, setWizardStep] = useState(1);
  const [newExp, setNewExp] = useState({ name: "", hypothesis: "", testStores: "", metric: "Traffic" });

  const allExp = experimentsData[tab] || [];
  const exp = selectedExp;

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>Lift Labs</h2>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Test store formats and fixtures before committing capital at scale</p>
        </div>
        <button className="btn btn-primary" onClick={() => { setShowWizard(true); setWizardStep(1); }}>
          <Icon name="plus" size={14} /> New Experiment
        </button>
      </div>

      {/* Tabs */}
      <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #e2e8f0", marginBottom: 20 }}>
        {[["active" as const, "Active", "2"], ["completed" as const, "Completed", "2"], ["drafts" as const, "Drafts", "1"]].map(([id, label, count]) => (
          <div key={id} className={`tab ${tab === id ? "active" : ""}`} onClick={() => { setTab(id as "active" | "completed" | "drafts"); setSelectedExp(null); }}>
            {label} <span style={{ marginLeft: 4, padding: "1px 7px", borderRadius: 9999, fontSize: 11, fontWeight: 600, background: "#f1f5f9", color: "#64748b" }}>{count}</span>
          </div>
        ))}
      </div>

      <div style={{ display: "grid", gridTemplateColumns: exp ? "340px 1fr" : "1fr", gap: 16 }}>
        {/* List */}
        <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
          {allExp.map((e) => (
            <div key={e.id} className="card" style={{ cursor: "pointer", border: selectedExp?.id === e.id ? "2px solid #3b82f6" : "1px solid #e2e8f0", padding: 16 }}
              onClick={() => setSelectedExp(selectedExp?.id === e.id ? null : e)}>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "start", marginBottom: 6 }}>
                <span style={{ fontSize: 11, color: "#94a3b8", fontWeight: 600 }}>{e.id}</span>
                <span className={`badge ${e.status === "Complete" ? "badge-green" : e.status === "Draft" ? "badge-gray" : "badge-blue"}`}>{e.status}</span>
              </div>
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>{e.name}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 2 }}>{e.stores}</div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 8 }}>{e.period}</div>
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                <span style={{ fontSize: 11, color: "#64748b" }}>Primary: {e.metric}</span>
                <span style={{ fontSize: 12, fontWeight: 700, color: e.status === "Complete" ? "#16a34a" : "#3b82f6" }}>{e.lift}</span>
              </div>
            </div>
          ))}
        </div>

        {/* Lift report detail */}
        {exp && exp.results && (
          <div style={{ display: "flex", flexDirection: "column", gap: 14 }}>
            <div className="card">
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>{exp.name} — Lift Report</div>
              <div style={{ fontSize: 12, color: "#64748b", marginBottom: 16 }}>{exp.period} · {exp.stores}</div>
              <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 10, marginBottom: 16 }}>
                {exp.results.labels.map((label, i) => {
                  const lift = Math.round(((exp.results!.test[i] - exp.results!.control[i]) / exp.results!.control[i]) * 100);
                  const maxV = Math.max(exp.results!.test[i], exp.results!.control[i]);
                  return (
                    <div key={label} style={{ textAlign: "center" }}>
                      <div style={{ fontSize: 11, color: "#64748b", marginBottom: 8, fontWeight: 600 }}>{label}</div>
                      <div style={{ display: "flex", gap: 4, alignItems: "flex-end", height: 80, justifyContent: "center" }}>
                        <div style={{ width: 28, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                          <div style={{ width: "100%", background: "#3b82f6", borderRadius: "3px 3px 0 0", height: `${(exp.results!.test[i] / maxV) * 72}px` }} />
                          <div style={{ fontSize: 9, color: "#94a3b8" }}>Test</div>
                        </div>
                        <div style={{ width: 28, display: "flex", flexDirection: "column", alignItems: "center", gap: 2 }}>
                          <div style={{ width: "100%", background: "#cbd5e1", borderRadius: "3px 3px 0 0", height: `${(exp.results!.control[i] / maxV) * 72}px` }} />
                          <div style={{ fontSize: 9, color: "#94a3b8" }}>Ctrl</div>
                        </div>
                      </div>
                      <div style={{ marginTop: 6, fontSize: 12, fontWeight: 700, color: lift > 0 ? "#16a34a" : "#dc2626" }}>
                        {lift > 0 ? "+" : ""}{lift}%
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* Annotation timeline */}
              {exp.annotations && (
                <div style={{ borderTop: "1px solid #f1f5f9", paddingTop: 12 }}>
                  <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a", marginBottom: 8 }}>Annotation Timeline</div>
                  <div style={{ position: "relative", height: 32, background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0", overflow: "hidden" }}>
                    <div style={{ position: "absolute", top: "50%", left: 0, right: 0, height: 2, background: "#e2e8f0", transform: "translateY(-50%)" }} />
                    {exp.annotations.map((a, i) => (
                      <div key={i} style={{ position: "absolute", left: `${20 + i * 45}%`, top: "50%", transform: "translate(-50%,-50%)" }}>
                        <Tooltip text={a.label}>
                          <div style={{ width: 10, height: 10, borderRadius: "50%", background: "#3b82f6", border: "2px solid white", cursor: "help" }} />
                        </Tooltip>
                      </div>
                    ))}
                  </div>
                  <div style={{ display: "flex", gap: 16, marginTop: 6 }}>
                    {exp.annotations.map((a, i) => (
                      <div key={i} style={{ display: "flex", gap: 4, alignItems: "center", fontSize: 11, color: "#64748b" }}>
                        <div style={{ width: 8, height: 8, borderRadius: "50%", background: "#3b82f6" }} />
                        {a.date}: {a.label}
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>

            {/* Zone ROI card */}
            <div className="card" style={{ background: "#f0fdf4", border: "1px solid #bbf7d0" }}>
              <div style={{ fontSize: 13, fontWeight: 700, color: "#15803d", marginBottom: 8 }}>💰 Zone ROI Attribution</div>
              <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12 }}>
                {[
                  { label: "Incremental revenue (test period)", value: "$4,200" },
                  { label: "Annualized projection", value: "$50,400" },
                  { label: "Revenue lift per sensor", value: "$12,600" },
                ].map((m) => (
                  <div key={m.label}>
                    <div style={{ fontSize: 11, color: "#166534", marginBottom: 2 }}>{m.label}</div>
                    <div style={{ fontSize: 20, fontWeight: 700, color: "#15803d" }}>{m.value}</div>
                  </div>
                ))}
              </div>
            </div>

            {/* Cross-store fixture ranking */}
            <div className="card">
              <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>Cross-Store Fixture Performance Ranking</div>
              {[
                { fixture: "North Wall Endcap", rank: 1, dwell: "3.8 min", stores: "14/20 top quartile", status: "top" },
                { fixture: "Accessories Center Table", rank: 2, dwell: "3.1 min", stores: "11/20 top quartile", status: "top" },
                { fixture: "Back Wall Feature", rank: 3, dwell: "1.4 min", stores: "6/20 above median", status: "mid" },
                { fixture: "Entrance Display", rank: 4, dwell: "0.8 min", stores: "3/20 top quartile", status: "low" },
              ].map((f) => (
                <div key={f.rank} style={{ display: "flex", alignItems: "center", gap: 12, padding: "8px 0", borderBottom: "1px solid #f1f5f9" }}>
                  <div style={{ width: 22, fontSize: 12, color: "#94a3b8", fontWeight: 700 }}>#{f.rank}</div>
                  <div style={{ flex: 1 }}>
                    <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{f.fixture}</div>
                    <div style={{ fontSize: 11, color: "#64748b" }}>{f.stores}</div>
                  </div>
                  <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{f.dwell}</div>
                  <span className={`badge ${f.status === "top" ? "badge-green" : f.status === "mid" ? "badge-blue" : "badge-gray"}`}>
                    {f.status === "top" ? "Top quartile" : f.status === "mid" ? "Mid" : "Below median"}
                  </span>
                </div>
              ))}
            </div>

            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-primary"><Icon name="download" size={14} /> Export Capital Justification Report</button>
              <button className="btn btn-outline" onClick={() => setSelectedExp(null)}>Close</button>
            </div>
          </div>
        )}
      </div>

      {/* New experiment wizard */}
      {showWizard && (
        <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }} onClick={() => setShowWizard(false)}>
          <div style={{ background: "white", borderRadius: 12, padding: 28, width: 520, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }} onClick={(e) => e.stopPropagation()}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
              <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>New Experiment — Step {wizardStep} of 4</div>
              <button className="btn btn-ghost" style={{ padding: 4 }} onClick={() => setShowWizard(false)}><Icon name="x" size={16} /></button>
            </div>
            <div style={{ display: "flex", gap: 4, marginBottom: 20 }}>
              {[1, 2, 3, 4].map((s) => (
                <div key={s} style={{ flex: 1, height: 4, borderRadius: 2, background: s <= wizardStep ? "#0f172a" : "#e2e8f0" }} />
              ))}
            </div>
            {wizardStep === 1 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>Name &amp; Hypothesis</div>
                <div>
                  <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Experiment Name</label>
                  <input className="input" placeholder="e.g. Holiday Endcap Relocation" value={newExp.name} onChange={(e) => setNewExp({ ...newExp, name: e.target.value })} />
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Hypothesis</label>
                  <input className="input" placeholder="Moving the endcap will increase zone dwell by 15%" value={newExp.hypothesis} onChange={(e) => setNewExp({ ...newExp, hypothesis: e.target.value })} />
                </div>
              </div>
            )}
            {wizardStep === 2 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>Test &amp; Control Stores</div>
                <div>
                  <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Test Store(s)</label>
                  <select className="select" style={{ width: "100%" }}><option>Fashion Ave</option><option>Market Street</option><option>Harbor Walk</option></select>
                </div>
                <div>
                  <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Control Store(s)</label>
                  <select className="select" style={{ width: "100%" }}><option>Downtown Core</option><option>Lakeside Mall</option></select>
                </div>
              </div>
            )}
            {wizardStep === 3 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>Test Period</div>
                <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
                  <div><label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Start Date</label><input type="date" className="input" /></div>
                  <div><label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>End Date</label><input type="date" className="input" /></div>
                </div>
              </div>
            )}
            {wizardStep === 4 && (
              <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>Primary Metric</div>
                {["Traffic", "Zone Dwell", "Conversion", "Revenue per Sq Ft", "Capture Rate"].map((m) => (
                  <label key={m} style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer" }}>
                    <input type="radio" name="metric" checked={newExp.metric === m} onChange={() => setNewExp({ ...newExp, metric: m })} />
                    <span style={{ fontSize: 13, color: "#374151" }}>{m}</span>
                  </label>
                ))}
              </div>
            )}
            <div style={{ display: "flex", gap: 8, marginTop: 20, justifyContent: "flex-end" }}>
              {wizardStep > 1 && <button className="btn btn-outline" onClick={() => setWizardStep((s) => s - 1)}>Back</button>}
              {wizardStep < 4
                ? <button className="btn btn-primary" onClick={() => setWizardStep((s) => s + 1)}>Next →</button>
                : <button className="btn btn-primary" onClick={() => setShowWizard(false)}>Create Experiment</button>}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LiftLabsPage;

