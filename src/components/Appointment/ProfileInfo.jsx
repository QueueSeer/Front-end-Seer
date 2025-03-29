import React from "react";

const ProfileInfo = ({ image, name, packageName }) => {
  return (
    <div className="flex items-center space-x-6 w-[300px]">
      {/* ไอคอน */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white overflow-hidden">
        <img src={image} alt="image" className="w-12 h-12 object-cover" />
      </div>

      {/* ชื่อและวันเกิด (ให้อยู่กึ่งกลางแนวตั้ง) */}
      <div className="flex flex-col justify-center text-left space-y-1">
        <p className="text-[18px] font-semibold text-white">{name}</p>
        <p className="text-[16px] text-white opacity-80">{packageName}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
