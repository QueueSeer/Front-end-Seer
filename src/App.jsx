import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import NotificationDetail from "./pages/Notification/NotificationDetail";
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
import Reviewpage from "./pages/Review/Reviewpage.jsx";
import Timetable from "./pages/Timetable/timetable.jsx"; 
import Appointment from "./pages/Appointment/Appointment";
import DetailsAppointment from "./pages/Appointment/DetailsAppointment";
import Package from "./pages/Package";
import Drafted from "./pages/Package/DraftPackage/Drafted";
import Published from "./pages/Package/DraftPackage/Published";
import HiddenPackage from "./pages/Package/DraftPackage/HiddenPackage";
import FortuneNow from "./pages/FortuneNow";
import DraftedFortuneNow from "./pages/FortuneNow/DraftedFortuneNow/DraftedFortuneNow";
import FortuneNowDetail from "./pages/FortuneNow/DetailFortuneNow/Detail";
import CreateFortuneNow from "./pages/FortuneNow/DraftedFortuneNow/CreateFortuneNow";
import ContentFortuneNow from "./pages/FortuneNow/DraftedFortuneNow/ContentFortuneNow";
import Auction from "./pages/Auction";
import AuctionDetail from "./pages/Auction/DetailAuction/Detail";
import CreateAuction from "./pages/Auction/Create/CreateAuction";


import "./index.css";

export default function App() {
  return (
    <Router>
      <Routes>
        {/* เส้นทางสำหรับหน้า Login */}
        <Route path="/" element={<Login />} />

        {/* เส้นทางสำหรับหน้า Revenue */}
        <Route path="/revenue" element={<RevenuePage />} />
        <Route path="/withdraw-money" element={<WithdrawMoney />} />
        <Route path="/proceed-withdraw" element={<ProceedWithdraw />} />

        {/* เส้นทางสำหรับหน้า Profile */}
        <Route path="/profile" element={<Profile />} />

        {/* เส้นทางสำหรับหน้า Follower */}
        <Route path="/follower" element={<FollowerPage />} />

        {/* เส้นทางสำหรับหน้า Review */}
        <Route path="/reviews" element={<Reviewpage />} />

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

        {/* เส้นทางสำหรับหน้า Timetable */}
        <Route path="/timetable" element={<Timetable />} /> {/* Updated `Timetable` */}
        <Route path="/login" element={<Login />} />

        {/* Notifications */}
        <Route path="/notifications" element={<p className="p-4">หน้าการแจ้งเตือนทั้งหมด</p>} />
        <Route path="/notification/:id" element={<NotificationDetail />} />

        {/* Appointments */}
        <Route path="/appointment" element={<Appointment />} />
        <Route path="/appointment/:id" element={<DetailsAppointment />} />

        {/* Package Management */}
        <Route path="/package" element={<Package />} />
        <Route path="/package/drafted" element={<Drafted />} />
        <Route path="/package/published" element={<Published />} />
        <Route path="/package/hiddenPackage" element={<HiddenPackage />} />

        {/* FortuneNow */}
        <Route path="/fortuneNow" element={<FortuneNow />} />
        <Route path="/fortuneNow/:id" element={<FortuneNowDetail />} />
        <Route path="/fortuneNow/drafted" element={<DraftedFortuneNow />} />
        <Route path="/fortuneNow/drafted/create" element={<CreateFortuneNow />} />
        <Route path="/fortuneNow/drafted/:id" element={<ContentFortuneNow />} />

        {/* FortuneNow */}
        <Route path="/auction" element={<Auction />} />
        <Route path="/auction/:id" element={<AuctionDetail />} />
        <Route path="/auction/create" element={<CreateAuction />} />
      </Routes>
    </Router>
  );
}
