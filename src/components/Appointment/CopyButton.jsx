import React, { useState } from "react";

const CopyButton = ({ text, isCopied, onCopy }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  return (
    <button
      className={`w-[120px] h-[36px] py-1 rounded-full shadow-sm border border-gray-300 flex items-center justify-center space-x-2 ${
        isCopied
          ? "bg-secondary2 text-white"
          : isHovered
          ? "bg-secondary2 text-white"
          : "bg-white text-secondary2"
      } ${!isHovered && !isCopied ? "pl-6 pr-4" : ""}`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={onCopy} // คลิกคัดลอก
    >
      <p className="text-[14px] font-bold">
        {isCopied ? "คัดลอกแล้ว" : isHovered ? "คัดลอก" : text}
      </p>
      {!isHovered && !isCopied && (
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="#420F75"
          className="size-6"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
          />
        </svg>
      )}
    </button>
  );
};

export default CopyButton;
