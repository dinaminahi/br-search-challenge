import React from "react";
import { SearchResultCard } from "../SearchResultCard";

function SearchResultCardList({ items }) {
  return (
    <ul className="flex flex-wrap justify-between gap-5 list-disc list-inside text-sm text-gray-700 leading-relaxed">
      {items?.map((item) => (
        <SearchResultCard key={item.id} item={item} />
      ))}
    </ul>
  );
}

export default SearchResultCardList;
