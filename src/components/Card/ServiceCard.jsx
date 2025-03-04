import React from "react";

// ฟังก์ชันแปลงวันที่และเวลา
const formatDateTime = (isoDateTime) => {
  const date = new Date(isoDateTime);

  const dateOptions = { year: "numeric", month: "long", day: "numeric" };
  const timeOptions = { hour: "2-digit", minute: "2-digit", hour12: false };

  const formattedDate = date.toLocaleDateString("th-TH", dateOptions);
  const formattedTime = date.toLocaleTimeString("th-TH", timeOptions);

  return `${formattedDate} เวลา ${formattedTime} น.`;
};

// ฟังก์ชันตรวจสอบสถานะการให้บริการ
const getServiceStatus = (publicdate, fortune) => {
  return fortune === "เปิดให้บริการ" ? `เริ่มวันที่ ${formatDateTime(publicdate)}` : "ยังไม่เปิดให้บริการ";
};

const ServiceCard = ({ image, avatar, createdate, title, description, publicdate, fortuneTeller, fortune }) => {
  return (
    <div className="max-w-[310px] bg-white rounded-xl shadow-md overflow-hidden border mt-5">
      {/* ส่วนของรูปภาพ */}
      <div className="relative">
        <img className="w-full h-48 object-cover" src={image} alt="Fortune" />
      </div>

      {/* ส่วนของเนื้อหา */}
      <div className="p-4 mx-2">
        <p className="text-[12px] font-regular text-primary pb-3">
          {getServiceStatus(publicdate, fortune)}
        </p>

        <h2 className="flex text-[20px] h-[60px] mb-3 font-semibold text-gray-800 ">{title}</h2>
        <p className="text-gray-600 text-sm mb-6 line-clamp-3 h-14 overflow-hidden ">
          {description}
        </p>

        {/* ส่วนของหมอดู */}
        <div className="flex items-center mt-4 border-t border-zinc-300 pt-3">
          <img className="w-8 h-8 rounded-full" src={avatar} alt={fortuneTeller} />
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-800">{fortuneTeller}</p>
            <p className="text-xs text-gray-500">{formatDateTime(createdate)}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
