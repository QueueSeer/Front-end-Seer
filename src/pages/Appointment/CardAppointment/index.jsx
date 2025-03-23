import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateDropdown from "./DateDropdown";
import AppointmentCard from "./AppointmentCard";
import { fetchAppointmentReceivedData } from "../../../Data/Appointment/Appointments";

// ฟังก์ชันจัดรูปแบบวันที่
const formatDate = (isoDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoDate).toLocaleDateString("th-TH", options);
};

// ฟังก์ชันจัดรูปแบบเวลา
const formatTime = (isoDate) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(isoDate).toLocaleTimeString("th-TH", options);
};

const Appointment = () => {
  const navigate = useNavigate();

  // สถานะสำหรับจัดการการคัดลอก
  const [copiedCode, setCopiedCode] = useState("");
  const [appointments, setAppointments] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAppointmentReceivedData();
        setAppointments(data);
      } catch (error) {
        console.error("Error fetching appointments:", error);
      }
    };
    fetchData();
  }, []);

  // ฟังก์ชันสำหรับจัดการการคลิกบน Card
  const handleCardClick = (id) => {
    const appointment = appointments.find((a) => a.id === id);
    if (appointment) {
      navigate(`/appointment/${id}`, { state: appointment });
    }
  };

  // ฟังก์ชันสำหรับจัดการการคัดลอก
  const handleCopy = (code) => {
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 15000);
  };

  return (
    <div>
      <div className="py-8 flex items-start space-y-0 flex-row space-x-[100px]">
        <DateDropdown />
      </div>
      <div className="space-y-5">
        {appointments.map((appointment) => (
          <div key={appointment.id} onClick={() => handleCardClick(appointment.id)}>
            <AppointmentCard
              icon={null}
              name={appointment.client.display_name}
              birthdate={"-"} // ไม่มีข้อมูลวันเกิด
              birthtime={"-"} // ไม่มีข้อมูลเวลาเกิด
              date={formatDate(appointment.start_time)}
              time={formatTime(appointment.start_time)}
              packageName={appointment.package.name}
              code={appointment.confirmation_code}
              email={"-"} // ไม่มีข้อมูลอีเมล
              isCopied={copiedCode === appointment.confirmation_code}
              onCopy={() => handleCopy(appointment.confirmation_code)}
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Appointment;
