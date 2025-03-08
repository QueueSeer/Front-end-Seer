import React, { useState } from "react";
import PropTypes from "prop-types"; 
import images from "../../assets";
import ImageUploader from "./ImageUploader";

const ShowExampleCard = ({
  title = "Default Title",  
  Category = "Uncategorized",  
  fortuneTeller = "Unknown", 
  imageProfile = images.DefaultProfile,  
  rating = 0,  
  reviews = 0,  
  price = 0, 
  callTime = "0 นาที",  
  packageType = "phone", 
  status = "available", 
  onImageUpload,
}) => {
  const [isImageValid, setIsImageValid] = useState(false);
  const [resetImage, setResetImage] = useState(false);
  const [uploadedImage, setUploadedImage] = useState(null); // เก็บรูปที่อัปโหลด

  const packageIcons = {
    phone: images.phoneIcon,
    video: images.videoIcon,
    chat: images.messageIcon,
  };

  // รับค่าภาพที่อัปโหลดมาจาก ImageUploader
  const handleImageUpload = (file) => {
    onImageUpload(file); // ส่งค่ากลับไปที่ component หลัก (Package)

  };

  const renderStars = () => {
    const fullStars = Math.floor(rating);
    const emptyStars = 5 - fullStars;
    return (
      <>
        {"★".repeat(fullStars)}
        {"☆".repeat(emptyStars)}
      </>
    );
  };

  return (
    <div className="relative w-full bg-white rounded-lg shadow-md overflow-hidden border transition-all duration-200">
      <div className="relative">
        {/* ImageUploader component to upload images */}
        <ImageUploader
          onImageUpload={handleImageUpload}
          isImageValid={isImageValid}
          setIsImageValid={setIsImageValid}
          resetImage={resetImage}
        />

        <div className="absolute bottom-2 left-2">
          <div className="bg-primary text-white text-sm px-4 py-1 rounded-full shadow">
            {Category}
          </div>
        </div>
      </div>

      <div className="p-4">
        {/* Package Title */}
        <div className="mb-3 text-[20px] h-[60px] font-semibold text-gray-800 overflow-hidden text-ellipsis line-clamp-2">
          {title}
        </div>

        {/* Fortune Teller Info */}
        <p className="text-sm text-gray-500 flex items-center">
          <img
            src={uploadedImage || imageProfile} // ใช้ภาพที่อัปโหลด หรือ fallback เป็นภาพเดิม
            alt={fortuneTeller || "Fortune Teller Profile"}
            className="w-[25px] h-[25px] rounded-full mr-2"
          />
          <span className="text-black font-regular">{fortuneTeller}</span>
        </p>

        {/* Rating Info */}
        <div className="flex items-center mt-1">
          <span className="text-gray-800 font-regular text-sm mr-2">
            {rating.toFixed(1)}
          </span>
          <span className="text-yellow-500 text-[18px]">
            {renderStars()}
          </span>
          <span className="ml-2 text-sm text-gray-500">
            ({reviews.toLocaleString()} reviews)
          </span>
        </div>

        {/* Price Info */}
        <div className="mt-2 text-[24px] font-bold text-secondary2">
          {price.toLocaleString()} Coins
        </div>

        {/* Package Type Info */}
        <div className="flex items-center justify-between mt-4">
          <div className="text-[16px] font-semibold text-gray-500 flex items-center space-x-3">
            <img
              src={packageIcons[packageType] || images.DefaultPackageIcon}  
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

// Prop validation
ShowExampleCard.propTypes = {
  title: PropTypes.string.isRequired,
  Category: PropTypes.string.isRequired,
  fortuneTeller: PropTypes.string.isRequired,
  imageProfile: PropTypes.string,
  rating: PropTypes.number.isRequired,
  reviews: PropTypes.number.isRequired,
  price: PropTypes.number.isRequired,
  callTime: PropTypes.string.isRequired,
  packageType: PropTypes.oneOf(["phone", "video", "chat"]).isRequired,
  status: PropTypes.string,
};

export default ShowExampleCard;
