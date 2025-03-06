import { formatDateRange } from "@/modules/shared/utils/jsUtils";
import React from "react";

function SearchResultList({ items }) {
  return (
    <ul className="list-disc list-inside text-sm text-gray-700 leading-relaxed">
      {items?.map((item) => (
        <li
          key={item.id}
          className="flex flex-col gap-2 shadow-lg rounded-lg p-4"
        >
          <strong className="text-base">{item.name}</strong>
          {formatDateRange(item.dates?.[0].startDate, item.dates?.[0].endDate)}
        </li>
      ))}
    </ul>
  );
}

export default SearchResultList;
