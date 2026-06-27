import React, { useState } from "react";
import Icon from "../../components/ui/Icon";
import { AdminSubPage } from "../../types";

// ─── Admin Users ─────────────────────────────────────────────────────────────
const AdminUsers: React.FC = () => {
  const [showAdd, setShowAdd] = useState(false);
  const users = [
    { name: "Sarah Mitchell", email: "s.mitchell@brand.com", profile: "Store Manager", location: "Cedar Crossing", status: "Active" },
    { name: "Tom Reeves", email: "t.reeves@brand.com", profile: "Regional Manager", location: "Northeast", status: "Active" },
    { name: "Priya Nair", email: "p.nair@brand.com", profile: "Head Office", location: "All Stores", status: "Active" },
    { name: "Carlos Ruiz", email: "c.ruiz@brand.com", profile: "Store Manager", location: "Bayfront Promenade", status: "Pending" },
  ];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <div style={{ fontSize: 14, color: "#64748b" }}>
          <strong style={{ color: "#0f172a" }}>Note:</strong> Store Eagle does not add users — this is always managed by Subscription Admins.
        </div>
        <button className="btn btn-primary" onClick={() => setShowAdd(!showAdd)}><Icon name="plus" size={14} /> Add User</button>
      </div>
      {showAdd && (
        <div className="card" style={{ marginBottom: 16, border: "1px solid #bae6fd", background: "#f0f9ff" }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 12, color: "#0f172a" }}>Add New User</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr", gap: 12, marginBottom: 12 }}>
            {[["Full Name", ""], ["Email Address", "user@company.com"], ["User Profile", ""]].map(([l, p], i) => (
              <div key={l}>
                <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>{l}</label>
                {i === 2 ? (
                  <select className="select" style={{ width: "100%" }}>
                    {["Store Manager","Regional Manager","Head Office","IT Admin","Subscription Admin"].map((pr) => <option key={pr}>{pr}</option>)}
                  </select>
                ) : <input className="input" placeholder={p} />}
              </div>
            ))}
            <div>
              <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Location Access</label>
              <select className="select" style={{ width: "100%" }}>
                <option>Custom</option><option>All Stores</option><option>Northeast Region</option>
              </select>
            </div>
            <div>
              <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Language</label>
              <select className="select" style={{ width: "100%" }}>
                <option>English</option><option>Spanish</option><option>French</option><option>German</option>
              </select>
            </div>
          </div>
          <div style={{ display: "flex", gap: 8 }}>
            <button className="btn btn-primary">Send Invite</button>
            <button className="btn btn-outline" onClick={() => setShowAdd(false)}>Cancel</button>
          </div>
        </div>
      )}
      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "2px solid #e2e8f0" }}>
            {["Name","Email","Profile","Location","Status",""].map((h) => <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: 600, fontSize: 12 }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i} className="table-row" style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "10px 12px", color: "#0f172a", fontWeight: 500 }}>{u.name}</td>
                <td style={{ padding: "10px 12px", color: "#64748b" }}>{u.email}</td>
                <td style={{ padding: "10px 12px" }}><span className="badge badge-blue">{u.profile}</span></td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{u.location}</td>
                <td style={{ padding: "10px 12px" }}><span className={`badge ${u.status === "Active" ? "badge-green" : "badge-gray"}`}>{u.status}</span></td>
                <td style={{ padding: "10px 12px" }}><button className="btn btn-ghost" style={{ fontSize: 12, padding: "4px 8px" }}><Icon name="edit" size={12} /> Edit</button></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Admin User Profiles ──────────────────────────────────────────────────────
