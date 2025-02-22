import React from "react";
import { Link, useLocation } from "react-router-dom";

const StatusButtons = () => {
  const location = useLocation(); // ตรวจสอบ path ปัจจุบัน

  // ตัวเลือกหน้า
  const pages = [
    { id: "Message", label: "ข้อความ", path: "/fortuneNow" },
    { id: "drafted", label: "ที่สร้างไว้", path: "/fortuneNow/drafted" },
   
  ];

  return (
    <div className="flex flex-wrap gap-5 pt-10 justify-center items-center pb-8">
      {pages.map((page) => (
        <Link to={page.path} key={page.id}>
          <button
            className={`py-2 lg:w-[160px] px-12 rounded-full shadow focus:outline-none ${
              location.pathname === page.path
                ? "bg-secondary2 text-white"
                : "bg-gray-200 text-gray-600 hover:bg-gray-300"
            }`}
          >
            {page.label}
          </button>
        </Link>
      ))}
    </div>
  );
};

export default StatusButtons;
