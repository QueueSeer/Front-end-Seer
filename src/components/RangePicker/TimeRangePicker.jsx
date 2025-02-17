import React, { useState } from "react";

const TimeRangePicker = ({ label = "เวลาประมูล", onChange }) => {
  const [startTime, setStartTime] = useState("08:00");
  const [endTime, setEndTime] = useState("17:00");

  const handleStartTimeChange = (e) => {
    const newStartTime = e.target.value;
    setStartTime(newStartTime);
    onChange && onChange({ startTime: newStartTime, endTime });
  };

  const handleEndTimeChange = (e) => {
    const newEndTime = e.target.value;
    setEndTime(newEndTime);
    onChange && onChange({ startTime, endTime: newEndTime });
  };

  return (
    <div className="flex flex-col space-y-2 mb-6">
      <label className="text-lg font-semibold text-gray-900 mb-4">{label}</label>
      <div className="flex space-x-4 items-center">
        <input
          type="time"
          value={startTime}
          onChange={handleStartTimeChange}
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
