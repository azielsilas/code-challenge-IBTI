import {
  CalloutSection,
  CalloutSeverity,
  ListSection,
  ListSectionItem,
  MetricSection,
  ReportPayloadNormalized,
  ReportPayloadRaw,
  ReportSectionNormalized,
  ReportSectionRaw,
} from "@domain/report/model";

const SUPPORTED_SECTION_TYPES = new Set([
  "text",
  "list",
  "highlight",
  "callout",
  "metric",
]);

function toNonEmptyString(value: unknown): string | undefined {
  if (typeof value !== "string") {
    return undefined;
  }

  const trimmed = value.trim();
  return trimmed.length > 0 ? trimmed : undefined;
}

function toStringOrEmpty(value: unknown): string {
  return typeof value === "string" ? value : "";
}

function toCalloutSeverity(value: unknown): CalloutSeverity | undefined {
  if (value === "info" || value === "warning" || value === "critical") {
    return value;
  }
  return undefined;
}

function toSectionKey(section: ReportSectionRaw, index: number): string {
  const rawId = section.id;
  if (typeof rawId === "string" && rawId.trim().length > 0) {
    return `${rawId}:${index}`;
  }

  return `section:${index}`;
}

function normalizeListItems(rawItems: unknown): ListSectionItem[] {
  if (!Array.isArray(rawItems)) {
    return [];
  }

  return rawItems.reduce<ListSectionItem[]>((accumulator, item) => {
    if (typeof item === "string") {
      accumulator.push({ text: item });
      return accumulator;
    }

    if (item && typeof item === "object") {
      const candidate = item as { text?: unknown; meta?: unknown };
      const text = toNonEmptyString(candidate.text);
      if (!text) {
        return accumulator;
      }

      const meta = toNonEmptyString(candidate.meta);
      accumulator.push(meta ? { text, meta } : { text });
    }

    return accumulator;
  }, []);
}

function normalizeCalloutSection(
  key: string,
  section: ReportSectionRaw,
): CalloutSection | ReportSectionNormalized {
  const content = toNonEmptyString(section.content);
  if (!content) {
    return {
      key,
      type: "unknown",
      originalType: "callout",
      reason: "Missing callout content",
    };
  }

  const severity = toCalloutSeverity(section.severity);
  const icon = toNonEmptyString(section.icon);

  return {
    key,
    type: "callout",
    content,
    severity,
    icon,
  };
}

function normalizeMetricSection(
  key: string,
  section: ReportSectionRaw,
): MetricSection | ReportSectionNormalized {
  const label = toNonEmptyString(section.label);
  const value = toNonEmptyString(section.value);

  if (!label || !value) {
    return {
      key,
      type: "unknown",
      originalType: "metric",
      reason: "Missing metric label/value",
    };
  }

  return {
    key,
    type: "metric",
    label,
    value,
  };
}

function normalizeSection(
  section: ReportSectionRaw,
  index: number,
): ReportSectionNormalized {
  const key = toSectionKey(section, index);
  const rawType = section.type;
  const sectionType = typeof rawType === "string" ? rawType : undefined;

  if (!sectionType) {
    return {
      key,
      type: "unknown",
      reason: "Missing section type",
    };
  }

  if (!SUPPORTED_SECTION_TYPES.has(sectionType)) {
    return {
      key,
      type: "unknown",
      originalType: sectionType,
      reason: "Unsupported section type",
    };
  }

  if (sectionType === "text") {
    const content = toNonEmptyString(section.content) ?? toNonEmptyString(section.body);
    if (!content) {
      return {
        key,
        type: "unknown",
        originalType: "text",
        reason: "Missing text content/body",
      };
    }

    return {
      key,
      type: "text",
      content,
    };
  }

  if (sectionType === "list") {
    const items = normalizeListItems(section.items);
    const normalizedList: ListSection = {
      key,
      type: "list",
      items,
    };
    return normalizedList;
  }

  if (sectionType === "highlight") {
    const content = toNonEmptyString(section.content);
    if (!content) {
      return {
        key,
        type: "unknown",
        originalType: "highlight",
        reason: "Missing highlight content",
      };
    }

    return {
      key,
      type: "highlight",
      content,
    };
  }

  if (sectionType === "callout") {
    return normalizeCalloutSection(key, section);
  }

  return normalizeMetricSection(key, section);
}

export function normalizeReport(
  payload: ReportPayloadRaw,
): ReportPayloadNormalized {
  const title = toStringOrEmpty(payload?.title);
  const rawSections = Array.isArray(payload?.sections) ? payload.sections : [];

  const sections = rawSections.reduce<ReportSectionNormalized[]>(
    (accumulator, section, index) => {
      if (!section || typeof section !== "object") {
        accumulator.push({
          key: `section:${index}`,
          type: "unknown",
          reason: "Invalid section payload",
        });
        return accumulator;
      }

      accumulator.push(normalizeSection(section as ReportSectionRaw, index));
      return accumulator;
    },
    [],
  );

  return {
    title,
    sections,
  };
}
