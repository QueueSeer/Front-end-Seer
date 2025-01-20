import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import DateDropdown from "./DateDropdown";
import Images from "../../../assets";
import Header from "../../../components/Profile/Header";
import AppointmentCard from "./AppointmentCard";

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

  // ข้อมูล Appointment
  const [appointments] = useState([
    {
      id: 1,
      icon: "/path/to/icon1.png",
      name: "สุรางคนางค์ เกตุยั่งยืนวงศ์",
      birthdate: "1990-04-08T04:45:25.448Z",
      dateappointment: "2024-09-10T10:06:38.448Z",
      packageName: "แพ็กเกจความรัก",
      type_package: "Questions",
      QuestionsNumber: 1,
      code: "4QCFR",
      status_service: "รอเข้ารับบริการ",
      email: "25654@gmail.com",
    },
    {
      id: 2,
      icon: "/path/to/icon2.png",
      name: "สมชาย ใจดี",
      birthdate: "1985-12-01T04:45:25.448Z",
      dateappointment: "2024-09-11T10:06:38.448Z",
      packageName: "แพ็กเกจสุขภาพ",
      type_package: "Questions",
      QuestionsNumber: 2,
      code: "7XYZB",
      status_service: "บริการสำเร็จ",
      email: "25655@gmail.com",
    },
    {
      id: 3,
      icon: "/path/to/icon2.png",
      name: "สมชาย ฝึกใจดี",
      birthdate: "1985-12-01T04:45:25.448Z",
      dateappointment: "2024-09-11T10:06:38.448Z",
      packageName: "แพ็กเกจสุขภาพ",
      type_package: "Call",
      QuestionsNumber: 0,
      code: "7XY4B",
      status_service: "ยกเลิกบริการ",
      email: "25655@gmail.com",
    },
  ]);

  // ฟังก์ชันสำหรับจัดการการคลิกบน Card
  const handleCardClick = (id) => {
    const appointment = appointments.find((a) => a.id === id); // หา appointment ที่ตรงกับ id
    navigate(`/appointment/${id}`, { state: appointment }); // ส่งข้อมูลผ่าน state
  };

  // ฟังก์ชันสำหรับจัดการการคัดลอก
  const handleCopy = (code) => {
    setCopiedCode(code); // อัปเดตสถานะการคัดลอก
    setTimeout(() => setCopiedCode(""), 15000); // ล้างสถานะหลัง 2 วินาที
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
              key={appointment.id}
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
