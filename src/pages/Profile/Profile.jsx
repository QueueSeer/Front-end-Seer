import React from "react";
import Navbar from "../../components/navbar"; // เรียกใช้ path ที่ถูกต้อง
import Sidebar from "../../components/Sidebar"; // เรียกใช้ path ที่ถูกต้อง
import UserProfile from "./UserProfile"; // เรียกใช้ path ที่ถูกต้อง

export default function Profile() {
  return (
    <div>
      {/* Navbar */}
      <div className="h-[68px]">
        <div className="fixed top-0 left-0 w-full z-50">
          <Navbar />
        </div>
      </div>

      {/* Content Section */}
      <div className="flex px-12 pt-12 gap-14">
        {/* Sidebar */}
        <div className="lg:sticky lg:top-[88px] lg:self-start">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="flex-1 pb-10">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
Z;
