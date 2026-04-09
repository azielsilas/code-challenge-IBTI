import React from "react";

import { MetricSection as MetricSectionModel } from "@domain/report/model";

type MetricSectionViewProps = {
  section: MetricSectionModel;
};

export function MetricSectionView({ section }: MetricSectionViewProps) {
  return (
    <section aria-label={`Metric ${section.label}`}>
      <p>{section.label}</p>
      <strong>{section.value}</strong>
    </section>
  );
}
