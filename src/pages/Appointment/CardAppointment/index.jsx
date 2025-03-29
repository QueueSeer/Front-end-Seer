import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateDropdown from "./DateDropdown";
import AppointmentCard from "./AppointmentCard";
import { fetchAppointmentReceivedData } from "../../../Data/Appointment/Appointments";
import images from "../../../assets";

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
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAppointmentReceivedData();
        setAppointments(data);
      } catch (error) {
        setError("ไม่สามารถดึงข้อมูลการนัดหมายได้");
        console.error("Error fetching appointments:", error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleCardClick = (id) => {
    navigate(`/appointment/${id}`);
  };

  // ฟังก์ชันสำหรับจัดการการคัดลอก
  const handleCopy = (code) => {
    setCopiedCode(code);
    setTimeout(() => setCopiedCode(""), 15000); // Clear copied code after 15 seconds
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-screen">
        กำลังโหลด...
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );
  }

  return (
    <div>
      <div className="py-8 flex items-start space-y-0 flex-row space-x-[100px]">
        <DateDropdown />
      </div>

      <div className="space-y-5">
        {appointments.length === 0 ? (
          <div className="text-center text-gray-500">ยังไม่มีการนัดหมาย</div>
        ) : (
          appointments.map((appointment) => (
            <div key={appointment.id} onClick={() => handleCardClick(appointment.id)}>
              <AppointmentCard
                image={appointment.client.image || images.UserIcon}
                name={appointment.client.display_name}
                date={formatDate(appointment.start_time)}
                time={formatTime(appointment.start_time)}
                packageName={appointment.package.name}
                status={appointment.status}
                code={appointment.confirmation_code}
                isCopied={copiedCode === appointment.confirmation_code}
                onCopy={() => handleCopy(appointment.confirmation_code)}
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Appointment;
