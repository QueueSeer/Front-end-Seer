import React, { useState, useEffect } from "react";

const TimeRangePicker = ({ label, des, onChange }) => {
  const getCurrentTimePlus30Minutes = () => {
    const now = new Date();
    now.setMinutes(now.getMinutes() + 30); // เพิ่ม 30 นาที
    const hours = String(now.getHours()).padStart(2, "0");
    const minutes = String(now.getMinutes()).padStart(2, "0");
    return `${hours}:${minutes}`;
  };

  const [startTime, setStartTime] = useState(getCurrentTimePlus30Minutes());
  const [endTime, setEndTime] = useState("22:00");

  // Handle start time change
  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    if (onChange) {
      onChange({ startTime: newStartTime, endTime });
    }
  };

  // Handle end time change
  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
    if (onChange) {
      onChange({ startTime, endTime: newEndTime });
    }
  };

  // Effect hook to ensure end time is always after start time if needed
  useEffect(() => {
    if (startTime >= endTime) {
      const newEndTime = getCurrentTimePlus30Minutes(); // Reset to valid end time
      setEndTime(newEndTime);
      if (onChange) {
        onChange({ startTime, endTime: newEndTime });
      }
    }
  }, [startTime]); // Run this effect only when start time changes

  return (
    <div className="flex flex-col">
      <label className="text-lg font-semibold text-gray-900 mb-2">
        {label}
      </label>
      <div className="mb-3">{des}</div>
      <div className="flex space-x-4 items-center">
        <input
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
          lang="en-GB"
          className="w-[220px] px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
          step="60"
          min="00:00"
          max="23:59"
        />
        <span className="text-lg">ถึง</span>
        <input
          type="time"
          value={endTime}
          onChange={handleEndTimeChange}
          lang="en-GB"
          className="w-[220px] px-3 py-2 border rounded-lg focus:outline-none focus:ring focus:ring-primary"
          step="60"
          min="00:00"
          max="23:59"
        />
      </div>
    </div>
  );
};

export default TimeRangePicker;
