import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/Sidebar";
import Detail from "./Detail";

const DetailsAppointment = () => {
  const { id } = useParams();
  const location = useLocation();

  // รับข้อมูลจาก state ที่ส่งมาจาก Appointment.js
  const appointmentDetails = location.state;

  if (!appointmentDetails) {
    return <div>ไม่มีข้อมูลสำหรับ ID {id}</div>;
  }

  return (
    <div>
      <Navbar />
      <div className="flex px-12 pt-12 gap-14">
        {/* Sidebar */}
        <div className="hidden lg:block w-72">
          {/* ส่ง activeOverride เป็น index 1 */}
          <Sidebar activeOverride={1} />
        </div>
        <div className="flex-1 pb-10">
          <Detail />
        </div>
      </div>
    </div>
  );
};

export default DetailsAppointment;
