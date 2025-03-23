// src/components/PackageForm/TimeInput.js
import React from "react";

const TimeInput = ({ time, handleTimeChange }) => {
  return (
    <div className="mb-4">
      <label htmlFor="time" className="block text-gray-700 font-medium mb-2">
        เวลาที่ใช้ (นาที)
      </label>
      <input
        id="time"
        type="number"
        placeholder="15"
        value={time}
        onChange={handleTimeChange}
        className="w-full px-4 py-3 border rounded-md focus:ring focus:ring-purple-200 focus:outline-none"
      />
    </div>
  );
};

export default TimeInput;
