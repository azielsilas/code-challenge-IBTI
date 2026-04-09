import React from "react";

import { TextSection as TextSectionModel } from "@domain/report/model";

type TextSectionViewProps = {
  section: TextSectionModel;
};

export function TextSectionView({ section }: TextSectionViewProps) {
  return <p>{section.content}</p>;
}
