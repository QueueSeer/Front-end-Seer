import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { getSeerCalendar } from "../../Data/Schedule/Timetable";

dayjs.locale("th");

const CalendarHeader = ({ seerId }) => {
  const [currentDate, setCurrentDate] = useState(dayjs());
  const [calendarData, setCalendarData] = useState({
    schedules: [],
    day_offs: [],
  });
  const [showDropdown, setShowDropdown] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      if (!seerId) return;
      try {
        const data = await getSeerCalendar(seerId);
        setCalendarData({
          schedules: data?.schedules || { full: [] },
          day_offs: data?.day_offs || [],
        });
      } catch (error) {
        console.error("Error fetching calendar data:", error);
      }
    };
    fetchData();
  }, [seerId]);

  const daysInMonth = currentDate.daysInMonth();
  const firstDayOfMonth = currentDate.startOf("month").day();
  const days = ["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."];

  const getStatus = (date) => {
    const formattedDate = date.format("YYYY-MM-DD");
    const isOlderThan90Days = dayjs().subtract(90, "days").isAfter(date);

    if (isOlderThan90Days) return "past"; // เกิน 90 วัน
    if (calendarData.day_offs?.includes(formattedDate)) return "day-off"; // วันหยุด
    if (calendarData.schedules.full?.includes(formattedDate)) return "full"; // วันเต็ม
    return "available"; // วันว่าง
  };

  const handleMonthChange = (amount) => {
    setCurrentDate(currentDate.add(amount, "month"));
  };

  const handleSelectMonth = (event) => {
    setCurrentDate(
      dayjs().month(parseInt(event.target.value)).year(currentDate.year())
    );
    setShowDropdown(false);
  };

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <div className=" p-4 mb-6 border rounded-lg  bg-white relative">
        {/* Header พร้อม Dropdown เลือกเดือน */}
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => handleMonthChange(-1)}
            className="text-lg text-gray-700"
          >
            &#9665;
          </button>
          <div className="relative">
            <button
              onClick={() => setShowDropdown(!showDropdown)}
              className="text-lg font-semibold text-[#65558F] bg-transparent border-none focus:outline-none"
            >
              {currentDate.format("MMMM YYYY")}
            </button>
            {showDropdown && (
              <select
                className="absolute left-0 top-8 bg-white border p-2 rounded-md shadow-lg"
                onChange={handleSelectMonth}
                value={currentDate.month()}
              >
                {Array.from({ length: 12 }, (_, i) => (
                  <option key={i} value={i}>
                    {dayjs().month(i).format("MMMM")}
                  </option>
                ))}
              </select>
            )}
          </div>
          <button
            onClick={() => handleMonthChange(1)}
            className="text-lg text-gray-700"
          >
            &#9655;
          </button>
        </div>
        {/* ปฏิทิน */}
        <div className="h-auto grid grid-cols-7 text-center mt-2 ">
          {days.map((day, index) => (
            <div
              key={index}
              className="text-sm font-medium text-[#8677A7] mb-3"
            >
              {day}
            </div>
          ))}
          {/* Fill the first empty days from the previous month */}
          {[...Array(firstDayOfMonth).fill(null)].map((_, index) => (
            <div key={index} className="text-sm text-transparent"></div>
          ))}

          {/* Render the current month's days */}
          {Array.from({ length: daysInMonth }, (_, index) => {
            const day = index + 1;
            const date = currentDate.date(day);
            const status = getStatus(date);
            const isPast = dayjs().isAfter(date, "day"); // Check if the date is in the past

            return (
              <div
                key={index}
                className={`flex flex-col items-center py-2 ${
                  isPast
                    ? "text-gray-300" // Past days are gray
                    : status === "day-off"
                    ? "text-gray-400" // Day-offs are gray
                    : "text-gray-800"
                }`}
              >
                {day}
                <span
                  className={`w-2.5 h-2.5 rounded-full mt-1 ${
                    isPast
                      ? "hidden" // Hide the dot if it's a past date
                      : status === "day-off"
                      ? "bg-gray-400" // Day off color
                      : status === "full"
                      ? "bg-red-500" // Full day color
                      : "bg-green-500" // Available day color
                  }`}
                ></span>
              </div>
            );
          })}
        </div>
      </div>
    </LocalizationProvider>
  );
};

export default CalendarHeader;
