import React from "react";
import { formatDateRange } from "@/modules/shared/utils/jsUtils";

function SearchResultRow({ item }) {
  return (
    <li className="flex flex-col md:flex-row justify-between gap-6 border border-gray-200 rounded-lg p-4">
      <img
        src={
          "https://bookretreats.com/cdn-cgi/image/width=1200,quality=65,f=auto,sharpen=1,fit=cover,gravity=auto" +
          item.photos[0]?.url
        }
        className="w-full md:w-[200px] h-[200px] object-cover rounded-lg"
        alt={item.photos[0]?.alt}
      />
      <div className="flex gap-5 flex-col justify-around">
        <strong className="text-base md:text-xl  lg:text-2xl font-semibold text-gray-900">
          {item.name}
        </strong>
        <p className="text-sm md:text-base text-gray-700 line-clamp-2">
          {item.description}
        </p>
        <p className="flex gap-4 text-sm font-semibold justify-between md:justify-normal">
          <span>{item.location?.[0]}</span>
          <span>
            {formatDateRange(
              item.dates?.[0].startDate,
              item.dates?.[0].endDate
            )}
          </span>
        </p>
      </div>
      <div className="flex items-center justify-center gap-1">
        <div className="w-full flex items-center justify-center gap-1 flex-col">
          <button className="w-full md:w-32 md:min-w-32 bg-gray-900 text-white px-6 py-2 rounded-[25px] text-sm leading-6">
            Book now
          </button>
          <a href="#">See Details</a>
        </div>
      </div>
    </li>
  );
}

export default SearchResultRow;
