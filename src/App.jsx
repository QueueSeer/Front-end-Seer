import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import NotificationDetail from "./pages/Notification/NotificationDetail";
import "./index.css";
import Register from "./pages/Login/Register";
import Fillter from "./pages/Login/Fillter";
import ForgotPassword from "./pages/Login/ForgotPassword";
import RegisterMembership from "./pages/membership/RegisterMembership";
import LandingPage from "./pages/Landingpage/Landing";
import RevenuePage from "./pages/Revenue/Revunuepage";
import WithdrawMoney from "./components/revenue/WithdrawMoney";
import ProceedWithdraw from "./components/revenue/ProceedWithdraw";
import FollowerPage from "./pages/followerpage/FollowerPage";
import EmailVerification from "./pages/membership/EmailVerification";
import ReviewPage from "./pages/Review/ReviewPage";

export default function App() {
  return (
    <Router>
      <Routes>
       
        <Route path="/" element={<Login/>} />

        {/* เส้นทางสำหรับหน้า Revenue */}
        <Route path="/revenue" element={<RevenuePage />} />
        <Route path="/withdraw-money" element={<WithdrawMoney />} />
        <Route path="/proceed-withdraw" element={<ProceedWithdraw />} />

        {/* เส้นทางสำหรับหน้า Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* เส้นทางสำหรับหน้า Follower */}
        <Route path="/follower" element={<FollowerPage />} />

        {/* เส้นทางสำหรับหน้า Review */}
        <Route path="/reviews" element={<ReviewPage />} />

        {/* เส้นทางสำหรับ Notification */}
        <Route path="/notifications" element={<p className="p-4">หน้าการแจ้งเตือนทั้งหมด</p>} />
        <Route path="/notification/:id" element={<NotificationDetail />} />

        {/* เส้นทางสำหรับฟอร์มต่าง ๆ */}
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/fillter" element={<Fillter />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/register-membership" element={<RegisterMembership />} />
        <Route path="/EmailVerification" element={<EmailVerification />} />

        {/* เส้นทางสำหรับหน้า LandingPage */}
        <Route path="/landing" element={<LandingPage />} />
      </Routes>
    </Router>
  );
}
