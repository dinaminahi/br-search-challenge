"use client"
import React from "react";
import { useToggle } from "../hooks";

function ShowMoreSection({ sectionTitle, sectionText }) {
  const [isAllDescription, toggler] = useToggle(false);

  return (
    <div>
      <h4>{sectionTitle}</h4>
      <p
        className={`${!isAllDescription && "line-clamp-2"}`}
        dangerouslySetInnerHTML={{ __html: sectionText }}
      />
      <button onClick={toggler}>Show {isAllDescription ? "less" : "more"}</button>
    </div>
  );
}

export default ShowMoreSection;
