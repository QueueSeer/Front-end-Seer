import React, { useState } from "react";
import axios from "axios";
import ActionButtons from "./ActionButtons"; // Import ปุ่มล้างและบันทึก

const FormSection = () => {
  const [formData, setFormData] = useState({
    workingHours: "",
    breakTime: "",
    maxCustomers: "",
    holiday: "",
  });
  const [errors, setErrors] = useState({});

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // ล้างข้อความ error เมื่อกรอกข้อมูลใหม่
  };

  const validateForm = () => {
    const newErrors = {};
    const timeRegex = /^\d{2}:\d{2}-\d{2}:\d{2}$/;

    if (!formData.workingHours.match(timeRegex)) {
      newErrors.workingHours = "กรุณากรอกเวลาในรูปแบบ HH:mm-HH:mm";
    }

    if (!formData.breakTime.match(timeRegex)) {
      newErrors.breakTime = "กรุณากรอกเวลาพักในรูปแบบ HH:mm-HH:mm";
    }

    if (!formData.maxCustomers || isNaN(Number(formData.maxCustomers))) {
      newErrors.maxCustomers = "กรุณากรอกเวลาพักระหว่างคิวเป็นตัวเลข";
    }

    if (!formData.holiday) {
      newErrors.holiday = "กรุณากรอกวันหยุด";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ถ้าไม่มี error ถือว่าผ่าน
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // หยุดการทำงานหากข้อมูลไม่ผ่านการตรวจสอบ
    }
  
    const [start, end] = formData.workingHours.split("-");
    const [breakStart, breakEnd] = formData.breakTime.split("-");
    const workingHours = [
      { start_time: `${start.trim()}:00+07:00`, end_time: `${breakStart.trim()}:00+07:00` },
      { start_time: `${breakEnd.trim()}:00+07:00`, end_time: `${end.trim()}:00+07:00` },
    ];
  
    const requestData = {
      working_hours: workingHours,
      break_between_queue: `${formData.maxCustomers} นาที`,
    };
  
    try {
      // 1. ส่งข้อมูลตารางเวลา
      const scheduleResponse = await axios.post(
        "https://backend.qseer.app/api/seer/me/schedule",
        requestData,
        {
          headers: {
            "Content-Type": "application/json",
          },
          withCredentials: true,
        }
      );
      console.log("Schedules created:", scheduleResponse.data);
  
      // 2. ส่งข้อมูลวันหยุด (ถ้ามี)
      if (formData.holiday.trim()) {
        console.log("Holiday to be sent:", formData.holiday); // ตรวจสอบค่าที่จะส่ง
        const dayOffResponse = await axios.post(
          "https://backend.qseer.app/api/seer/me/dayoff",
          { day: formData.holiday },
          {
            headers: {
              "Content-Type": "application/json",
            },
            withCredentials: true,
          }
        );
        console.log("Day off added:", dayOffResponse.data);
        alert("บันทึกตารางเวลาและวันหยุดสำเร็จ!");
      } else {
        alert("บันทึกตารางเวลาสำเร็จ (ไม่มีวันหยุด)");
      }
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`เกิดข้อผิดพลาด: ${error.response.data.detail}`);
      } else if (error.request) {
        console.error("No response from server:", error.request);
        alert("ไม่สามารถเชื่อมต่อกับเซิร์ฟเวอร์ได้");
      } else {
        console.error("Error:", error.message);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    }
  };
  
  
  
  
  

  const handleReset = () => {
    setFormData({
      workingHours: "",
      breakTime: "",
      maxCustomers: "",
      holiday: "",
    });
    setErrors({});
    alert("ล้างข้อมูลสำเร็จ!");
  };

  return (
    <div>
      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* เวลาเปิดทำการ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เวลาเปิดทำการ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="workingHours"
            value={formData.workingHours}
            onChange={handleInputChange}
            placeholder="09:00-17:00"
            className={`w-full border ${
              errors.workingHours ? "border-red-500" : "border-gray-300"
            } rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.workingHours && (
            <p className="text-red-500 text-sm mt-1">{errors.workingHours}</p>
          )}
        </div>

        {/* เวลาพักเที่ยง */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ช่วงเวลาพักเที่ยง
          </label>
          <input
            type="text"
            name="breakTime"
            value={formData.breakTime}
            onChange={handleInputChange}
            placeholder="12:00-13:00"
            className={`w-full border ${
              errors.breakTime ? "border-red-500" : "border-gray-300"
            } rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.breakTime && (
            <p className="text-red-500 text-sm mt-1">{errors.breakTime}</p>
          )}
        </div>

        {/* เวลาพักระหว่างคิว */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            ช่วงเวลาพักระหว่างคิว
          </label>
          <input
            type="number"
            name="maxCustomers"
            value={formData.maxCustomers}
            onChange={handleInputChange}
            placeholder="10 นาที"
            className={`w-full border ${
              errors.maxCustomers ? "border-red-500" : "border-gray-300"
            } rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.maxCustomers && (
            <p className="text-red-500 text-sm mt-1">{errors.maxCustomers}</p>
          )}
        </div>

        {/* วันหยุด */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            วันหยุด <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="holiday"
            value={formData.holiday}
            onChange={handleInputChange}
            placeholder="2025-01-14"
            className={`w-full border ${
              errors.holiday ? "border-red-500" : "border-gray-300"
            } rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.holiday && (
            <p className="text-red-500 text-sm mt-1">{errors.holiday}</p>
          )}
        </div>
      </div>

      {/* Action Buttons */}
      <ActionButtons onSave={handleSubmit} onReset={handleReset} />
    </div>
  );
};

export default FormSection;
