import React from "react";

const ReportConfirmationPopup = ({ onClose }) => {
  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
      <div className="bg-white rounded-lg p-6 w-full max-w-sm shadow-lg relative">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ✕
        </button>

        {/* Confirmation Message */}
        <h2 className="text-xl text-center font-bold text-[#65558F] mb-4">
          เราได้รับรายงานของคุณแล้ว
        </h2>
        <p className="text-gray-500 text-center">
        "ระบบได้รับเหตุผลในการขอลบความคิดเห็นของคุณแล้ว กำลังดำเนินการตรวจสอบและจะแจ้งผลให้ทราบโดยเร็ว ขอบคุณสำหรับความร่วมมือ"
        </p>
      </div>
    </div>
  );
};

export default ReportConfirmationPopup;
