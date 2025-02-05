import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";

import Login from "./pages/Login/Login";
import Profile from "./pages/Profile/Profile";
import NotificationDetail from "./pages/Notification/NotificationDetail";
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
        {/* Profile & Authentication */}
        <Route path="/" element={<Profile />} />
        <Route path="/profile" element={<Profile />} />
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
