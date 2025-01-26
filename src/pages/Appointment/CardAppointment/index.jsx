import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DateDropdown from "./DateDropdown";
import AppointmentCard from "./AppointmentCard";
import AppointmentData from "../../../Data/AppointmentData"; // นำเข้าข้อมูลจาก AppointmentData.jsx

// ฟังก์ชันจัดรูปแบบวันที่
const formatDate = (isoDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoDate).toLocaleDateString("th-TH", options); // รูปแบบ: 16 กันยายน 2564
};

// ฟังก์ชันจัดรูปแบบเวลา
const formatTime = (isoDate) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(isoDate).toLocaleTimeString("th-TH", options); // รูปแบบ: 05:43 น.
};

const Appointment = () => {
  const navigate = useNavigate();

  // สถานะสำหรับจัดการการคัดลอก
  const [copiedCode, setCopiedCode] = useState("");

  // ข้อมูล Appointment ดึงมาจาก AppointmentData.jsx
  const [appointments] = useState(AppointmentData);

  // ฟังก์ชันสำหรับจัดการการคลิกบน Card
  const handleCardClick = (id) => {
    const appointment = appointments.find((a) => a.id === id); // หา appointment ที่ตรงกับ id
    if (appointment) {
      navigate(`/appointment/${id}`, { state: appointment }); // ส่งข้อมูลผ่าน state
    }
  };

  // ฟังก์ชันสำหรับจัดการการคัดลอก
  const handleCopy = (code) => {
    setCopiedCode(code); // อัปเดตสถานะการคัดลอก
    setTimeout(() => setCopiedCode(""), 15000); // ล้างสถานะหลัง 15 วินาที
  };

  return (
    <div>
      <div className="py-8 flex items-start space-y-0 flex-row space-x-[100px]">
        <DateDropdown />
      </div>
      <div className="space-y-5">
        {appointments.map((appointment) => (
          <div
            key={appointment.id}
            onClick={() => handleCardClick(appointment.id)} // คลิกบน Card
          >
            <AppointmentCard
              icon={appointment.icon}
              name={appointment.name}
              birthdate={formatDate(appointment.birthdate)} // แสดงวันที่
              birthtime={formatTime(appointment.birthdate)} // แสดงเวลาเกิด
              date={formatDate(appointment.dateappointment)} // แสดงวันที่นัดหมาย
              time={formatTime(appointment.dateappointment)} // แสดงเวลานัดหมาย
              packageName={appointment.packageName}
              code={appointment.code}
              email={appointment.email}
              isCopied={copiedCode === appointment.code} // ตรวจสอบสถานะการคัดลอก
              onCopy={() => handleCopy(appointment.code)} // จัดการการคัดลอก
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointment;
