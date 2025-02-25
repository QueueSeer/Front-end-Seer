import { useState, useEffect } from "react";
import dayjs from "dayjs";
import "dayjs/locale/th"; // ใช้ภาษาไทย
import Images from "../../assets";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";

dayjs.locale("th"); // ตั้งค่าภาษาไทย

const FullCalendarPage = ({ onEdit, onPost, formData }) => {
  const [currentDate, setCurrentDate] = useState(dayjs()); // วันที่ปัจจุบัน
  const [calendarData, setCalendarData] = useState([]); // ข้อมูลสถานะวันที่
  
  const [isPopupOpen, setIsPopupOpen] = useState(false); // ควบคุม popup
  const [isPublished, setIsPublished] = useState(false); // ตรวจสอบว่าเผยแพร่แล้วหรือยัง

  // Mock data สำหรับสถานะวันว่าง (จุดเขียว) / วันเต็ม (จุดแดง) / วันหยุด (สีเทา)
  useEffect(() => {
    const mockData = [
      { date: "2025-02-25", status: "available" },
      { date: "2025-02-26", status: "full" },
      { date: "2025-02-27", status: "available" },
      { date: "2025-02-29", status: "available" },
      { date: "2025-02-30", status: "available" },
     
      { date: "2025-02-28", status: "holiday" }, // 28 ก.พ. เป็นวันหยุด
    ];
    setCalendarData(mockData);
  }, []);

  // ฟังก์ชันตรวจสอบสถานะวัน
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
        <img src={Images.Clock_CircleIcon} alt="Clock Icon" className="w-6 h-6" />
        <h1 className="text-xl sm:text-2xl font-bold text-[#65558F]">ตารางเวลา</h1>
      </div>

      {/* Divider */}
      <hr className="border-t border-gray-300 mb-4" />

      <LocalizationProvider dateAdapter={AdapterDayjs}>
        <div className="mb-6">
          {/* Card ปฏิทิน */}
          <div className="relative bg-white border border-gray-200 rounded-lg p-4 shadow-md">
            {/* Header: เดือนและปี */}
            <div className="flex items-center justify-center mb-6">
              <div className="absolute left-1/2 transform -translate-x-1/2 flex items-center">
                <button className="flex items-center gap-1 border-none bg-transparent text-[#615E83] text-lg font-semibold focus:outline-none">
                  {`${currentDate.format("MMMM")} ${currentDate.format("YYYY")}`}
                </button>
                <img src={Images.calendartimetable} alt="Calendar Icon" className="w-6 h-6 cursor-pointer ml-2" />
              </div>

              {/* คำอธิบายสถานะ */}
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

            {/* ตารางวัน */}
            <div className="grid grid-cols-7 text-center ">
              {/* Days */}
              {["อา.", "จ.", "อ.", "พ.", "พฤ.", "ศ.", "ส."].map((day, index) => (
                <div key={index} className="text-[#8677A7] text-sm font-medium flex   h-10 translate-x-12">
                  {day}
                </div>
              ))}

              {/* Dates */}
              {Array.from({ length: currentDate.daysInMonth() }, (_, index) => {
                const date = currentDate.date(index + 1);
                const status = getStatus(date);
                return (
                  <div
                    key={index + 1}
                    className={`relative flex flex-col items-center justify-center w-10 h-10 ml-9 ${
                      status === "holiday" ? "text-gray-500 opacity-50 pointer-events-none" : "text-gray-800"
                    }`}
                  >
                    <span>{index + 1}</span>
                    {status === "available" && <span className="w-2 h-2 bg-green-500 rounded-full mt-1"></span>}
                    {status === "full" && <span className="w-2 h-2 bg-red-500 rounded-full mt-1"></span>}
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </LocalizationProvider>

      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="bg-gray-300 px-6 py-2 rounded-full shadow-md text-gray-700 hover:bg-gray-400 transition"
          onClick={onEdit}
        >
          แก้ไข
        </button>

        <button
          className={`px-6 py-2 rounded-full shadow-md transition ${
            isPublished
              ? "bg-green-500 text-white cursor-default" // สีเขียวหลังเผยแพร่
              : "bg-[#65558F] text-white hover:bg-[#54357A]" // สีม่วงก่อนเผยแพร่
          }`}
          onClick={() => {
            if (!isPublished) setIsPopupOpen(true); // เปิด Popup เฉพาะถ้ายังไม่เผยแพร่
          }}
          disabled={isPublished} // ปิดการคลิกถ้าเผยแพร่แล้ว
        >
          {isPublished ? "เผยแพร่แล้ว" : "เผยแพร่"}
        </button>
      </div>

      {/* ✅ Popup ยืนยันเผยแพร่ */}
      {isPopupOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            {/* หัวข้อ Popup */}
            <h2 className="text-xl font-semibold text-[#65558F] text-center mb-4">
              {isPublished ? "เผยแพร่สำเร็จ" : "ยืนยันการเผยแพร่ตารางใช่หรือไม่?"}
            </h2>

            {/* ปุ่มกดเลือก */}
            <div className="flex justify-center space-x-4 mt-6">
              {/* ปุ่มปิด Popup */}
              {!isPublished ? (
                <>
                  {/* ปุ่ม ไม่ใช่ (ปิด popup) */}
                  <button
                    className="bg-gray-300 px-6 py-2 rounded-full shadow-md text-gray-700 hover:bg-gray-400 transition"
                    onClick={() => setIsPopupOpen(false)}
                  >
                    ไม่ใช่
                  </button>

                  {/* ปุ่ม ใช่ (ยืนยันเผยแพร่) */}
                  <button
                    className="bg-[#65558F] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#54357A] transition"
                    onClick={() => {
                      setIsPopupOpen(true); // คง popup ไว้เพื่อแสดง "เผยแพร่สำเร็จ"
                      setTimeout(() => {
                        setIsPopupOpen(false); // ปิด popup อัตโนมัติ
                        setIsPublished(true); // เปลี่ยนปุ่มเป็น "เผยแพร่แล้ว"
                        onPost(); // ทำงานโพสต์
                      }, 1500);
                    }}
                  >
                    ใช่
                  </button>
                </>
              ) : (
                <button
                  className="bg-green-500 text-white px-6 py-2 rounded-full shadow-md hover:bg-green-600 transition"
                  onClick={() => setIsPopupOpen(false)}
                >
                  ตกลง
                </button>
              )}
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default FullCalendarPage;
