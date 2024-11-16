// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import Images from "../../assets";
import UserProfile from "./NavbarProfile/Userprofile"; // Import ไฟล์ที่แยกออกมา
import Notification from "./NavbarNotification/Notification";

export default function Navbar() {
  // State สำหรับจัดการ dropdown
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);

  // ใช้ useRef สำหรับการตรวจจับการคลิกนอก dropdown
  const dropdownRef = useRef(null);

  // ฟังก์ชันเปิด/ปิด dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // ฟังก์ชันสำหรับปิด dropdown เมื่อคลิกนอก
  const handleClickOutside = (event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false);
    }
  };

  // ใช้ useEffect เพื่อเพิ่ม event listener เมื่อ component ถูก mount
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="navbar bg-base-100 shadow-md px-12">
      {/* โลโก้และชื่อโปรเจกต์ */}
      <div className="flex-1 flex items-center gap-2">
        <img
          src={Images.logo}
          alt="Logo"
          className="w-10 h-10 rounded-md mt-2"
        />
        <span
          className="text-2xl font-extrabold text-purple-800"
          style={{ fontFamily: "Playfair Display", fontSize: "32px" }}
        >
          Qseer
        </span>
      </div>

      <div className="space-x-5">
        {/* ลิงก์เมนู */}
        <div className="hidden lg:flex flex-none">
          <ul className="flex space-x-5 gap-1 text-gray-800">
            <li>
              <a href="#home">หน้าหลัก</a>
            </li>
            <li>
              <a href="#packages">แพ็กเกจ</a>
            </li>
            <li>
              <a href="#auction">ประมูล</a>
            </li>
          </ul>
        </div>

        {/* การแจ้งเตือน */}
        <Notification />

        {/* โปรไฟล์ผู้ใช้ */}
        <UserProfile />
      </div>
    </div>
  );
}
