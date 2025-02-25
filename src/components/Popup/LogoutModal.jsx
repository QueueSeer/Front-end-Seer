import React, { useEffect, useState } from "react";
import axios from "axios";
import Images from "../../assets";

const LogoutModal = ({ isOpen, onClose, onLogout = () => {} }) => {
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden"; // ปิดการ scroll
    } else {
      document.body.style.overflow = "auto"; // เปิดการ scroll เมื่อ modal ปิด
    }

    return () => {
      document.body.style.overflow = "auto"; // คืนค่าปกติเมื่อ component ถูก unmount
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const deleteAllCookies = () => {
    try {
      document.cookie.split(";").forEach((cookie) => {
        document.cookie = cookie
          .replace(/^ +/, "") // ลบช่องว่างหน้า cookie
          .replace(
            /=.*/,
            `=;expires=${new Date(0).toUTCString()};path=/;domain=${
              window.location.hostname
            }`
          ); // ลบ Cookie ทุกโดเมนย่อย
      });
    } catch (error) {
      console.error("Error deleting cookies:", error);
    }
  };

  const handleLogout = async () => {
    setLoading(true);
    try {
      const response = await axios.delete(
        "https://backend.qseer.app/api/access/logout",
        { withCredentials: true }
      );

      if (response.status === 200) {
        deleteAllCookies(); // ลบ Cookie ทั้งหมด
        localStorage.clear(); // ล้าง localStorage
        sessionStorage.clear(); // ล้าง sessionStorage
        if (onLogout) {
          onLogout(); // ตรวจสอบก่อนเรียกใช้
        }
      } else {
        console.error("Logout failed:", response.data);
      }
    } catch (error) {
      console.error("Error:", error?.response?.data || error.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-70 flex justify-center items-center z-50">
      <div className="bg-white px-8 py-6 rounded-xl shadow-lg w-[450px] h-[400px] flex flex-col justify-between">
        {/* ส่วนหัว */}
        <div className="text-center">
          <img
            src={Images.logout}
            alt="Logout Icon"
            className="w-24 h-auto mx-auto"
          />
          <h2 className="text-[26px] font-semibold text-gray-900 pt-3">
            คุณต้องการออกจากระบบหรือไม่?
          </h2>
          <p className="text-[18px] text-gray-600 mt-2">ออกจากระบบ Qseer</p>
          <p className="text-[18px] text-gray-600 mt-1">
            คุณสามารถเข้าสู่ระบบใหม่ได้ตลอดเวลา
          </p>
        </div>

        {/* ปุ่ม */}
        <div className="flex flex-col gap-3">
          <button
            onClick={handleLogout}
            className="px-4 py-3 bg-secondary2 text-white rounded-full font-semibold w-full hover:bg-secondary disabled:bg-gray-400"
            disabled={loading}
          >
            {loading ? "กำลังออกจากระบบ..." : "ออกจากระบบ"}
          </button>
          <button
            onClick={onClose}
            className="px-4 py-3 border border-gray-300 text-gray-700 rounded-full font-semibold w-full hover:bg-gray-100"
            disabled={loading}
          >
            ยกเลิก
          </button>
        </div>
      </div>
    </div>
  );
};

export default LogoutModal;
