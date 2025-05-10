import React from "react";
import { formatDateRange } from "@/modules/shared/utils/jsUtils";

function SearchResultCard({ item }) {
  return (
    <li
      className="flex flex-row items-end gap-6 shadow-lg rounded-lg p-4 w-[calc(100%-20px)] md:w-[calc(100%/2-20px)] lg:w-[calc(100%/3-20px)] h-64 bg-cover bg-center bg-no-repeat"
      style={{
        backgroundImage: `url("https://bookretreats.com/cdn-cgi/image/width=1200,quality=65,f=auto,sharpen=1,fit=cover,gravity=auto${item.photos[0]?.url}")`,
      }}
    >
      <div className="flex flex-col bg-white rounded-lg p-4 w-full justify-between h-1/2 gap-1.5">
        <strong className="text-xs font-semibold text-gray-900">
          {item.name}
        </strong>
        <p className="flex gap-4 text-xs font-medium justify-between">
          <span className="line-clamp-1 w-1/2 h-[1rem]">{item.location?.[0]}</span>
          <span >
            {formatDateRange(
              item.dates?.[0].startDate,
              item.dates?.[0].endDate
            )}
          </span>
        </p>
        <button className="w-full bg-gray-900 text-white px-2 py-1 rounded-[25px] text-sm leading-6">
          Book now
        </button>
      </div>
      {/* <div className="flex items-center justify-center gap-1">
        <div className="flex items-center justify-center gap-1 flex-col">
          <button className="min-w-32 bg-gray-900 text-white px-6 py-2 rounded-[25px] text-sm leading-6">
            Book now
          </button>
          <a href="#">See Details</a>
        </div>
      </div> */}
    </li>
  );
}

export default SearchResultCard;
