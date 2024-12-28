import React, { useState } from "react";
import dayjs from "dayjs"; // ใช้ dayjs เพื่อจัดการวันที่

const DateFilterDropdown = ({
  onFilterChange,
  options = ["วันนี้","พรุ่งนี้", "สัปดาห์นี้", "เดือนนี้", "ปีนี้"],
}) => {
  const [selectedFilter, setSelectedFilter] = useState(options[0]); // ค่าเริ่มต้นจาก options
  const [isOpen, setIsOpen] = useState(false);

  // Toggle เปิด/ปิดเมนู
  const toggleDropdown = () => setIsOpen(!isOpen);

  // ฟังก์ชันจัดการการเลือกตัวเลือก
  const handleSelect = (filter) => {
    setSelectedFilter(filter); // อัปเดตค่าที่เลือก
    setIsOpen(false); // ปิดเมนู

    let startDate, endDate;

    switch (filter) {
      case "วันนี้":
        startDate = dayjs().startOf("day").toISOString();
        endDate = dayjs().endOf("day").toISOString();
        break;

      case "พรุ่งนี้":
        startDate = dayjs().add(1, "day").startOf("day").toISOString();
        endDate = dayjs().add(1, "day").endOf("day").toISOString();
        break;

      case "สัปดาห์นี้":
        startDate = dayjs().startOf("week").toISOString();
        endDate = dayjs().endOf("week").toISOString();
        break;

      case "เดือนนี้":
        startDate = dayjs().startOf("month").toISOString();
        endDate = dayjs().endOf("month").toISOString();
        break;

      case "ปีนี้":
        startDate = dayjs().startOf("year").toISOString();
        endDate = dayjs().endOf("year").toISOString();
        break;

      default:
        startDate = null;
        endDate = null;
    }

    // ส่งค่าไปยังฟังก์ชันพาเรนต์
    if (onFilterChange) {
      onFilterChange({ filter, startDate, endDate });
    }
  };

  return (
    <div className="relative inline-block text-left">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-2 text-black border rounded-full border-purple-300 shadow-sm focus:outline-none"
      >
        {selectedFilter}
        <span
          className={`transition-transform duration-200 ${
            isOpen ? "rotate-180" : "rotate-0"
          }`}
        >
          ▼
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute right-0 z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-48">
          <ul className="py-1">
            {options.map((option, index) => (
              <li
                key={index}
                className="px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DateFilterDropdown;
