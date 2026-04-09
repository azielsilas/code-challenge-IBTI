import React from "react";

import { ListSection as ListSectionModel } from "@domain/report/model";

type ListSectionViewProps = {
  section: ListSectionModel;
};

export function ListSectionView({ section }: ListSectionViewProps) {
  if (section.items.length === 0) {
    return <p>List section has no items.</p>;
  }

  return (
    <ul>
      {section.items.map((item, index) => {
        const itemKey = `${section.key}:item:${index}`;
        return (
          <li key={itemKey}>
            <span>{item.text}</span>
            {item.meta ? <small>{` (${item.meta})`}</small> : null}
          </li>
        );
      })}
    </ul>
  );
}
