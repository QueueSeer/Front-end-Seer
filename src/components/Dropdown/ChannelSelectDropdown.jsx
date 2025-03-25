import React, { useState, useEffect } from "react";

const ChannelSelectDropdown = ({ selectedChannel, onChannelChange }) => {
  // ตั้งค่าเริ่มต้นให้ selectedChannel เป็น "chat" ถ้าไม่มีค่า
  const [channel, setChannel] = useState(selectedChannel || "chat");
  const [isOpen, setIsOpen] = useState(false); // สร้างสถานะเพื่อควบคุมการแสดงผลของ Dropdown

  const options = [
    { value: "chat", label: "ช่องทางสนทนา (chat)" },
    { value: "phone", label: "การโทร (call)" },
    { value: "video", label: "การวิดีโอคอล (video call)" },
  ];

  useEffect(() => {
    // อัปเดตค่า selectedChannel เมื่อมันมีการเปลี่ยนแปลงจาก parent component
    if (selectedChannel) {
      setChannel(selectedChannel);
    }
  }, [selectedChannel]);

  // ฟังก์ชันจัดการการเลือกช่องทาง
  const handleSelect = (option) => {
    if (onChannelChange) {
      onChannelChange(option.value); // ส่งค่า value ของช่องทางไปยัง parent component
      setChannel(option.value); // อัปเดต channel ในสถานะ
      setIsOpen(false); // ปิด Dropdown เมื่อเลือกช่องทาง
    }
  };

  // ฟังก์ชันเปิด/ปิด Dropdown
  const toggleDropdown = () => {
    setIsOpen(!isOpen);
  };

  return (
    <div className="relative inline-block text-left w-full">
      {/* Dropdown Button */}
      <button
        onClick={toggleDropdown} // เมื่อคลิกที่ปุ่มจะ toggle การเปิด/ปิดเมนู
        className="flex items-center justify-between w-full px-4 py-3 text-black border rounded-md border-gray-300 shadow-sm focus:outline-none"
      >
        {options.find(option => option.value === channel)?.label || "เลือกช่องทาง"} {/* แสดงชื่อช่องทางที่เลือก */}
        <span className="transition-transform duration-200">
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
                onClick={() => handleSelect(option)} // เมื่อคลิกเลือกช่องทาง
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
