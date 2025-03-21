import React from "react";
import { Link } from "react-router-dom";  // เพิ่มการนำเข้า Link จาก react-router-dom
import images from "../../assets";

const PackageCardCheckbox = ({
  id,
  imageSrc,
  title,
  Category,
  fortuneTeller,
  imageProfile,
  rating,
  reviews,
  price,
  callTime,
  packageType,
  status,
  isSelected, // เพิ่ม prop สำหรับสถานะ Checkbox
  onSelectClick, // ฟังก์ชันเมื่อคลิก Checkbox
}) => {
  // ไอคอนสำหรับแต่ละประเภทแพ็กเกจ
  const packageIcons = {
    phone: images.phoneIcon,
    video: images.videoIcon,
    chat: images.messageIcon,
  };

  return (
    <div
      className={`relative w-[275px]  bg-white rounded-lg shadow-md overflow-hidden border transition-all duration-200 ${
        isSelected ? "opacity-100" : "opacity-80"
      }`}
    >
      {/* Checkbox มุมซ้ายบน */}
      <div className="absolute top-2 left-2 z-10 ">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelectClick}
          className="w-8 h-8 rounded-full border-gray-300 cursor-pointer accent-primary"
        />
      </div>

      {/* ใช้ Link เพื่อทำการนำทางไปที่หน้า /package/detail/:id */}
      <Link to={`/package/detail/${id}`} className="relative block">
        <img
          src={imageSrc}
          alt={title || "Image"}
          className="w-full h-[200px] object-cover"
        />
        <div className="absolute bottom-2 left-2">
          <div className="bg-primary text-white text-sm px-4 py-1 rounded-full shadow">
            {Category}
          </div>
        </div>
      </Link>

      <div className="p-4">
        <div className="mb-3 text-[20px] h-[65px] font-semibold text-gray-800 overflow-hidden text-ellipsis line-clamp-2 ">
          {title}
        </div>
        <p className="text-sm text-gray-500 flex items-center">
          <img
            src={imageProfile}
            alt={fortuneTeller || "Image"}
            className="w-[25px] h-[25px] rounded-full mr-2"
          />
          <span className="text-black font-regular">{fortuneTeller}</span>
        </p>
        <div className="mt-3 text-[24px] font-bold text-secondary2">
          {price ? price.toLocaleString() : "0"} Coins
        </div>
        <div className="flex items-center justify-between mt-2 mb-1">
          <div className="text-[18px] font-semibold text-gray-500 flex items-center space-x-3">
            <img
              src={packageIcons[packageType]}
              alt={`${packageType} Icon`}
              className="w-[24px] h-auto"
            />
            <span>{callTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCardCheckbox;
