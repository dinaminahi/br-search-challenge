"use client";
import { formatDateRange } from "@/modules/shared/utils/jsUtils";
import { AutocompleteInput, DebouncedInput } from "../../shared/components";

const SearchPage = ({ searchResults, searchState }) => {
  console.log("SearchPage Props", searchResults, searchState);

  return (
    <div className="max-w-5xl mx-5 my-5">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mx-auto mb-5">
        <AutocompleteInput
          label="category"
          initialValue={searchState.scopes.category}
          apiEndpoint="/api/categories"
          getOptionLabel={(item) => item.name}
          getSuggestionValue={(item) => item.name}
        />
        <AutocompleteInput
          label="location"
          apiEndpoint="/api/locations"
          initialValue={searchState.scopes.location}
          getOptionLabel={(item) => item.label}
          getSuggestionValue={(item) => item.label} // add for 2 level
        />
        <DebouncedInput
          label="keywords"
          urlKey="searchQuery"
          initialValue={searchState.searchQuery}
        />
      </div>
      <div class="space-y-4 p-6 max-w-2xl mx-auto">
        {searchResults?.hits.length ? (
          <h1 className="text-lg text-gray-700">Results:</h1>
        ) : (
          <h1 className="text-lg text-gray-700">No results...</h1>
        )}
        <ul class="list-disc list-inside text-sm text-gray-700 leading-relaxed">
          {searchResults?.hits?.map((item) => (
            <li
              key={item.id}
              className="flex flex-col gap-2 shadow-lg rounded-lg p-4"
            >
              <strong className="text-base">{item.name}</strong>
              {formatDateRange(
                item.dates?.[0].startDate,
                item.dates?.[0].endDate
              )}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default SearchPage;
