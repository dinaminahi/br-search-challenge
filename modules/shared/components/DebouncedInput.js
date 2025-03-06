import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useCallback, useEffect, useState } from "react";
import { useDebounce } from "@/modules/shared/hooks";

export function DebouncedInput({ label, urlKey, initialValue }) {
  const [query, setQuery] = useState(initialValue ?? "");
  const debouncedQuery = useDebounce(query, 500);

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

  useEffect(() => {
    const newQueryString = createQueryString(urlKey, debouncedQuery);
    router.push(`${pathname}?${newQueryString}`);
  }, [debouncedQuery]);

  return (
    <div className="relative w-full md:w-48">
      <label className="block mb-1 text-gray-600">{label}</label>
      <input
        type="text"
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className="w-full p-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
      />
    </div>
  );
}
