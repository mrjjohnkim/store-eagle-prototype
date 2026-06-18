# Store Eagle — Demo Script
### Prototype walkthrough · ~12 minutes

---

## Opening framing (30 seconds — say before touching the screen)

> "I want to show you what I think the platform looks like when it stops being a traffic counter and becomes a store performance system. Two new modules — **AI Store Insights** and **Lift Labs** — plus enhancements across the existing nav. I'll move fast; stop me anywhere."

---

## Stop 1 — AI Store Insights (3 min)

**What to show:** The new top nav item. Land here first.

**Talk track:**

> "This is the unified operational view — traffic, customer journey, and video evidence all in one surface. Today this data lives in three separate tabs with no connection between them. A manager has to go to Traffic for counts, Performance for conversion, and Video to see what actually happened. AI Store Insights closes that loop."

**Click the alert banner** ("Conversion dropped 22% — Pull Clip →"):

> "This is the key interaction. Customer Journey detected a conversion drop in Zone 3 between 2 and 3 PM. One click auto-retrieves the video clip from that window. The manager doesn't file a ticket or go hunting through 30-day retention — the system surfaces the evidence at the moment of the alert."

**Show the video clip modal:**

> "Same Aurora hardware. Same footage that's always been there. What's new is the connection — the analytic triggers the video, not the other way around. That's the coaching moment: you can see the associates were in the back room during a conversion dip. That's a conversation, not an investigation."

**Close the modal. Point to the zone map:**

> "The zone map shows dwell intensity and associate coverage simultaneously. Red border means high dwell with no coverage — that's your revenue leakage indicator. $1,240 today at Fashion Ave. That's the Store Ops framing: not shrink, not LP — margin leakage from an operational gap."

**Point to the Associate Zone Compliance panel:**

> "Two of five zones had coverage gaps during peak. That's the scheduling closure loop: Traffic predicts the busy window, workforce planning schedules for it, and this view confirms whether the associates were actually on the floor."

**Point to the Checkout Anomalies card:**

> "POS exception correlation — voids and overrides plotted against checkout traffic. Three exceptions in fifteen minutes at 1:30 PM, above twice the baseline rate. This is surfaced as a process management issue, not a theft event. Store Ops language, not LP language. Same data, different conversation."

---

## Stop 2 — Lift Labs (3 min)

**Navigate to Lift Labs (second item in nav).**

**Talk track:**

> "This is the fastest-growing product line — and it currently has no dedicated UI surface. It's buried in the Analytics tab. The corporate Store Development buyer who funds this work can't see their experiments without translating raw analytics data themselves."

**Click "NFL Season Activation" in the Completed tab:**

> "Lift Labs is built around the experiment, not the sensor. A Store Dev buyer doesn't think in sensor counts — they think in test versus control, before versus after, and 'did this activation justify the build cost?' This is the report they need to take to the CPO and say yes."

**Point to the lift report bars:**

> "Zone traffic up 24%, average dwell up from 2.1 to 3.8 minutes, conversion up 6 points. Those are the outputs. But the number that matters to the Store Development buyer is here —"

**Point to the Zone ROI card:**

> "$4,200 incremental revenue over the test period. $50,400 annualized. $12,600 per sensor. That's the sentence that unlocks the renewal conversation and the next deployment. It ties the sensor to a dollar figure the CFO can evaluate."

**Point to the annotation timeline:**

> "Event markers on the timeline. 'NFL kickoff, September 5. Fixture relocated, October 10.' Now the chart isn't just data — it's evidence that a specific decision drove a specific outcome. That's the capital justification story."

**Click "New Experiment":**

> "Four-step wizard. Hypothesis, test and control stores, date range, primary metric. Takes two minutes. The output is a structured brief that sets up the lift report automatically when the experiment closes. Store Dev doesn't need to know how the sensors work."

---

## Stop 3 — Performance enhancements (2 min)

**Navigate to Performance.**

**Talk track:**

> "Two changes here. First — the recommendation engine."

**Point to AI Recommendations section:**

> "The original prototype had three static bullet points that never changed: 'avoid scheduling lunch breaks during peak hours.' Every store, every day, same three lines. That reads as a feature today. In twelve months a competitor will use that slide against us. The diagnostic engine connects a specific metric signal to a specific action with a confidence score. 'Response time averaging 3.4 minutes in Section B — move one associate from the stockroom before 2 PM.' That's actionable. That's different store to store, shift to shift."

**Point to Revenue at Risk card:**

> "New KPI: Revenue at Risk. Fourteen customers who dwelled more than two minutes without associate contact and left without purchasing. That's the conversion gap made concrete — not a percentage, a dollar figure. $840 today. Store managers respond to that differently than a conversion rate."

**Point to the Power Hours signal toggles (Weather, Local Events, Promotions):**

