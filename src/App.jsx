// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import './index.css';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* เส้นทางสำหรับหน้าแรก */}
        <Route path="/" element={<Login />} />
        {/* เส้นทางสำหรับหน้า /Login */}
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}
