import React from "react";
import ProfileInfo from "../../../components/Appointment/ProfileInfo";
import DateInfo from "../../../components/Appointment/DateInfo";
import DetailsButton from "../../../components/Appointment/DetailsButton";

const FortuneNowCard = ({
  icon,
  name,
  birthdate,
  date,
  time,
  email,
  timeRemaining,
  onNameChange,
  onBirthdateChange,
  onDateChange,
  onTimeChange,
}) => {
  return (
    <div
      className="flex items-center justify-between rounded-[15px] bg-primary shadow-md w-full mx-auto px-[40px] py-[12px] cursor-pointer"
      onClick={() => console.log("Card clicked")}
    >
      {/* Section 1: ข้อมูลไอคอนและชื่อ */}
      <ProfileInfo
        icon={icon}
        name={name}
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
        <div className="flex items-center w-[180px] justify-end">
          <p className="text-[14px] font-regular text-white text-right">
            {timeRemaining}
          </p>
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

export default FortuneNowCard;
