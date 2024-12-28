import React from "react";
import { useParams } from "react-router-dom"; // นำเข้า useParams
import Navbar from "../../components/navbar"; // เรียกใช้ path ที่ถูกต้อง
import Sidebar from "../../components/Sidebar"; // เรียกใช้ path ที่ถูกต้อง

// คอมโพเนนต์สำหรับแสดงรายละเอียดการแจ้งเตือน
function NotificationDetail() {
  const { id } = useParams(); // ดึงพารามิเตอร์ id จาก URL
  return (
    <>
      <Navbar /> {/* เรียกใช้ Navbar */}
      <Sidebar />

      <div className="p-4">
        <p>การแจ้งเตือน ID: {id}</p> {/* แสดง ID ของการแจ้งเตือน */}
      </div>
    </>
  );
}

export default NotificationDetail;
