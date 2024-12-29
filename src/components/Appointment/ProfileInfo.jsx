import React from "react";

const ProfileInfo = ({ icon, name, birthdate }) => {
  // แปลง birthdate ให้เป็นวันที่ในรูปแบบ '1 ธันวาคม 2528'
  const formattedDate = new Date(birthdate).toLocaleDateString("th-TH", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  return (
    <div className="flex items-center space-x-6 w-[300px]">
      {/* ไอคอน */}
      <div className="w-12 h-12 flex items-center justify-center rounded-full bg-white">
        <img src={icon} alt="icon" className="w-8 h-8" />
      </div>

      {/* ชื่อและวันเกิด */}
      <div className="flex flex-col justify-start text-left space-y-2">
        <p className="text-[18px] font-semibold text-white">{name}</p>
        <p className="text-[14px] text-white opacity-80">{formattedDate}</p>
      </div>
    </div>
  );
};

export default ProfileInfo;
