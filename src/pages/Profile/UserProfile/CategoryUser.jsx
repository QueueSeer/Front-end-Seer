import React, { useState, useEffect } from "react";
import { fetchUserData, updatePrimarySkill } from "../../../Data/Profile/ProfileApi"; // นำเข้า API functions
import Images from "../../../assets";
import PopupCategory from "../../../components/Popup/profile/PopupCategory";

const CategoryUser = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // สถานะเปิด/ปิด Popup
  const [selectedCategory, setSelectedCategory] = useState(""); // เก็บหมวดหมู่ที่เลือก
  const [userData, setUserData] = useState(null); // เก็บข้อมูลผู้ใช้
  const [isLoading, setIsLoading] = useState(true); // สถานะการโหลดข้อมูล
  const [error, setError] = useState(null); // สำหรับเก็บข้อผิดพลาด

  // ดึงข้อมูลผู้ใช้จาก API
  useEffect(() => {
    const loadUserData = async () => {
      setIsLoading(true);
      setError(null); // รีเซ็ตข้อผิดพลาด

      try {
        const data = await fetchUserData(); // เรียกใช้ฟังก์ชันจาก API utility
        setUserData(data);
        setSelectedCategory(data.primary_skill || "ยังไม่มีหมวดหมู่ที่เลือก");
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadUserData();
  }, []);

  // ฟังก์ชันสำหรับแสดง/ซ่อน Popup
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  // ฟังก์ชันสำหรับบันทึกหมวดหมู่ที่เลือก
  const handleSave = async (category) => {
    setSelectedCategory(category); // อัปเดตหมวดหมู่ที่เลือก
    setIsPopupOpen(false); // ปิด Popup หลังจากบันทึก

    try {
      await updatePrimarySkill(category); // เรียกใช้ฟังก์ชันจาก API utility
      console.log("หมวดหมู่ได้รับการอัปเดตเรียบร้อยแล้ว");
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการอัปเดตหมวดหมู่");
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  if (error) {
    return <div className="text-red-500">{error}</div>;
  }

  return (
    <div>
      <h2 className="text-xl text-gray-800 font-semibold mb-4">เรื่องที่เชี่ยวชาญของฉัน</h2>

      {/* ปุ่มสำหรับเปิด Popup */}
      <button onClick={togglePopup} className="border-2 px-[30px] py-[20px] rounded-[5px] w-[420px]">
        <div className="flex flex-row gap-[20px] items-center">
          <img src={Images.StarsIcon} alt="Starts Icon" className="mr-3 w-8 h-8" />
          <div className="flex flex-col gap-[5px] items-start">
            <div className="font-semibold text-black">หมวดหมู่ดูดวง</div>
            <div className="font-regular text-black/80 text-[18px]">
              {selectedCategory || "ยังไม่มีหมวดหมู่ที่เลือก"}
            </div>
          </div>
        </div>
      </button>

      {/* Popup สำหรับเลือกหมวดหมู่ */}
      <PopupCategory
        isOpen={isPopupOpen} // สถานะเปิด/ปิด Popup
        onClose={togglePopup} // ฟังก์ชันปิด Popup
        selectedCategory={selectedCategory} // หมวดหมู่ที่เลือกในปัจจุบัน
        onSave={handleSave} // ฟังก์ชันสำหรับบันทึกหมวดหมู่
      />
    </div>
  );
};

export default CategoryUser;
