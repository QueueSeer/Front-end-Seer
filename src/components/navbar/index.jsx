// src/components/Navbar.jsx
import React, { useState, useEffect } from "react";
import Images from "../../assets";
import UserProfile from "./NavbarProfile/Userprofile";
import Notification from "./NavbarNotification/Notification";
import Logonavbar from "./Logo/Logonavbar";
import Navbarmenu from "./NavbarMenu/Navbarmenu";

export default function Navbar() {
  const [isDarkMode, setIsDarkMode] = useState(false);

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => matchMedia.removeEventListener("change", handleChange);
  }, []);

  return (
    <div className={`navbar shadow-md px-4 ${isDarkMode ? "bg-gray-900 text-white" : "bg-base-100 text-gray-800"}`}>
      {/* โลโก้ */}
      <Logonavbar />

      {/* ลิงก์เมนู */}
      <Navbarmenu />

      {/* การแจ้งเตือน */}
      <Notification />

      {/* โปรไฟล์ผู้ใช้ */}
      <UserProfile />

      {/* ปุ่มเข้าสู่ระบบและลงทะเบียน */}
      <div className="flex-none flex gap-2">
        <a
          href="/login"
          className="btn btn-outline btn-sm hover:bg-opacity-20"
          style={{
            color: isDarkMode ? "#FFFFFF" : "#8677A7",
            borderColor: isDarkMode ? "#FFFFFF" : "#8677A7",
          }}
        >
          เข้าสู่ระบบ
        </a>
        <a
          href="/register"
          className="btn btn-sm"
          style={{
            backgroundColor: isDarkMode ? "#4B5563" : "#8677A7",
            color: "#FFFFFF",
          }}
        >
          ลงทะเบียน
        </a>
      </div>
    </div>
  );
}
