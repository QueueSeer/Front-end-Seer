import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import NotificationDetail from "./pages/Notification/NotificationDetail"; // คอมโพเนนต์สำหรับแสดงรายละเอียดการแจ้งเตือน
import './index.css';
import Register from "./pages/Login/Register";
import Fillter from "./pages/Login/Fillter";
import ForgotPassword from "./pages/Login/ForgotPassword";
import RegisterMembership from "./pages/membership/RegisterMembership";
import LandingPage from "./pages/Landingpage/Landing";
import RevenuePage from "./pages/Revenue/Revunuepage"; 
import WithdrawMoney from './components/revenue/WithdrawMoney';
import ProceedWithdraw from './components/revenue/ProceedWithdraw';
import FollowerPage from './pages/followerpage/FollowerPage';
import EmailVerification from "./pages/membership/EmailVerification";


export default function App() {
  return (
    <Router>
      <Routes>
        {/* Default route now set to RevenuePage */}
        <Route path="/" element={<Login/>} /> 
        <Route path="/withdraw-money" element={<WithdrawMoney />} /> 
        <Route path="/proceed-withdraw" element={<ProceedWithdraw />} />
        <Route path="/revenue" element={<RevenuePage />} />
        <Route path="/" element={<Profile />} />
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
        <Route path="/register" element={<Register />} />
        <Route path="/fillter" element={<Fillter />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/register-membership" element={<RegisterMembership />} />
        <Route path="/follower" element={<FollowerPage />} /> 
        <Route path="/EmailVerification " element={<EmailVerification />} /> 
        <Route path="/forgot-password" element={<ForgotPassword />} />

      </Routes>
    </Router>
  );
}
