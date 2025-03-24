import React from "react";
import { formatDate, formatTime } from "../utils/utils";

const renderInfoSection = (title, content) => (
  <div className="flex flex-col sm:flex-row">
    <div className="w-full sm:w-40 font-medium text-gray-800 mb-1 sm:mb-0">
      {title}
    </div>
    <div className="flex-1">{content}</div>
  </div>
);

const BookingInfoCard = ({ client }) => {
  return (
    <div className="px-10 py-8 mt-6 bg-white border border-gray-400 rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5">ข้อมูลผู้จอง</h2>
      <div className="space-y-4 text-[18px]">
        {client.display_name && renderInfoSection("ชื่อ-นามสกุล", client.display_name)}
        {client.required.birthdate && renderInfoSection("วันเกิด", formatDate(client.required.birthdate))}
        {client.required.birthdate && renderInfoSection("เวลาเกิด", formatTime(client.required.birthdate))}
        {client.required.phone_number && renderInfoSection("เบอร์โทรศัพท์", client.required.phone_number)}
      </div>
    </div>
  );
};

export default BookingInfoCard;
