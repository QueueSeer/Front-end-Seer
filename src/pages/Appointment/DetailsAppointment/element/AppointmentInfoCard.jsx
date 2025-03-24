import React from "react";
import AppointmentStatus from "./AppointmentStatus"; 
import { formatDate, formatTime } from "../utils/utils"; 

const AppointmentInfoCard = ({ appointmentDetails }) => {
  return (
    <div className="bg-primary text-white rounded-lg p-6 sm:p-10 mt-4 shadow-lg">
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8">
        <div className="text-center space-y-2">
          <p className="text-[16px] md:text-[20px] font-medium">วันที่นัดหมาย</p>
          <p className="text-[18px] md:text-[24px] font-bold">
            {formatDate(appointmentDetails.start_time)}
          </p>
        </div>
        <div className="text-center space-y-2 sm:border-x-2">
          <p className="text-[16px] md:text-[20px] font-medium">เวลานัดหมาย</p>
          <p className="text-[18px] md:text-[24px] font-bold">
            {formatTime(appointmentDetails.start_time)} น.
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
        <p className="text-lg font-medium">{appointmentDetails.seer.name}</p>
      </div>
    </div>
  );
};

export default AppointmentInfoCard;
