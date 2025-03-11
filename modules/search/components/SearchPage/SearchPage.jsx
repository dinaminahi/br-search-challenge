"use client";
import { AutocompleteInput, DebouncedInput } from "@/modules/shared/components";
import { SearchResults } from "./components/SearchResults";
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const SearchPage = ({ searchResults, searchState }) => {
  console.log("SearchPage Props", searchResults, searchState);
  const searchParams = useSearchParams();

  const retreatId = searchParams.get("retreat_id");

  const retreatData = searchResults.hits?.find(
    (retreat) => retreat.id === Number(retreatId)
  );

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
      <div
        className={`space-y-4 mx-auto max-w-6xl sm:p-6 ${
          retreatId && "flex gap-5"
        }`}
      >
        <div className={`${retreatId ? "w-2/3" : "w-full"}`}>
          {searchResults?.hits?.length ? (
            <SearchResults results={searchResults?.hits} />
          ) : (
            <h1 className="text-lg text-gray-700">No results...</h1>
          )}
        </div>

        {retreatId && (
          <div className={`${retreatId && "w-1/3"}`}>
            <div className="sticky top-96">
              <h4 className="text-lg font-bold">{retreatData?.name}</h4>
              <div className="flex gap-4 text-base text-gray-500">
                <p>{retreatData?.location[0]}</p>
                <p>{retreatData?.rating} out of {retreatData?.reviewCount} reviews</p>
              </div>
              <Link href={`/r/${retreatData.alias}`} className="text-base font-bold text-gray-700">View retreat</Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
