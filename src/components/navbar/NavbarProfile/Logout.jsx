import React, { useState } from "react";
import PropTypes from "prop-types";
import { useNavigate } from "react-router-dom";
import images from "../../../assets"; // Import assets ถูกต้อง
import LogoutModal from "../../../components/Popup/LogoutModal";

const LogoutButton = ({ onLogout }) => {
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);
  const navigate = useNavigate();

  // ฟังก์ชัน Logout
  const handleLogout = () => {
    setIsLogoutModalOpen(false); // ปิด Modal ก่อนเปลี่ยนหน้า
    navigate("/Login");
    onLogout(); // เรียกใช้ onLogout (ถ้ามีการ Logout จริง ๆ)
  };

  return (
    <li className="border-t border-gray-200 dark:border-gray-700">
      {/* ปุ่ม Logout */}
      <button
        className="flex w-full items-center px-4 py-3 text-sm font-medium text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        onClick={() => setIsLogoutModalOpen(true)} // เปิด Modal เมื่อกด
      >
        {/* ไอคอน */}
        <span className="mr-3 w-6 h-6">
          <img src={images.LogoutIcon} alt="Logout Icon" />
        </span>
        ออกจากระบบ
      </button>

      {/* Logout Modal */}
      {isLogoutModalOpen && (
        <LogoutModal
          isOpen={isLogoutModalOpen}
          onClose={() => setIsLogoutModalOpen(false)}
          onLogout={handleLogout}
        />
      )}
    </li>
  );
};

LogoutButton.propTypes = {
  onLogout: PropTypes.func.isRequired,
};

export default LogoutButton;
