import React from "react";

import Navbar from "../../components/navbar"; // เรียกใช้ Navbar
import Sidebar from "../../components/Sidebar"; // เรียกใช้ Sidebar
import Revenue from "../../components/revenue"; // เรียกใช้ Revenue

export default function RevenuePage() {
  return (
    <div>
      <Navbar /> {/* Navbar */}
      <div className="flex px-12 pt-12 gap-14">
        {/* Sidebar */}
        <div className="hidden lg:block w-72">
          <Sidebar />
        </div>
        {/* Revenue Content */}
        <div className="flex-1   rounded-lg border border-gray-200  ">
          <Revenue />
        </div>
      </div>
    </div>
  );
}