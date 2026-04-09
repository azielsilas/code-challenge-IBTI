export type PrimitiveSectionType =
  | "text"
  | "list"
  | "highlight"
  | "callout"
  | "metric";

export type ReportSectionType = PrimitiveSectionType | "unknown";

export type RawListItem = string | { text?: unknown; meta?: unknown };

export type ReportSectionRaw = {
  id?: unknown;
  type?: unknown;
  content?: unknown;
  body?: unknown;
  items?: unknown;
  severity?: unknown;
  icon?: unknown;
  label?: unknown;
  value?: unknown;
  payload?: unknown;
};

export type ReportPayloadRaw = {
  title?: unknown;
  sections?: unknown;
};

export type TextSection = {
  key: string;
  type: "text";
  content: string;
};

export type ListSectionItem = {
  text: string;
  meta?: string;
};

export type ListSection = {
  key: string;
  type: "list";
  items: ListSectionItem[];
};

export type HighlightSection = {
  key: string;
  type: "highlight";
  content: string;
};

export type CalloutSeverity = "info" | "warning" | "critical";

export type CalloutSection = {
  key: string;
  type: "callout";
  content: string;
  severity?: CalloutSeverity;
  icon?: string;
};

export type MetricSection = {
  key: string;
  type: "metric";
  label: string;
  value: string;
};

export type UnknownSection = {
  key: string;
  type: "unknown";
  originalType?: string;
  reason: string;
};

export type ReportSectionNormalized =
  | TextSection
  | ListSection
  | HighlightSection
  | CalloutSection
  | MetricSection
  | UnknownSection;

export type ReportPayloadNormalized = {
  title: string;
  sections: ReportSectionNormalized[];
};
