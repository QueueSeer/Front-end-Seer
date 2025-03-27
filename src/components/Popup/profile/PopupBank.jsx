import React, { useState, useEffect } from "react";
import BankFormpopup from "./Prompay/BankFormpopup";
import CloseButton from "../../Button/CloseButton";
import AddButton from "./Social/AddButton";
import Images from "../../../assets"; // ตรวจสอบให้แน่ใจว่าไฟล์นี้มี PlusIcon
import { UpdateBanksseer } from "../../../Data/Profile/ProfileApi"; // Import UpdateBanksseer function

const PopupBank = ({ isOpen, onClose, bankName, bankNo }) => {
  const [prompay, setPrompay] = useState([]); // เก็บข้อมูลบัญชีผู้ใช้
  const [showFormPopup, setShowFormPopup] = useState(false);
  const [currentLinkData, setCurrentLinkData] = useState({ name: "", num: "" });
  const [popupTitle, setPopupTitle] = useState(""); // เก็บชื่อ popup

  // อัปเดตค่าของบัญชีพร้อมเพย์เมื่อ Component โหลด
  useEffect(() => {
    if (bankName && bankNo) {
      setPrompay([{ name: bankName, num: bankNo }]);
      setCurrentLinkData({ name: bankName, num: bankNo }); // Set initial values
    }
  }, [bankName, bankNo]);

  const handleAddNewLink = () => {
    setCurrentLinkData({ name: "", num: "" }); // เคลียร์ข้อมูลฟอร์ม
    setPopupTitle("เพิ่มบัญชีพร้อมเพย์"); // ตั้งชื่อ popup
    setShowFormPopup(true); // เปิด popup
  };

  const handleEditLink = (name, num) => {
    setCurrentLinkData({ name, num }); // กรอกข้อมูลที่เลือกไปในฟอร์ม
    setPopupTitle("อัปเดตบัญชีพร้อมเพย์");
    setShowFormPopup(true);
  };

  const handleSaveLink = async (newLink) => {
    try {
      // ตรวจสอบว่าเป็นการเพิ่มใหม่หรือแก้ไขข้อมูล
      if (currentLinkData.name) {
        // แก้ไขข้อมูล
        const updatedLinks = prompay.map((link) =>
          link.name === currentLinkData.name ? { ...link, ...newLink } : link
        );
        setPrompay(updatedLinks);
      } else {
        // เพิ่มบัญชีใหม่
        setPrompay((prevLinks) => [...prevLinks, newLink]);
      }

      // Call API to update the bank information
      await UpdateBanksseer({ name: newLink.name, num: newLink.num });

      setShowFormPopup(false); // ปิด popup หลังบันทึก
    } catch (error) {
      console.error("Failed to save bank account:", error);
      // Optionally, you can display an error message to the user here
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white px-[50px] py-[30px] rounded-lg w-[550px] shadow-lg">
        {showFormPopup ? (
          <BankFormpopup
            isOpen={showFormPopup}
            onClose={() => setShowFormPopup(false)}
            onSave={handleSaveLink}
            name={currentLinkData.name}
            num={currentLinkData.num}
            title={popupTitle}
          />
        ) : (
          <>
            <div className="flex justify-between items-center mb-4 border-b pb-2">
              <h2 className="text-[28px] font-semibold text-primary">
                บัญชีพร้อมเพย์
              </h2>
            </div>
            <ul className="mb-4">
              {prompay.length > 0 ? (
                prompay.map((link, index) => (
                  <button
                    key={index}
                    onClick={() => handleEditLink(link.name, link.num)}
                    className="flex w-full border-b py-2 hover:bg-black/10"
                  >
                    <div className="flex items-start space-x-4">
                      <img
                        src={Images.ThaiqrIcon} // เปลี่ยนเป็นรูปไอคอนที่เหมาะสม
                        alt="พร้อมเพย์"
                        className="w-8 h-8 rounded-full"
                      />
                      <div className="flex flex-col items-start">
                        <p className="text-gray-800 font-medium">{link.name}</p>
                        <p className="text-gray-500 text-[18px]">
                          พร้อมเพย์ {link.num}
                        </p>
                      </div>
                    </div>
                  </button>
                ))
              ) : (
                <p className="text-gray-500">ไม่มีข้อมูลบัญชี</p>
              )}
            </ul>

            {prompay.length === 0 && (
              <AddButton
                icon={Images.PlusIcon}
                label="เพิ่มบัญชี"
                onClick={handleAddNewLink}
              />
            )}
          </>
        )}

        {!showFormPopup && (
          <div className="flex justify-end mt-6">
            <CloseButton label="เสร็จสิ้น" onClose={onClose} />
          </div>
        )}
      </div>
    </div>
  );
};

export default PopupBank;
