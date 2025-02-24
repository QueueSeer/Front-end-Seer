import React, { useState, useRef, useEffect } from "react";
import { fetchUserData } from "../../../Data/Profile/ProfileApi"; // ใช้ API ที่สร้างไว้
import UserMenu from "./UserMenu";
import images from "../../../assets"; // ใช้ default image

export default function UserProfile() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);
  const dropdownRef = useRef(null);
  const buttonRef = useRef(null);

  // ดึงข้อมูล user จาก API
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  // ฟังก์ชันเปิด/ปิด dropdown
  const toggleDropdown = () => {
    setIsDropdownOpen(!isDropdownOpen);
  };

  // ฟังก์ชันปิด dropdown เมื่อคลิกนอก dropdown
  const handleClickOutside = (event) => {
    if (
      dropdownRef.current &&
      !dropdownRef.current.contains(event.target) &&
      buttonRef.current &&
      !buttonRef.current.contains(event.target)
    ) {
      setIsDropdownOpen(false);
    }
  };

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
        ref={buttonRef}
        className="flex text-sm bg-gray-800 rounded-full md:me-0 focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
        id="user-menu-button"
        aria-expanded={isDropdownOpen ? "true" : "false"}
        onClick={toggleDropdown}
      >
        <span className="sr-only">Open user menu</span>
        {loading ? (
          <div className="w-8 h-8 bg-gray-300 rounded-full animate-pulse"></div>
        ) : error || !userData?.image ? (
          <img
            className="w-8 h-8 rounded-full"
            src={images.UserProfile}
            alt="Default profile"
          />
        ) : (
          <img
            className="w-8 h-8 rounded-full"
            src={userData.image} // ใช้ userData.image จาก API
            alt="User profile"
          />
        )}
      </button>

      {isDropdownOpen && (
        <div
          ref={dropdownRef}
          className="absolute top-10 right-0 z-50 bg-white border shadow-lg rounded-3xl"
          style={{ minWidth: "300px" }}
        >
          <UserMenu />
        </div>
      )}
    </div>
  );
}
