import { useState } from "react";

const TimeSlots = ({ formData }) => {
  const [selectedPackage, setSelectedPackage] = useState(""); // แพคเกจที่เลือก
  const [selectedPeriod, setSelectedPeriod] = useState("morning"); // ช่วงเวลาเช้าหรือบ่าย
  const [timeSlots, setTimeSlots] = useState({
    morning: ["09:30", "10:00", "11:00"], // ช่วงเช้า
    afternoon: ["13:30", "14:00", "14:30", "15:00"], // ช่วงบ่าย
  });

  const handleDeleteSlot = (period, index) => {
    setTimeSlots((prev) => ({
      ...prev,
      [period]: prev[period].filter((_, i) => i !== index),
    }));
  };

  const handlePackageChange = (e) => {
    setSelectedPackage(e.target.value);
    // ตัวอย่างการอัปเดตเวลาเมื่อเปลี่ยนแพคเกจ
    if (e.target.value === "package1") {
      setTimeSlots({
        morning: ["09:30", "10:00", "11:00"],
        afternoon: ["13:30", "14:00", "14:30", "15:00"],
      });
    } else if (e.target.value === "package2") {
      setTimeSlots({
        morning: ["09:00", "09:30", "10:00", "11:30"],
        afternoon: ["14:00", "14:30", "15:00", "15:30"],
      });
    }
  };

  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <div className="flex items-center gap-4">
          <h3 className="text-lg font-bold text-gray-700">แสดงเวลาตัวอย่าง</h3>
          <select
            className="border border-gray-300 rounded-lg p-2 text-sm"
            value={selectedPackage}
            onChange={handlePackageChange}
          >
            <option value="">แพคเกจที่เปิดบริการ</option>
            <option value="package1">แพคเกจ 1</option>
            <option value="package2">แพคเกจ 2</option>
          </select>
        </div>
      </div>

      {/* ช่วงเช้าและช่วงบ่าย */}
      <div className="flex items-center gap-4 mb-4">
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedPeriod === "morning"
             ? "bg-[#8677A7] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setSelectedPeriod("morning")}
        >
          ช่วงเช้า
        </button>
        <button
          className={`px-4 py-2 rounded-full text-sm font-medium ${
            selectedPeriod === "afternoon"
                ? "bg-[#8677A7] text-white"
              : "bg-gray-200 text-gray-700"
          }`}
          onClick={() => setSelectedPeriod("afternoon")}
        >
          ช่วงบ่าย
        </button>
      </div>

      {/* Display Slots */}
      <div className="grid grid-cols-4 gap-4">
        {timeSlots[selectedPeriod]?.length > 0 ? (
          timeSlots[selectedPeriod].map((slot, index) => (
            <div
              key={index}
              className="flex items-center justify-between px-4 py-2 border rounded-full text-sm"
              style={{
                backgroundColor: index % 2 === 0 ? "#F3F3F3" : "transparent",
              }}
            >
              <span>{slot}</span>
              <button
                className="text-red-500 font-semibold"
                onClick={() => handleDeleteSlot(selectedPeriod, index)}
              >
                x
              </button>
            </div>
          ))
        ) : (
          <p className="text-gray-500 text-sm col-span-4">ไม่มีเวลาว่าง</p>
        )}
      </div>
    </div>
  );
};

export default TimeSlots;
