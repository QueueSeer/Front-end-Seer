import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import NotificationDetail from "./pages/Notification/NotificationDetail"; // คอมโพเนนต์สำหรับแสดงรายละเอียดการแจ้งเตือน

import './index.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />

        {/* เส้นทางสำหรับหน้า Revenue */}
        <Route path="/revenue" element={<RevenuePage />} />
        <Route path="/withdraw-money" element={<WithdrawMoney />} />
        <Route path="/proceed-withdraw" element={<ProceedWithdraw />} />

        {/* เส้นทางสำหรับหน้า Profile */}
        <Route path="/profile" element={<Profile />} />

        <Route path="/login" element={<Login />} />
        <Route
          path="/notifications"
          element={<p className="p-4">หน้าการแจ้งเตือนทั้งหมด</p>}
        />
        {/* เส้นทางสำหรับรายละเอียดการแจ้งเตือน */}
        <Route 
          path="/notification/:id" 
          element={<NotificationDetail />} />
      </Routes>
    </Router>
  );
}
