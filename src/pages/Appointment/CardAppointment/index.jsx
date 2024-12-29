import React, { useState } from "react";
import HeaderAppointment from "./HeaderAppointment";
import DateDropdown from "./DateDropdown";
import AppointmentCard from "./AppointmentCard";

const Appointment = () => {
  const [appointments, setAppointments] = useState([
    {
      id: 1,
      icon: "/path/to/icon1.png",
      name: "สุรางคนางค์ เกตุยั่งยืนวงศ์",
      birthdate: "1990-04-08",
      date: "2024-09-10",
      time: "2024-09-10T10:06:38.448Z",
      packageName: "แพ็กเกจความรัก",
      code: "4QCFR",
    },
    {
      id: 2,
      icon: "/path/to/icon2.png",
      name: "สมชาย ใจดี",
      birthdate: "1985-12-01",
      date: "2024-09-11",
      time: "2024-09-11T10:06:38.448Z",
      packageName: "แพ็กเกจสุขภาพ",
      code: "7XYZB",
    },
    {
      id: 3,
      icon: "/path/to/icon2.png",
      name: "สมชาย ใจดี",
      birthdate: "1985-12-01",
      date: "2024-09-11",
      time: "2024-09-11T10:06:38.448Z",
      packageName: "แพ็กเกจสุขภาพ",
      code: "7XYZB",
    },
  ]);

  const [copiedId, setCopiedId] = useState(null); // ใช้เก็บ ID ของ Appointment ที่ถูกคัดลอก

  const handleUpdateAppointment = (id, field, value) => {
    setAppointments((prev) =>
      prev.map((appointment) =>
        appointment.id === id ? { ...appointment, [field]: value } : appointment
      )
    );
  };

  const handleCopy = (id) => {
    setCopiedId(id); // เปลี่ยนเป็น id ของ Appointment ที่ถูกคัดลอก
    setTimeout(() => setCopiedId(null), 30000); // รีเซ็ตหลังจาก 2 วินาที
  };

  return (
    <div className="px-8 py-6 mx-auto bg-white border rounded-lg shadow-md">
      <HeaderAppointment />
      <div className="py-8 flex items-start space-y-0 flex-row space-x-[100px]">
        <DateDropdown />
      </div>
      {/* แสดง AppointmentCard หลายใบ */}
      <div className="space-y-4">
        {appointments.map((appointment) => (
          <AppointmentCard
            key={appointment.id}
            icon={appointment.icon}
            name={appointment.name}
            birthdate={appointment.birthdate}
            date={appointment.date}
            time={appointment.time}
            packageName={appointment.packageName}
            code={appointment.code}
            onNameChange={(value) =>
              handleUpdateAppointment(appointment.id, "name", value)
            }
            onBirthdateChange={(value) =>
              handleUpdateAppointment(appointment.id, "birthdate", value)
            }
            onDateChange={(value) =>
              handleUpdateAppointment(appointment.id, "date", value)
            }
            onTimeChange={(value) =>
              handleUpdateAppointment(appointment.id, "time", value)
            }
            isCopied={copiedId === appointment.id} // ตรวจสอบว่า Appointment นี้ถูกคัดลอกหรือไม่
            onCopy={() => handleCopy(appointment.id)} // เรียก handleCopy เมื่อคลิกคัดลอก
          />
        ))}
      </div>
    </div>
  );
};

export default Appointment;
