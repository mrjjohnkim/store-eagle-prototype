// Shared types for Store Eagle platform

export type PageId =
  | "ai-insights"
  | "lift-labs"
  | "operations"
  | "video"
  | "traffic"
  | "performance"
  | "optimization"
  | "benchmarks"
  | "analytics"
  | "reports"
  | "admin";

export type AdminSubPage =
  | "users"
  | "userProfiles"
  | "locations"
  | "health"
  | "cameras"
  | "exclusion"
  | "integrations";

export type Persona = "corporate" | "store-mgr" | "franchise";

export interface Alert {
  time: string;
  zone: string;
  severity: "high" | "medium" | "low";
  message: string;
  detail?: string;
  store?: string;
}

export interface VideoClipContext {
  zone: string;
  time: string;
  message: string;
  detail: string;
}

export interface NavItem {
  id: PageId;
  label: string;
  icon: string;
}

export interface ExperimentResult {
  labels: string[];
  test: number[];
  control: number[];
}

export interface Annotation {
  date: string;
  label: string;
}

export interface Experiment {
  id: string;
  name: string;
  stores: string;
  period: string;
  metric: string;
  status: "In progress" | "Complete" | "Draft";
  lift: string;
  results?: ExperimentResult;
  annotations?: Annotation[];
}
