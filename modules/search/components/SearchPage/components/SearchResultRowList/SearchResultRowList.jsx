import React from "react";
import { SearchResultRow } from "../SearchResultRow";

function SearchResultRowList({ items }) {
  return (
    <ul className="flex flex-col gap-6 list-disc list-inside text-sm text-gray-700 leading-relaxed">
      {items?.map((item) => (
        <SearchResultRow key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default SearchResultRowList;
