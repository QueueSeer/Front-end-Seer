// src/components/PackageForm/CategorySelector.js
import React from "react";

// กำหนดค่า categories ในที่นี้
const categories = [
  "ความรัก",
  "การงาน",
  "การเงิน",
  "สุขภาพ",
  "ภาพรวม",
  "ดวงรายเดือน",
  "ดวงรายปี",
  "เนื้อคู่",
  "ค้นหาตัวตน",
  "การเรียน",
  "ย้ายงาน",
  "อื่นๆ",
];

const CategorySelector = ({ selectedCategory, setSelectedCategory }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        หมวดหมู่
      </label>
      <div className="flex flex-wrap gap-2">
        {categories.map((category) => (
          <button
            key={category}
            onClick={() => setSelectedCategory(category)}
            className={`px-4 py-2 rounded-full border ${
              selectedCategory === category
                ? "bg-purple-600 text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {category}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategorySelector;
