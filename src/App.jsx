import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import NotificationDetail from "./pages/Notification/NotificationDetail"; // คอมโพเนนต์สำหรับแสดงรายละเอียดการแจ้งเตือน
import Appointment from "./pages/Appointment/Appointment";
import DetailsAppointment from "./pages/Appointment/DetailsAppointment";

import "./index.css";
import Package from "./pages/Package";
import Drafted from "./pages/Package/DraftPackage/Drafted";
import Published from "./pages/Package/DraftPackage/Published";
import HiddenPackage from "./pages/Package/DraftPackage/HiddenPackage";
import FortuneNow from "./pages/FortuneNow";


export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/notifications"
          element={<p className="p-4">หน้าการแจ้งเตือนทั้งหมด</p>}
        />
        {/* เส้นทางสำหรับรายละเอียดการแจ้งเตือน */}
        <Route path="/notification/:id" element={<NotificationDetail />} />
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment/:id" element={<DetailsAppointment />} />
        <Route path="/package" element={<Package />} />
        <Route path="/package/drafted" element={<Drafted />} />
        <Route path="/package/published" element={<Published />} />
        <Route path="/package/hiddenPackage" element={<HiddenPackage />} />
        <Route path="/FortuneNow" element={<FortuneNow />} />



      </Routes>
    </Router>
  );
}
