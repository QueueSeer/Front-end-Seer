import React, { useState } from "react";
import axios from "axios";
import ActionButtons from "./ActionButtons"; // ปุ่มล้างและบันทึก

const FormSection = () => {
  const [formData, setFormData] = useState({
    workingHours: "",
    closingHours: "",
    maxCustomers: "",
  });
  const [errors, setErrors] = useState({});

  // Handle input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: "" })); // Clear errors on input change
  };

  // Validate form before submission
  const validateForm = () => {
    const newErrors = {};
    const timeRegex = /^\d{2}:\d{2}$/;

    // Validate working hours
    if (!formData.workingHours.match(timeRegex)) {
      newErrors.workingHours = "กรุณากรอกเวลาเปิดในรูปแบบ HH:mm";
    }

    // Validate closing hours
    if (!formData.closingHours.match(timeRegex)) {
      newErrors.closingHours = "กรุณากรอกเวลาปิดในรูปแบบ HH:mm";
    }

    // Validate max customers
    if (!formData.maxCustomers || isNaN(Number(formData.maxCustomers))) {
      newErrors.maxCustomers = "กรุณากรอกเวลาพักระหว่างคิวเป็นตัวเลข";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // Return true if no errors
  };

  // Handle form submission
  const handleSubmit = async () => {
    if (!validateForm()) {
      return; // Stop if validation fails
    }

    const workingHours = [
      { start_time: `${formData.workingHours}:00+07:00`, end_time: `${formData.closingHours}:00+07:00` },
    ];

    const requestData = {
      working_hours: workingHours,
      break_between_queue: `${formData.maxCustomers} นาที`,
    };

    try {
      const scheduleResponse = await axios.post(
        "https://backend.qseer.app/api/seer/me/schedule",
        requestData,
        {
          headers: { "Content-Type": "application/json" },
          withCredentials: true,
        }
      );
      console.log("Schedules created:", scheduleResponse.data);
      alert("บันทึกตารางเวลาสำเร็จ!");
    } catch (error) {
      if (error.response) {
        console.error("Error response:", error.response.data);
        alert(`เกิดข้อผิดพลาด: ${error.response.data.detail}`);
      } else {
        console.error("Error:", error.message);
        alert("เกิดข้อผิดพลาดในการบันทึกข้อมูล");
      }
    }
  };

  // Handle resetting the form
  const handleReset = () => {
    setFormData({
      workingHours: "",
      closingHours: "",
      maxCustomers: "",
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
            placeholder="09:00"
            className={`w-full border ${errors.workingHours ? "border-red-500" : "border-gray-300"} rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.workingHours && <p className="text-red-500 text-sm mt-1">{errors.workingHours}</p>}
        </div>

        {/* เวลาปิดทำการ */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เวลาปิดทำการ <span className="text-red-500">*</span>
          </label>
          <input
            type="text"
            name="closingHours"
            value={formData.closingHours}
            onChange={handleInputChange}
            placeholder="17:00"
            className={`w-full border ${errors.closingHours ? "border-red-500" : "border-gray-300"} rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.closingHours && <p className="text-red-500 text-sm mt-1">{errors.closingHours}</p>}
        </div>

        {/* เวลาพักระหว่างคิว */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            เวลาพักระหว่างคิว
          </label>
          <input
            type="number"
            name="maxCustomers"
            value={formData.maxCustomers}
            onChange={handleInputChange}
            placeholder="10 นาที"
            className={`w-full border ${errors.maxCustomers ? "border-red-500" : "border-gray-300"} rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500`}
          />
          {errors.maxCustomers && <p className="text-red-500 text-sm mt-1">{errors.maxCustomers}</p>}
        </div>
      </div>

      {/* Buttons for saving and resetting all form data */}
      <ActionButtons onSave={handleSubmit} onReset={handleReset} />
    </div>
  );
};

export default FormSection;
