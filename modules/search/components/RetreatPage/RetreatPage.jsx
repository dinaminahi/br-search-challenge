import ShowMoreSection from "@/modules/shared/components/ShowMoreSection";
import React from "react";
import { Accommodation } from "./components/Accommodation";

const gridData = [
  "row-span-2 col-span-4",
  "row-span-1 col-span-2",
  "row-span-1 col-span-1",
  "row-span-1 col-span-1",
];

function RetreatPage({ retreatData }) {
  console.log(retreatData);

  const { photos } = retreatData || {};
  return (
    <div className="max-w-5xl mx-5 lg:mx-auto my-5">
      <h4 className="text-lg font-bold">{retreatData?.title}</h4>
      <div className="flex gap-4 text-base text-gray-500">
        <p>{retreatData?.location?.fullName}</p>
        <p>
          {retreatData?.rating} out of {retreatData?.reviewCount} reviews
        </p>
      </div>
      <div className="grid grid-cols-6 grid-rows-2">
        {photos?.slice(0, 4).map((photo, index) => {
          return (
            <img
              key={photo.id}
              src={
                "https://bookretreats.com/cdn-cgi/image/width=1200,quality=65,f=auto,sharpen=1,fit=cover,gravity=auto" +
                photo?.url
              }
              className={`object-cover h-full ${gridData[index]}`}
              alt={photo?.altText}
            />
          );
        })}
      </div>
      <div>
        <ShowMoreSection
          sectionTitle={"Description"}
          sectionText={retreatData?.description}
        />
      </div>

      <div className="grid grid-cols-3">
        {retreatData?.accommodations?.map((accommodation) => (
          <Accommodation key={accommodation.id} accommodation={accommodation} />
        ))}
      </div>
    </div>
  );
}

export default RetreatPage;
