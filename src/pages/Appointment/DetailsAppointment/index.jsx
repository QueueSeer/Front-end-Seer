import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Navbar from "../../../components/navbar";
import Sidebar from "../../../components/Sidebar";
import Detail from "./Detail";
import Layout from "../Layout";

const DetailsAppointment = () => {
  const { id } = useParams();
  const location = useLocation();

  // รับข้อมูลจาก state ที่ส่งมาจาก Appointment.js
  const appointmentDetails = location.state;

  if (!appointmentDetails) {
    return <div>ไม่มีข้อมูลสำหรับ ID {id}</div>;
  }

  return (
    <Layout>
      <div className="flex-1 pb-10">
        <Detail />
      </div>
    </Layout>
  );
};

export default DetailsAppointment;
