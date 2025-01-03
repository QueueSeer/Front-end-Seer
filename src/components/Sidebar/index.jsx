import React, { useState, useEffect } from "react";
import SidebarItem from "./item/SidebarItem";
import menuItems from "./item/MenuItems";
import { useLocation } from "react-router-dom";

const Sidebar = ({ activeOverride = null }) => {
  const location = useLocation();
  const [activeIndex, setActiveIndex] = useState(0);

  useEffect(() => {
    // หาก activeOverride ถูกส่งมา ให้ใช้ค่า Override แทน URL
    if (activeOverride !== null) {
      setActiveIndex(activeOverride);
    } else {
      // กำหนด activeIndex จาก URL
      const currentIndex = menuItems.findIndex(
        (item) => item.href === location.pathname
      );
      if (currentIndex !== -1) {
        setActiveIndex(currentIndex);
      }
    }
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
  );
};

export default Sidebar;
