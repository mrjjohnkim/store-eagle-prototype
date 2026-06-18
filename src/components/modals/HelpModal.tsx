import React from "react";
import Icon from "../ui/Icon";

interface HelpModalProps {
  onClose: () => void;
}

const HelpModal: React.FC<HelpModalProps> = ({ onClose }) => (
  <div style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.4)", zIndex: 1000, display: "flex", alignItems: "center", justifyContent: "center" }}>
    <div style={{ background: "white", borderRadius: 12, padding: 28, width: 400, boxShadow: "0 20px 60px rgba(0,0,0,0.2)" }}>
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div style={{ fontSize: 16, fontWeight: 700, color: "#0f172a" }}>Help &amp; Resources</div>
        <button className="btn btn-ghost" style={{ padding: 4 }} onClick={onClose}><Icon name="x" size={16} /></button>
      </div>
      {[
        { icon: "video", label: "Walkthrough Video", desc: "1–2 min overview of this page" },
        { icon: "reports", label: "Documentation", desc: "Step-by-step user guide for this page" },
        { icon: "analytics", label: "Knowledge Base", desc: "Wiki articles and best practices" },
        { icon: "performance", label: "Training Institute", desc: "Self-guided learning portal with exercises" },
      ].map((item) => (
        <div key={item.label} style={{ display: "flex", gap: 12, padding: "12px 0", borderBottom: "1px solid #f1f5f9", cursor: "pointer" }} onClick={onClose}>
          <div style={{ width: 36, height: 36, background: "#f1f5f9", borderRadius: 8, display: "flex", alignItems: "center", justifyContent: "center" }}>
            <Icon name={item.icon} size={18} color="#64748b" />
          </div>
          <div>
            <div style={{ fontSize: 13, fontWeight: 600, color: "#0f172a" }}>{item.label}</div>
            <div style={{ fontSize: 12, color: "#64748b" }}>{item.desc}</div>
          </div>
        </div>
      ))}
    </div>
  </div>
);

export default HelpModal;
