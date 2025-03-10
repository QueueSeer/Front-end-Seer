import React from "react";

const ProfileInfo = ({ icon, name, birthdate }) => {
  return (
    <div className="flex items-center space-x-6 w-[300px]">
      {/* ไอคอน */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white">
        <img src={icon} alt="icon" className="w-8 h-8" />
      </div>

      {/* ชื่อและวันเกิด (ให้อยู่กึ่งกลางแนวตั้ง) */}
      <div className="flex flex-col justify-center text-left space-y-1">
        <p className="text-[18px] font-semibold text-white">{name}</p>
        <p className="text-[16px] text-white opacity-80">{birthdate}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
