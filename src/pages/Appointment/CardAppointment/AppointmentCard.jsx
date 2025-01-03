import React from "react";
import ProfileInfo from "../../../components/Appointment/ProfileInfo";
import DateInfo from "../../../components/Appointment/DateInfo";
import CopyButton from "../../../components/Appointment/CopyButton";
import DetailsButton from "../../../components/Appointment/DetailsButton";


const AppointmentCard = ({
  icon,
  name,
  birthdate,
  date,
  time,
  packageName,
  code,
  email,
  onNameChange,
  onBirthdateChange,
  onDateChange,
  onTimeChange,
  isCopied,
  onCopy,
}) => {
  return (
    <div
      className="flex items-center justify-between rounded-full bg-secondary shadow-md w-full mx-auto px-[40px] py-[12px] cursor-pointer"
      onClick={() => console.log("Card clicked")}
    >
      {/* Section 1: ข้อมูลไอคอนและชื่อ */}
      <ProfileInfo
        icon={icon}
        name={name}
        birthdate={birthdate} // ใช้ฟังก์ชันจัดรูปแบบ
        onNameChange={onNameChange}
        onBirthdateChange={onBirthdateChange}
      />

      {/* Section 2: วันที่และเวลา */}
      <DateInfo
        date={date} // ใช้ฟังก์ชันจัดรูปแบบ
        time={time} // ใช้ฟังก์ชันจัดรูปแบบ
        onDateChange={onDateChange}
        onTimeChange={onTimeChange}
      />

      {/* Section 3: แพ็กเกจและปุ่ม */}
      <div className="hidden xl:flex items-center space-x-10">
        <div className="flex flex-col space-y-[4px] items-center">
          <p className="text-[16px] font-regular text-white">{packageName}</p>
          <CopyButton text={code} isCopied={isCopied} onCopy={onCopy} />
        </div>
        <DetailsButton />
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
    </div>
  );
};

export default AppointmentCard;
