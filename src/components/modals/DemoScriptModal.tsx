import React from "react";

interface DemoScriptModalProps {
  onClose: () => void;
}

interface DemoStep {
  label: string;
  text: string;
}

interface DemoStop {
  stop: string;
  title: string;
  time: string;
  color: string;
  steps: DemoStep[];
}

const demoStops: DemoStop[] = [
  { stop: "1", title: "AI Store Insights", time: "3 min", color: "#6366f1", steps: [
    { label: "Opening line", text: "\"This is the unified operational view — traffic, customer journey, and video evidence all in one surface. Today this data lives in three separate tabs with no connection between them. AI Store Insights closes that loop.\"" },
    { label: "Click alert banner", text: "\"Customer Journey detected a conversion drop in Zone 3 between 2–3 PM. One click auto-retrieves the video clip. The manager doesn't file a ticket — the system surfaces the evidence at the moment of the alert.\"" },
    { label: "Show video modal", text: "\"Same hardware. Same footage. What's new is the connection — the analytic triggers the video, not the other way around. That's a coaching moment, not an investigation.\"" },
    { label: "Zone map", text: "\"Red border = high dwell with no coverage — revenue leakage indicator. $1,240 today at Fashion Ave. Not shrink, not LP — margin leakage from an operational gap.\"" },
    { label: "Checkout Anomalies", text: "\"POS exception correlation — three exceptions in fifteen minutes at 1:30 PM, above twice the baseline rate. Store Ops language, not LP language. Same data, different conversation.\"" },
  ]},
  { stop: "2", title: "Lift Labs", time: "3 min", color: "#0891b2", steps: [
    { label: "Opening line", text: "\"This is the fastest-growing product line — and it currently has no dedicated UI surface. The corporate Store Development buyer who funds this work can't see their experiments without translating raw analytics data themselves.\"" },
    { label: "Click NFL Season Activation", text: "\"A Store Dev buyer doesn't think in sensor counts — they think in test versus control, before versus after, and 'did this activation justify the build cost?' This is the report they need to take to the CPO and say yes.\"" },
    { label: "Zone ROI card", text: "\"$4,200 incremental revenue over the test period. $50,400 annualized. $12,600 per sensor. That's the sentence that unlocks the renewal conversation and the next deployment.\"" },
    { label: "Annotation timeline", text: "\"Event markers. 'NFL kickoff, September 5. Fixture relocated, October 10.' Now the chart isn't just data — it's evidence that a specific decision drove a specific outcome.\"" },
    { label: "New Experiment wizard", text: "\"Four-step wizard. Hypothesis, test and control stores, date range, primary metric. Two minutes. Store Dev doesn't need to know how the sensors work.\"" },
  ]},
  { stop: "3", title: "Performance", time: "2 min", color: "#059669", steps: [
    { label: "AI Recommendations", text: "\"The diagnostic engine connects a specific metric signal to a specific action with a confidence score. 'Response time averaging 3.4 minutes in Section B — move one associate from the stockroom before 2 PM.' That's actionable. That's different store to store, shift to shift.\"" },
    { label: "Revenue at Risk", text: "\"Fourteen customers who dwelled more than two minutes without associate contact and left without purchasing. $840 today. Store managers respond to that differently than a conversion rate.\"" },
    { label: "Signal hierarchy tooltip", text: "\"Baseline 340, plus 15% Saturday, minus 8% rain, plus 22% sale event, equals 412 predicted. The manager sees the inputs, not just the output. That's the difference between a number they trust and a number they ignore.\"" },
  ]},
  { stop: "4", title: "Optimization — Employee Exclusion", time: "1.5 min", color: "#d97706", steps: [
    { label: "Expand panel", text: "\"Employee exclusion was described on the Verizon call as the reason a one-sensor solution might not work. It's been 'three years out' for three years. This panel makes it a configurable product feature instead of a per-customer engineering project.\"" },
    { label: "Toggle UWB Badge + Shift Schedule", text: "\"Four badges registered at Fashion Ave — the beta is live. CSV upload or connect to HR system. These aren't separate IT projects — they're settings in the platform.\"" },
    { label: "Dwell slider", text: "\"For stores where UWB isn't deployed yet — a dwell threshold. 45 minutes continuous presence flagged as probable employee. Adjustable per store format.\"" },
  ]},
  { stop: "5", title: "Admin → Integrations", time: "1 min", color: "#7c3aed", steps: [
    { label: "WFP connectors", text: "\"UKG connected. Kronos, Blue Yonder available. Workday coming soon. Pre-built certified integrations mean data flows into the tool they already use — we're not asking them to log into a second place.\"" },
    { label: "DaaS mode toggle", text: "\"Dashboard hidden. Clean data feed plus accuracy SLA. For the enterprise IT buyer who already has a BI system — this is a data provider relationship, not a platform relationship.\"" },
  ]},
  { stop: "6", title: "Persona Switcher", time: "0.5 min", color: "#0f172a", steps: [
    { label: "Switch to Franchise", text: "\"Same platform, different lens. Franchise owner view shows their stores against five matched peers — similar format, market size, tenure — not against the whole chain. A franchise owner who's 20% below peer conversion doesn't know it today.\"" },
  ]},
];

