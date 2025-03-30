import React, { useState, useEffect } from "react";
import ActionButtons from "./ActionButtons";
import {
  updateSeerSchedule,
  getSeerCalendar,
} from "../../Data/Schedule/Timetable";

const FormSection = ({ userId }) => {
  const [formData, setFormData] = useState({});
  const [errors, setErrors] = useState({});
  const [selectedDays, setSelectedDays] = useState([]);
  const [maxCustomers, setMaxCustomers] = useState("");
  const [showAfternoon, setShowAfternoon] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const daysOrder = [
    "จันทร์",
    "อังคาร",
    "พุธ",
    "พฤหัสบดี",
    "ศุกร์",
    "เสาร์",
    "อาทิตย์",
  ];

  const dayMapping = {
    จันทร์: 0,
    อังคาร: 1,
    พุธ: 2,
    พฤหัสบดี: 3,
    ศุกร์: 4,
    เสาร์: 5,
    อาทิตย์: 6,
  };

  useEffect(() => {
    const fetchSchedule = async () => {
      try {
        const data = await getSeerCalendar(userId);
        const scheduleData = data.schedules || [];
        const newFormData = {};

        scheduleData.forEach((item) => {
          const dayName = Object.keys(dayMapping).find(
            (key) => dayMapping[key] === item.day
          );

          if (!dayName) return;

          if (!newFormData[dayName]) {
            newFormData[dayName] = {};
          }

          const startTime = item.start_time.slice(0, 5); // ตัดเอาแค่ HH:MM
          const endTime = item.end_time.slice(0, 5);

          // แยกเป็นรอบเช้าและรอบบ่าย
          if (parseInt(startTime.split(":")[0]) < 12) {
            newFormData[dayName].workingHours = startTime;
            newFormData[dayName].closingHours = endTime;
          } else {
            newFormData[dayName].afternoonStart = startTime;
            newFormData[dayName].afternoonEnd = endTime;
            setShowAfternoon((prev) => ({ ...prev, [dayName]: true }));
          }
        });

        setFormData(newFormData);
        setSelectedDays(Object.keys(newFormData)); // เลือกวันที่มีข้อมูลโดยอัตโนมัติ
      } catch (error) {
        console.error("❌ ไม่สามารถโหลดตารางเวลาได้", error);
      }
    };

    fetchSchedule();
  }, [userId]);

  const handleInputChange = (e, day) => {
    const { name, value } = e.target;

    if (name === "maxCustomers") {
      setMaxCustomers(value);
    } else {
      setFormData((prev) => ({
        ...prev,
        [day]: { ...prev[day], [name]: value },
      }));
    }

    setErrors((prev) => ({
      ...prev,
      [day]: { ...prev[day], [name]: "" },
    }));
  };

  const toggleAfternoon = (day) => {
    setShowAfternoon((prev) => {
      const newShowAfternoon = { ...prev, [day]: !prev[day] };
      if (!newShowAfternoon[day]) {
        setFormData((prev) => {
          const newFormData = { ...prev };
          if (newFormData[day]) {
            delete newFormData[day].afternoonStart;
            delete newFormData[day].afternoonEnd;
          }
          return newFormData;
        });
      }
      return newShowAfternoon;
    });
  };

  const formatTime = (time) => {
    if (!time || typeof time !== "string") return null;
    const parts = time.split(":");
    if (parts.length === 2) return `${parts[0]}:${parts[1]}:00+07:00`;
    if (parts.length === 3) return `${parts[0]}:${parts[1]}:${parts[2]}+07:00`;
    return null;
  };

  const convertFormDataToSchedule = () => {
    let schedule = [];

    Object.keys(formData).forEach((day) => {
      const dayNumber = dayMapping[day];
      const data = formData[day];

      if (dayNumber === undefined) {
        console.warn(`⚠️ ไม่พบวัน: ${day}`);
        return;
      }

      console.log(`🔍 กำลังประมวลผลวัน: ${day} (${dayNumber})`, data);

      // ตรวจสอบว่าเวลาถูกต้องและไม่เป็น undefined
      const morningStart = formatTime(data.workingHours);
      const morningEnd = formatTime(data.closingHours);
      const afternoonStart = formatTime(data.afternoonStart);
      const afternoonEnd = formatTime(data.afternoonEnd);

      if (morningStart && morningEnd) {
        schedule.push({
          day: dayNumber,
          start_time: morningStart,
          end_time: morningEnd,
        });
      }

      if (afternoonStart && afternoonEnd) {
        schedule.push({
          day: dayNumber,
          start_time: afternoonStart,
          end_time: afternoonEnd,
        });
      }
    });

    console.log("📝 Final schedule data:", schedule);
    return schedule;
  };

  const handleSave = async () => {
    const scheduleData = convertFormDataToSchedule();
    console.log("🚀 Data to be sent:", JSON.stringify(scheduleData, null, 2));

    if (!scheduleData || scheduleData.length === 0) {
      console.warn("⚠️ ไม่มีข้อมูลให้บันทึก");
      return;
    }

    try {
      const response = await updateSeerSchedule(scheduleData);
      console.log("✅ Update successful:", response);
      window.location.reload();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error(
        "❌ Error updating schedule:",
        error.response?.data || error
      );
    }
  };

  return (
    <div>
      <div className="mb-4 text-[22px] font-semibold">สร้างตารางเวลา</div>

      <div className="flex flex-wrap gap-3 mb-[26px]">
        {daysOrder.map((day) => (
          <button
            key={day}
            onClick={() =>
              setSelectedDays((prev) =>
                prev.includes(day)
                  ? prev.filter((d) => d !== day)
                  : [...prev, day]
              )
            }
            className={`px-4 py-2 rounded-full border text-sm ${
              selectedDays.includes(day)
                ? "bg-secondary2 text-white border-purple-600"
                : "bg-white text-black border-gray-300"
            } hover:border-purple-500`}
          >
            {day}
          </button>
        ))}
      </div>

      {daysOrder.map((day) =>
        selectedDays.includes(day) ? (
          <div key={day} className="mb-6 border p-4 rounded-lg shadow-sm">
            <h3 className="text-lg font-semibold text-gray-700 mb-2">{day}</h3>
            <div className="grid grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เวลาเปิดทำการ
                </label>
                <input
                  type="text"
                  name="workingHours"
                  value={formData[day]?.workingHours || ""}
                  onChange={(e) => handleInputChange(e, day)}
                  placeholder="09:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  เวลาปิดทำการ
                </label>
                <input
                  type="text"
                  name="closingHours"
                  value={formData[day]?.closingHours || ""}
                  onChange={(e) => handleInputChange(e, day)}
                  placeholder="12:00"
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            <button
              onClick={() => toggleAfternoon(day)}
              className="mt-3 px-4 py-2 border border-primary text-primary text-[14px] rounded-full"
            >
              {showAfternoon[day] ? "ลบรอบบ่าย" : "เพิ่มรอบบ่าย"}
            </button>

            {showAfternoon[day] && (
              <div className="grid grid-cols-2 gap-6 mt-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เวลาเปิดรอบบ่าย
                  </label>
                  <input
                    type="text"
                    name="afternoonStart"
                    value={formData[day]?.afternoonStart || ""}
                    onChange={(e) => handleInputChange(e, day)}
                    placeholder="13:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-2">
                    เวลาปิดรอบบ่าย
                  </label>
                  <input
                    type="text"
                    name="afternoonEnd"
                    value={formData[day]?.afternoonEnd || ""}
                    onChange={(e) => handleInputChange(e, day)}
                    placeholder="17:00"
                    className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"

                  />
                </div>
              </div>
            )}
          </div>
        ) : null
      )}

      <ActionButtons
        onSave={handleSave}
        onReset={() => setFormData({})}
        isLoading={isLoading}
      />
    </div>
  );
};

export default FormSection;
