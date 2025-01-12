import { useState } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th"; // ใช้ภาษาไทย
import Images from "../../assets";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import ToggleSwitch from "./ToggleSwitchComponent";

dayjs.locale("th"); // ตั้งค่าภาษาไทย

const CalendarHeader = () => {
  const [currentDate, setCurrentDate] = useState(dayjs()); // วันที่ปัจจุบัน
  const [selectedDate, setSelectedDate] = useState(dayjs()); // วันที่ที่เลือก
  const [showFullCalendar, setShowFullCalendar] = useState(false); // เปิด/ปิดปฏิทินแบบเต็ม
  const [showDropdown, setShowDropdown] = useState(false); // เปิด/ปิด dropdown
  const [toggleOption, setToggleOption] = useState(0);

  const days = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."]; // ชื่อวันภาษาไทย

  // คำนวณวันแรกของเดือน
  const firstDayOfMonth = currentDate.startOf("month").day(); // วันแรกของเดือน (0 = อาทิตย์)
  const daysInMonth = currentDate.daysInMonth(); // จำนวนวันในเดือนปัจจุบัน

  // วันที่ในสัปดาห์ที่เลือก
  const startOfWeek = selectedDate.startOf("week");
  const weekDates = Array.from({ length: 7 }, (_, index) => startOfWeek.add(index, "day"));

  const handleDateChange = (date) => {
    setSelectedDate(date); // อัปเดตวันที่ที่เลือก
    setCurrentDate(date); // อัปเดตเดือนและปี
    setShowDropdown(false); // ปิด dropdown
  };

  const toggleFullCalendar = () => {
    setShowFullCalendar(!showFullCalendar); // สลับโหมดแสดงผลระหว่างสัปดาห์และเดือน
  };
  const handleToggleChange = (index) => {
    setToggleOption(index);
    console.log("Toggle changed to:", index === 0 ? "ใช้เฉพาะวันนี้" : "ใช้ทั้งสัปดาห์");
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
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className="mb-6">
        {/* Card ปฏิทิน */}
        <div className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-md">
          {/* ปุ่ม Back และ Next */}
          <img
            src={Images.backtostep}
            alt="Back Icon"
            className="absolute top-2 left-2 w-6 h-6 cursor-pointer"
            onClick={() => setSelectedDate(selectedDate.subtract(7, "day"))}
          />
          <img
            src={Images.nextstep}
            alt="Next Icon"
            className="absolute top-2 right-2 w-6 h-6 cursor-pointer"
            onClick={() => setSelectedDate(selectedDate.add(7, "day"))}
          />

          {/* Header Section */}
          <div className="flex items-center justify-center gap-2 mb-4">
            <div className="relative">
              <button
                onClick={() => setShowDropdown(!showDropdown)}
                className="flex items-center gap-1 border-none bg-transparent text-[#615E83] text-lg font-semibold focus:outline-none"
              >
                {`${currentDate.format("MMMM")} ${currentDate.format("YYYY")}`}
                <span className="text-sm">▼</span>
              </button>
              {showDropdown && (
                <div className="absolute top-10 left-0 bg-white border border-gray-300 rounded-lg shadow-lg z-10">
                  <DateCalendar
                    value={currentDate}
                    onChange={handleDateChange}
                    views={["year", "month"]}
                    openTo="year"
                  />
                </div>
              )}
            </div>
            <img
              src={Images.calendartimetable}
              alt="Calendar Icon"
              className="w-6 h-6 cursor-pointer ml-6" // ขยับไอคอนไปทางขวาเพิ่มอีกนิด
              onClick={toggleFullCalendar}
            />
          </div>

          {/* Days and Dates */}
          <div className="grid grid-cols-7 text-center">
            {/* Days */}
            {days.map((day, index) => (
              <div
                key={index}
                className="text-[#8677A7] text-sm font-medium flex items-center justify-center h-10"
              >
                {day}
              </div>
            ))}

            {/* Display Dates */}
            {!showFullCalendar
              ? // แสดงเฉพาะสัปดาห์
                weekDates.map((date, index) => (
                  <div
                    key={index}
                    onClick={() => setSelectedDate(date)}
                    className={`flex items-center justify-center cursor-pointer w-10 h-10 rounded-full ml-12 ${
                      date.isSame(selectedDate, "day")
                        ? "border-2 border-[#420F75] text-[#420F75] font-semibold"
                        : "text-gray-800"
                    }`}
                    style={{
                      marginTop: "4px", // ขยับวงกลมลงเล็กน้อย
                      lineHeight: "2.2rem", // ปรับตำแหน่งตัวเลขให้อยู่กึ่งกลางวงกลม
                    }}
                  >
                    {date.date()}
                  </div>
                ))
              : // แสดงทั้งเดือน
                [
                  // ช่องว่างก่อนวันที่ 1 ของเดือน
                  ...Array.from({ length: firstDayOfMonth }, (_, index) => (
                    <div key={`empty-${index}`} className="w-10 h-10"></div>
                  )),
                  // วันที่ในเดือน
                  ...Array.from({ length: daysInMonth }, (_, index) => (
                    <div
                      key={index + 1}
                      onClick={() => setSelectedDate(currentDate.date(index + 1))}
                      className={`flex items-center justify-center cursor-pointer w-10 h-10 rounded-full ml-12 ${
                        index + 1 === selectedDate.date()
                          ? "border-2 border-[#420F75] text-[#420F75] font-semibold"
                          : "text-gray-800"
                      }`}
                      style={{
                        marginTop: "4px",
                        lineHeight: "2.2rem",
                      }}
                    >
                      {index + 1}
                    </div>
                  )),
                ]}
          </div>
           
        </div>
      </div>
    </LocalizationProvider>
    </div>
  );
};

export default CalendarHeader;
