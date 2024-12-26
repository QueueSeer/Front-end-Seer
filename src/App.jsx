import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Register from "./pages/Login/Register";
import Fillter from "./pages/Login/Fillter";
import "./index.css";
import RegisterMembership from "./pages/membership/RegisterMembership";
import LandingPage from "./pages/Landingpage/Landing";
import RevenuePage from "./pages/Revenue/Revunuepage"; 
import WithdrawMoney from './components/revenue/WithdrawMoney';
import ProceedWithdraw from './components/revenue/ProceedWithdraw';
import FollowerPage from './pages/followerpage/FollowerPage';

export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route now set to RevenuePage */}
        <Route path="/" element={<Fillter/>} /> 
        <Route path="/withdraw-money" element={<WithdrawMoney />} /> 
        <Route path="/proceed-withdraw" element={<ProceedWithdraw />} />
        <Route path="/revenue" element={<RevenuePage />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/fillter" element={<Fillter />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/register-membership" element={<RegisterMembership />} />
        <Route path="/follower" element={<FollowerPage />} /> 
      </Routes>
    </Router>
  );
}
