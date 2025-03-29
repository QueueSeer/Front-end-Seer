import React, { useState, useEffect } from "react";
import { DateRange } from "react-date-range";
import { th } from "date-fns/locale";
import PredefinedRangeSelector from "./PredefinedRangeSelector";
import CalendarButtons from "./CalendarButtons";

const CalendarPopup = ({
  predefinedRanges,
  handlePredefinedRange,
  selectedRange,
  handleSelect,
  handleConfirm,
  handleCancel,
  handleReset,
  dayClassName,
  renderCustomDayContent,
}) => {
  const [monthsToShow, setMonthsToShow] = useState(2);

  useEffect(() => {
    // ฟังก์ชันตรวจสอบขนาดหน้าจอและอัปเดตค่า months
    const updateMonths = () => {
      if (window.innerWidth < 768) {
        setMonthsToShow(1);
      } else {
        setMonthsToShow(2);
      }
    };

    updateMonths();
    window.addEventListener("resize", updateMonths);
    return () => window.removeEventListener("resize", updateMonths);
  }, []);

  const customDayClassName = (date) => {
    if (selectedRange?.[0]?.startDate && selectedRange?.[0]?.endDate) {
      const isSelected =
        date >= selectedRange[0].startDate && date <= selectedRange[0].endDate;
      return isSelected ? "bg-purple-500 text-white" : "";
    }
    return "";
  };

  return (
    <div className="bg-white border rounded-lg shadow-lg mt-2 p-4 w-auto max-w-[850px]">
      <PredefinedRangeSelector
        predefinedRanges={predefinedRanges}
        handlePredefinedRange={handlePredefinedRange}
      />
      <div className="flex justify-center mt-4">
        <div className="w-auto max-w-[800px]">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            ranges={selectedRange}
            locale={th}
            months={monthsToShow}
            className="border rounded-lg text-gray-800 h-[430px] text-[20px] w-auto mx-4"
            direction="horizontal"
            dayClassName={customDayClassName}
            renderDayContents={renderCustomDayContent}
            showDateDisplay={true}
            moveRangeOnFirstSelection={false}
            rangeColors={["#8677A7"]}
            minDate={new Date()} // ❌ ป้องกันการเลือกวันที่ย้อนหลัง
          />
        </div>
      </div>
      <CalendarButtons
        handleConfirm={handleConfirm}
        handleCancel={handleCancel}
        handleReset={handleReset}
      />
    </div>
  );
};

export default CalendarPopup;
