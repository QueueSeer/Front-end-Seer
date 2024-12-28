import React, { useState } from "react";

const AppointmentCard = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [isCopied, setIsCopied] = useState(false);

  const handleMouseEnter = () => {
    setIsHovered(true); // เมื่อ hover
  };

  const handleMouseLeave = () => {
    setIsHovered(false); // เมื่อออกจาก hover
  };

  const handleCopy = () => {
    navigator.clipboard.writeText("4QCFR"); // คัดลอกข้อความลง clipboard
    setIsCopied(true); // เปลี่ยนสถานะเป็นคัดลอกแล้ว
  };

  return (
    <button className="flex items-center justify-between p-4 rounded-full bg-secondary shadow-md w-full mx-auto px-[40px] py-[20px]">
      {/* Section 1: ไอคอนและชื่อ */}
      <div className="flex items-center space-x-6">
        {/* ไอคอน */}
        <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white">
          <img
            src="/path/to/icon.png" // ใส่ URL ไอคอนที่ต้องการ
            alt="icon"
            className="w-8 h-8" // ขนาดของไอคอน
          />
        </div>

        {/* ชื่อและวันเกิด */}
        <div className="flex flex-col justify-start text-left space-y-2">
          <p className="text-[18px] font-semibold text-white">
            สุรางคนางค์ เกตุยั่งยืนวงศ์
          </p>
          <p className="text-[14px] text-white opacity-80">08/04/45</p>
        </div>
      </div>

      {/* Section 2: วันที่และเวลา */}
      <div className="flex flex-col space-y-2 items-center bg-secondary py-2 px-4 rounded-lg">
        <p className="text-[18px] text-white font-semibold">
          วันที่ 10 กันยายน
        </p>
        <p className="text-[14px] text-white opacity-90">เวลา 13.30 น.</p>
      </div>

      {/* Section 3: แพ็กเกจและปุ่ม */}
      <div className="hidden xl:flex items-center space-x-10">
        <div className="flex flex-col space-y-[4px]">
          <p className="text-sm text-white">แพ็กเกจความรัก</p>

          {/* ปุ่มคัดลอก */}
          <button
            className={`w-[120px] h-[36px] py-1 rounded-full shadow-sm border border-gray-300 flex items-center justify-center space-x-2 ${
              isCopied
                ? "bg-secondary2 text-white"
                : isHovered
                ? "bg-secondary2 text-white"
                : "bg-white text-secondary2"
            } ${!isHovered && !isCopied ? "pl-6 pr-4" : ""}`}
            onMouseEnter={handleMouseEnter} // เมื่อ hover
            onMouseLeave={handleMouseLeave} // เมื่อออกจาก hover
            onClick={handleCopy} // เมื่อกดปุ่ม
          >
            <p className="text-[14px] font-bold">
              {/* เปลี่ยนข้อความ */}
              {isCopied ? "คัดลอกแล้ว" : isHovered ? "คัดลอก" : "4QCFR"}
            </p>
            {/* ซ่อนไอคอนเมื่อ hover หรือคัดลอกแล้ว */}
            {!isHovered && !isCopied && (
              <svg
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
                strokeWidth={1.5}
                stroke="#420F75"
                className="size-6"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  d="M15.666 3.888A2.25 2.25 0 0 0 13.5 2.25h-3c-1.03 0-1.9.693-2.166 1.638m7.332 0c.055.194.084.4.084.612v0a.75.75 0 0 1-.75.75H9a.75.75 0 0 1-.75-.75v0c0-.212.03-.418.084-.612m7.332 0c.646.049 1.288.11 1.927.184 1.1.128 1.907 1.077 1.907 2.185V19.5a2.25 2.25 0 0 1-2.25 2.25H6.75A2.25 2.25 0 0 1 4.5 19.5V6.257c0-1.108.806-2.057 1.907-2.185a48.208 48.208 0 0 1 1.927-.184"
                />
              </svg>
            )}
          </button>
        </div>

        {/* ปุ่มรายละเอียด */}
        <button className="flex items-center text-sm text-white opacity-80 hover:opacity-100 underline space-x-2">
          <span>รายละเอียด</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-6 h-6"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M8.25 4.5l7.5 7.5-7.5 7.5"
            />
          </svg>
        </button>
      </div>

      {/* Icon arrow (สำหรับจอเล็ก) */}
      <div className="flex xl:hidden">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          fill="none"
          viewBox="0 0 24 24"
          strokeWidth={1.5}
          stroke="currentColor"
          className="w-6 h-6 text-white"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            d="M8.25 4.5l7.5 7.5-7.5 7.5"
          />
        </svg>
      </div>
    </button>
  );
};

export default AppointmentCard;
