import React from "react";

import { UnknownSection as UnknownSectionModel } from "@domain/report/model";

type UnknownSectionViewProps = {
  section: UnknownSectionModel;
};

export function UnknownSectionView({ section }: UnknownSectionViewProps) {
  return (
    <section aria-label="Unsupported section">
      <p>Section unavailable.</p>
      <small>
        {section.originalType
          ? `Type: ${section.originalType}. `
          : ""}
        {section.reason}
      </small>
    </section>
  );
}
