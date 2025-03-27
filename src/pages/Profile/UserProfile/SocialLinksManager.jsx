import React, { useState, useEffect } from "react";
import PopupSocialLinks from "../../../components/Popup/profile/PopupSocialLinks";
import Images from "../../../assets";
import { fetchUserData } from "../../../Data/Profile/ProfileApi"; // Assuming this is the API call
import { useNavigate } from "react-router-dom"; // Import useNavigate

const SocialLinksManager = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  
  const navigate = useNavigate(); // Initialize navigate

  useEffect(() => {
    const getUserData = async () => {
      setLoading(true);
      setError(null);

      try {
        const data = await fetchUserData();
        setUserData(data); // Assuming this contains the user data
      } catch (err) {
        if (err.response?.status === 401) {
          setError("Session หมดอายุ กรุณาลงชื่อเข้าใช้งานใหม่");
          navigate("/login"); // Redirect if session expired
        } else {
          setError("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้");
        }
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, [navigate]);

  if (loading) {
    return <div>กำลังโหลดข้อมูล...</div>; // Show loading message
  }

  return (
    <div>
      <h2 className="text-xl text-gray-800 font-semibold mb-4">
        ช่องทางการติดตาม
      </h2>
      {error && <div className="text-red-500">{error}</div>} {/* Display error message */}
      <button
        onClick={() => setIsPopupOpen(true)}
        className="border-2 h-[90px] px-[30px] py-[20px] rounded-[5px] w-[420px]"
      >
        <div className="flex flex-row gap-[20px] items-center">
          <img
            src={Images.LinkIcon}
            alt="Link Icon"
            className="mr-3 w-8 h-8 items-center"
          />
          <div className="flex flex-col gap-[5px] items-start">
            <div className="font-semibold text-black text-[18px]">
              ลิงก์ช่องทางการติดตาม
            </div>
          </div>
        </div>
      </button>
      {/* Pass the fetched user data to PopupSocialLinks */}
      <PopupSocialLinks
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        socialName={userData?.socials_name} // Fetch and pass `socials_name`
        socialLink={userData?.socials_link} // Fetch and pass `socials_link`
      />
    </div>
  );
};

export default SocialLinksManager;
