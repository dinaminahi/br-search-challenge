"use client";
import { AutocompleteInput, DebouncedInput } from "@/modules/shared/components";
import { SearchResultList } from "./components/SearchResultList";

const SearchPage = ({ searchResults, searchState }) => {
  console.log("SearchPage Props", searchResults, searchState);

  return (
    <div className="max-w-5xl mx-5 md:mx-auto my-5">
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
          getSuggestionValue={(item) => item.label}
        />
        <DebouncedInput
          label="keywords"
          urlKey="searchQuery"
          initialValue={searchState.searchQuery}
        />
      </div>
      <div className="space-y-4 p-6 max-w-2xl mx-auto">
        {searchResults?.hits.length ? (
          <>
            <h1 className="text-lg text-gray-700">Results:</h1>
            <SearchResultList items={searchResults.hits} />
          </>
        ) : (
          <h1 className="text-lg text-gray-700">No results...</h1>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
