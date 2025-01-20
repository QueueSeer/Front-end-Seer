import React from "react";

import Navbar from "../../components/navbar"; // เรียกใช้ path ที่ถูกต้อง
import Sidebar from "../../components/Sidebar"; // เรียกใช้ path ที่ถูกต้อง
import Layout from "./Layout";

import CardAppointment from "./CardAppointment";

export default function Appointment() {
  return (
    <div>
      <Layout>
        <div className="flex-1 pb-10">
          <CardAppointment />
        </div>
      </Layout>
    </div>
  );
}
