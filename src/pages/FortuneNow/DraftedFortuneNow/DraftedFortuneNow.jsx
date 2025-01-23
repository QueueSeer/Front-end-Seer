import React, { useState } from "react";
import Layout from "../Layout";
import StatusButtons from "../StatusButtons";
import ServiceCard from "../../../components/Card/ServiceCard";

const DraftedFortuneNow = () => {
  const [isPopupVisible, setIsPopupVisible] = useState(false);

  // ฟังก์ชันเปิด popup
  const togglePopup = () => {
    setIsPopupVisible(!isPopupVisible);
  };

  return (
    <Layout>
      <StatusButtons />
      <div className="font-regular text-[18px] text-gray-800 leading-relaxed ">
        <p>
          <span className="font-semibold">บริการดูดวงทันที</span>{" "}
          เป็นระบบที่ให้ลูกค้าสามารถฝากคำถามสำหรับการดูดวงได้ทันทีโดยไม่ต้องรอเวลานัดหมาย
          ระบบจะทำการรวบรวมคำถามที่ลูกค้าส่งมาแล้วส่งต่อให้หมอดูเพื่อตอบคำถามเหล่านั้น
          เมื่อหมอดูตอบคำถามเสร็จแล้ว
          คำตอบจะถูกส่งกลับไปให้ลูกค้าอย่างรวดเร็วทำให้ลูกค้าได้รับคำทำนายทันที
        </p>
      </div>

      <div
        className="font-regular text-[18px] text-secondary2 underline mt-3 cursor-pointer hover:underline"
        onClick={togglePopup} // เมื่อคลิกจะเปิดหรือปิด popup
      >
        ดูรายละเอียดเพิ่มเติม
      </div>

      <ServiceCard
        image="/path/to/image.png"
        avatar="/path/to/avatar.png"
        title="เปิดใช้บริการ"
        description="** แจ้งรายละเอียดให้ครบถ้วนนะคะ ** ต้องใช้ประกอบการดูดวงค่ะ..."
        details={[
          "1. ชื่อ",
          "2. อายุ (ไม่ต้องแจ้งวันเดือนปีเกิด)",
          "3. สถานะด้านความรัก (โสด / มีแฟน / มีคนคุย / แต่งงาน)",
        ]}
        fortuneTeller="หมอดู เพียงฟ้า"
        date="วันที่ 10 ตุลาคม 2567"
      />
      <div className="flex justify-end">
        <button className="flex items-center mt-4 px-4 py-2 border border-secondary rounded-full text-gray-900 font-medium hover:bg-primary/30 transition">
          <div className="w-6 h-6 flex items-center justify-center text-secondary mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
              className="w-10 h-10"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <span className="text-black/80 hover:text-gray-700 ">สร้างดูดวงทันที</span>
        </button>
      </div>

      {/* Conditional Rendering for Popup */}
      {isPopupVisible && (
        <div className="fixed inset-0 flex items-center justify-center bg-gray-500 bg-opacity-50 z-50">
          <div className="bg-white px-[40px] py-7 rounded-lg w-3/4 md:w-[860px]">
            <div className="flex justify-between items-center mb-[16px] border-zinc-300 border-b">
              <h2 className="text-[28px] font-semibold mb-2 text-primary">
                รายละเอียดดูดวงทันที
              </h2>
              <button
                onClick={togglePopup}
                className="text-gray-500 hover:text-gray-700 focus:outline-none"
              >
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2" // ทำให้เส้นหนาขึ้น
                  className="w-7 h-7" // ขยายขนาดของไอคอน
                >
                  <path
                    fillRule="evenodd"
                    d="M5.47 5.47a.75.75 0 0 1 1.06 0L12 10.94l5.47-5.47a.75.75 0 1 1 1.06 1.06L13.06 12l5.47 5.47a.75.75 0 1 1-1.06 1.06L12 13.06l-5.47 5.47a.75.75 0 0 1-1.06-1.06L10.94 12 5.47 6.53a.75.75 0 0 1 0-1.06Z"
                    clipRule="evenodd"
                  />
                </svg>
              </button>
            </div>
            <div className="text-gray-700 mb-4 space-y-5 text-[18px]">
              <p>
                บริการดูดวงทันที
                เป็นระบบที่ให้ลูกค้าสามารถฝากคำถามสำหรับการดูดวงได้ทันทีโดยไม่ต้องรอเวลานัดหมาย
                ระบบจะทำการรวบรวมคำถามที่ลูกค้าส่งมาแล้วส่งต่อให้หมอดูเพื่อตอบคำถามเหล่านั้น
                เมื่อหมอดูตอบคำถามเสร็จแล้ว
                คำตอบจะถูกส่งกลับไปให้ลูกค้าอย่างรวดเร็วทำให้ลูกค้าได้รับคำทำนายทันที
              </p>
              <p>
                ในส่วนของแพ็กเกจดูดวงทันที
                หมอดูสามารถคิดราคาเป็นแบบแพ็กเกจตามจำนวนคำถามที่ต้องการ
              </p>
              <p>
                บริการนี้ช่วยให้ลูกค้าได้รับคำตอบได้รวดเร็วและยังสามารถช่วยหมอดูเปิดบริการได้ในวันที่สะดวกที่สามารถรับ
                คิวลูกค้าได้
              </p>
              <p>
                ซึ่งสามารถรวบรวมคำถามของลูกค้าเป็นลำดับให้ง่ายสำหรับตอบคำถาม
                มีข้อมูลรายละเอียดของลูกค้า และสามารถกรอกคำตอบส่งให้กับลูกค้าได้
              </p>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default DraftedFortuneNow;
