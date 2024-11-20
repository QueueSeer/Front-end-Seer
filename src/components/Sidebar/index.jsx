import React, { useState, useEffect } from "react";
import SidebarItem from "./SidebarItem";
import menuItems from "./MenuItems";
import { useLocation } from "react-router-dom"; // เพิ่ม useLocation

const Sidebar = () => {
  const location = useLocation(); // ใช้ location เพื่อตรวจสอบ URL ปัจจุบัน
  const [activeIndex, setActiveIndex] = useState(0);

  // อัปเดต activeIndex ตาม URL ปัจจุบัน
  useEffect(() => {
    const currentIndex = menuItems.findIndex((item) => item.href === location.pathname);
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]); // ทำงานเมื่อ URL เปลี่ยน

  return (
    <div className="px-12 pt-12">
      <div className="p-3 w-72  rounded-lg border border-gray-200 h-screen flex flex-col justify-between">
        <ul className="space-y-2 ">
          {menuItems.map((item, index) => (
            <SidebarItem
              key={index}
              icon={item.icon}
              text={item.text}
              href={item.href}
              isActive={activeIndex === index}
              onClick={() => setActiveIndex(index)}
            />
          ))}
        </ul>
        <div className="p-3">
          <a
            href="#"
            className="flex items-center justify-center p-3 text-red-500 hover:bg-red-100"
          >
            <span className="material-icons-outlined">logout</span>
            <span className="ml-3">ออกจากระบบ</span>
          </a>
        </div>
      </div>
    </div>
  );
};

export default Sidebar;
