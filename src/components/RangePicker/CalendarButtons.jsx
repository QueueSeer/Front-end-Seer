import React from "react";

const CalendarButtons = ({ handleConfirm, handleCancel, handleReset }) => (
  <div className="flex justify-end space-x-3 mt-4">
    <button
      onClick={handleCancel}
      className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
    >
      ยกเลิก
    </button>
    <button
      onClick={handleReset}
      className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
    >
      รีเซ็ต
    </button>
    <button
      onClick={handleConfirm}
      className="px-4 py-2 bg-primary text-white rounded-lg hover:bg-blue-700"
    >
      ยืนยัน
    </button>
  </div>
);

export default CalendarButtons;
