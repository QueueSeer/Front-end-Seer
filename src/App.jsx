import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Fillter from "./pages/Login/Fillter";
import './index.css';
import RegisterMembership from "./pages/membership/RegisterMembership";
import LandingPage from "./pages/Landingpage/Landing"; // Updated the import path for LandingPage

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default page */}
        <Route path="/" element={<LandingPage />} />
        
        {/* Register Membership */}
        <Route path="/register-membership" element={<RegisterMembership />} />
        
        {/* Login */}
        <Route path="/login" element={<Login />} />
        
        {/* Register */}
        <Route path="/register" element={<Register />} />
        
        {/* Fillter */}
        <Route path="/fillter" element={<Fillter />} />
      </Routes>
    </Router>
  );
}