const AdminUserProfiles: React.FC = () => {
  const profiles = [
    { name: "Store Manager", users: 18, video: true, analytics: true, reports: true, admin: false },
    { name: "Regional Manager", users: 6, video: true, analytics: true, reports: true, admin: false },
    { name: "Head Office", users: 12, video: false, analytics: true, reports: true, admin: false },
    { name: "IT Admin", users: 3, video: true, analytics: true, reports: true, admin: true },
    { name: "Subscription Admin", users: 2, video: true, analytics: true, reports: true, admin: true },
  ];
  const perms = ["Video Access","Analytics","Reports","Admin Settings"];
  return (
    <div>
      <div style={{ display: "flex", justifyContent: "space-between", marginBottom: 16 }}>
        <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Define which features each role can access. Set up profiles before adding users.</p>
        <button className="btn btn-primary"><Icon name="plus" size={14} /> New Profile</button>
      </div>
      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "2px solid #e2e8f0" }}>
            <th style={{ textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: 600, fontSize: 12 }}>Profile Name</th>
            <th style={{ textAlign: "center", padding: "8px 12px", color: "#64748b", fontWeight: 600, fontSize: 12 }}>Users</th>
            {perms.map((p) => <th key={p} style={{ textAlign: "center", padding: "8px 12px", color: "#64748b", fontWeight: 600, fontSize: 12 }}>{p}</th>)}
            <th />
          </tr></thead>
          <tbody>
            {profiles.map((p, i) => {
              const vals = [p.video, p.analytics, p.reports, p.admin];
              return (
                <tr key={i} className="table-row" style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "10px 12px", color: "#0f172a", fontWeight: 500 }}>{p.name}</td>
                  <td style={{ padding: "10px 12px", textAlign: "center", color: "#64748b" }}>{p.users}</td>
                  {vals.map((v, j) => (
                    <td key={j} style={{ padding: "10px 12px", textAlign: "center" }}>
                      {v ? <span style={{ color: "#16a34a" }}><Icon name="check" size={16} /></span> : <span style={{ color: "#e2e8f0" }}><Icon name="x" size={14} /></span>}
                    </td>
                  ))}
                  <td style={{ padding: "10px 12px" }}><button className="btn btn-ghost" style={{ fontSize: 12, padding: "4px 8px" }}><Icon name="edit" size={12} /> Edit</button></td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Admin Locations ──────────────────────────────────────────────────────────
const AdminLocations: React.FC = () => {
  const [selected, setSelected] = useState("Cedar Crossing");
  const [showHoursEdit, setShowHoursEdit] = useState(false);
  const regions: Record<string, string[]> = {
    Northeast: ["Cedar Crossing","Maple Grove Plaza","Times Square"],
    West: ["Bayfront Promenade","Union Square","Sunset Blvd"],
    South: ["Peachtree","Riverwalk","Bayshore"],
    Midwest: ["Union Heights","Brookhaven Center","Wacker Dr"],
  };
  const storeHours = [
    { day: "Mon", open: "10:00 AM", close: "9:00 PM" }, { day: "Tue", open: "10:00 AM", close: "9:00 PM" },
    { day: "Wed", open: "10:00 AM", close: "9:00 PM" }, { day: "Thu", open: "10:00 AM", close: "9:00 PM" },
    { day: "Fri", open: "10:00 AM", close: "10:00 PM" }, { day: "Sat", open: "9:00 AM", close: "10:00 PM" },
    { day: "Sun", open: "11:00 AM", close: "7:00 PM" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "220px 1fr", gap: 16 }}>
      <div className="card">
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "#0f172a" }}>Location Hierarchy</div>
        {Object.entries(regions).map(([region, stores]) => (
          <div key={region}>
            <div style={{ padding: "6px 8px", fontSize: 13, fontWeight: 600, color: "#374151", cursor: "pointer" }}>▾ {region}</div>
            {stores.map((s) => (
              <div key={s} style={{ padding: "5px 8px 5px 20px", fontSize: 13, cursor: "pointer", borderRadius: 4, background: selected === s ? "#dbeafe" : "transparent", color: selected === s ? "#1d4ed8" : "#374151" }}
                onClick={() => setSelected(s)}>{s}</div>
            ))}
          </div>
        ))}
      </div>
      <div>
        <div className="card" style={{ marginBottom: 12 }}>
          <div style={{ fontSize: 14, fontWeight: 600, marginBottom: 14, color: "#0f172a" }}>Location Details — {selected}</div>
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12 }}>
            {[["Store Name", selected],["Address","245 Cedar Crossing, New York, NY 10018"],["Store Code","FAV-001"],["Region","Northeast"],["Time Zone","America/New_York"],["Sensors Installed","4"]].map(([l, v]) => (
              <div key={l}>
                <div style={{ fontSize: 12, color: "#64748b", marginBottom: 2 }}>{l}</div>
                <div style={{ fontSize: 13, color: "#0f172a" }}>{v}</div>
              </div>
            ))}
          </div>
        </div>
        <div className="card">
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 14 }}>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>Store Hours</div>
            <div style={{ display: "flex", gap: 8 }}>
              <button className="btn btn-outline" style={{ fontSize: 12, padding: "5px 10px" }} onClick={() => setShowHoursEdit(!showHoursEdit)}><Icon name="edit" size={12} /> New Rule</button>
              <button className="btn btn-outline" style={{ fontSize: 12, padding: "5px 10px" }}><Icon name="download" size={12} /> CSV Upload</button>
            </div>
          </div>
          {showHoursEdit && (
            <div style={{ marginBottom: 14, padding: "12px 14px", background: "#f8fafc", borderRadius: 6, border: "1px solid #e2e8f0" }}>
              <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "#0f172a" }}>Add Special Hours or Closure</div>
              <div style={{ display: "flex", gap: 10, alignItems: "flex-end" }}>
                <div><label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Date</label><input type="date" className="input" style={{ width: 150 }} /></div>
                <div><label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Opens</label><input type="time" className="input" style={{ width: 110 }} /></div>
                <div><label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Closes</label><input type="time" className="input" style={{ width: 110 }} /></div>
                <button className="btn btn-outline" style={{ fontSize: 12, padding: "8px 10px" }}>Mark Closed</button>
                <button className="btn btn-primary" style={{ fontSize: 12, padding: "8px 10px" }}>Save Rule</button>
              </div>
            </div>
          )}
          <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
            <thead><tr style={{ borderBottom: "2px solid #e2e8f0" }}>
              {["Day","Opens","Closes","Status"].map((h) => <th key={h} style={{ textAlign: "left", padding: "6px 12px", color: "#64748b", fontWeight: 600, fontSize: 12 }}>{h}</th>)}
            </tr></thead>
            <tbody>
              {storeHours.map((h) => (
                <tr key={h.day} className="table-row" style={{ borderBottom: "1px solid #f1f5f9" }}>
                  <td style={{ padding: "8px 12px", fontWeight: 600, color: "#0f172a" }}>{h.day}</td>
                  <td style={{ padding: "8px 12px", color: "#374151" }}>{h.open}</td>
                  <td style={{ padding: "8px 12px", color: "#374151" }}>{h.close}</td>
                  <td style={{ padding: "8px 12px" }}><span className="badge badge-green">Open</span></td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

// ─── Admin Health ─────────────────────────────────────────────────────────────
const AdminHealth: React.FC = () => {
  const [filter, setFilter] = useState("All");
  const [typeFilter, setTypeFilter] = useState("All");
  const sensors = [
    { id: "S-001", store: "Cedar Crossing", type: "Connectivity", since: "Dec 12, 2:14 AM", status: "Unresolved", detail: "Sensor offline — possible power interruption" },
    { id: "S-002", store: "Bayfront Promenade", type: "POS Data", since: "Dec 11, 11:30 PM", status: "Unresolved", detail: "POS feed not received since store close" },
    { id: "S-003", store: "Maple Grove Plaza", type: "Connectivity", since: "Dec 10, 8:00 AM", status: "Resolved", detail: "Sensor back online after firmware update" },
    { id: "S-004", store: "Union Heights", type: "Connectivity", since: "Dec 9, 3:45 PM", status: "Resolved", detail: "Resolved by on-site IT" },
    { id: "S-005", store: "Brookhaven Center", type: "POS Data", since: "Dec 12, 6:00 AM", status: "Unresolved", detail: "POS integration configuration error" },
  ];
  const filtered = sensors.filter((s) =>
    (filter === "All" || s.status === filter) && (typeFilter === "All" || s.type === typeFilter)
  );
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16, alignItems: "center" }}>
        <Icon name="filter" size={14} color="#64748b" />
        <span style={{ fontSize: 13, color: "#64748b" }}>Status:</span>
        {["All","Unresolved","Resolved"].map((f) => (
          <button key={f} className={`btn ${filter === f ? "btn-primary" : "btn-outline"}`} style={{ padding: "5px 12px", fontSize: 12 }} onClick={() => setFilter(f)}>{f}</button>
        ))}
        <span style={{ fontSize: 13, color: "#64748b", marginLeft: 8 }}>Type:</span>
        {["All","Connectivity","POS Data"].map((f) => (
          <button key={f} className={`btn ${typeFilter === f ? "btn-primary" : "btn-outline"}`} style={{ padding: "5px 12px", fontSize: 12 }} onClick={() => setTypeFilter(f)}>{f}</button>
        ))}
        <div style={{ marginLeft: "auto", display: "flex", gap: 12, fontSize: 13 }}>
          <span><span className="badge badge-red">●</span> {sensors.filter((s) => s.status === "Unresolved").length} Unresolved</span>
          <span><span className="badge badge-green">●</span> {sensors.filter((s) => s.status === "Resolved").length} Resolved</span>
        </div>
      </div>
      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "2px solid #e2e8f0" }}>
            {["","Sensor ID","Store","Type","Since","Detail","Status"].map((h) => <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: 600, fontSize: 12 }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {filtered.map((s, i) => (
              <tr key={i} className="table-row" style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "10px 12px" }}>
                  {s.status === "Resolved" ? <span style={{ color: "#16a34a" }}><Icon name="check" size={16} /></span> : <span style={{ color: "#dc2626" }}><Icon name="x" size={16} /></span>}
                </td>
                <td style={{ padding: "10px 12px", color: "#0f172a", fontWeight: 500 }}>{s.id}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{s.store}</td>
                <td style={{ padding: "10px 12px" }}><span className={`badge ${s.type === "Connectivity" ? "badge-red" : "badge-gray"}`}>{s.type}</span></td>
                <td style={{ padding: "10px 12px", color: "#64748b", fontSize: 12 }}>{s.since}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{s.detail}</td>
                <td style={{ padding: "10px 12px" }}><span className={`badge ${s.status === "Resolved" ? "badge-green" : "badge-red"}`}>{s.status}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Admin Cameras ────────────────────────────────────────────────────────────
const AdminCameras: React.FC = () => {
  const [statusFilter, setStatusFilter] = useState("All");
  const cameras = [
    { id: "CAM-001", store: "Cedar Crossing", location: "Entrance A", firmware: "v4.2.1", lastSeen: "Live", online: true },
    { id: "CAM-002", store: "Cedar Crossing", location: "Entrance B", firmware: "v4.2.1", lastSeen: "Live", online: true },
    { id: "CAM-003", store: "Bayfront Promenade", location: "Main Door", firmware: "v4.1.8", lastSeen: "Live", online: true },
    { id: "CAM-004", store: "Maple Grove Plaza", location: "Entrance", firmware: "v4.2.1", lastSeen: "Dec 12, 2:14 AM", online: false },
    { id: "CAM-005", store: "Union Heights", location: "Entrance A", firmware: "v4.0.5", lastSeen: "Live", online: true },
    { id: "CAM-006", store: "Brookhaven Center", location: "North Entry", firmware: "v4.2.1", lastSeen: "Live", online: true },
  ];
  const filtered = cameras.filter((c) => statusFilter === "All" || (statusFilter === "Online" ? c.online : !c.online));
  return (
    <div>
      <div style={{ display: "flex", gap: 8, marginBottom: 16 }}>
        {["All","Online","Offline"].map((f) => (
          <button key={f} className={`btn ${statusFilter === f ? "btn-primary" : "btn-outline"}`} style={{ padding: "5px 12px", fontSize: 12 }} onClick={() => setStatusFilter(f)}>{f}</button>
        ))}
      </div>
      <div className="card">
        <table style={{ width: "100%", borderCollapse: "collapse", fontSize: 13 }}>
          <thead><tr style={{ borderBottom: "2px solid #e2e8f0" }}>
            {["Camera ID","Store","Location","Firmware","Last Seen","Status"].map((h) => <th key={h} style={{ textAlign: "left", padding: "8px 12px", color: "#64748b", fontWeight: 600, fontSize: 12 }}>{h}</th>)}
          </tr></thead>
          <tbody>
            {filtered.map((c, i) => (
              <tr key={i} className="table-row" style={{ borderBottom: "1px solid #f1f5f9" }}>
                <td style={{ padding: "10px 12px", fontWeight: 500, color: "#0f172a" }}>{c.id}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{c.store}</td>
                <td style={{ padding: "10px 12px", color: "#374151" }}>{c.location}</td>
                <td style={{ padding: "10px 12px" }}><span className="badge badge-gray">{c.firmware}</span></td>
                <td style={{ padding: "10px 12px", color: c.online ? "#16a34a" : "#dc2626", fontWeight: c.online ? 600 : 400 }}>{c.lastSeen}</td>
                <td style={{ padding: "10px 12px" }}><span className={`badge ${c.online ? "badge-green" : "badge-red"}`}>{c.online ? "Online" : "Offline"}</span></td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

// ─── Admin Employee Exclusion ─────────────────────────────────────────────────
const AdminEmployeeExclusion: React.FC = () => {
  const stores = ["Cedar Crossing","Bayfront Promenade","Maple Grove Plaza","Union Heights","Brookhaven Center"];
  const [sel, setSel] = useState("Cedar Crossing");
  const methods = [
    { name: "UWB Badge", status: "Beta", detail: "4 badges registered" },
    { name: "Shift Schedule Import", status: "Active", detail: "Last sync: Today 6:00 AM" },
    { name: "Dwell Heuristic", status: "Active", detail: "Threshold: 45 min" },
    { name: "Re-entry Deduplication", status: "Active", detail: "Session window: 60 min · ~6.2% reclassified" },
  ];
  return (
    <div style={{ display: "grid", gridTemplateColumns: "200px 1fr", gap: 16 }}>
      <div className="card">
        <div style={{ fontSize: 13, fontWeight: 600, marginBottom: 10, color: "#0f172a" }}>Stores</div>
        {stores.map((s) => (
          <div key={s} onClick={() => setSel(s)} style={{ padding: "6px 8px", borderRadius: 4, fontSize: 13, cursor: "pointer", marginBottom: 2, background: sel === s ? "#dbeafe" : "transparent", color: sel === s ? "#1d4ed8" : "#374151" }}>{s}</div>
        ))}
      </div>
      <div style={{ display: "flex", flexDirection: "column", gap: 12 }}>
        <div className="card">
          <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>Exclusion Methods — {sel}</div>
          {methods.map((m) => (
            <div key={m.name} style={{ display: "flex", alignItems: "center", gap: 12, padding: "10px 0", borderBottom: "1px solid #f1f5f9" }}>
              <div style={{ flex: 1 }}>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{m.name}</div>
                <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>{m.detail}</div>
              </div>
              <span className={`badge ${m.status === "Beta" ? "badge-blue" : "badge-green"}`}>{m.status}</span>
            </div>
          ))}
        </div>
        <div className="card" style={{ background: "#f0f9ff", border: "1px solid #bae6fd" }}>
          <div style={{ fontSize: 13, fontWeight: 600, color: "#0369a1", marginBottom: 6 }}>Accuracy Impact</div>
          <div style={{ fontSize: 12, color: "#374151" }}>With all methods active: <strong>±2.8% employee exclusion confidence</strong> · displayed on all metric cards</div>
        </div>
      </div>
    </div>
  );
};

// ─── Admin Integrations ───────────────────────────────────────────────────────
const AdminIntegrations: React.FC = () => {
  const wfp = [
    { name: "UKG Dimensions", status: "Connected", sync: "Today 6:05 AM", logo: "UKG" },
    { name: "Kronos Workforce Central", status: "Available", sync: "—", logo: "KRO" },
    { name: "Blue Yonder WFM", status: "Available", sync: "—", logo: "BY" },
    { name: "Workday HCM", status: "Coming Soon", sync: "—", logo: "WD" },
  ];
  const [apiUrl, setApiUrl] = useState("https://api.yourcompany.com/retail/traffic");
  const [cadence, setCadence] = useState("15-min");
  const [payload, setPayload] = useState("employee-excluded");
  const [daas, setDaas] = useState(false);
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 16 }}>
      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>Workforce Planning Connectors</div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(4,1fr)", gap: 12 }}>
          {wfp.map((w) => (
            <div key={w.name} style={{ padding: 14, border: `1px solid ${w.status === "Connected" ? "#86efac" : w.status === "Coming Soon" ? "#e2e8f0" : "#93c5fd"}`, borderRadius: 8, background: w.status === "Connected" ? "#f0fdf4" : "white" }}>
              <div style={{ width: 36, height: 36, borderRadius: 8, background: "#f1f5f9", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 11, fontWeight: 700, color: "#64748b", marginBottom: 8 }}>{w.logo}</div>
              <div style={{ fontSize: 12, fontWeight: 600, color: "#0f172a", marginBottom: 4 }}>{w.name}</div>
              <span className={`badge ${w.status === "Connected" ? "badge-green" : w.status === "Coming Soon" ? "badge-gray" : "badge-blue"}`} style={{ fontSize: 10 }}>{w.status}</span>
              {w.status === "Connected" && <div style={{ fontSize: 10, color: "#64748b", marginTop: 6 }}>Last sync: {w.sync}</div>}
              {w.status === "Available" && <button className="btn btn-outline" style={{ fontSize: 11, padding: "4px 8px", marginTop: 8, width: "100%" }}>Connect</button>}
            </div>
          ))}
        </div>
      </div>
      <div className="card">
        <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a", marginBottom: 12 }}>Push API Configuration</div>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 12, marginBottom: 12 }}>
          <div>
            <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Endpoint URL</label>
            <input className="input" value={apiUrl} onChange={(e) => setApiUrl(e.target.value)} />
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Payload Format</label>
            <select className="select" style={{ width: "100%" }} value={payload} onChange={(e) => setPayload(e.target.value)}>
              <option value="raw">Raw counts</option>
              <option value="employee-excluded">Employee-excluded counts</option>
              <option value="adjusted">Fully adjusted counts</option>
            </select>
          </div>
          <div>
            <label style={{ fontSize: 12, color: "#64748b", display: "block", marginBottom: 4 }}>Cadence</label>
            <div style={{ display: "flex", gap: 6 }}>
              {["real-time","15-min","hourly","daily"].map((c) => (
                <button key={c} onClick={() => setCadence(c)} className={`btn ${cadence === c ? "btn-primary" : "btn-outline"}`} style={{ fontSize: 11, padding: "5px 8px" }}>{c}</button>
              ))}
            </div>
          </div>
          <div style={{ display: "flex", alignItems: "flex-end" }}>
            <button className="btn btn-outline" style={{ width: "100%" }}>Test Ping</button>
          </div>
        </div>
      </div>
      <div className="card" style={{ border: "1px solid #e2e8f0" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div>
            <div style={{ fontSize: 14, fontWeight: 600, color: "#0f172a" }}>Data as a Service Mode</div>
            <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>Dashboard-free tier — clean data feed + accuracy SLA only. For enterprise IT buyers who already have a BI/WFP system.</div>
          </div>
          <label style={{ position: "relative", width: 40, height: 22, cursor: "pointer", flexShrink: 0 }}>
            <input type="checkbox" checked={daas} onChange={() => setDaas((v) => !v)} style={{ opacity: 0, width: 0, height: 0 }} />
            <div style={{ position: "absolute", inset: 0, borderRadius: 9999, background: daas ? "#3b82f6" : "#cbd5e1" }}>
              <div style={{ position: "absolute", top: 3, left: daas ? 18 : 3, width: 16, height: 16, borderRadius: "50%", background: "white", transition: "left 0.2s" }} />
            </div>
          </label>
        </div>
        {daas && (
          <div style={{ marginTop: 12, padding: "10px 14px", background: "#f0f9ff", borderRadius: 6, border: "1px solid #bae6fd", fontSize: 12, color: "#0369a1" }}>
            DaaS mode active — dashboard hidden from this account. Includes: accuracy SLA doc · audit reports · API access only.
            <button className="btn btn-outline" style={{ fontSize: 11, padding: "4px 10px", marginLeft: 12 }}><Icon name="download" size={11} /> Download SLA doc</button>
          </div>
        )}
      </div>
    </div>
  );
};

// ─── Admin Page Shell ─────────────────────────────────────────────────────────
interface AdminPageProps {
  subPage: AdminSubPage;
  setSubPage: (p: AdminSubPage) => void;
}

const tabs: { id: AdminSubPage; label: string }[] = [
  { id: "users", label: "Users" },
  { id: "userProfiles", label: "User Profiles" },
  { id: "locations", label: "Locations" },
  { id: "health", label: "Health Monitoring" },
  { id: "cameras", label: "Cameras" },
  { id: "exclusion", label: "Employee Exclusion" },
  { id: "integrations", label: "Integrations" },
];

const AdminPage: React.FC<AdminPageProps> = ({ subPage, setSubPage }) => {
  const renderContent = () => {
    switch (subPage) {
      case "users": return <AdminUsers />;
      case "userProfiles": return <AdminUserProfiles />;
      case "locations": return <AdminLocations />;
      case "health": return <AdminHealth />;
      case "cameras": return <AdminCameras />;
      case "exclusion": return <AdminEmployeeExclusion />;
      case "integrations": return <AdminIntegrations />;
      default: return <AdminUsers />;
    }
  };

  return (
    <div>
      <div style={{ marginBottom: 20 }}>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>Admin Settings</h2>
        <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Manage users, locations, and system health</p>
      </div>
      <div style={{ display: "flex", gap: 0, borderBottom: "2px solid #e2e8f0", marginBottom: 20 }}>
        {tabs.map((t) => (
          <div key={t.id} className={`tab ${subPage === t.id ? "active" : ""}`} onClick={() => setSubPage(t.id)}>
            {t.label}
          </div>
        ))}
      </div>
      {renderContent()}
    </div>
  );
};

export default AdminPage;
