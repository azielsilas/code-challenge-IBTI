import React from "react";

import { ReportSectionNormalized } from "@domain/report/model";
import { renderSection } from "@features/report-view/section-renderer/registry";

type ReportSectionRendererProps = {
  section: ReportSectionNormalized;
};

export function ReportSectionRenderer({ section }: ReportSectionRendererProps) {
  return <>{renderSection(section)}</>;
}
