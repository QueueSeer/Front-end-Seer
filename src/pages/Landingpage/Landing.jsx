import React from "react";
import Fillterbar from "../../components/fillterbar";
import Footer from "../../components/Footer";
import { useNavigate } from "react-router-dom"; 

import images from "../../assets"; 

const LandingPage = () => {
  const navigate = useNavigate(); 

  const handleStart = () => {
    navigate("/register-membership"); 
  };

  return (
    <div className="bg-gray-50">
      {/* Section 1: Landing Page */}
      <div className="min-h-screen flex flex-col">
        <Fillterbar />

        {/* Main Content */}
        <div className="container mx-auto px-4 py-12 flex flex-col md:flex-row items-center">
          {/* Left Section */}
          <div className="w-full md:w-1/2 text-left">
            <h1 className="font-playfair-display text-[64px] font-bold text-[#8677A7]" style={{ fontFamily: "Playfair Display" }}>
              Qseer
            </h1>
            <p className="text-[50px] font-semibold text-black" style={{ fontFamily: "Noto Sans Thai" }}>
              ผู้ช่วยอัจฉริยะสำหรับหมอดู
            </p>
            <p className="text-[50px] font-semibold text-[#8677A7]" style={{ fontFamily: "Noto Sans Thai" }}>
              ยกระดับการจัดการคิว
            </p>
            <p className="text-[50px] font-semibold text-black" style={{ fontFamily: "Noto Sans Thai" }}>
              อย่างมืออาชีพ
            </p>
            <p className="text-[19px] font-normal text-black mt-6 leading-relaxed" style={{ fontFamily: "Noto Sans Thai" }}>
              Qseer ช่วยให้หมอดูจัดการคิวลูกค้าได้อย่างง่ายดาย ช่วยเพิ่มความสะดวกในการ
              <br />
              วางแผนการทำงาน และทำให้ลูกค้าได้รับบริการที่รวดเร็วและมีประสิทธิภาพ
            </p>
            <div className="flex gap-4 mt-8">
            <button
                className="bg-purple-500 font-semibold text-white py-3 px-6 rounded-lg shadow hover:bg-purple-600"
                onClick={handleStart} // เรียกฟังก์ชัน handleStart เมื่อกดปุ่ม
              >
                เริ่มต้นการใช้งาน
              </button>
              <button className="border border-gray-300 font-semibold flex items-center text-gray-700 py-3 px-6 rounded-lg hover:border-purple-400">
                <img src={images.videoIcon} alt="Watch Demo" className="w-5 h-5 mr-2" />
                Watch Demo
              </button>
            </div>
          </div>

          {/* Right Section */}
          <div className="w-full md:w-1/2 flex justify-center">
            <img src={images.Oracle} alt="Oracle" className="max-w-full h-auto" />
          </div>
        </div>
      </div>

      {/* Section 2: Features Section */}
      <div className="bg-gray-50 py-8 -mt-12">
        <div className="text-center mb-12">
          <h2 className="text-[#8677A7] text-2xl font-semibold"style={{ fontFamily: "Noto Sans Thai" }}>เพิ่มความง่าย</h2>
          <h3 className="text-black text-3xl font-semibold"style={{ fontFamily: "Noto Sans Thai" }}>
            อำนวยความสะดวกแบบไร้รอย
          </h3>
          <h3 className="text-black text-3xl font-semibold"style={{ fontFamily: "Noto Sans Thai" }}>
         ต่อสำหรับหมอดู
          </h3>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 container mx-auto px-4">
          {/* Feature 1: Calendar */}
          <div className="flex flex-col justify-between items-center text-center border border-purple-300 rounded-lg p-8 h-[380px] shadow-md hover:shadow-lg transition">
            <img src={images.Calendar} alt="จัดการคิวอัตโนมัติ" className="w-41 h-41 mb-8 p-8" />
            <h4 className="text-black text-xl font-medium">จัดการคิวอัตโนมัติ</h4>
          </div>

          {/* Feature 2: Notification */}
          <div className="flex flex-col justify-between items-center text-center border border-purple-300 rounded-lg p-8 h-[380px] shadow-md hover:shadow-lg transition">
            <img src={images.notification} alt="แจ้งเตือนทันที" className="w-43 h-43 mb-10 p-8" />
            <h4 className="text-black text-xl font-medium">แจ้งเตือนทันที</h4>
          </div>

          {/* Feature 3: Real-Time Status */}
          <div className="flex flex-col justify-between items-center text-center border border-purple-300 rounded-lg p-8 h-[380px] shadow-md hover:shadow-lg transition">
            <img src={images.RealTimeStatus} alt="สถานะเรียลไทม์" className="w-41 h-41 mb-8" />
            <h4 className="text-black text-xl font-medium">สถานะเรียลไทม์</h4>
          </div>
        </div>
      </div>
     {/* Section 3: Manage Queue */}
<div className="bg-gray-50 py-12 -mt-12">
  <div className="container mx-auto px-0 md:px-4 flex flex-col md:flex-row items-center">
    {/* Left Section: Image */}
    <div className="w-full md:w-1/2 flex justify-start -ml-8 md:-ml-16">
      <img
        src={images.Managequeue}
        alt="Manage Queue"
        className="max-w-full h-auto"
      />
    </div>

    {/* Right Section: Text Content */}
    <div className="w-full md:w-1/2">
      {/* Title */}
      <h2
        className="text-[#8677A7] font-bold text-xl  mb-4"
        style={{ fontFamily: "Noto Sans Thai", fontSize: "24px" }}
      >
        FEATURES
      </h2>
      <h3
        className="text-black text-4xl font-bold mb-8"
        style={{ fontFamily: "Noto Sans Thai", fontSize: "48px" }}
      >
        จัดการคิวอัตโนมัติ
      </h3>

      {/* Feature List */}
      <div className="space-y-8">
        {/* Feature 1 */}
        <div className="flex items-start">
          <img
            src={images.cubeIcon}
            alt="ปรับแต่งคิวได้ง่าย"
            className="w-6 h-6 mr-4"
          />
          <div>
            <h4
              className="text-black font-bold mb-2"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              ปรับแต่งคิวได้ง่าย
            </h4>
            <p
              className="text-gray-700 font-medium"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              ระบบจะอำนวยความสะดวกในการจัดการคิวโดยอัตโนมัติ หมอดูสามารถปรับแต่งตารางการทำงาน
              ของตนเองได้ตามความต้องการ และความพร้อมในการให้บริการลูกค้า
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-start">
          <img
            src={images.cubeIcon}
            alt="จัดการคิวแบบอัจฉริยะ"
            className="w-6 h-6 mr-4"
          />
          <div>
            <h4
              className="text-black font-bold mb-2"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              จัดการคิวแบบอัจฉริยะ
            </h4>
            <p
              className="text-gray-700 font-medium"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              ระบบจะคำนวณและเรียงลำดับคิวที่เหมาะสมที่สุดโดยอัตโนมัติ
              เพื่อประสิทธิภาพในการบริการ และลดเวลารอของลูกค้า
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-start">
          <img
            src={images.cubeIcon}
            alt="รายงานและวิเคราะห์ข้อมูล"
            className="w-6 h-6 mr-4"
          />
          <div>
            <h4
              className="text-black font-bold mb-2"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              รายงานและวิเคราะห์ข้อมูล
            </h4>
            <p
              className="text-gray-700 font-medium"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              หมอดูสามารถเข้าถึงรายงานการจัดการคิวและวิเคราะห์ข้อมูลการให้บริการ
              เพื่อปรับปรุงและพัฒนาการให้บริการให้ดียิ่งขึ้น
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
     {/* Section 4: Real-Time Notification */}
     <div className="bg-gray-50 py-6 -mt-28">
     <div className="container mx-auto px-0 md:px-4 flex flex-col md:flex-row items-center">
    {/* Left Section: Text Content */}
    <div className="w-full md:w-1/2">
      <h2
        className="text-[#8677A7] font-bold text-xl  mb-4"
        style={{ fontFamily: "Noto Sans Thai", fontSize: "24px" }}
      >
        FEATURES
      </h2>
      <h3
        className="text-black text-4xl font-bold mb-8"
        style={{ fontFamily: "Noto Sans Thai", fontSize: "48px" }}
      >
        แจ้งเตือนทันที
      </h3>

      {/* Feature List */}
      <div className="space-y-8">
        {/* Feature 1 */}
        <div className="flex items-start">
          <img
            src={images.cubeIcon}
            alt="แจ้งเตือนเร็ว"
            className="w-6 h-6 mr-4"
          />
          <div>
            <h4
              className="text-black font-bold mb-2"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              แจ้งเตือนก่อนนัดหมาย
            </h4>
            <p
              className="text-gray-700 font-medium"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              หมอดูจะได้รับการแจ้งเตือนล่วงหน้าก่อนนัดหมายเกิดขึ้น เพื่อให้มีเวลาเตรียมตัว 
              และวางแผนการให้บริการได้อย่างเหมาะสม
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-start">
          <img
            src={images.cubeIcon}
            alt="ปรับแต่งการแจ้งเตือน"
            className="w-6 h-6 mr-4"
          />
          <div>
            <h4
              className="text-black font-bold mb-2"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              การแจ้งเตือนเมื่อมีการจองใหม่
            </h4>
            <p
              className="text-gray-700 font-medium"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              เมื่อมีลูกค้าทำการจองคิวใหม่ หมอดูจะได้รับการแจ้งเตือนทันที ช่วยให้ทราบถึงการเพิ่มขึ้นของนัดหมาย และจัดการตารางเวลาได้ทันท่วงที
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-start">
          <img
            src={images.cubeIcon}
            alt="ปรับแต่งการแจ้งเตือนเมื่อยกเลิก"
            className="w-6 h-6 mr-4"
          />
          <div>
            <h4
              className="text-black font-bold mb-2"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              การแจ้งเตือนเมื่อลูกค้ายกเลิกหรือเปลี่ยนแปลงนัดหมาย
            </h4>
            <p
              className="text-gray-700 font-medium"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              หากลูกค้าต้องการยกเลิกหรือเปลี่ยนแปลงเวลานัดหมาย ระบบจะส่งการแจ้งเตือนทันทีถึงหมอดู ช่วยให้สามารถปรับแผนหรือตอบรับการเปลี่ยนแปลงได้อย่างรวดเร็ว
            </p>
          </div>
        </div>
      </div>
    </div>

        {/* Right Section: Image */}
    <div className="w-full md:w-1/2 flex justify-center md:justify-end relative items-center">
      <img
        src={images.notiRealtime}
        alt="Real-Time Notification"
        className="max-w-full h-auto"
      />
    </div>
  </div>
</div>

 {/* Section 5: Status Realtime */}
 <div className="bg-gray-50 py-6 -mt-28">
     <div className="container mx-auto px-0 md:px-4 flex flex-col md:flex-row items-center">
    {/* Left Section: Image */}
    <div className="w-full md:w-1/2 flex justify-start -ml-8 md:-ml-16">
      <img
        src={images.statusRealtime}
        alt="Status Realtime"
        className="max-w-full h-auto"
      />
    </div>

    {/* Right Section: Text Content */}
    <div className="w-full md:w-1/2">
      {/* Title */}
      <h2
        className="text-[#8677A7] font-bold text-xl  mb-4"
        style={{ fontFamily: "Noto Sans Thai", fontSize: "24px" }}
      >
        FEATURES
      </h2>
      <h3
        className="text-black text-4xl font-bold mb-8"
        style={{ fontFamily: "Noto Sans Thai", fontSize: "48px" }}
      >
        สถานะเรียลไทม์
      </h3>

      {/* Feature List */}
      <div className="space-y-8">
        {/* Feature 1 */}
        <div className="flex items-start">
          <img
            src={images.cubeIcon}
            alt="ติดตามสถานะคิวนัดหมาย"
            className="w-6 h-6 mr-4"
          />
          <div>
            <h4
              className="text-black font-bold mb-2"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              ติดตามสถานะคิวนัดหมาย
            </h4>
            <p
              className="text-gray-700 font-medium"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
             แสดงรายการคิวนัดหมายของหมอดูที่กำลังจะเกิดขึ้นและคิวที่กำลังรออยู่ ซึ่งจะอัปเดตสถานะอย่างต่อเนื่อง เช่น คิวที่กำลังดำเนินการ, คิวที่กำลังรอ, และคิวที่เสร็จสิ้น
            </p>
          </div>
        </div>

        {/* Feature 2 */}
        <div className="flex items-start">
          <img
            src={images.cubeIcon}
            alt="ตรวจสอบการเข้าถึงของหมอดู"
            className="w-6 h-6 mr-4"
          />
          <div>
            <h4
              className="text-black font-bold mb-2"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              ตรวจสอบการเข้าถึงของหมอดู
            </h4>
            <p
              className="text-gray-700 font-medium"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
             แสดงสถานะการออนไลน์หรือพร้อมให้บริการของหมอดู ช่วยให้ลูกค้าทราบได้ว่าหมอดู พร้อมให้บริการหรือไม่ในเวลานั้น
            </p>
          </div>
        </div>

        {/* Feature 3 */}
        <div className="flex items-start">
          <img
            src={images.cubeIcon}
            alt="ปรับปรุงและแจ้งเตือนเกี่ยวกับการเปลี่ยนแปลงนัดหมาย"
            className="w-6 h-6 mr-4"
          />
          <div>
            <h4
              className="text-black font-bold mb-2"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              ปรับปรุงและแจ้งเตือนเกี่ยวกับการเปลี่ยนแปลงนัดหมาย
            </h4>
            <p
              className="text-gray-700 font-medium"
              style={{ fontFamily: "Noto Sans Thai", fontSize: "18px" }}
            >
              ระบบจะอัปเดตและแจ้งเตือนหมอดูเกี่ยวกับการเปลี่ยนแปลงใด ๆ ในนัดหมายที่ลูกค้าทำ เช่น การยกเลิกหรือเปลี่ยนเวลานัดหมาย
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</div>
{/* Section 6: Discover New Features */}
<div className="bg-gray-50 py-12 -mt-12">
  <div className="container mx-auto px-4 md:flex md:flex-row items-center">

    {/* Left Section: Text Content */}
    <div className="w-full md:w-1/2 text-left">
      {/* Section Title */}
      <h2 className="text-[#8677A7] text-[32px] font-semibold mb-4" style={{ fontFamily: "Noto Sans Thai" }}>
        ค้นพบฟีเจอร์ที่แตกต่าง
      </h2>
      <h3 className="text-black text-[40px] font-semibold mb-6" style={{ fontFamily: "Noto Sans Thai" }}>
        เพิ่มมิติใหม่ให้กับการดูดวง
      </h3>

      {/* Description */}
      <p className="text-gray-700 text-[18px] font-medium leading-relaxed mb-8" style={{ fontFamily: "Noto Sans Thai" }}>
        Qseer สร้างประสบการณ์ใหม่ให้กับทั้งหมอดูและผู้ใช้บริการด้วยคุณสมบัติที่ล้ำสมัย
        พัฒนาการให้บริการที่เหนือระดับ ด้วยฟีเจอร์เฉพาะที่ตอบโจทย์ความต้องการของหมอดู
        โดยเฉพาะ และสนับสนุนการเติบโตของธุรกิจดูดวงของคุณ
      </p>

      {/* Features in Rounded Rectangle */}
      <div className="space-y-6">
        {/* Feature 1: Auction */}
        <div className="bg-white rounded-lg p-6 shadow-md flex items-start">
          <img src={images.Augtion} alt="Auction Icon" className="w-22 h-22 mr-4 flex-shrink-0" />
          <div>
            <h4 className="text-[#8677A7] text-[18px] font-bold mb-2" style={{ fontFamily: "Noto Sans Thai" }}>
              ประมูลคิวดูดวง
            </h4>
            <p className="text-gray-700 text-[18px] font-medium" style={{ fontFamily: "Noto Sans Thai" }}>
              ช่วยหมอดูในการเข้าถึงลูกค้าใหม่ๆ และสร้างรายได้จากการประมูลเพื่อดูดวงให้ลูกค้าที่สนใจที่สุด
            </p>
          </div>
        </div>

        {/* Feature 2: Instant Horoscope */}
        <div className="bg-white rounded-lg p-6 shadow-md flex items-start">
          <img src={images.InstantHoroscope} alt="Instant Horoscope Icon" className="w-22 h-22 mr-4 flex-shrink-0" />
          <div>
            <h4 className="text-[#8677A7] text-[18px] font-bold mb-2" style={{ fontFamily: "Noto Sans Thai" }}>
              ดูดวงทันที
            </h4>
            <p className="text-gray-700 text-[18px] font-medium" style={{ fontFamily: "Noto Sans Thai" }}>
              เสริมสร้างความสามารถในการให้บริการลูกค้าอย่างรวดเร็ว โดยไม่ต้องใช้การนัดหมายล่วงหน้า
            </p>
          </div>
        </div>

        {/* Feature 3: Horoscope Science */}
        <div className="bg-white rounded-lg p-6 shadow-md flex items-start">
          <img src={images.HoroscopeScience} alt="Horoscope Science Icon" className="w-22 h-22 mr-4 flex-shrink-0" />
          <div>
            <h4 className="text-[#8677A7] text-[18px] font-bold mb-2" style={{ fontFamily: "Noto Sans Thai" }}>
              การแบ่งตามศาสตร์
            </h4>
            <p className="text-gray-700 text-[18px] font-medium" style={{ fontFamily: "Noto Sans Thai" }}>
              สำรวจหมอดูตามศาสตร์ ค้นหาตามความเชี่ยวชาญ เพิ่มโอกาสในการถูกเลือกโดยลูกค้าที่สนใจศาสตร์นั้นๆ
            </p>
          </div>
        </div>
      </div>
    </div>

    {/* Right Section: Image */}
    <div className="w-full md:w-1/2 flex justify-center md:justify-end relative items-center">
  <img
    src={images.Taro}
    alt="Taro"
    className="max-w-full h-auto rounded-lg "
    style={{ position: "relative", right: "-50px" }} 
  />
</div>
  </div>
</div>
{/* layer Section */}
<div className="relative -mt-80 z-0">
  <img
    src={images.layer}
    alt="layer"
    className="w-full h-auto"
  />
</div>

{/* Section 7: Marble2 Left, Text Right */}
<div className="relative bg-gray-50" style={{ marginTop: "-550px", paddingTop: "-300px" }}>
  <div className="container mx-auto px-4 flex flex-col md:flex-row items-center relative">
     {/* Left Section: Image with Blur Background */}
     <div className="w-full md:w-1/2 flex justify-center md:justify-start relative">
      {/* พื้นหลังเบลอ */}
      <div className="absolute top-1/2 left-[10%] transform -translate-y-1/2 rounded-full w-[300px] h-[300px] bg-[#8677A7] opacity-50 blur-3xl -z-10"></div>

      {/* ภาพหลัก */}
      <img
        src={images.marbel2}
        alt="Marble2"
        className="relative max-w-[90%] h-auto"
      />
    </div>

    {/* Right Section: Text Content */}
    <div className="w-full md:w-1/2 text-left">
      {/* Title */}
      <h1
        className="font-playfair-display text-[61px] font-bold text-[#8677A7] mb-4"
        style={{ fontFamily: "Playfair Display" }}
      >
        Qseer
      </h1>
      {/* Subtitle */}
      <p
        className="text-[40px] font-semibold text-black mb-2"
        style={{ fontFamily: "Noto Sans Thai" }}
      >
        เครื่องมือสำคัญสำหรับหมอดู
      </p>
      <p
        className="text-[40px] font-semibold text-[#8677A7] mb-6"
        style={{ fontFamily: "Noto Sans Thai" }}
      >
        จัดการคิวอย่างไร้กังวล
      </p>

      {/* Description */}
      <p
        className="text-[24px] font-normal text-gray-700 mb-8 leading-relaxed"
        style={{ fontFamily: "Noto Sans Thai" }}
      >
        พร้อมหรือยัง? ให้ Qseer ช่วยคุณจัดการคิวอย่างมืออาชีพ
      </p>

      {/* Button */}
      <button
        className="bg-[#8677A7] text-white text-[25px] font-bold py-3 px-8 rounded-lg shadow-md hover:bg-[#755c97] transition"
        style={{ fontFamily: "Noto Sans Thai" }}
        onClick={handleStart} // เรียกฟังก์ชัน handleStart เมื่อกดปุ่ม
        >
          เริ่มต้นการใช้งาน
        </button>
    </div>
  </div>
</div>
<Footer />

    </div>
  );
};

export default LandingPage;
