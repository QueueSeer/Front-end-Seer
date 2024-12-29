import React, { useState, useEffect } from "react";
import SidebarItem from "./item/SidebarItem"; // Component สำหรับแสดงแต่ละเมนู
import menuItems from "./item/MenuItems"; // รายการเมนู
import { useLocation } from "react-router-dom"; // ใช้ตรวจสอบ URL ปัจจุบัน

const Sidebar = () => {
  const location = useLocation(); // ตรวจจับ URL ปัจจุบัน
  const [activeIndex, setActiveIndex] = useState(0);

  // อัปเดต activeIndex ตาม URL ปัจจุบัน
  useEffect(() => {
    const currentIndex = menuItems.findIndex((item) =>
      Array.isArray(item.href)
        ? item.href.includes(location.pathname) // รองรับ href เป็น Array
        : item.href === location.pathname
    );
    if (currentIndex !== -1) {
      setActiveIndex(currentIndex);
    }
  }, [location.pathname]); // ทำงานทุกครั้งที่ URL เปลี่ยน

  return (
    <div className="p-3 w-full rounded-lg border border-gray-200 h-screen flex flex-col justify-between">
      <ul className="space-y-2 ">
        {menuItems.map((item, index) => (
          <SidebarItem
            key={index}
            icon={item.icon}
            text={item.text}
            href={Array.isArray(item.href) ? item.href[0] : item.href} // ใช้ href แรกใน Array
            isActive={activeIndex === index} // ส่ง isActive ไปให้ SidebarItem
            onClick={() => setActiveIndex(index)} // สำหรับเปลี่ยน Active เมื่อคลิก
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
