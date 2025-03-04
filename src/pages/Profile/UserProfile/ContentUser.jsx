import React, { useEffect, useState } from "react";
import InfoUser from "./InfoUser";
import images from "../../../assets";
import { fetchUserData } from "../../../Data/Profile/ProfileApi"; // เรียกใช้ฟังก์ชัน fetchUserData ที่สร้างไว้
import { useNavigate } from "react-router-dom";

const ContentUser = () => {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchUserData(); // ใช้ฟังก์ชันที่เราสร้างในไฟล์ api.js
        setUserData(data);
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Session หมดอายุ กรุณาลงชื่อเข้าใช้งานใหม่");
          navigate("/login");
        } else {
          setError("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้");
        }
      } finally {
        setIsLoading(false);
      }
    };

    getUserData();
  }, [navigate]);

  if (isLoading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-lg font-semibold text-gray-600">กำลังโหลด...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <p className="text-red-500 text-lg font-semibold">{error}</p>
      </div>
    );
  }

  return (
    <div className="py-8 flex flex-col items-center lg:items-start space-y-8 lg:flex-row lg:space-y-0 lg:space-x-[100px] lg:px-[30px]">
      {/* Column 1 */}
      <div className="flex-2 flex items-start">
        <div className="flex flex-col items-center">
          <div className="relative">
            <img
              src={userData?.image || images.UserProfile} // ใช้รูปจาก API
              alt="Profile Avatar"
              className="w-[200px] h-[200px] rounded-full border-2 border-purple-500"
            />
          </div>
          <div className="mt-4 text-center">
            <h1 className="text-[22px] font-semibold">
              {userData?.display_name || "ไม่พบชื่อ"}
            </h1>
          </div>
          {/* Buttons */}
          <div className="mt-3 flex flex-col gap-4 w-full">
            <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-[16px] font-regular">
              แก้ไขโปรไฟล์
            </button>
          </div>
        </div>
      </div>

      {/* Column 2 */}
      <InfoUser userData={userData} />
    </div>
  );
};

export default ContentUser;
