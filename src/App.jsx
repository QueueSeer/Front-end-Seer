import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import NotificationDetail from "./pages/Notification/NotificationDetail"; // คอมโพเนนต์สำหรับแสดงรายละเอียดการแจ้งเตือน
import Test from "./pages/Profile/test";

import './index.css';

export default function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/test" element={<Test />} />

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