> "Predictive traffic with external signals. Weather is default on — it was opt-in before, which means most stores weren't using it. Toggle Promotions on and the predicted visitor count updates to reflect the sale event. Hover over the number —"

**Hover over the predicted visitors number to show the signal hierarchy tooltip:**

> "Baseline 340, plus 15% Saturday, minus 8% rain, plus 22% sale event, equals 412 predicted. The manager sees the inputs, not just the output. That's the difference between a number they trust and a number they ignore."

**Point to Coaching Moments:**

> "Below the power hours chart — coaching moments. Metric events tied to video clip retrieval. Tuesday 2–3 PM, response time spike. Click 'Pull clip' and you're in the same video modal from AI Store Insights. The Performance tab and the Video tab are now connected."

---

## Stop 4 — Optimization: Employee Exclusion (1.5 min)

**Navigate to Optimization. Click the Employee Exclusion panel to expand it.**

**Talk track:**

> "Employee exclusion was described on the Verizon call as the reason a one-sensor solution might not work. It's been 'three years out' for three years. This panel makes it a configurable product feature instead of a per-customer engineering project."

**Toggle on the UWB Badge:**

> "Four badges registered at Fashion Ave — the beta is live. The callout tells you exactly where you are. Toggle on Shift Schedule Import —"

**Toggle on Shift Schedule:**

> "CSV upload or connect to HR system. Last sync timestamp shows you the data is fresh. These aren't separate IT projects — they're settings in the platform."

**Drag the Dwell Heuristic slider:**

> "For stores where UWB isn't deployed yet — a dwell threshold. 45 minutes continuous presence flagged as probable employee. Adjustable per store format."

**Point to the re-entry dedup row:**

> "Re-entry deduplication — session window controls. 60-minute window means a customer who steps out and comes back within an hour counts once. '~6.2% traffic reclassified' tells the manager exactly what impact this has on their numbers before they commit to it. Confidence intervals surface on every metric card when exclusion is active."

---

## Stop 5 — Admin: Integrations (1 min)

**Navigate to Admin Settings → Integrations tab.**

**Talk track:**

> "The Verizon workforce planning buyer doesn't want another dashboard. He said it directly: 'What this comes down to is whether there's a vendor that fits into our existing model.' This tab is the answer."

**Point to the WFP connector tiles:**

> "UKG connected. Kronos, Blue Yonder available. Workday coming soon. These are the four systems that run workforce planning at enterprise retailers. Pre-built certified integrations mean RetailNext data flows into the tool they already use — we're not asking them to log into a second place."

**Point to the Push API config:**

> "Configurable payload — raw counts, employee-excluded counts, or fully adjusted. Cadence from real-time to daily. Test Ping button."

**Toggle on DaaS mode:**

> "Data as a Service mode. Dashboard hidden. Clean data feed plus accuracy SLA. For the enterprise IT buyer who already has a BI system — this is a data provider relationship, not a platform relationship. Different packaging for a different buyer."

---

## Stop 6 — Persona switcher (30 seconds)

**Navigate back to Operations. Click "Franchise" in the persona switcher in the topbar.**

**Talk track:**

> "Last thing — the persona switcher. Same platform, different lens. Franchise owner view shows their stores against five matched peers — similar format, market size, tenure — not against the whole chain. A franchise owner who's 20% below peer conversion doesn't know it today. This surfaces it with one specific action recommendation. Corporate can send a coaching package directly from the platform. 340 independently owned stores — that's 340 separate buying decisions after the corporate mandate. This is how the platform stays relevant to each of them."

---

## Close (30 seconds)

> "Everything you've seen runs on infrastructure that's already deployed. AI Store Insights activates as a subscription on existing sensors. Lift Labs is a SKU with a different buyer and a different budget conversation. Employee exclusion is a settings panel, not a custom project. Integrations is a connection, not a build. The platform isn't missing capability — it's missing the surface that makes the capability visible to the right buyer. That's a product and packaging problem. And that's what I'd focus on first."

---

## Demo flow summary

| Stop | Screen | Key moment | Time |
|------|--------|-----------|------|
| 1 | AI Store Insights | Pull clip from alert banner; zone map revenue leakage | 3 min |
| 2 | Lift Labs | Zone ROI card; annotation timeline; wizard | 3 min |
| 3 | Performance | Diagnostic recs; revenue at risk; signal hierarchy tooltip | 2 min |
| 4 | Optimization | Employee exclusion panel toggle + slider | 1.5 min |
| 5 | Admin → Integrations | WFP connectors; DaaS mode toggle | 1 min |
| 6 | Operations (franchise) | Persona switcher | 0.5 min |

**Total: ~11–12 minutes.** Leave 3–4 minutes for questions after Stop 2 if the panel wants to linger on Lift Labs — that's usually where Store Dev buyers engage most.

---

*Confidential — Store Eagle interview prep.*
