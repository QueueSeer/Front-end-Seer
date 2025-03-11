import React, { useEffect, useState } from "react";
import InfoUser from "./InfoUser";
import images from "../../../assets";
import { fetchUserData } from "../../../Data/Profile/ProfileApi";
import { fetchInfoUserData } from "../../../Data/Profile/InfoUser"; 
import { useNavigate } from "react-router-dom";
import PopupEditProfile from "../../../components/Popup/profile/PopupEditProfile";

const ContentUser = () => {
  const [userData, setUserData] = useState(null);
  const [userInfo, setUserInfo] = useState(null); // Store email and phone number
  const [isLoading, setIsLoading] = useState(true);
  const [isEditOpen, setIsEditOpen] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const getUserData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const data = await fetchUserData();
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

  useEffect(() => {
    const getUserInfo = async () => {
      try {
        const data = await fetchInfoUserData();
        setUserInfo(data);
      } catch (err) {
        console.error("Error fetching additional user info:", err);
      }
    };

    if (userData) {
      getUserInfo();
    }
  }, [userData]);

  const toggleEditPopup = () => setIsEditOpen(!isEditOpen);

  const formatExperienceDate = (experienceDate) => {
    if (!experienceDate) return { day: '01', month: 'มกราคม', year: new Date().getFullYear() + 543 };

    const date = new Date(experienceDate);
    const day = String(date.getDate()).padStart(2, '0');
    const month = thaiMonths[date.getMonth()];
    const year = date.getFullYear() + 543;

    return { day, month, year };
  };

  const thaiMonths = [
    "มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", 
    "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"
  ];

  const formattedExperience = formatExperienceDate(userData?.experience);

  const handleSave = (updatedData) => {
    setUserData((prevData) => ({
      ...prevData,
      display_name: updatedData.nickname,
      first_name: updatedData.firstName,
      last_name: updatedData.lastName,
      experience: updatedData.experience,
    }));

    setUserInfo((prevInfo) => ({
      ...prevInfo,
      email: updatedData.email,
      phone_number: updatedData.phoneNumber,
    }));
  };

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
              src={userData?.image || images.UserProfile}
              alt="Profile Avatar"
              className="w-[200px] h-[200px] rounded-full border-2 border-purple-500"
            />
          </div>
          <div className="mt-4 text-center">
            <h1 className="text-[22px] font-semibold">
              {userData?.display_name || "ไม่พบชื่อ"}
            </h1>
          </div>
          <div className="mt-3 flex flex-col gap-4 w-full">
            <button
              className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300 text-[16px] font-regular"
              onClick={toggleEditPopup}
            >
              แก้ไขโปรไฟล์
            </button>
          </div>
        </div>
      </div>

      {/* Column 2 */}
      <InfoUser 
        userData={userData} 
        email={userInfo?.email} 
        phoneNumber={userInfo?.phone_number} 
      />

      {/* Popup for editing profile */}
      <PopupEditProfile 
        isOpen={isEditOpen} 
        onClose={toggleEditPopup} 
        userData={userData} 
        formattedExperience={formattedExperience} 
        email={userInfo?.email} 
        phoneNumber={userInfo?.phone_number} 
        onSave={handleSave} 
      />
    </div>
  );
};

export default ContentUser;
