import React from "react";
import { SearchResultRowList } from "../SearchResultRowList";
import { ToggleButton } from "@/modules/shared/components";
import { useToggle } from "@/modules/shared/hooks";
import { SearchResultCardList } from "../SearchResultCardList";

function SearchResults({ results }) {
  const [isRowList, toggler] = useToggle(false);

  return (
    <div>
      <div className="flex justify-between mb-5">
        <h1 className="text-lg text-gray-700">Results:</h1>
        <div className="flex gap-4">
          <ToggleButton isOn={isRowList} onClick={toggler} />{" "}
          {isRowList ? "Card" : "Row"}
        </div>
      </div>
      {isRowList ? (
        <SearchResultRowList items={results} />
      ) : (
        <SearchResultCardList items={results} />
      )}
    </div>
  );
}

export default SearchResults;
