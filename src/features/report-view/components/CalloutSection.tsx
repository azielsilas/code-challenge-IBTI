import React from "react";

import { CalloutSection as CalloutSectionModel } from "@domain/report/model";

type CalloutSectionViewProps = {
  section: CalloutSectionModel;
};

const severityPrefixByType: Record<NonNullable<CalloutSectionModel["severity"]>, string> = {
  info: "Info",
  warning: "Warning",
  critical: "Critical",
};

export function CalloutSectionView({ section }: CalloutSectionViewProps) {
  const severityPrefix = section.severity ? severityPrefixByType[section.severity] : "Notice";
  const iconPrefix = section.icon ? `[${section.icon}] ` : "";

  return (
    <aside>
      <strong>{`${severityPrefix}: `}</strong>
      <span>{`${iconPrefix}${section.content}`}</span>
    </aside>
  );
}
