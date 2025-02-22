import React, { useState, useEffect } from "react";

const ImageUploader = ({ onImageUpload, isImageValid, resetImage }) => {
  const [image, setImage] = useState(null);

  // ใช้ useEffect เพื่อตรวจสอบ prop resetImage และรีเซ็ตรูปภาพ
  useEffect(() => {
    if (resetImage) {
      setImage(null); // รีเซ็ตรูปภาพเมื่อได้รับคำสั่งให้รีเซ็ต
    }
  }, [resetImage]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      onImageUpload?.(file);
    }
  };

  return (
    <div
      className={`w-full h-[300px] border ${!isImageValid ? "border-bordercancel" : "border-gray-300"} rounded-lg flex flex-col items-center justify-center bg-gray-100 overflow-hidden relative`}
    >
      {image ? (
        <div className="relative w-full h-full">
          <img
            src={image}
            alt="Uploaded"
            className="w-full h-full object-cover"
          />
          <label className="absolute inset-0 bg-black bg-opacity-50 flex items-center justify-center text-white text-sm cursor-pointer opacity-0 hover:opacity-100 transition-opacity">
            <span>เปลี่ยนรูป</span>
            <input
              type="file"
              accept="image/*"
              className="hidden"
              onChange={handleImageChange}
            />
          </label>
        </div>
      ) : (
        <label className="flex flex-col items-center justify-center text-gray-400 cursor-pointer w-full h-full">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            strokeWidth={1.5}
            stroke="currentColor"
            className="w-12 h-12"
          >
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 4.5v15m7.5-7.5h-15" />
          </svg>
          <span className="text-sm mt-2">อัพโหลดรูป</span>
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      )}
      {!isImageValid && !image && (
        <p className="text-sm text-bordercancel mt-1">กรุณากรอกข้อมูล</p>
      )}
    </div>
  );
};

export default ImageUploader;
