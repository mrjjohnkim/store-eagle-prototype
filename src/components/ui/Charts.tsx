import React, { useState } from "react";

// ─── SparkLine ──────────────────────────────────────────────────────────────
interface SparkLineProps {
  data: number[];
  color?: string;
  lastYear?: number[];
  showDelta?: boolean;
}

export const SparkLine: React.FC<SparkLineProps> = ({ data, color = "#3b82f6", lastYear }) => {
  const h = 48, w = 140, pad = 4;
  const all = lastYear ? [...data, ...lastYear] : data;
  const min = Math.min(...all), max = Math.max(...all);
  const scale = (v: number) => h - pad - ((v - min) / (max - min || 1)) * (h - pad * 2);
  const pts = (arr: number[]) =>
    arr.map((v, i) => `${pad + i * ((w - pad * 2) / (arr.length - 1))},${scale(v)}`).join(" ");
  return (
    <svg width={w} height={h} style={{ overflow: "visible" }}>
      {lastYear && <polyline points={pts(lastYear)} fill="none" stroke="#cbd5e1" strokeWidth="1.5" strokeDasharray="3,3" />}
      <polyline points={pts(data)} fill="none" stroke={color} strokeWidth="2" />
      <circle
        cx={pad + (data.length - 1) * ((w - pad * 2) / (data.length - 1))}
        cy={scale(data[data.length - 1])}
        r="3"
        fill={color}
      />
    </svg>
  );
};

// ─── BarChart ───────────────────────────────────────────────────────────────
interface BarChartProps {
  data: (number | number[])[];
  labels?: string[];
  highlight?: boolean[];
}

export const BarChart: React.FC<BarChartProps> = ({ data, highlight = [] }) => {
  const max = Math.max(...data.map((d) => (Array.isArray(d) ? Math.max(...d) : d)));
  return (
    <div style={{ display: "flex", alignItems: "flex-end", gap: 6, height: 80 }}>
      {data.map((val, i) => {
        const vals = Array.isArray(val) ? val : [val];
        return (
          <div key={i} style={{ flex: 1, display: "flex", alignItems: "flex-end", gap: 2 }}>
            {vals.map((v, j) => (
              <div
                key={j}
                style={{
                  flex: 1,
                  height: `${(v / max) * 100}%`,
                  background: j === 0 ? "#3b82f6" : "#cbd5e1",
                  borderRadius: "3px 3px 0 0",
                  minHeight: 3,
                  opacity: highlight[i] ? 1 : 0.8,
                }}
              />
            ))}
          </div>
        );
      })}
    </div>
  );
};

// ─── Tooltip ────────────────────────────────────────────────────────────────
interface TooltipProps {
  text: string;
  children: React.ReactNode;
}

export const Tooltip: React.FC<TooltipProps> = ({ text, children }) => {
  const [show, setShow] = useState(false);
  return (
    <div
      style={{ position: "relative", display: "inline-block" }}
      onMouseEnter={() => setShow(true)}
      onMouseLeave={() => setShow(false)}
    >
      {children}
      {show && (
        <div
          style={{
            position: "absolute",
            bottom: "calc(100% + 6px)",
            left: "50%",
            transform: "translateX(-50%)",
            background: "#0f172a",
            color: "white",
            padding: "6px 10px",
            borderRadius: 6,
            fontSize: 12,
            whiteSpace: "nowrap",
            zIndex: 999,
            boxShadow: "0 2px 8px rgba(0,0,0,0.2)",
          }}
        >
          {text}
          <div
            style={{
              position: "absolute",
              top: "100%",
              left: "50%",
              transform: "translateX(-50%)",
              borderWidth: 4,
              borderStyle: "solid",
              borderColor: "#0f172a transparent transparent transparent",
            }}
          />
        </div>
      )}
    </div>
  );
};
