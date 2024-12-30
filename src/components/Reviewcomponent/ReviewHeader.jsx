import React from "react";
import Images from "../../assets"; // ไอคอน Star

const ReviewHeader = () => {
  return (
    <div className="mb-6">
      <div className="flex items-center space-x-2 mb-4">
        <img src={Images.Star} alt="Star Icon" className="w-6 h-6" />
        <h1 className="text-2xl font-bold text-[#65558F]">จัดการรีวิว</h1>
      </div>
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-2">
          <span className="text-[#F59E0B] text-lg font-bold">โดยเฉลี่ย 4.5</span>
          <span className="text-gray-500">(150 รีวิว)</span>
        </div>
        <div>
          <select className="border border-gray-300 rounded-md p-2">
            <option>กันยายน 2567</option>
            <option>สิงหาคม 2567</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReviewHeader;
