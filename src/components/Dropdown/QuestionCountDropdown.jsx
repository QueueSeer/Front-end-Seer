import React, { useState, useEffect } from "react";

const QuestionCountDropdown = ({ onQuestionCountChange }) => {
  const options = [
    { value: "1", label: "1 คำถาม" },
    { value: "2", label: "2 คำถาม" },
    { value: "3", label: "3 คำถาม" },
    { value: "4", label: "4 คำถาม" },
    { value: "5", label: "5 คำถาม" },
    { value: "6", label: "6 คำถาม" },
    { value: "99", label: "ไม่จำกัดคำถาม" }
  ];

  const [selectedCount, setSelectedCount] = useState(options[0]); // ค่าเริ่มต้นจาก options ที่เลือก "1 คำถาม"
  const [isOpen, setIsOpen] = useState(false);

  // ส่งค่าเริ่มต้นไปยังฟังก์ชัน onQuestionCountChange เมื่อคอมโพเนนต์ถูกโหลด
  useEffect(() => {
    if (onQuestionCountChange) {
      onQuestionCountChange(1); // ค่าเริ่มต้นคือ 1 คำถาม
    }
  }, [onQuestionCountChange]);

  // Toggle เปิด/ปิดเมนู
  const toggleDropdown = () => setIsOpen(!isOpen);

  // ฟังก์ชันจัดการการเลือกจำนวนคำถาม
  const handleSelect = (option) => {
    setSelectedCount(option); // อัปเดตค่าที่เลือก
    setIsOpen(false); // ปิดเมนู

    // ส่งค่าไปยังฟังก์ชันพาเรนต์
    let questionCount = option.value === "99" ? 99 : parseInt(option.value); // ส่งค่า 99 สำหรับ "ไม่จำกัดคำถาม"

    if (onQuestionCountChange) {
      onQuestionCountChange(questionCount);
    }
  };

  return (
    <div className="relative inline-block text-left w-full">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-3 text-black border rounded-md border-gray-300 shadow-sm focus:outline-none"
      >
        {selectedCount.label}
        <span
          className={`transition-transform duration-200 ${isOpen ? "rotate-180" : "rotate-0"}`}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="size-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="m19.5 8.25-7.5 7.5-7.5-7.5"
            />
          </svg>
        </span>
      </button>

      {/* Dropdown Menu */}
      {isOpen && (
        <div className="absolute z-10 mt-2 bg-white border border-gray-200 rounded-md shadow-lg w-full">
          <ul className="py-1">
            {options.map((option) => (
              <li
                key={option.value}
                className="px-6 py-2 text-sm text-gray-700 hover:bg-gray-100 cursor-pointer"
                onClick={() => handleSelect(option)}
              >
                {option.label}
              </li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default QuestionCountDropdown;
