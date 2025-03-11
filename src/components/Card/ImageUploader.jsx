import React, { useState, useEffect } from "react";

const ImageUploader = ({
  onImageUpload,
  isImageValid,
  setIsImageValid,
  resetImage,
  onUploadSuccess,
}) => {
  const [image, setImage] = useState(null);
  const [selectedFile, setSelectedFile] = useState(null); // Store actual file
  const [errorMessage, setErrorMessage] = useState("");
  const [uploading, setUploading] = useState(false);

  useEffect(() => {
    if (resetImage) {
      setImage(null);
      setSelectedFile(null);
      setIsImageValid(false);
      setErrorMessage("");
    }
  }, [resetImage, setIsImageValid]);

  const handleImageChange = (event) => {
    const file = event.target.files[0];
    if (file) {
      const isImage = file.type.startsWith("image/");
      if (!isImage) {
        setErrorMessage("กรุณาเลือกไฟล์ภาพเท่านั้น");
        setIsImageValid(false);
        setImage(null);
        setSelectedFile(null);
        return;
      }

      const imageUrl = URL.createObjectURL(file);
      setImage(imageUrl);
      setSelectedFile(file); // Store the actual file
      setIsImageValid(true);
      setErrorMessage("");
      onImageUpload?.(file);
    }
  };

  const handleImageUpload = async () => {
    if (!selectedFile) {
      setErrorMessage("กรุณาเลือกภาพก่อนอัปโหลด");
      return;
    }

    setUploading(true);

    try {
      console.log("Uploading file:", selectedFile);

      setUploading(false);

      if (onUploadSuccess) {
        onUploadSuccess(selectedFile);
      }
    } catch (error) {
      setErrorMessage("ไม่สามารถอัปโหลดภาพได้");
      setUploading(false);
    }
  };

  // Cleanup URL object to prevent memory leaks
  useEffect(() => {
    return () => {
      if (image) {
        URL.revokeObjectURL(image);
      }
    };
  }, [image]);

  return (
    <div
      className={`w-full h-[300px] border ${
        isImageValid ? "border-gray-300" : "border-bordercancel"
      } rounded-lg flex flex-col items-center justify-center bg-gray-100 overflow-hidden relative`}
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
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M12 4.5v15m7.5-7.5h-15"
            />
          </svg>
          {!isImageValid && !image ? (
            <p className="text-sm text-bordercancel mt-2">กรุณากรอกข้อมูล</p>
          ) : (
            <span className="text-sm mt-2">อัพโหลดรูป</span>
          )}
          {errorMessage && (
            <p className="text-sm text-red-500 mt-2">{errorMessage}</p>
          )}
          <input
            type="file"
            accept="image/*"
            className="hidden"
            onChange={handleImageChange}
          />
        </label>
      )}

      
    </div>
  );
};

export default ImageUploader;
