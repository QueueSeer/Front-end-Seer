import React from "react";

// Mapping the UI display names to their respective field values
const required = [
  { label: "ชื่อ-นามสกุล", value: "name" },
  { label: "วันเดือนปีเกิด", value: "birthdate" },
  { label: "หมายเลขโทรศัพท์", value: "phone_number" },
];

const RequiredSelector = ({ selectedRequired, setSelectedRequired }) => {
  const handleSelect = (item) => {
    // เช็คว่าข้อมูลถูกเลือกหรือไม่
    if (selectedRequired.includes(item.value)) {
      // ถ้าถูกเลือกอยู่แล้ว ให้เอาออกจาก selectedRequired
      setSelectedRequired(selectedRequired.filter((i) => i !== item.value));
    } else {
      // ถ้ายังไม่ได้เลือก ให้เพิ่มข้อมูลลงใน selectedRequired
      setSelectedRequired([...selectedRequired, item.value]);
    }
  };

  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium">
        ข้อมูลผู้ใช้ที่ต้องการ
      </label>
      <div className="block text-gray-400 font-regular mb-3 text-[16px]">
        (สามารถเลือกได้มากกว่า 1)
      </div>
      <div className="flex flex-wrap gap-2">
        {required.map((item) => (
          <button
            key={item.value}
            onClick={() => handleSelect(item)}
            className={`px-6 py-2 rounded-full border ${
              selectedRequired.includes(item.value)
                ? "bg-primary text-white"
                : "bg-white text-gray-700 border-gray-300"
            }`}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
};

export default RequiredSelector;
