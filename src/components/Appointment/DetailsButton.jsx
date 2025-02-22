import React from "react";

const DetailsButton = () => {
  return (
    <button className="flex items-center text-sm text-white opacity-80 hover:opacity-100 space-x-2">
      <span>รายละเอียด</span>
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={1.5}
        stroke="currentColor"
        className="w-6 h-6"
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M8.25 4.5l7.5 7.5-7.5 7.5" />
      </svg>
    </button>
  );
};

export default DetailsButton;
