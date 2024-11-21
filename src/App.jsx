// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register"; 
import Fillter from "./pages/Login/Fillter";
import './index.css';
import RegisterMembership from "./pages/membership/RegisterMembership";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* เส้นทางสำหรับหน้า Login */}
          <Route path="/" element={<RegisterMembership />} />
        <Route path="/" element={<Login />} />
        <Route path="/login" element={<Login />} />
        {/* เส้นทางสำหรับหน้า Register */}
        <Route path="/register" element={<Register />} />
        <Route path="/fillter" element={<Fillter />} />
      </Routes>
    </Router>
  );
}
