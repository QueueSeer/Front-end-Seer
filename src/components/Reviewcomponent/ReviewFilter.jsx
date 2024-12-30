import React from "react";

const ReviewFilter = () => {
  const stars = [5, 4, 3, 2, 1];

  return (
    <div className="flex items-center space-x-4 mb-6">
      <button className="px-4 py-2 bg-purple-100 text-purple-700 rounded-lg shadow-sm">
        ทั้งหมด
      </button>
      {stars.map((star) => (
        <button
          key={star}
          className="flex items-center px-4 py-2 bg-gray-100 hover:bg-purple-100 hover:text-purple-700 rounded-lg shadow-sm"
        >
          <span>{star} ดาว</span>
        </button>
      ))}
      <button className="ml-auto flex items-center px-4 py-2 bg-gray-100 hover:bg-purple-100 hover:text-purple-700 rounded-lg shadow-sm">
        เรียงจากใหม่ไปเก่า
      </button>
    </div>
  );
};

export default ReviewFilter;
