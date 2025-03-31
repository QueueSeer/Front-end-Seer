import React from "react";
import ProfileInfo from "../../../components/Appointment/ProfileInfo";
import DateInfo from "../../../components/Appointment/DateInfo";
import CopyButton from "../../../components/Appointment/CopyButton";
import DetailsButton from "../../../components/Appointment/DetailsButton";
import { truncateText, AmpStatus } from "../../../utils/utils";

const AppointmentCard = ({
  image,
  name,
  date,
  time,
  packageName,
  code,
  status,
  onNameChange,
  onBirthdateChange,
  onDateChange,
  onTimeChange,
  isCopied,
  onCopy,
}) => {
  // ตรวจสอบว่าเป็นสถานะ u_cancelled หรือไม่
  const isCancelled = status === "u_cancelled";

  return (
    <div
      className={`flex items-center  justify-between rounded-[15px] shadow-md w-full mx-auto px-[40px] py-[12px] cursor-pointer 
        ${
          isCancelled
            ? "bg-gray-200 border border-gray-300 text-gray-500"
            : "bg-primary text-white"
        }`}
      onClick={() => console.log("Card clicked")}
    >
      {/* Section 1: ข้อมูลไอคอนและชื่อ */}
      <ProfileInfo
        image={image}
        name={name}
        packageName={truncateText(packageName || "ประมูลดูดวง", 20)}
        onNameChange={onNameChange}
        onBirthdateChange={onBirthdateChange}
      />

      {/* Section 2: วันที่และเวลา */}
      <DateInfo
        date={date}
        time={time}
        onDateChange={onDateChange}
        onTimeChange={onTimeChange}
      />

      {/* Section 3: แพ็กเกจและปุ่ม */}
      <div className="hidden xl:flex items-center space-x-10">
        <div className="flex flex-col items-center">
          <div
            className={`text-[16px] font-regular ${
              isCancelled ? "text-gray-400" : "text-white"
            }`}
          >
            {AmpStatus(status)}
          </div>
          <CopyButton
            text={isCancelled ? "CANCEL" : code}
            isCopied={isCopied}
            onCopy={onCopy}
          />
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
          className={`w-6 h-6 ${isCancelled ? "text-gray-600" : "text-white"}`}
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
