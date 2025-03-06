import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDebounce } from "../hooks";

export function AutocompleteInput({
  label,
  apiEndpoint,
  initialValue,
  getOptionLabel,
  getSuggestionValue,
}) {
  const [query, setQuery] = useState(initialValue ?? "");
  const [suggestions, setSuggestions] = useState([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const [selectionMade, setSelectionMade] = useState(false);

  const debouncedQuery = useDebounce(query, 500);

  const inputRef = useRef(null);

  const router = useRouter();
  const pathname = usePathname();
  const searchParams = useSearchParams();

  const createQueryString = useCallback(
    (name, value) => {
      const params = new URLSearchParams(searchParams.toString());
      params.set(name, value);
      return params.toString();
    },
    [searchParams]
  );

  const handleSelectSuggestion = (item) => {
    setQuery(item.name);
    setShowDropdown(false);
    setSelectionMade(true);
    const newQueryString = createQueryString(
      `scopes[${label}]`,
      getSuggestionValue(item)
    );
    router.push(`${pathname}?${newQueryString}`);
  };

  const handleBlur = (event) => {
    if (!event.relatedTarget || !event.relatedTarget.closest(".dropdown")) {
      setShowDropdown(false);
    }
  };

  useEffect(() => {
    if (query.trim() === "") {
      setSuggestions([]);
      setShowDropdown(false);
      return;
    }

    if (selectionMade) {
      setSelectionMade(false);
      return;
    }

    const fetchSuggestions = async () => {
      try {
        const suggestionResponse = await fetch(`${apiEndpoint}?query=${query}`);
        const data = await suggestionResponse.json();
        setSuggestions(data.items);
        setShowDropdown(true);
      } catch (error) {
        console.error(`Error fetching ${label} suggestions:`, error);
      }
    };

    fetchSuggestions();
  }, [debouncedQuery, apiEndpoint]);

  return (
    <div className="relative w-full md:w-48">
      <label className="block mb-1 text-gray-600">{label}</label>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        ref={inputRef}
        onBlur={handleBlur}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
      {showDropdown && suggestions.length > 0 && (
        <ul className="absolute left-0 w-full mt-1 bg-white border rounded-lg shadow-md z-10">
          {suggestions.map((item, index) => (
            <li
              key={index}
              className="p-2 cursor-pointer hover:bg-gray-100"
              onClick={() => handleSelectSuggestion(item)}
              onMouseDown={(e) => e.preventDefault()}
            >
              {getOptionLabel(item)}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
