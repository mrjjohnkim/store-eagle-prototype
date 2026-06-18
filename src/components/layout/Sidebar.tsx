import React from "react";
import Icon from "../ui/Icon";
import { PageId, NavItem } from "../../types";

interface SidebarProps {
  page: PageId;
  navigate: (p: PageId) => void;
  onDemoScript: () => void;
}

const navItems: NavItem[] = [
  { id: "ai-insights",  label: "AI Store Insights", icon: "insights" },
  { id: "lift-labs",    label: "Lift Labs",          icon: "liftlabs" },
  { id: "operations",   label: "Operations",         icon: "dashboard" },
  { id: "video",        label: "Video",              icon: "video" },
  { id: "traffic",      label: "Traffic",            icon: "traffic" },
  { id: "performance",  label: "Performance",        icon: "performance" },
  { id: "optimization", label: "Optimization",       icon: "optimize" },
  { id: "benchmarks",   label: "Benchmarks",         icon: "benchmark" },
  { id: "analytics",    label: "Analytics",          icon: "analytics" },
  { id: "reports",      label: "Reports",            icon: "reports" },
];

const Sidebar: React.FC<SidebarProps> = ({ page, navigate, onDemoScript }) => {
  return (
    <div style={{ width: 220, background: "white", borderRight: "1px solid #e2e8f0", display: "flex", flexDirection: "column", padding: "16px 8px", flexShrink: 0 }}>
      {/* Logo */}
      <div style={{ padding: "8px 12px", marginBottom: 16 }}>
        <div style={{ fontSize: 18, fontWeight: 800, color: "#0f172a", letterSpacing: -0.5 }}>Store Eagle</div>
        <div style={{ fontSize: 11, color: "#94a3b8", marginTop: 1 }}>Analytics Platform</div>
      </div>

      {/* Nav */}
      <div style={{ flex: 1 }}>
        {navItems.map((item) => (
          <div
            key={item.id}
            className={`sidebar-item ${page === item.id ? "active" : ""}`}
            onClick={() => navigate(item.id)}
          >
            <Icon name={item.icon} size={16} color={page === item.id ? "white" : "#64748b"} />
            <span>{item.label}</span>
          </div>
        ))}
      </div>

      {/* Bottom — Demo Script + Admin */}
      <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 12 }}>
        <div className="sidebar-item" onClick={onDemoScript} style={{ color: "#6366f1" }}>
          <svg width={16} height={16} viewBox="0 0 24 24" fill="none" stroke="#6366f1" strokeWidth="2">
            <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
            <polyline points="14 2 14 8 20 8"/>
            <line x1="16" y1="13" x2="8" y2="13"/>
            <line x1="16" y1="17" x2="8" y2="17"/>
            <polyline points="10 9 9 9 8 9"/>
          </svg>
          <span style={{ fontWeight: 600 }}>Demo Script</span>
        </div>
        <div className={`sidebar-item ${page === "admin" ? "active" : ""}`} onClick={() => navigate("admin")}>
          <Icon name="admin" size={16} color={page === "admin" ? "white" : "#64748b"} />
          <span>Admin Settings</span>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
