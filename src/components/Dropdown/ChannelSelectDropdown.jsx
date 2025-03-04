import React, { useState } from "react";

const ChannelSelectDropdown = ({ onChannelChange }) => {
  const options = [
    { value: "chat", label: "ช่องทางสนทนา" },
    { value: "phone", label: "การโทร" },
    { value: "video", label: "การวิดีโอคอล" },
  ];

  const [selectedChannel, setSelectedChannel] = useState(options[0].label); // ค่าเริ่มต้นจาก options
  const [isOpen, setIsOpen] = useState(false);

  // Toggle เปิด/ปิดเมนู
  const toggleDropdown = () => setIsOpen(!isOpen);

  // ฟังก์ชันจัดการการเลือกช่องทาง
  const handleSelect = (option) => {
    setSelectedChannel(option.label); // อัปเดตค่าที่เลือก
    setIsOpen(false); // ปิดเมนู

    // ส่งค่าไปยังฟังก์ชันพาเรนต์
    if (onChannelChange) {
      onChannelChange(option.value); // ส่งค่า value ของช่องทาง
    }
  };

  return (
    <div className="relative inline-block text-left w-full">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown}
        className="flex items-center justify-between w-full px-4 py-3 text-black border rounded-md border-gray-300 shadow-sm focus:outline-none"
      >
        {selectedChannel}
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

export default ChannelSelectDropdown;
