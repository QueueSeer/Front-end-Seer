import React, { useState } from "react";

import Navbar from "../../components/navbar"; // เรียกใช้ path ที่ถูกต้อง
import Sidebar from "../../components/Sidebar"; // เรียกใช้ path ที่ถูกต้อง

export default function profile() {

  return (
    <div>
      <Navbar /> {/* เรียกใช้ Navbar */}
      <Sidebar />
    </div>
  );
}
