import React, { useState } from "react";
import TimeRangePicker from "../../../components/RangePicker/TimeRangePicker"; // นำเข้า TimeRangePicker

const CreateAuction = () => {
  const [timeRange, setTimeRange] = useState({
    startTime: "08:00",
    endTime: "17:00",
  });

  const handleTimeRangeChange = (newTimeRange) => {
    const { startTime, endTime } = newTimeRange;
    // ตรวจสอบว่าเวลาที่เลือกมีรูปแบบที่ถูกต้องหรือไม่
    if (startTime && endTime) {
      setTimeRange({ startTime, endTime });
      console.log("เวลาที่เลือก:", newTimeRange);
    } else {
      console.error("เวลาที่เลือกไม่ถูกต้อง");
    }
  };

  return (
    <div>
      <TimeRangePicker label="เวลาที่ประมูล" onChange={handleTimeRangeChange} />
      
    </div>
  );
};

export default CreateAuction;
