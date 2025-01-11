import { useState } from "react";
import Images from "../../assets";

const CalendarHeader = () => {
  const [currentMonth, setCurrentMonth] = useState("ตุลาคม");
  const [currentYear, setCurrentYear] = useState("2567");
  const [selectedDate, setSelectedDate] = useState(9);

  const days = ["จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส.", "อา."];

  // วันที่ในสัปดาห์ (เริ่มต้นตรงกับวันแรกของสัปดาห์)
  const startDate = 7; // วันที่ 7 ตรงกับวันจันทร์
  const weekDates = Array.from({ length: 7 }, (_, index) => startDate + index);

  const handleDateClick = (date) => {
    setSelectedDate(date);
  };

  return (
    <div className="mb-6">
    {/* Header Section */}
    <div className="flex items-center space-x-2 mb-4">
      <img src={Images.Clock_CircleIcon} alt="Star Icon" className="w-6 h-6" />
      <h1 className="text-xl sm:text-2xl font-bold text-[#65558F]">ตารางเวลา</h1>
    </div>

    {/* Divider Under Header */}
    <hr className="border-t border-gray-300 mb-4" />
    <div className="bg-white border border-gray-200 rounded-lg p-4 shadow-md">
      {/* Header Section */}
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-2 mx-auto">
          <select
            value={currentMonth}
            onChange={(e) => setCurrentMonth(e.target.value)}
            className="border-none bg-transparent text-[#615E83] text-lg font-semibold focus:outline-none"
          >
            {["มกราคม", "กุมภาพันธ์", "มีนาคม", "เมษายน", "พฤษภาคม", "มิถุนายน", "กรกฎาคม", "สิงหาคม", "กันยายน", "ตุลาคม", "พฤศจิกายน", "ธันวาคม"].map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
          <select
            value={currentYear}
            onChange={(e) => setCurrentYear(e.target.value)}
            className="border-none bg-transparent text-[#615E83] text-lg font-semibold focus:outline-none"
          >
            {["2566", "2567", "2568"].map((year, index) => (
              <option key={index} value={year}>
                {year}
              </option>
            ))}
          </select>
          <img
            src={Images.calendartimetable}
            alt="Calendar Icon"
            className="w-6 h-6 cursor-pointer"
          />
        </div>
        <img
          src={Images.nextstep}
          alt="Next Icon"
          className="w-6 h-6 cursor-pointer"
        />
      </div>

      {/* Days and Dates */}
      <div className="grid grid-cols-7 text-center mt-4">
        {/* Days */}
        {days.map((day, index) => (
          <div key={index} className="text-[#8677A7] text-sm font-medium flex items-center justify-center h-10">
            {day}
          </div>
        ))}

        {/* Dates */}
        {weekDates.map((date, index) => (
          <div
            key={index}
            onClick={() => handleDateClick(date)}
            className={`flex items-center justify-center cursor-pointer w-10 h-10 rounded-full ml-12 pt-2 ${
              date === selectedDate ? "border-2 border-[#420F75] text-[#420F75] font-semibold mb-5" : "text-gray-800"
            }`}
            style={{
              gridColumnStart: index + 1, // จัดตำแหน่งวันที่ให้ตรงกับวัน
              marginTop: "-8px", // ขยับวันที่ให้ลงมาตรงกับวัน
            }}
          >
            {date > 31 ? date - 31 : date} {/* จัดการกรณีวันที่เกิน 31 */}
          </div>
        ))}
      </div>
    </div>
    </div>
  );
};

export default CalendarHeader;
