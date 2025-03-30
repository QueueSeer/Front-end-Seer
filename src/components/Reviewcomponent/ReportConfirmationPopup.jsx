import React, { useEffect } from "react";

const ReportConfirmationPopup = ({ onClose }) => {
  useEffect(() => {
    // Set a timeout to automatically close the popup after 5 seconds
    const timer = setTimeout(() => {
      onClose(); // Automatically close after 5 seconds
    }, 5000); // 5000ms = 5 seconds

    // Clear timeout if the component is unmounted or onClose is called before the timeout
    return () => clearTimeout(timer);
  }, [onClose]);

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
