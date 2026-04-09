import React from "react";

import {
  CalloutSection,
  HighlightSection,
  ListSection,
  MetricSection,
  ReportSectionNormalized,
  ReportSectionType,
  TextSection,
  UnknownSection,
} from "@domain/report/model";
import { CalloutSectionView } from "@features/report-view/components/CalloutSection";
import { HighlightSectionView } from "@features/report-view/components/HighlightSection";
import { ListSectionView } from "@features/report-view/components/ListSection";
import { MetricSectionView } from "@features/report-view/components/MetricSection";
import { TextSectionView } from "@features/report-view/components/TextSection";
import { UnknownSectionView } from "@features/report-view/components/UnknownSection";

type SectionRenderer = (section: ReportSectionNormalized) => React.ReactNode;

type SectionRendererRegistry = Record<ReportSectionType, SectionRenderer>;

const sectionRendererRegistry: SectionRendererRegistry = {
  text: (section) => <TextSectionView section={section as TextSection} />,
  list: (section) => <ListSectionView section={section as ListSection} />,
  highlight: (section) => (
    <HighlightSectionView section={section as HighlightSection} />
  ),
  callout: (section) => <CalloutSectionView section={section as CalloutSection} />,
  metric: (section) => <MetricSectionView section={section as MetricSection} />,
  unknown: (section) => <UnknownSectionView section={section as UnknownSection} />,
};

export function renderSection(section: ReportSectionNormalized): React.ReactNode {
  const renderer =
    sectionRendererRegistry[section.type] ?? sectionRendererRegistry.unknown;
  return renderer(section);
}
