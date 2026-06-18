import React from "react";
import Icon from "../ui/Icon";
import { Persona, PageId } from "../../types";

interface TopbarProps {
  persona: Persona;
  setPersona: (p: Persona) => void;
  showAlerts: boolean;
  setShowAlerts: (v: boolean) => void;
  showHelp: boolean;
  setShowHelp: (v: boolean) => void;
  showUserMenu: boolean;
  setShowUserMenu: (v: boolean) => void;
  navigate: (p: PageId) => void;
}

const Topbar: React.FC<TopbarProps> = ({
  persona,
  setPersona,
  setShowAlerts,
  showAlerts,
  setShowHelp,
  showUserMenu,
  setShowUserMenu,
  navigate,
}) => {
  const personas: [Persona, string][] = [
    ["corporate", "Corporate"],
    ["store-mgr", "Store Mgr"],
    ["franchise", "Franchise"],
  ];

  return (
    <div style={{ height: 56, background: "white", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", padding: "0 24px", gap: 12, flexShrink: 0 }}>
      {/* Persona switcher */}
      <div style={{ display: "flex", background: "#f1f5f9", borderRadius: 8, padding: 3, gap: 2, flexShrink: 0 }}>
        {personas.map(([id, label]) => (
          <button
            key={id}
            onClick={() => setPersona(id)}
            style={{
              padding: "4px 12px",
              borderRadius: 6,
              fontSize: 12,
              fontWeight: 600,
              border: "none",
              cursor: "pointer",
              background: persona === id ? "white" : "transparent",
              color: persona === id ? "#0f172a" : "#64748b",
              boxShadow: persona === id ? "0 1px 3px rgba(0,0,0,0.1)" : "none",
            }}
          >
            {label}
          </button>
        ))}
      </div>

      <div style={{ width: 1, height: 24, background: "#e2e8f0" }} />

      {/* Region selectors */}
      <div style={{ flex: 1 }}>
        <div style={{ fontSize: 13, color: "#64748b" }}>
          {["All Regions", "Northeast", "West", "South", "Midwest"].map((r) => (
            <button key={r} className="btn btn-ghost" style={{ fontSize: 13, padding: "4px 10px" }}>
              {r}
            </button>
          ))}
        </div>
      </div>

      <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
        <span className="badge badge-green" style={{ fontSize: 11 }}>● Live</span>

        {/* Bell */}
        <div style={{ position: "relative" }}>
          <button className="btn btn-outline" style={{ padding: "5px 10px" }} onClick={() => setShowAlerts(!showAlerts)}>
            <Icon name="bell" size={15} />
          </button>
          <div style={{ position: "absolute", top: -4, right: -4, width: 16, height: 16, borderRadius: "50%", background: "#dc2626", color: "white", fontSize: 9, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center" }}>
            2
          </div>
        </div>

        {/* Help */}
        <button className="btn btn-outline" style={{ fontSize: 13, padding: "5px 12px" }} onClick={() => setShowHelp(true)}>
          <Icon name="help" size={14} /> Help
        </button>

        {/* User menu */}
        <div style={{ position: "relative" }}>
          <div
            style={{ display: "flex", alignItems: "center", gap: 8, cursor: "pointer", padding: "5px 10px", borderRadius: 6, border: "1px solid #e2e8f0" }}
            onClick={() => setShowUserMenu(!showUserMenu)}
          >
            <div style={{ width: 28, height: 28, borderRadius: "50%", background: "#0f172a", color: "white", display: "flex", alignItems: "center", justifyContent: "center", fontSize: 12, fontWeight: 700 }}>
              JK
            </div>
            <div style={{ fontSize: 13, color: "#0f172a", lineHeight: 1.3 }}>
              <div>John Kim</div>
              <div style={{ fontSize: 11, color: "#94a3b8" }}>Subscription Admin</div>
            </div>
            <Icon name="chevronDown" size={14} color="#94a3b8" />
          </div>
          {showUserMenu && (
            <div className="dropdown-menu" style={{ right: 0, top: "calc(100% + 4px)" }}>
              <div className="dropdown-item" onClick={() => { navigate("admin"); setShowUserMenu(false); }}>Admin Settings</div>
              <div className="dropdown-item" onClick={() => setShowUserMenu(false)}>Profile</div>
              <div style={{ height: 1, background: "#f1f5f9", margin: "4px 0" }} />
              <div className="dropdown-item" style={{ color: "#dc2626" }}>Sign Out</div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Topbar;
