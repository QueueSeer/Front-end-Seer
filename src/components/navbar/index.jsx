// src/components/Navbar.jsx
import React, { useState, useEffect, useRef } from "react";
import Images from "../../assets";
import UserProfile from "./NavbarProfile/Userprofile"; // Import ไฟล์ที่แยกออกมา
import Notification from "./NavbarNotification/Notification";
import Logonavbar from "./Logo/Logonavbar";
import Navbarmenu from "./NavbarMenu/Navbarmenu";

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
      {/* โลโก้ */}
      <Logonavbar/>
      
      <div className="space-x-5">
        {/* ลิงก์เมนู */}
        <Navbarmenu/>

        {/* การแจ้งเตือน */}
        <Notification />

        {/* โปรไฟล์ผู้ใช้ */}
        <UserProfile />
      </div>
    </div>
  );
}
