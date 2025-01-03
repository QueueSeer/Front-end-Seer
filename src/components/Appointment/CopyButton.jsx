import React, { useState } from "react";

const CopyButton = ({ text, isCopied, onCopy }) => {
  const [isHovered, setIsHovered] = useState(false);

  const handleMouseEnter = () => setIsHovered(true);
  const handleMouseLeave = () => setIsHovered(false);

  const handleCopy = async (e) => {
    e.stopPropagation(); // ป้องกันการคลิกในส่วนอื่น เช่น Card
    try {
      await navigator.clipboard.writeText(text); // คัดลอกข้อความไปยัง clipboard
      onCopy(); // อัปเดตสถานะการคัดลอก
    } catch (err) {
      console.error("Failed to copy text: ", err);
    }
  };

  return (
    <button
      className={`w-[120px] h-[36px] py-1 rounded-full shadow-sm border flex items-center justify-center ${
        isCopied
          ? "bg-secondary2 text-white"
          : isHovered
          ? "bg-secondary2 text-white"
          : "bg-white text-secondary2"
      }`}
      onMouseEnter={handleMouseEnter}
      onMouseLeave={handleMouseLeave}
      onClick={handleCopy} // ใช้ handleCopy แทน
    >
      <p className="text-[14px] font-bold">
        {isCopied ? "คัดลอกแล้ว" : isHovered ? "คัดลอก" : text}
      </p>
    </button>
  );
};

export default CopyButton;
