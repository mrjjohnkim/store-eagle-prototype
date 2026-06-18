import React from "react";
import Icon from "../components/ui/Icon";
import { PageId } from "../types";

interface VideoPageProps {
  navigate: (p: PageId) => void;
}

const VideoPage: React.FC<VideoPageProps> = ({ navigate }) => (
  <div>
    <div style={{ marginBottom: 20 }}>
      <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>Live Video Feeds</h2>
      <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Eagle Eye sensor feeds — top-down people tracking with count lines</p>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="video-feed" style={{ height: 220, position: "relative" }}>
          <div style={{ textAlign: "center" }}>
            <Icon name="camera" size={32} color="#475569" />
            <div style={{ marginTop: 8, color: "#94a3b8", fontWeight: 600 }}>Video Feed {n}</div>
            <div style={{ marginTop: 4, fontSize: 12, color: "#64748b" }}>Eagle Eye Sensor — Store Entrance {n}</div>
            <div style={{ marginTop: 12, display: "flex", gap: 8, justifyContent: "center" }}>
              <span className="badge badge-green">● Live</span>
              <span className="badge badge-gray">95.2% Accuracy</span>
            </div>
          </div>
          {/* Count line indicator */}
          <div style={{ position: "absolute", top: "50%", left: "15%", right: "15%", height: 2, background: "#3b82f6", opacity: 0.7 }}>
            <div style={{ position: "absolute", top: -8, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "#60a5fa", fontWeight: 600, whiteSpace: "nowrap" }}>
              COUNT LINE
            </div>
          </div>
        </div>
      ))}
    </div>
    <div className="card" style={{ padding: 16, display: "flex", gap: 24, alignItems: "center" }}>
      <div style={{ display: "flex", gap: 16 }}>
        <div style={{ fontSize: 13, color: "#64748b" }}><span style={{ color: "#3b82f6", fontWeight: 700 }}>━</span> Count Line</div>
        <div style={{ fontSize: 13, color: "#64748b" }}><span style={{ color: "#22c55e", fontWeight: 700 }}>●</span> Person tracked in</div>
        <div style={{ fontSize: 13, color: "#64748b" }}><span style={{ color: "#f43f5e", fontWeight: 700 }}>●</span> Person tracked out</div>
      </div>
      <div style={{ marginLeft: "auto" }}>
        <button className="btn btn-outline" onClick={() => navigate("operations")}>
          <Icon name="dashboard" size={14} /> View Dashboard
        </button>
      </div>
    </div>
  </div>
);

export default VideoPage;
