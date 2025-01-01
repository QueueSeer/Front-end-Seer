import React, { useState } from "react";
import Images from "../../assets"; // ไอคอนสำหรับ Sort

const ReviewFilter = () => {
  const stars = [5, 4, 3, 2, 1];
  const [activeFilter, setActiveFilter] = useState("ทั้งหมด"); // จัดการสถานะปุ่มที่ถูกเลือก

  return (
    <div className="flex items-center flex-wrap gap-4 mb-6">
      {/* ปุ่ม "ทั้งหมด" */}
      <button
        onClick={() => setActiveFilter("ทั้งหมด")} // อัปเดต state เมื่อคลิก
        className={`px-5 py-2 font-medium rounded-full border ${
          activeFilter === "ทั้งหมด"
            ? "border-[#FAA91A] text-[#FAA91A]"
            : "border-gray-300 text-gray-700 hover:border-[#FAA91A] hover:text-[#FAA91A]"
        } focus:outline-none`}
      >
        ทั้งหมด
      </button>

      {/* ปุ่มสำหรับตัวกรองดาว */}
      {stars.map((star) => (
        <button
          key={star}
          onClick={() => setActiveFilter(`${star} ดาว`)} 
          className={`px-5 py-2 font-medium rounded-full border ${
            activeFilter === `${star} ดาว`
              ? "border-[#FAA91A] text-[#FAA91A]"
              : "border-gray-300 text-gray-700 hover:border-[#FAA91A] hover:text-[#FAA91A]"
          } focus:outline-none`}
        >
          {star} ดาว
        </button>
      ))}

      {/* ปุ่ม Sorting */}
      <div
        onClick={() => console.log("Sorting triggered")} 
        className="ml-auto flex items-center text-[#65558F] cursor-pointer hover:text-purple-700"
      >
        <span className="mr-1">เรียงจากใหม่ไปเก่า</span>
        <img
          src={Images.SortFromBottomToTop}
          alt="Sort Icon"
          className="w-5 h-5"
        />
      </div>
    </div>
  );
};

export default ReviewFilter;
