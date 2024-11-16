import React, { useState, useEffect, useRef } from "react";
// src/components/Navbar.jsx
import UserMenu from "./UserMenu";
import Images from "../../assets";

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

      {/* ลิงก์เมนู */}
      <div className="hidden lg:flex flex-none">
        <ul className="menu menu-horizontal gap-1 text-gray-800">
          <li>
            <a href="#home">หน้าหลัก</a>
          </li>
          <li>
            <a href="#packages">แพ็กเกจ</a>
          </li>
          <li>
            <a href="#auction">ประมูล</a>
          </li>
          <img
            src={Images.bellIcon}
            alt="BellIcon"
            className="w-5 h-5 rounded-md mt-2"
          />
        </ul>
      </div>

      {/* โปรไฟล์ผู้ใช้ */}
      <div className="flex items-center md:order-2 space-x-3 md:space-x-0 rtl:space-x-reverse relative">
        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          id="user-menu-button"
          aria-expanded={isDropdownOpen ? "true" : "false"}
          onClick={toggleDropdown}
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src={Images.profile_seer}
            alt="profile_seer"
          />
        </button>
        {/* Dropdown position adjustment */}
        {isDropdownOpen && (
          <div
            ref={dropdownRef}
            className="absolute top-10 right-0 z-50 bg-white shadow-lg rounded-3xl"
            style={{ minWidth: "300px" }} // Adjust width as needed
          >
            <UserMenu />
          </div>
        )}
      </div>
    </div>
  );
}
