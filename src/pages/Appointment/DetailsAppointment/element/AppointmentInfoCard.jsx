import React from "react";
import { formatDate, formatTime, getChannelLabel, AppointmentStatus } from "../../../../utils/utils";

const AppointmentInfoCard = ({ appointmentDetails, packageDetails }) => {
  const { foretellChannel, price, duration } = packageDetails; // Destructure ข้อมูลจาก object

  return (
    <div className="bg-primary text-white rounded-lg p-6 sm:p-10 mt-4 shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8">
        <div className="text-center space-y-2">
          <p className="text-[16px] md:text-[20px] font-medium">
            วันที่นัดหมาย
          </p>
          <p className="text-[18px] md:text-[24px] font-bold">
            {formatDate(appointmentDetails.start_time)}
          </p>
        </div>
        <div className="text-center space-y-2 sm:border-x-2">
          <p className="text-[16px] md:text-[20px] font-medium">เวลานัดหมาย</p>
          <p className="text-[18px] md:text-[24px] font-bold">
            {formatTime(appointmentDetails.start_time)}
          </p>
        </div>
        <div className="text-center space-y-2">
          <p className="text-[16px] md:text-[20px] font-medium">สถานะ</p>
          <div className="mt-4">
            <AppointmentStatus status={appointmentDetails.status} />
          </div>
        </div>
      </div>
      <div className="text-center mt-4 py-2">
        <p className="text-[24px] sm:text-[32px] font-semibold">
          {appointmentDetails.package.name}
        </p>
        <p className="text-lg font-medium">{appointmentDetails.seer.display_name}</p>
      </div>
      <div className="justify-items-center items-center">
        <div className="grid grid-cols-2 md:grid-cols-4 gap-x-6 gap-y-4 mt-9 text-[18px]">
          {[
            { label: "เวลาที่ใช้", value: `${duration} นาที` },
            {
              label: "เวลาสิ้นสุด",
              value: formatTime(appointmentDetails.end_time),
            },
            { label: "รูปแบบ", value: getChannelLabel(foretellChannel) },

            { label: "ราคา", value: `${price} คอยน์` },
          ].map((item, index) => (
            <div key={index} className="flex flex-col items-center">
              <p className="font-regular   ">{item.label}</p>
              <p className="font-bold text-[22px] pt-2">{item.value}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AppointmentInfoCard;
