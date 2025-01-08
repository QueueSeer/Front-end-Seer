import React from "react";
import { Link, useLocation } from "react-router-dom";

const StatusButtons = () => {
  const location = useLocation(); // ตรวจสอบ path ปัจจุบัน

  // ตัวเลือกหน้า
  const pages = [
    { id: "drafting", label: "กำลังร่าง", path: "/package" },
    { id: "drafted", label: "ร่างแล้ว", path: "/package/drafted" },
    { id: "published", label: "เผยแพร่แล้ว", path: "/package/published" },
    { id: "hidden", label: "แพ็กเกจที่ซ่อนไว้", path: "/package/hiddenPackage" },
  ];

  return (
    <div className="flex space-x-6 pt-10 justify-center items-center">
      {pages.map((page) => (
        <Link to={page.path} key={page.id}>
          <button
            className={`py-2 w-[150px] rounded-full shadow focus:outline-none ${
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
