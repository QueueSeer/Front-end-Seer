import React, { useState } from 'react';
import InfoUser from './InfoUser';
import images from '../../../assets';
import PopupEditProfile from '../../../components/Popup/profile/PopupEditProfile';

const ContentUser = () => {
  const [isEditOpen, setIsEditOpen] = useState(false);
  const toggleEditPopup = () => setIsEditOpen(!isEditOpen);

  const [userData, setUserData] = useState({
    id: "12345", // เพิ่ม ID ของผู้ใช้เพื่อใช้ในลิงก์โปรไฟล์
    nickname: "เพียงฟ้า พาขวัญ",
    firstName: "สุรีภรณ์",
    lastName: "นาภาลัย",
    experience: "5 ปีขึ้นไป",
    email: "Sureeporn.SN@gmail.com",
    phone: "0956966952",
  });

  const [profileImage, setProfileImage] = useState(images.UserProfile); // เก็บ URL ของรูปโปรไฟล์
  const [isCopied, setIsCopied] = useState(false); // สถานะแจ้งเตือนการคัดลอก

  // ฟังก์ชันอัปโหลดและเปลี่ยนรูปภาพ
  const handleImageUpload = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setProfileImage(imageUrl);
    }
  };

  // ฟังก์ชันคัดลอกลิงก์โปรไฟล์
  const handleCopyProfileLink = () => {
    const profileLink = `${window.location.origin}/profile/${userData.id}`;
    navigator.clipboard.writeText(profileLink)
      .then(() => {
        setIsCopied(true);
        setTimeout(() => setIsCopied(false), 2000); // แสดงข้อความแจ้งเตือน 2 วินาที
      })
      .catch((err) => console.error("Failed to copy: ", err));
  };

  return (
    <div className="py-8 flex flex-col items-center lg:items-start space-y-8 lg:flex-row lg:space-y-0 lg:space-x-20 lg:px-8">
      <div className="flex-2 flex items-start">
        <div className="flex flex-col items-center relative">
          <div className="relative">
            {/* รูปโปรไฟล์ที่อัปเดต */}
            <img
              src={profileImage}
              alt="Profile"
              className="w-40 h-40 rounded-full border-2 border-purple-500"
            />
            {/* ปุ่มแก้ไขโปรไฟล์ */}
            <label 
              className="absolute bottom-2 right-2 bg-white border border-gray-300 rounded-full p-2 shadow-md flex items-center justify-center w-10 h-10 cursor-pointer"
              title="เปลี่ยนรูปโปรไฟล์"
            >
              <img src={images.PencilIcon} alt="Edit" className="w-5 h-5" />
              <input 
                type="file" 
                accept="image/*" 
                className="hidden" 
                onChange={handleImageUpload} 
              />
            </label>
          </div>
          <div className="mt-4 text-center">
            <h1 className="text-xl font-semibold">{userData.nickname}</h1>
          </div>

       {/* ปุ่มแก้ไขโปรไฟล์ */}
          <button 
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md shadow-md text-lg w-full 
                      hover:bg-gray-300 transition"
            onClick={toggleEditPopup}
          >
            แก้ไขโปรไฟล์
          </button>

          {/* ปุ่มแชร์โปรไฟล์ */}
          <button 
            className="bg-gray-200 text-gray-700 px-6 py-2 rounded-md shadow-md text-lg w-full mt-3 
                      hover:bg-[#54357A] hover:text-white transition"
            onClick={handleCopyProfileLink}
          >
            แชร์โปรไฟล์
          </button>



          {/* ข้อความแจ้งเตือนเมื่อคัดลอกลิงก์สำเร็จ */}
          {isCopied && (
            <p className="text-sm text-green-500 mt-2">คัดลอกลิงก์โปรไฟล์แล้ว!</p>
          )}
        </div>
      </div>

      <InfoUser userData={userData} />
      <PopupEditProfile isOpen={isEditOpen} onClose={toggleEditPopup} userData={userData} onSave={setUserData} />
    </div>
  );
};

export default ContentUser;
