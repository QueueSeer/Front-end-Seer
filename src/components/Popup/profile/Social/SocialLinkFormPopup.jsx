import React, { useState } from "react";
import BackButton from "../../../Button/CloseButton";

const SocialLinkFormPopup = ({ isOpen, onClose, onSave, name, url, title }) => {
  const [formName, setFormName] = useState(name || "");
  const [formUrl, setFormUrl] = useState(url || "");
  const [isDefault, setIsDefault] = useState(false);

  if (!isOpen) return null;

  const handleSave = () => {
    if (formName.trim() && formUrl.trim()) {
      onSave({ name: formName, url: formUrl, isDefault });
      onClose(); // ปิด Popup หลังบันทึก
    } else {
      alert("กรุณากรอกข้อมูลให้ครบถ้วน");
    }
  };
  

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white px-[50px] py-[30px] rounded-lg w-[550px] shadow-lg">
        <h2 className="text-[24px] font-semibold text-primary mb-4">
          {title} {/* แสดงชื่อ Popup ตาม title ที่ส่งมาจาก PopupSocialLinks */}
        </h2>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">ชื่อ</label>
          <input
            type="text"
            value={formName}
            onChange={(e) => setFormName(e.target.value)}
            placeholder="กรอกชื่อช่องทาง"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="mb-4">
          <label className="block text-gray-700 font-medium mb-2">ลิงก์</label>
          <input
            type="text"
            value={formUrl}
            onChange={(e) => setFormUrl(e.target.value)}
            placeholder="https://"
            className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        <div className="flex justify-between items-center pt-5">
          {/* ปุ่มยกเลิก */}
          <BackButton onClose={onClose} />

          {/* ปุ่มบันทึก */}
          <button
            onClick={handleSave}
            className="bg-primary text-white px-8 py-2 rounded-full hover:bg-primary/90"
          >
            บันทึก
          </button>
        </div>
      </div>
    </div>
  );
};

export default SocialLinkFormPopup;
