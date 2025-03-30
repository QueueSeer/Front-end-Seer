import React, { useState } from "react";
import Images from "../../assets"; // Icons for Sort

const ReviewFilter = ({ setSelectedScore }) => {
  const stars = [5, 4, 3, 2, 1];
  const [activeFilter, setActiveFilter] = useState("ทั้งหมด");

  const handleFilterClick = (star) => {
    setActiveFilter(star === "ทั้งหมด" ? "ทั้งหมด" : `${star} ดาว`);
    setSelectedScore(star === "ทั้งหมด" ? null : star); // อัปเดตค่า score ที่เลือก
  };

  return (
    <div className="mb-6">
      <div className="hidden sm:flex flex-wrap items-center gap-4">
        <div className="flex flex-wrap gap-2 w-full sm:w-auto">
          <button
            onClick={() => handleFilterClick("ทั้งหมด")}
            className={`px-5 py-2 font-medium rounded-full border ${
              activeFilter === "ทั้งหมด"
                ? "border-[#FAA91A] text-[#FAA91A]"
                : "border-gray-300 text-gray-700 hover:border-[#FAA91A] hover:text-[#FAA91A]"
            } focus:outline-none`}
          >
            ทั้งหมด
          </button>

          {stars.map((star) => (
            <button
              key={star}
              onClick={() => handleFilterClick(star)}
              className={`px-5 py-2 font-medium rounded-full border ${
                activeFilter === `${star} ดาว`
                  ? "border-[#FAA91A] text-[#FAA91A]"
                  : "border-gray-300 text-gray-700 hover:border-[#FAA91A] hover:text-[#FAA91A]"
              } focus:outline-none`}
            >
              {star} ดาว
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ReviewFilter;
