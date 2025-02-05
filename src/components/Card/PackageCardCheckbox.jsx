import React from "react";
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
    call: images.CallIcon,
    video: images.VideoIcon,
    chat: images.MessageIcon,
  };

  return (
    <div
      className={`relative w-[270px] bg-white rounded-lg shadow-md overflow-hidden border transition-all duration-200 ${
        isSelected ? "opacity-100" : "opacity-80"
      }`}
    >
      {/* Checkbox มุมซ้ายบน */}
      <div className="absolute top-2 left-2 z-10">
        <input
          type="checkbox"
          checked={isSelected}
          onChange={onSelectClick}
          className="w-6 h-6 rounded-full border-gray-300 cursor-pointer accent-primary"
        />
      </div>

      <div className="relative">
        <img
          src={imageSrc}
          alt={title || "Image"}
          className="w-full h-40 object-cover"
        />
        <div className="absolute bottom-2 left-2">
          <div className="bg-primary text-white text-sm px-4 py-1 rounded-full shadow">
            {Category}
          </div>
        </div>
      </div>

      <div className="p-4">
        <div className="mb-3 text-[20px] h-[60px] font-semibold text-gray-800 overflow-hidden text-ellipsis line-clamp-2 ">
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
        <div className="flex items-center mt-1">
          <span className="text-gray-800 font-regular text-sm mr-2">
            {rating.toFixed(1)}
          </span>
          <span className="text-yellow-500 text-[18px]">
            {"★".repeat(Math.floor(rating)) +
              "☆".repeat(5 - Math.floor(rating))}
          </span>
          <span className="ml-2 text-sm text-gray-500">
            ({reviews.toLocaleString()} reviews)
          </span>
        </div>
        <div className="mt-2 text-[24px] font-bold text-secondary2">
          {price.toLocaleString()} Coins
        </div>
        <div className="flex items-center justify-between mt-4">
          <div className="text-[16px] font-semibold text-gray-500 flex items-center space-x-3">
            <img
              src={packageIcons[packageType]}
              alt={`${packageType} Icon`}
              className="w-[28px] h-auto"
            />
            <span>{callTime}</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PackageCardCheckbox;
