"use client";
import { AutocompleteInput } from "../../shared/components";

const SearchPage = ({ searchResults, searchState }) => {
  console.log("SearchPage Props", searchResults, searchState);

  return (
    <div className="max-w-5xl mx-auto my-5">
      <div className="flex items-center justify-center gap-4 mx-auto mb-5">
        <AutocompleteInput
          label="category"
          apiEndpoint="/api/categories"
          getOptionLabel={(item) => item.name}
        />
        <AutocompleteInput
          label="location"
          apiEndpoint="/api/locations"
          getOptionLabel={(item) => item.label}
        />
      </div>
      {searchResults?.hits?.map((item) => (
        <p key={item.id}>{item.name}</p>
      ))}
    </div>
  );
};

export default SearchPage;
