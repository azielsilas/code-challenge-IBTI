import React from "react";

import { HighlightSection as HighlightSectionModel } from "@domain/report/model";

type HighlightSectionViewProps = {
  section: HighlightSectionModel;
};

export function HighlightSectionView({ section }: HighlightSectionViewProps) {
  return <strong>{section.content}</strong>;
}
