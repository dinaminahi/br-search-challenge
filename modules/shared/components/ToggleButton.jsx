import React from "react";

export function ToggleButton({ isOn, onClick }) {
  return (
    <button
      onClick={onClick}
      className={`relative w-12 h-6 flex items-center rounded-full transition-colors ${
        isOn ? "bg-gray-900" : "bg-gray-400"
      }`}
    >
      <div
        className={`absolute w-5 h-5 bg-white rounded-full shadow-md transition-transform ${
          isOn ? "translate-x-6" : "translate-x-1"
        }`}
      />
    </button>
  );
}

