import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th"; // ใช้ภาษาไทย
import Images from "../../assets";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.locale("th"); // ตั้งค่าภาษาไทย

const FullCalendarPage = ({ onEdit, onPost, formData }) => {
  const [currentDate, setCurrentDate] = useState(dayjs()); // วันที่ปัจจุบัน
  const [selectedDate, setSelectedDate] = useState(dayjs()); // วันที่ที่เลือก
  const [calendarData, setCalendarData] = useState([]); // ข้อมูลสถานะวันที่

  // Mock data for status: available (green), full (red), holiday (gray)
  useEffect(() => {
    const mockData = [
      { date: "2025-01-14", status: "available" },
      { date: "2025-01-15", status: "full" },
      { date: "2025-01-16", status: "holiday" },
    ];
    setCalendarData(mockData);
  }, []);

  const getStatus = (date) => {
    const dayData = calendarData.find(
      (item) => item.date === date.format("YYYY-MM-DD")
    );
    return dayData ? dayData.status : null;
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
          <div className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-md  ">
            {/* Header Section */}
            <div className="flex items-center justify-center mb-12">
                {/* เดือนและ พ.ศ. ตรงกลาง */}
                <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center mt-10">
                <button
                    className="flex items-center gap-1 border-none bg-transparent text-[#615E83] text-lg font-semibold focus:outline-none"
                >
                    {`${currentDate.format("MMMM")} ${currentDate.format("YYYY")}`}
                </button>
                <img
                    src={Images.calendartimetable}
                    alt="Calendar Icon"
                    className="w-6 h-6 cursor-pointer ml-2"
                />
                </div>

                {/* คำอธิบายสถานะในมุมขวา */}
                <div className="absolute top-4 right-4 flex flex-col space-y-2 text-sm text-gray-700">
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-green-500 rounded-full mr-2"></span>
                    <span>ว่าง</span>
                </div>
                <div className="flex items-center">
                    <span className="w-3 h-3 bg-red-500 rounded-full mr-2"></span>
                    <span>เต็ม</span>
                </div>
                </div>
            </div>


            {/* Days and Dates */}
            <div className="grid grid-cols-7 text-center">
              {/* Days */}
              {["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."].map((day, index) => (
                <div
                  key={index}
                  className="text-[#8677A7] text-sm font-medium flex items-center justify-center h-10"
                >
                  {day}
                </div>
              ))}

              {/* Dates */}
              {Array.from({ length: 31 }, (_, index) => {
                const date = currentDate.date(index + 1);
                const status = getStatus(date);
                return (
                  <div
                    key={index + 1}
                    className={`relative flex flex-col items-center justify-center w-10 h-10 ml-12 ${
                      status === "holiday"
                        ? "text-gray-500 opacity-50 pointer-events-none"
                        : "text-gray-800"
                    }`}
                  >
                    <span>{index + 1}</span>
                    {status === "available" && (
                      <span className="w-2 h-2 bg-green-500 rounded-full mt-1"></span>
                    )}
                    {status === "full" && (
                      <span className="w-2 h-2 bg-red-500 rounded-full mt-1"></span>
                    )}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </LocalizationProvider>

      {/* Action Buttons */}
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="bg-gray-300 px-6 py-2 rounded-full shadow-md text-gray-700 hover:bg-gray-400 transition"
          onClick={onEdit}
        >
          แก้ไข
        </button>
        <button
          className="bg-[#65558F] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#54357A] transition"
          onClick={onPost}
        >
          โพสต์
        </button>
      </div>
    </div>
  );
};

export default FullCalendarPage;
