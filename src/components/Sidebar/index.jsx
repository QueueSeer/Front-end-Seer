import React, { useState, useMemo } from "react";
import SidebarItem from "./item/SidebarItem";
import menuItems from "./item/MenuItems";
import { useLocation } from "react-router-dom";

const Sidebar = ({ activeOverride = null }) => {
  const location = useLocation();

  // คำนวณค่า activeIndex โดยใช้ useMemo เพื่อไม่ให้คำนวณใหม่ทุกครั้ง
  const activeIndex = useMemo(() => {
    if (activeOverride !== null) {
      return activeOverride;
    }
    const currentIndex = menuItems.findIndex((item) => item.href === location.pathname);
    return currentIndex !== -1 ? currentIndex : 0; // เริ่มต้นที่ 0 ถ้าไม่พบ URL
  }, [location.pathname, activeOverride]);

  return (
    <div className="p-3 w-full rounded-lg border border-gray-200 h-screen flex flex-col justify-between">
      <ul className="space-y-2">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            href={item.href}
            isActive={activeIndex === index}
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
  );
};

export default Sidebar;
