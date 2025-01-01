import React from "react";
import Images from "../../assets";

const ReviewHeader = () => {
  return (
    <div className="mb-6">
      {/* Header Section */}
      <div className="flex items-center space-x-2 mb-4">
        <img src={Images.Star} alt="Star Icon" className="w-6 h-6" />
        <h1 className="text-xl sm:text-2xl font-bold text-[#65558F]">จัดการรีวิว</h1>
      </div>

      {/* Divider Under Header */}
      <hr className="border-t border-gray-300 mb-4" />

      {/* Average Rating and Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Rating Section */}
        <div className="flex items-center space-x-4">
          {/* Stars */}
          <div className="flex space-x-1">
            <img src={Images.Starcolor} alt="Star Yellow" className="w-6 h-6" />
            <img src={Images.Starcolor} alt="Star Yellow" className="w-6 h-6" />
            <img src={Images.Starcolor} alt="Star Yellow" className="w-6 h-6" />
            <img src={Images.Starcolor} alt="Star Yellow" className="w-6 h-6" />
            <img src={Images.StarYellow} alt="Star Empty" className="w-6 h-6" />
          </div>
          {/* Average Rating Text */}
          <div className="text-lg font-bold text-[#F59E0B]">โดยเฉลี่ย 4.5</div>
          <div className="hidden sm:block text-gray-500">(150 รีวิว)</div>
        </div>

        {/* Dropdown and Review Count for Mobile */}
        <div className="flex sm:hidden items-center justify-between">
          <span className="text-gray-500 text-sm">(150 รีวิว)</span>
          <select className="border border-gray-300 rounded-md p-2 text-sm">
            <option>กันยายน 2567</option>
            <option>สิงหาคม 2567</option>
          </select>
        </div>

        {/* Dropdown Section for Larger Screens */}
        <div className="hidden sm:flex items-center space-x-2">
          <select className="border border-gray-300 rounded-md p-2 text-sm sm:text-base">
            <option>กันยายน 2567</option>
            <option>สิงหาคม 2567</option>
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReviewHeader;
