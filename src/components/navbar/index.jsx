import React from "react";
import Images from "../../assets";

export default function Navbar() {
  return (
    <div className="navbar bg-base-100 shadow-md px-4">
      {/* โลโก้และชื่อโปรเจกต์ */}
      <div className="flex-1 flex items-center gap-2">
        <img src={Images.logo} alt="Logo" className="w-10 h-10 rounded-md mt-2" />
        <span
          className="text-2xl font-extrabold text-purple-800"
          style={{ fontFamily: "Playfair Display", fontSize: "32px" }}
        >
          Qseer
        </span>
      </div>

      {/* ลิงก์เมนู */}
      <div className="hidden lg:flex flex-none">
        <ul className="menu menu-horizontal gap-1 text-gray-800">
          <li><a href="#home">หน้าหลัก</a></li>
          <li><a href="#packages">แพ็กเกจ</a></li>
          <li><a href="#auction">ประมูล</a></li>
          <li><a href="#articles">บทความ</a></li>
        </ul>
      </div>

      {/* ปุ่มเข้าสู่ระบบและลงทะเบียน */}
      <div className="flex-none flex gap-2">
      <button className="btn btn-outline btn-sm text-white hover:bg-opacity-20" style={{ color: "#8677A7", borderColor: "#8677A7" }}>
          เข้าสู่ระบบ
        </button>
        <button className="btn btn-sm text-white" style={{ backgroundColor: "#8677A7" }}>
          ลงทะเบียน
        </button>
      </div>
    </div>
  );
}
