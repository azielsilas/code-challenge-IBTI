import React from "react";

import { ReportPayloadRaw } from "@domain/report/model";
import { normalizeReport } from "@domain/report/normalize";
import { ReportSectionRenderer } from "@features/report-view/section-renderer/renderSection";

type ResultViewProps = {
  data: ReportPayloadRaw;
};

export default function ResultView({ data }: ResultViewProps) {
  const normalizedReport = normalizeReport(data);
  const title =
    normalizedReport.title.trim().length > 0
      ? normalizedReport.title
      : "Untitled report";

  return (
    <div>
      <h1>{title}</h1>
      {normalizedReport.sections.map((section) => (
        <ReportSectionRenderer key={section.key} section={section} />
      ))}
    </div>
  );
}
