import React from "react";
import Images from "../../assets";

const ReviewHeader = () => {
  return (
    <div className="mb-6">
      {/* ส่วนหัว */}
      <div className="flex items-center space-x-2 mb-4">
        <img src={Images.Star} alt="Star Icon" className="w-6 h-6" />
        <h1 className="text-xl font-bold text-[#65558F]">จัดการรีวิว</h1>
      </div>
      
      {/* เส้นแบ่งใต้หัวข้อ */}
      <hr className="border-t border-gray-300 mb-4" />
      
      {/* คะแนนเฉลี่ย และ Dropdown */}
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          {/* ดาวแสดงคะแนนเฉลี่ย */}
          <div className="flex space-x-1">
            <img src={Images.Starcolor} alt="Star Yellow" className="w-6 h-6" />
            <img src={Images.Starcolor} alt="Star Yellow" className="w-6 h-6" />
            <img src={Images.Starcolor} alt="Star Yellow" className="w-6 h-6" />
            <img src={Images.Starcolor} alt="Star Yellow" className="w-6 h-6" />
            <img src={Images.StarYellow} alt="Star Empty" className="w-6 h-6" />
          </div>
          <div className="text-lg font-bold text-[#F59E0B]">โดยเฉลี่ย 4.5</div>
          <div className="text-gray-500">(150 รีวิว)</div>
        </div>
        <div className="flex items-center space-x-2">
          {/* Dropdown */}
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
