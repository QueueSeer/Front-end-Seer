import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Fillter from "./pages/Login/Fillter";
import "./index.css";
import RegisterMembership from "./pages/membership/RegisterMembership";
import LandingPage from "./pages/Landingpage/Landing";
import RevenuePage from "./pages/Revenue/Revunuepage"; // Correct path for RevenuePage
import WithdrawMoney from './components/revenue/WithdrawMoney';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route now set to RevenuePage */}
        <Route path="/" element={<RevenuePage />} /> 
        <Route path="/withdraw-money" element={<WithdrawMoney />} /> 
       

        <Route path="/revenue" element={<RevenuePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/fillter" element={<Fillter />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/register-membership" element={<RegisterMembership />} />
      </Routes>
    </Router>
  );
}
