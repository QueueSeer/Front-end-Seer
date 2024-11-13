// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register"; // เปลี่ยนชื่อให้ตรงกับหน้า Register
import './index.css';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* เส้นทางสำหรับหน้า Login */}
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* เส้นทางสำหรับหน้า Register */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}
