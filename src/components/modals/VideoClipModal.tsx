import React from "react";
import Icon from "../ui/Icon";
import { VideoClipContext } from "../../types";

interface VideoClipModalProps {
  context: VideoClipContext;
  onClose: () => void;
}

const VideoClipModal: React.FC<VideoClipModalProps> = ({ context, onClose }) => (
  <div
    style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.6)", zIndex: 1001, display: "flex", alignItems: "center", justifyContent: "center" }}
    onClick={onClose}
  >
    <div
      style={{ background: "white", borderRadius: 12, padding: 24, width: 540, boxShadow: "0 20px 60px rgba(0,0,0,0.3)" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 16 }}>
        <div>
          <div style={{ fontSize: 15, fontWeight: 700, color: "#0f172a" }}>Video Clip — {context.zone}</div>
          <div style={{ fontSize: 12, color: "#64748b", marginTop: 2 }}>{context.time} · Auto-retrieved from alert event</div>
        </div>
        <button className="btn btn-ghost" style={{ padding: 4 }} onClick={onClose}><Icon name="x" size={16} /></button>
      </div>
      <div style={{ background: "#0f172a", borderRadius: 8, height: 210, display: "flex", alignItems: "center", justifyContent: "center", marginBottom: 16, border: "2px dashed #334155" }}>
        <div style={{ textAlign: "center" }}>
          <Icon name="camera" size={40} color="#475569" />
          <div style={{ color: "#94a3b8", fontSize: 13, marginTop: 8 }}>Clip: {context.time} — {context.zone}</div>
          <div style={{ color: "#64748b", fontSize: 11, marginTop: 4 }}>Overhead sensor · 30-day retention</div>
          <div style={{ marginTop: 12 }}><span className="badge badge-red" style={{ fontSize: 11 }}>● Playing</span></div>
        </div>
      </div>
      <div style={{ padding: "10px 14px", background: "#fef9f9", borderRadius: 6, border: "1px solid #fecaca", marginBottom: 14, fontSize: 12 }}>
        <strong style={{ color: "#991b1b" }}>{context.message}</strong>
        <div style={{ color: "#64748b", marginTop: 2 }}>{context.detail}</div>
      </div>
      <div style={{ display: "flex", gap: 8 }}>
        <button className="btn btn-primary" style={{ flex: 1 }}>Export coaching package</button>
        <button className="btn btn-outline">Download clip</button>
        <button className="btn btn-outline" onClick={onClose}>Close</button>
      </div>
    </div>
  </div>
);

export default VideoClipModal;
