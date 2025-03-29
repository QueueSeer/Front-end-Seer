import React, { useState } from "react";
import TimeRangePicker from "../../../components/RangePicker/TimeRangePicker"; // นำเข้า TimeRangePicker

const TimeFortune = ({ onTimeChange }) => {
  const [startTime, setStartTime] = useState("");
  const [endTime, setEndTime] = useState("");

  const handleTimeRangeChange = (timeObj) => {
    const { startTime, endTime } = timeObj; // ดึงค่า startTime และ endTime ออกมา
    setStartTime(startTime);
    setEndTime(endTime);

    // ตรวจสอบว่า onTimeChange เป็นฟังก์ชัน
    if (onTimeChange && typeof onTimeChange === "function") {
      onTimeChange(startTime, endTime); // ส่งค่ากลับไปยัง onTimeChange
    } else {
      console.error("onTimeChange is not a function");
    }
  };
  return (
    <div>
      <TimeRangePicker
        label="ช่วงเวลาที่ดูดวง"
        des=""
        onChange={handleTimeRangeChange}
      />
    </div>
  );
};

export default TimeFortune;
