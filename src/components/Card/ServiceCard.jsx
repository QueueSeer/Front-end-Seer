import React from "react";
import { formatDate, formatTime } from "../../utils/utils";

// ฟังก์ชันตรวจสอบสถานะการให้บริการ
const getServiceStatus = (fortune, timeRemaining) => {
  if (fortune === "เปิดให้บริการ") return timeRemaining;
  if (fortune === "ปิดให้บริการ") return "ปิดให้บริการ";
  return "ยังไม่เปิดให้บริการ";
};

const ServiceCard = ({ image, avatar, createdate, title, description, publicdate, fortuneTeller, fortune, enddate, timeRemaining }) => {
  return (
    <div className="max-w-[310px] bg-white rounded-xl shadow-md overflow-hidden border mt-5">
      {/* ส่วนของรูปภาพ */}
      <div className="relative">
        <img className="w-full h-48 object-cover" src={image} alt="Fortune" />
      </div>

      {/* ส่วนของเนื้อหา */}
      <div className="p-4 mx-2">
        {/* แสดงสถานะบริการ */}
        <p className="text-[12px] font-regular text-primary pb-3">
          {getServiceStatus(fortune, timeRemaining)}
        </p>

        {/* ชื่อบริการ */}
        <h2 className="flex text-[20px] h-[60px] mb-3 font-semibold text-gray-800 ">
          {title}
        </h2>

        {/* คำอธิบาย */}
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 h-14 overflow-hidden ">
          {description}
        </p>

        {/* ข้อมูลหมอดู */}
        <div className="flex items-center mt-4 border-t border-zinc-300 pt-3">
          <img className="w-8 h-8 rounded-full" src={avatar} alt={fortuneTeller} />
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-800">{fortuneTeller}</p>
            <p className="text-xs text-gray-500">
              เริ่มวันที่ {formatDate(publicdate)} {formatTime(publicdate)}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
