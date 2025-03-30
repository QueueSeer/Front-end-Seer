import React, { useState, useEffect } from "react";
import ActionButtons from "./ActionButtons";
import {
  addSeerDayoff,
  getSeerCalendar,
  deleteSeerDayoff,
} from "../../Data/Schedule/Timetable";
import { th } from "date-fns/locale";

const HolidaySection = ({
  onHolidayChange,
  holiday,
  onSaveHoliday,
  onResetHoliday,
  error,
  userId,
}) => {
  const [holidayInput, setHolidayInput] = useState(holiday || "");
  const [holidayError, setHolidayError] = useState("");
  const [dayOffs, setDayOffs] = useState([]);

  useEffect(() => {
    if (userId) {
      const fetchDayOffs = async () => {
        try {
          const calendarData = await getSeerCalendar(userId);
          setDayOffs(calendarData.day_offs);
        } catch (error) {
          console.error("Error fetching day offs:", error);
        }
      };
      fetchDayOffs();
    }
  }, [userId]);

  const handleSelectChange = (e) => {
    const value = e.target.value;
    setHolidayInput(value);
    onHolidayChange(value);
  };

  const formatThaiDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  const handleDateChange = (date) => {
    if (date instanceof Date && !isNaN(date.getTime())) {
      const formattedDate = date.toISOString().split("T")[0];
      setHolidayInput(formattedDate);
      onHolidayChange(formattedDate);
    }
  };

  const handleSave = async () => {
    if (!holidayInput) {
      setHolidayError("กรุณากรอกวันหยุด");
      return;
    }

    try {
      const result = await addSeerDayoff(holidayInput);
      console.log("Day off added:", result);
      if (onSaveHoliday) onSaveHoliday(holidayInput);
      window.location.reload();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error adding day off:", error);
      setHolidayError(error.message || "เกิดข้อผิดพลาดในการบันทึกวันหยุด");
    }
  };

  const handleReset = () => {
    setHolidayInput("");
    setHolidayError("");
    if (onResetHoliday) onResetHoliday();
  };

  const handleDelete = async () => {
    if (!holidayInput) {
      alert("กรุณาเลือกวันหยุดที่ต้องการลบ");
      return;
    }

    const confirmDelete = window.confirm(
      `ต้องการลบวันหยุด ${holidayInput} ใช่หรือไม่?`
    );
    if (!confirmDelete) return;

    try {
      await deleteSeerDayoff(holidayInput);
      // ✅ รีเฟรชหน้าหลังจากลบสำเร็จ
      window.location.reload();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("Error deleting day off:", error);
      alert(error.message || "เกิดข้อผิดพลาดในการลบวันหยุด");
    }
  };

  return (
    <div>
      <label className="block text-[22px] font-semibold text-gray-700 mb-2">
        วันหยุด <span className="text-red-500">*</span>
      </label>

      {/* Dropdown และ DatePicker อยู่ด้วยกัน */}
      <div className="relative">
        <select
          name="holiday"
          value={dayOffs.includes(holidayInput) ? holidayInput : "custom"}
          onChange={handleSelectChange}
          className={`w-[400px] border ${
            holidayError ? "border-red-500" : "border-gray-300"
          } rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
        >
          <option value="custom">กรอกวันที่</option>
          {dayOffs.map((day, index) => (
            <option key={index} value={day}>
              {day}
            </option>
          ))}
        </select>

        {/* ซ่อน DatePicker ถ้าเลือกวันจาก dropdown */}
        {!dayOffs.includes(holidayInput) && (
          <div className="mt-2">
            <input
              type="date"
              value={holidayInput}
              onChange={(e) => {
                const newDate = new Date(e.target.value);
                setHolidayInput(e.target.value);
                console.log("วันที่เลือก:", formatThaiDate(e.target.value)); // แสดงวันที่เป็นภาษาไทย
              }}
              lang="th"
              className={`w-[400px] border ${
                holidayError ? "border-red-500" : "border-gray-300"
              } rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
            />
          </div>
        )}
      </div>

      {holidayError && (
        <p className="text-red-500 text-sm mt-1">{holidayError}</p>
      )}

      <ActionButtons
        onSave={handleSave}
        onReset={handleReset}
        onDelete={handleDelete}
      />
    </div>
  );
};

export default HolidaySection;
