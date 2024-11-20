import React, { useState, useRef, useEffect, useCallback } from "react";
import Images from "../../../assets"; // ไฟล์ภาพต่างๆ
import NotificationMenu from "./NotificationMenu";

export default function Notification() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef(null);

  // ฟังก์ชันเปิด/ปิด dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen((prevState) => !prevState); // Toggle การเปิด/ปิด dropdown
  };

  const handleClickOutside = useCallback((event) => {
    if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
      setIsDropdownOpen(false); // ปิด dropdown ถ้าคลิกที่อื่น
    }
  }, []);

  // เพิ่ม event listener สำหรับการคลิกนอก dropdown
  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [handleClickOutside]);

  return (
    <div className="relative flex items-center">
      {/* ปุ่มแจ้งเตือน */}
      <button
        type="button"
        className="flex md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded={isDropdownOpen ? "true" : "false"}
        onClick={(event) => {
          event.stopPropagation(); // หยุดการคลิกจากการทำให้ handleClickOutside ทำงาน
          toggleDropdown(); // เปิดหรือปิด dropdown
        }}
      >
        <span className="sr-only">Open Notification</span>
        {/* ไอคอนเปลี่ยนตามสถานะ */}
        <img
          className="w-5 h-5"
          src={isDropdownOpen ? Images.bellClickIcon : Images.bellIcon}
          alt="Notification Icon"
        />
      </button>

      {/* Dropdown */}
      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-10 right-0 z-50 bg-white shadow-lg rounded-3xl"
          style={{ minWidth: "340px" }}
        >
          <NotificationMenu />
        </div>
      )}
    </div>
  );
}
