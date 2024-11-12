// App.js
import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Navbar from "./components/navbar";
import Login from "./pages/Login/Login";
import './index.css';

export default function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<h1>หน้าแรก</h1>} />
        <Route path="/Login" element={<Login />} />
      </Routes>
    </Router>
  );
}
