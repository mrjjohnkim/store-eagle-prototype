import React, { useState } from "react";
import Icon from "../components/ui/Icon";
import { PageId } from "../types";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";

interface VideoPageProps {
  navigate: (p: PageId) => void;
}

const VideoPage: React.FC<VideoPageProps> = ({ navigate }) => {
  const [region, setRegion] = useState("All Regions");

  return (
  <div>
    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 20 }}>
      <div>
        <h2 style={{ fontSize: 20, fontWeight: 700, color: "#0f172a", margin: "0 0 4px 0" }}>Live Video Feeds</h2>
        <p style={{ fontSize: 13, color: "#64748b", margin: 0 }}>Eagle Eye sensor feeds — top-down people tracking with count lines</p>
      </div>
      <Select value={region} onValueChange={(v) => v && setRegion(v)}>
        <SelectTrigger className="w-[160px]"><SelectValue /></SelectTrigger>
        <SelectContent>
          {["All Regions", "Northeast", "West", "South", "Midwest"].map((r) => (
            <SelectItem key={r} value={r}>{r}</SelectItem>
          ))}
        </SelectContent>
      </Select>
    </div>
    <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 16, marginBottom: 16 }}>
      {[1, 2, 3, 4].map((n) => (
        <div key={n} className="video-feed" style={{ height: 220, position: "relative", flexDirection: "column", justifyContent: "space-between", alignItems: "stretch", padding: "12px 16px" }}>
          {/* Top: feed label + camera icon */}
          <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
            <div>
              <div style={{ color: "#94a3b8", fontWeight: 600, fontSize: 13 }}>Video Feed {n}</div>
              <div style={{ fontSize: 11, color: "#64748b", marginTop: 2 }}>Eagle Eye Sensor — Store Entrance {n}</div>
            </div>
            <Icon name="camera" size={18} color="#475569" />
          </div>
          {/* Middle: count line in open video area */}
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", flex: 1 }}>
            <div style={{ width: "72%", position: "relative" }}>
              <div style={{ height: 2, background: "#3b82f6", opacity: 0.8 }} />
              <div style={{ position: "absolute", top: -18, left: "50%", transform: "translateX(-50%)", fontSize: 10, color: "#60a5fa", fontWeight: 700, whiteSpace: "nowrap", letterSpacing: "0.06em" }}>
                COUNT LINE
              </div>
            </div>
          </div>
          {/* Bottom: status badges */}
          <div style={{ display: "flex", gap: 8 }}>
            <span className="badge badge-green">● Live</span>
            <span className="badge badge-gray">95.2% Accuracy</span>
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
};

export default VideoPage;