const DemoScriptModal: React.FC<DemoScriptModalProps> = ({ onClose }) => (
  <div
    style={{ position: "fixed", inset: 0, background: "rgba(0,0,0,0.5)", zIndex: 200, display: "flex", alignItems: "center", justifyContent: "center" }}
    onClick={onClose}
  >
    <div
      style={{ background: "white", borderRadius: 12, width: 720, maxHeight: "85vh", display: "flex", flexDirection: "column", overflow: "hidden" }}
      onClick={(e) => e.stopPropagation()}
    >
      <div style={{ padding: "20px 24px", borderBottom: "1px solid #e2e8f0", display: "flex", alignItems: "center", justifyContent: "space-between", flexShrink: 0 }}>
        <div>
          <div style={{ fontSize: 18, fontWeight: 700, color: "#0f172a" }}>Demo Script</div>
          <div style={{ fontSize: 13, color: "#64748b", marginTop: 2 }}>Store Eagle — Prototype walkthrough · ~12 minutes</div>
        </div>
        <button onClick={onClose} style={{ border: "none", background: "none", cursor: "pointer", fontSize: 20, color: "#94a3b8", lineHeight: 1 }}>✕</button>
      </div>
      <div style={{ overflowY: "auto", padding: "24px", fontSize: 14, lineHeight: 1.7, color: "#334155" }}>
        {demoStops.map(({ stop, title, time, color, steps }) => (
          <div key={stop} style={{ marginBottom: 28 }}>
            <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 12 }}>
              <div style={{ width: 28, height: 28, borderRadius: "50%", background: color, color: "white", fontSize: 13, fontWeight: 700, display: "flex", alignItems: "center", justifyContent: "center", flexShrink: 0 }}>
                {stop}
              </div>
              <div style={{ fontWeight: 700, fontSize: 15, color: "#0f172a" }}>{title}</div>
              <div style={{ marginLeft: "auto", fontSize: 12, color: "#94a3b8", fontWeight: 500 }}>{time}</div>
            </div>
            {steps.map(({ label, text }, i) => (
              <div key={i} style={{ display: "flex", gap: 10, marginBottom: 10, paddingLeft: 38 }}>
                <div style={{ flexShrink: 0, marginTop: 2 }}>
                  <div style={{ width: 6, height: 6, borderRadius: "50%", background: color, marginTop: 6 }} />
                </div>
                <div>
                  <div style={{ fontSize: 11, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.05em", color, marginBottom: 3 }}>{label}</div>
                  <div style={{ color: "#475569", fontStyle: "italic" }}>{text}</div>
                </div>
              </div>
            ))}
          </div>
        ))}
        <div style={{ borderTop: "1px solid #e2e8f0", paddingTop: 16, marginTop: 4, fontSize: 13, color: "#64748b" }}>
          <strong style={{ color: "#0f172a" }}>Close:</strong> "Everything you've seen runs on infrastructure that's already deployed. AI Store Insights activates as a subscription on existing sensors. Lift Labs is a SKU with a different buyer and a different budget conversation. The platform isn't missing capability — it's missing the surface that makes the capability visible to the right buyer."
        </div>
      </div>
    </div>
  </div>
);

export default DemoScriptModal;
