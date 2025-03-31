import React from "react";

import Navbar from "../../components/navbar"; // เรียกใช้ path ที่ถูกต้อง
import Sidebar from "../../components/Sidebar"; // เรียกใช้ path ที่ถูกต้อง
import UserProfile from "./UserProfile"; // เรียกใช้ path ที่ถูกต้อง

export default function Profile() {
  return (
    <div className="min-h-screen flex flex-col">
      {/* Navbar - อยู่หน้าสุดโดยใช้ fixed position */}
      <div className="h-[68px] fixed top-0 left-0 w-full bg-white shadow-md z-50">
        <Navbar />
      </div>

      {/* คอนเทนต์หลัก ขยับลงมาเพื่อไม่ให้ทับ Navbar */}
      <div className="flex flex-1 px-12 pt-20 gap-14">
        {/* Sidebar - อยู่ข้างหน้าด้วย order และ sticky */}
        <div className="hidden lg:block w-72 lg:sticky lg:top-[88px] order-1">
          <Sidebar />
        </div>

        {/* UserProfile - อยู่หลังสุด */}
        <div className="flex-1 pb-10 order-2">
          <UserProfile />
        </div>
      </div>
    </div>
  );
}
