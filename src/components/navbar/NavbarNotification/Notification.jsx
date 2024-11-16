import React, { useState, useRef, useEffect } from "react";
import UserMenu from "../NavbarProfile/UserMenu"; // เมนูสำหรับ dropdown
import Images from "../../../assets"; // ไฟล์ภาพต่างๆ
import NotificationMenu from "./NotificationMenu";

export default function Notification() {
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
    <div className="relative flex items-center">
      <button
        type="button"
        className="flex md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded={isDropdownOpen ? "true" : "false"}
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open Notification</span>
        <img
          className="w-5 h-5"
          src={Images.bellIcon}
          alt="bellIcon"
        />
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-10 right-0 z-50 bg-white shadow-lg rounded-3xl"
          style={{ minWidth: "300px" }}
        >
          <NotificationMenu />
        </div>
      )}
    </div>
  );
}
