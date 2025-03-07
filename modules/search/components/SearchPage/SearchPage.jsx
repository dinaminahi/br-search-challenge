"use client";
import { AutocompleteInput, DebouncedInput } from "@/modules/shared/components";
import { SearchResults } from "./components/SearchResults";

const SearchPage = ({ searchResults, searchState }) => {
  console.log("SearchPage Props", searchResults, searchState);

  return (
    <div className="mx-5 md:mx-auto my-5">
      <div className="flex flex-col md:flex-row items-center justify-center gap-4 mx-auto mb-5">
        <AutocompleteInput
          label="category"
          initialValue={searchState?.scopes?.category}
          apiEndpoint="/api/categories"
          getOptionLabel={(item) => item.name}
          getSuggestionValue={(item) => item.name}
        />
        <AutocompleteInput
          label="location"
          apiEndpoint="/api/locations"
          initialValue={searchState?.scopes?.location}
          getOptionLabel={(item) => item.label}
          getSuggestionValue={(item) => item.label}
        />
        <DebouncedInput
          label="keywords"
          urlKey="searchQuery"
          initialValue={searchState?.searchQuery}
        />
      </div>
      <div className="space-y-4 mx-auto max-w-6xl sm:p-6">
        {searchResults?.hits?.length ? (
          <SearchResults results={searchResults?.hits} />
        ) : (
          <h1 className="text-lg text-gray-700">No results...</h1>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
