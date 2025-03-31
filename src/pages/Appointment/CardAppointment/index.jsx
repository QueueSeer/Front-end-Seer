import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import DateDropdown from "./DateDropdown";
import AppointmentCard from "./AppointmentCard";
import { fetchAppointmentReceivedData } from "../../../Data/Appointment/Appointments";
import images from "../../../assets";
import dayjs from "dayjs"; // import dayjs
import { formatDate, formatTime } from "../../../utils/utils";

const Appointment = () => {
  const navigate = useNavigate();
  const [appointments, setAppointments] = useState([]);
  const [filteredAppointments, setFilteredAppointments] = useState([]); // กำหนด filteredAppointments
  const [loading, setLoading] = useState(true); // Loading state
  const [error, setError] = useState(null); // Error state
  const [copiedCode, setCopiedCode] = useState(null); // เพิ่ม state สำหรับเก็บ copiedCode

  useEffect(() => {
    const fetchData = async () => {
      try {
        const data = await fetchAppointmentReceivedData();
        setAppointments(data);
        setFilteredAppointments(data); // กำหนดค่าผลลัพธ์เริ่มต้นเป็น appointments ทั้งหมด
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

  const handleFilterChange = ({ filter, startDate, endDate }) => {
    let filteredData = appointments.filter((appointment) => {
      const appointmentDate = dayjs(appointment.start_time); // ใช้ dayjs ที่ import มาแล้ว

      if (filter === "ทั้งหมด") return true;

      if (startDate && endDate) {
        const filterStartDate = dayjs(startDate);
        const filterEndDate = dayjs(endDate);

        return (
          appointmentDate.isAfter(filterStartDate) &&
          appointmentDate.isBefore(filterEndDate)
        );
      }

      return false;
    });

    setFilteredAppointments(filteredData); // อัปเดต filteredAppointments ด้วยผลลัพธ์ที่กรองแล้ว
  };

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

  // กรองสถานะและเรียงลำดับหลังจากที่ข้อมูลกรองจากตัวกรองเสร็จแล้ว
  const sortedFilteredAppointments = filteredAppointments
    .filter(
      (appointment) =>
        appointment.status === "pending" || appointment.status === "u_cancelled"
    )
    .sort((a, b) => new Date(a.start_time) - new Date(b.start_time)); // เรียงวันจากใกล้สุดไปไกลสุด

  return (
    <div>
      <div className="py-8 flex items-start space-y-0 flex-row space-x-[100px]">
        <DateDropdown onFilterChange={handleFilterChange} />
      </div>

      <div className="space-y-5">
        {sortedFilteredAppointments.length === 0 ? (
          <div className="text-center text-gray-500">ยังไม่มีการนัดหมาย</div>
        ) : (
          sortedFilteredAppointments.map((appointment) => (
            <div
              key={appointment.id}
              onClick={() => handleCardClick(appointment.id)}
            >
              <AppointmentCard
                image={appointment.client?.image || images.UserIcon} // เพิ่มการเช็คให้แน่ใจว่า client มีข้อมูล
                name={appointment.client.display_name } 
                date={formatDate(appointment.start_time)}
                time={formatTime(appointment.start_time)}
                packageName={appointment.package?.name || "ประมูลดูดวง"} // เพิ่มการเช็คให้แน่ใจว่า package มีข้อมูล
                status={appointment.status}
                code={appointment.confirmation_code}
                isCopied={copiedCode === appointment.confirmation_code} // ใช้ copiedCode
                onCopy={() => handleCopy(appointment.confirmation_code)} // เพิ่มฟังก์ชัน onCopy
              />
            </div>
          ))
        )}
      </div>
    </div>
  );
};

export default Appointment;
