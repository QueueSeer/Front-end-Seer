import { useState } from "react";
import Images from "../../assets";

const CalendarHeader = ({
  months = ["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"],
  years = ["2566", "2567", "2568"],
  selectedMonth,
  selectedYear,
  onDateChange,
}) => {
  const [currentMonth, setCurrentMonth] = useState(selectedMonth || "ตุลาคม");
  const [currentYear, setCurrentYear] = useState(selectedYear || "2567");
  const [isTodayChecked, setIsTodayChecked] = useState(false);
  const [isWeekChecked, setIsWeekChecked] = useState(true);

  const days = ["จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "อา."];

  const handleToggleToday = () => {
    setIsTodayChecked(!isTodayChecked);
  };

  const handleToggleWeek = () => {
    setIsWeekChecked(!isWeekChecked);
  };

  const handleMonthChange = (event) => {
    const selectedMonth = event.target.value;
    setCurrentMonth(selectedMonth);
    onDateChange && onDateChange({ month: selectedMonth, year: currentYear });
  };

  const handleYearChange = (event) => {
    const selectedYear = event.target.value;
    setCurrentYear(selectedYear);
    onDateChange && onDateChange({ month: currentMonth, year: selectedYear });
  };

  return (
    <div className="mb-6">
      {/* Header Section */}
      <div className="flex items-center space-x-2 mb-4">
        <img src={Images.Clock_CircleIcon} alt=" Clock_CircleIcon" className="w-6 h-6" />
        <h1 className="text-xl sm:text-2xl font-bold text-[#65558F]">ตารางเวลา</h1>
      </div>

      {/* Divider Under Header */}
      <hr className="border-t border-gray-300 mb-4" />

    <div className="bg-white border border-gray-300 rounded-lg p-4 shadow-sm">
      {/* Month and Year Selection */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-2">
          <select
            value={currentMonth}
            onChange={handleMonthChange}
            className="border rounded px-2 py-1 text-gray-700"
          >
            {months.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={handleYearChange}
            className="border rounded px-2 py-1 text-gray-700"
          >
            {years.map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
        </div>
        <div className="flex items-center gap-2">
          <img src={Images.calendartimetable} alt="Calendar Icon" className="w-6 h-6 text-purple-500" />
        </div>
      </div>

      {/* Days and Dates */}
      <div className="grid grid-cols-7 text-center gap-2">
        {days.map((day, index) => (
          <div key={index} className="text-gray-500">
            {day}
          </div>
        ))}
        {Array.from({ length: 31 }).map((_, index) => (
          <div
            key={index}
            className={`${
              index === 8 ? "bg-purple-500 text-white rounded-full" : "text-gray-800"
            } p-2`}
          >
            {index + 1}
          </div>
        ))}
      </div>

      {/* Toggles */}
      <div className="flex items-center gap-4 mt-4">
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isTodayChecked}
            onChange={handleToggleToday}
            className="form-checkbox rounded"
          />
          <span className="text-gray-700">ใช้เฉพาะวันนี้</span>
        </label>
        <label className="flex items-center gap-2">
          <input
            type="checkbox"
            checked={isWeekChecked}
            onChange={handleToggleWeek}
            className="form-checkbox rounded"
          />
          <span className="text-gray-700">ใช้ทั้งสัปดาห์</span>
        </label>
      </div>
    </div>
    </div>
  );
};

export default CalendarHeader; 
