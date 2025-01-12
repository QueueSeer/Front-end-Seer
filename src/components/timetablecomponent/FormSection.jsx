import React, { useState } from "react";

const FormSection = () => {
  const [isBreakSelected, setIsBreakSelected] = useState(false); // สำหรับเลือกหรือไม่เลือกพักเที่ยง
  const [isUnlimitedSelected, setIsUnlimitedSelected] = useState(false); // สำหรับเลือกหรือไม่เลือกไม่จำกัด
  const [formData, setFormData] = useState({
    workingHours: "",
    package: "",
    breakTime: "",
    maxCustomers: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  return (
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
          placeholder="09.00-17.00 น."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* แพคเกจที่เปิดบริการ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          แพคเกจที่เปิดบริการ <span className="text-red-500">*</span>
        </label>
        <select
          name="package"
          value={formData.package}
          onChange={handleInputChange}
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option value="">เลือกแพคเกจ</option>
          <option value="package1">แพคเกจ 1</option>
          <option value="package2">แพคเกจ 2</option>
        </select>
      </div>

      {/* เวลาพัก */}
      <div>
        <div className="flex items-center gap-4 mb-2">
          <label className="text-sm font-medium text-gray-700">เวลาพัก</label>
          <input
            type="checkbox"
            name="break"
            id="break"
            checked={isBreakSelected}
            onChange={() => setIsBreakSelected((prev) => !prev)} // เปลี่ยนสถานะพักเที่ยง
            className="form-checkbox h-4 w-4 text-purple-500 focus:ring-purple-500"
          />
          <label htmlFor="break" className="text-sm text-gray-700">
            พักเที่ยง
          </label>
        </div>
        <input
          type="text"
          name="breakTime"
          value={formData.breakTime}
          onChange={handleInputChange}
          placeholder="10 นาที"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* จำนวนสูงสุดที่รับ */}
      <div>
        <div className="flex items-center gap-4 mb-2">
          <label className="text-sm font-medium text-gray-700">
            จำนวนสูงสุดที่รับ
          </label>
          <input
            type="checkbox"
            name="max"
            id="unlimited"
            checked={isUnlimitedSelected}
            onChange={() => setIsUnlimitedSelected((prev) => !prev)} // เปลี่ยนสถานะไม่จำกัด
            className="form-checkbox h-4 w-4 text-purple-500 focus:ring-purple-500"
          />
          <label htmlFor="unlimited" className="text-sm text-gray-700">
            ไม่จำกัด
          </label>
        </div>
        {!isUnlimitedSelected && (
          <input
            type="number"
            name="maxCustomers"
            value={formData.maxCustomers}
            onChange={handleInputChange}
            placeholder="10"
            className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
          />
        )}
      </div>
    </div>
  );
};

export default FormSection;
