import React from "react";

const ProfileInfo = ({ icon, name, birthdate }) => {
  return (
    <div className="flex items-center space-x-6 w-[300px]">
      {/* ✅ รูปโปรไฟล์ (เต็มวงกลม + จัดกลาง) */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white overflow-hidden">
        <img src={icon} alt="profile icon" className="w-full h-full object-cover" />
      </div>

      {/* ✅ ชื่อและวันเกิด (ชิดซ้าย) */}
      <div className="flex flex-col justify-center text-left">
        <p className="text-[18px] font-semibold text-white">{name}</p>
        <p className="text-[16px] text-white opacity-80">{birthdate}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
