import ShowMoreSection from "@/modules/shared/components/ShowMoreSection";
import React from "react";

function Accommodation({ accommodation }) {
  return (
    <div className="m-2">
      <h5 className="text-base font-bold">{accommodation?.name}</h5>
      <img
        src={
          "https://bookretreats.com/cdn-cgi/image/width=1200,quality=65,f=auto,sharpen=1,fit=cover,gravity=auto" +
          accommodation?.photos[0]?.url
        }
        className={`object-cover`}
        alt={accommodation?.photos[0]?.altText}
      />
      <ShowMoreSection
        sectionTitle={accommodation?.name}
        sectionText={accommodation?.description}
      />
    </div>
  );
}

export default Accommodation;
