import React from "react";

import Navbar from "../../components/navbar"; // เรียกใช้ path ที่ถูกต้อง
import Sidebar from "../../components/Sidebar"; // เรียกใช้ path ที่ถูกต้อง
import UserProfile from "./UserProfile"; // เรียกใช้ path ที่ถูกต้อง

export default function Profile() {
  return (
    <div className="relative">
      {/* Navbar - อยู่หน้าสุด */}
      <div className="h-[68px]">
        <div className="fixed top-0 left-0 w-full z-[1000]">
          <Navbar />
        </div>
      </div>

      <div className="flex px-12 pt-12 gap-14">
        {/* Sidebar - อยู่หน้ากว่า UserProfile */}
        <div className="hidden lg:block w-72 lg:sticky lg:top-[88px] lg:self-start z-[900]">
          <Sidebar />
        </div>

        {/* UserProfile - อยู่หลังสุด */}
        <div className="flex-1 pb-10 relative z-[800]">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
