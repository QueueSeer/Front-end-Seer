import React, { useState, useEffect } from "react";
import PopupBank from "../../../components/Popup/profile/PopupBank";
import Images from "../../../assets";
import { fetchUserData } from "../../../Data/Profile/ProfileApi";
import { useNavigate } from "react-router-dom"; // เพิ่ม useNavigate

const AccountPrompay = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [userData, setUserData] = useState(null);
  const [error, setError] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const navigate = useNavigate(); // เพิ่ม useNavigate

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

  return (
    <div>
      <h2 className="text-xl text-gray-800 font-semibold mb-4">
        ข้อมูลบัญชีพร้อมเพย์
      </h2>
      <button
        onClick={() => setIsPopupOpen(true)}
        className="border-2 h-[90px] px-[30px] py-[20px] rounded-[5px] w-[420px]"
      >
        <div className="flex flex-row gap-[20px] items-center">
          <img
            src={Images.WalletIcon}
            alt="Link Icon"
            className="mr-3 w-8 h-8 items-center"
          />
          <div className="flex flex-col gap-[6px] items-start">
            <div className="font-semibold text-black text-[18px]">
              บัญชีพร้อมเพย์
            </div>
          </div>
        </div>
      </button>

      {/* Popup Component - ส่งข้อมูลไปให้ */}
      <PopupBank
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        bankName={userData?.bank_name} // ส่งค่า bank_name
        bankNo={userData?.bank_no} // ส่งค่า bank_no
      />
    </div>
  );
};

export default AccountPrompay;
