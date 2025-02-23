import React, { useState, useEffect } from "react";
import { fetchDescription, updateDescription } from "../../../Data/Profile/ProfileApi"; // นำเข้า API functions
import AboutUserProfile from "../../../components/Profile/AboutUserProfile";
import PopupAboutme from "../../../components/Popup/profile/PopupAboutme";

const AboutUser = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false); // สถานะเปิด/ปิด Popup
  const [textarea, setTextarea] = useState(""); // ข้อความที่จะแก้ไขใน Popup
  const [aboutMe, setAboutMe] = useState(""); // เก็บข้อความที่บันทึกแล้ว
  const [isLoading, setIsLoading] = useState(true); // สถานะการโหลดข้อมูล
  const [error, setError] = useState(""); // เก็บข้อความข้อผิดพลาด

  // ดึงข้อมูล description จาก API
  useEffect(() => {
    const loadDescription = async () => {
      setIsLoading(true);
      setError(""); // รีเซ็ตข้อผิดพลาด

      try {
        const data = await fetchDescription(); // เรียกใช้ฟังก์ชันจาก API utility
        setAboutMe(data);
        setTextarea(data);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลได้");
        console.error(err);
      } finally {
        setIsLoading(false);
      }
    };

    loadDescription();
  }, []);

  // ฟังก์ชันสำหรับแสดง/ซ่อน Popup
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  // ฟังก์ชันบันทึกข้อความ description
  const handleSave = async (updatedText) => {
    setAboutMe(updatedText); // อัปเดตข้อความที่บันทึก
    setIsPopupOpen(false); // ปิด Popup

    try {
      await updateDescription(updatedText); // เรียกใช้ฟังก์ชันจาก API utility
      console.log("คำอธิบายได้รับการอัปเดตเรียบร้อยแล้ว");
    } catch (err) {
      setError("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      console.error(err);
    }
  };

  if (isLoading) {
    return <div>กำลังโหลดข้อมูล...</div>;
  }

  return (
    <div>
      {/* Section คำอธิบายเกี่ยวกับฉัน */}
      <div>
        <h2 className="text-xl text-gray-800 font-semibold mb-4">
          คำอธิบายเกี่ยวกับฉัน
        </h2>
        <AboutUserProfile>
          {(description) => (
            <button
              onClick={() => {
                togglePopup(); // เปิด Popup
                setTextarea(aboutMe || description); // ตั้งข้อความที่จะแสดงใน Popup
              }}
              className="border-2 px-[30px] pt-[20px] pb-[30px] rounded-[5px] text-left text-[16px]"
            >
              <div>{aboutMe || description}</div> {/* แสดงข้อความล่าสุด */}
            </button>
          )}
        </AboutUserProfile>
      </div>

      {/* Popup แสดงข้อความ */}
      <PopupAboutme
        isOpen={isPopupOpen} // ส่งสถานะเปิด/ปิด
        onClose={togglePopup} // ส่งฟังก์ชันปิด Popup
        textarea={textarea} // ส่งข้อความใน Popup
        setTextarea={setTextarea} // ส่งฟังก์ชันแก้ไขข้อความ
        onSave={handleSave} // ส่งฟังก์ชันบันทึกข้อความ
      />
      
      {/* ข้อความข้อผิดพลาดถ้ามี */}
      {error && <div className="text-red-500">{error}</div>}
    </div>
  );
};

export default AboutUser;
