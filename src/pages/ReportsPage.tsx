import React, { useState } from "react";
import Icon from "../components/ui/Icon";

interface Report {
  name: string;
  type: string;
  format: string;
  freq: string;
  stores: string;
  status: string;
  nextRun: string;
}

interface NewReport {
  name: string;
  type: string;
  format: string;
  freq: string;
  email: string;
}

const ReportsPage: React.FC = () => {
  const [reports] = useState<Report[]>([
    { name: "Weekly Traffic Summary", type: "Traffic", format: "Excel", freq: "Weekly", stores: "All", status: "Active", nextRun: "Mon 6:00 AM" },
    { name: "Monthly Performance", type: "Performance", format: "PDF", freq: "Monthly", stores: "Northeast", status: "Active", nextRun: "Dec 1, 6:00 AM" },
    { name: "Health Monitoring Alert", type: "Health", format: "PDF", freq: "Weekly", stores: "All", status: "Active", nextRun: "Sun 7:00 AM" },
    { name: "Holiday Benchmark Report", type: "Benchmark", format: "PDF", freq: "One-time", stores: "All", status: "Scheduled", nextRun: "Dec 26, 8:00 AM" },
  ]);
  const [showNew, setShowNew] = useState(false);
  const [newReport, setNewReport] = useState<NewReport>({ name: "", type: "Traffic", format: "PDF", freq: "Weekly", email: "" });

  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
        <div>
          <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>Reports</h2>
          <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Schedule automated reports delivered to your inbox</p>
        </div>
        <button className="btn btn-primary" onClick={() => setShowNew(!showNew)}>
          <Icon name="plus" size={14} /> New Report
        </button>
      </div>

      {showNew && (
        <div className="card" style={{ marginBottom: 16, border: "1px solid #bae6fd", background: "#f0f9ff" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: "#0f172a" }}>Create New Report</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            <div>
              <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Report Name</label>
              <input className="input" placeholder="e.g. Weekly Traffic Summary" value={newReport.name} onChange={(e) => setNewReport({ ...newReport, name: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Report Type</label>
              <select className="select" style={{ width: "100%" }} value={newReport.type} onChange={(e) => setNewReport({ ...newReport, type: e.target.value })}>
                {["Traffic", "Performance", "Benchmarks", "Health Monitoring", "Conversion", "Analytics"].map((t) => <option key={t}>{t}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Format</label>
              <select className="select" style={{ width: "100%" }} value={newReport.format} onChange={(e) => setNewReport({ ...newReport, format: e.target.value })}>
                <option>PDF</option><option>Excel</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Frequency</label>
              <select className="select" style={{ width: "100%" }} value={newReport.freq} onChange={(e) => setNewReport({ ...newReport, freq: e.target.value })}>
                {["Daily", "Weekly", "Monthly", "One-time"].map((f) => <option key={f}>{f}</option>)}
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Send To (email)</label>
              <input className="input" placeholder="manager@store.com" value={newReport.email} onChange={(e) => setNewReport({ ...newReport, email: e.target.value })} />
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Locations</label>
              <select className="select" style={{ width: "100%" }}>
                <option>All Stores</option><option>Northeast</option><option>West</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary" onClick={() => setShowNew(false)}>Generate Report</button>
            <button className="btn btn-outline" onClick={() => setShowNew(false)}>Cancel</button>
          </div>
        </div>
      )}

      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead>
            <tr style={{ borderBottom: "2px solid #e2e8f0" }}>
              {["Report Name", "Type", "Format", "Frequency", "Stores", "Status", "Next Run", ""].map((h) => (
                <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: 600, fontSize: 12 }}>{h}</th>
              ))}
            </tr>
          </thead>
          <tbody>
            {reports.map((r, i) => (
              <tr key={i} className="table-row" style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "10px 12px", color: "#0f172a", fontWeight: 500 }}>{r.name}</td>
                <td style={{ padding: "10px 12px" }}><span className="badge badge-blue">{r.type}</span></td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{r.format}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{r.freq}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{r.stores}</td>
                <td style={{ padding: "10px 12px" }}><span className={`badge ${r.status === "Active" ? "badge-green" : "badge-gray"}`}>{r.status}</span></td>
                <td style={{ padding: "10px 12px", color: "#64748b", fontSize: 12 }}>{r.nextRun}</td>
                <td style={{ padding: "10px 12px" }}>
                  <button className="btn btn-ghost" style={{ padding: "4px 8px", fontSize: 12 }}><Icon name="edit" size={12} /> Edit</button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default ReportsPage;
