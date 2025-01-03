// QuestionCard.js
import React from 'react';

const QuestionCard = ({ questionText, index }) => {
  return (
    <div className="px-10 py-8 mt-6 bg-white border rounded-lg shadow-md">
      <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5">
        คำถามข้อที่ {index + 1} {/* เพิ่มลำดับเลขโดยอัตโนมัติ */}
      </h2>
      <div className="text-[18px]">
        {questionText}
      </div>
    </div>
  );
};

export default QuestionCard;
