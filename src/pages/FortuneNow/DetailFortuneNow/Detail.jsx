import React, { useState } from "react";
import { useLocation, useParams, useNavigate } from "react-router-dom"; // เพิ่ม useNavigate
import Layout from "../Layout";
import BackButton from "../../../components/Button/BackButton";
import ButtonComponent from "../../../components/Popup/profile/ButtonComponent";

// ฟังก์ชันจัดรูปแบบวันที่
const formatDate = (isoDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoDate).toLocaleDateString("th-TH", options);
};

// ฟังก์ชันจัดรูปแบบเวลา
const formatTime = (isoDate) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(isoDate).toLocaleTimeString("th-TH", options);
};

// ฟังก์ชันในการ render ข้อมูล
const renderInfoSection = (title, content) => (
  <div className="flex flex-col sm:flex-row">
    <div className="w-full sm:w-40 font-medium text-gray-800 mb-1 sm:mb-0">
      {title}
    </div>
    <div className="flex-1">{content}</div>
  </div>
);

const Detail = () => {
  const { id } = useParams();
  const location = useLocation();
  const navigate = useNavigate(); // ใช้ navigate เพื่อนำทาง
  const fortuneNowDetails = location.state;

  const [answer, setAnswer] = useState(""); // State สำหรับเก็บคำตอบที่กรอก

  if (!fortuneNowDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-gray-600 text-center">
          ไม่มีข้อมูลสำหรับ ID {id}
        </p>
      </div>
    );
  }

  const questions = fortuneNowDetails.questions
    .split("\n")
    .map((question) => question.trim())
    .filter((question) => question.length > 0);

  // ฟังก์ชันจัดการเมื่อกดปุ่ม "ส่งข้อความ"
  const handleSubmit = () => {
    console.log("คำตอบที่บันทึก:", answer);
    alert("บันทึกคำตอบเรียบร้อย!");
    navigate("/fortuneNow"); // นำทางกลับไปยังหน้า fortuneNow
  };

  // ฟังก์ชันจัดการเมื่อกดปุ่ม "ยกเลิก"
  const handleCancel = () => {
    setAnswer(""); // รีเซ็ตค่าคำตอบ
    window.scrollTo({ top: 0, behavior: "smooth" }); // เลื่อนกลับไปด้านบน
  };

  return (
    <Layout>
      <div className="pt-6 flex items-start">
        <BackButton />
      </div>

      {/* Booking Information */}
      <div className="px-10 py-7 mt-6 bg-white border rounded-lg shadow-md">
        <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5">
          ข้อมูลผู้จอง
        </h2>
        <div className="space-y-4 text-[18px]">
          {renderInfoSection("ชื่อ-นามสกุล", fortuneNowDetails.name)}
          {renderInfoSection(
            "วันเดือนปีเกิด",
            formatDate(fortuneNowDetails.birthdate)
          )}
          {renderInfoSection(
            "เวลาเกิด",
            `${formatTime(fortuneNowDetails.birthdate)} น.`
          )}
          {renderInfoSection("อีเมล", fortuneNowDetails.email)}
        </div>
      </div>

      {/* Question Section */}
      <div className="pt-8 pb-2 text-[26px] md:text-2xl font-semibold text-gray-800">
        คำถามดูดวงทันที
      </div>
      <div className="px-8 py-8 mt-3 bg-primary text-white border rounded-lg shadow-md">
        {questions.map((question, index) => (
          <p key={index} className="text-[18px] mb-3">
            {question}
          </p>
        ))}
      </div>

      {/* Answer Section */}
      <div className="pt-8 pb-2 text-[26px] md:text-2xl font-semibold text-gray-800">
        คำตอบ
      </div>
      <textarea
        rows="12"
        className="w-full px-8 py-6 mt-3 border border-gray-800 resize-none rounded-lg shadow-sm text-black focus:outline-none focus:border focus:border-primary"
        placeholder="กรุณากรอกคำตอบของคุณที่นี่"
        value={answer}
        onChange={(e) => setAnswer(e.target.value)}
      />

      {/* Buttons */}
      <div className="flex justify-between space-x-6 mt-3">
        {/* Cancel Button */}
        <ButtonComponent
          label="ยกเลิก"
          className="flex items-center justify-center px-8 py-3 text-base font-semibold text-gray-500 border border-gray-400 hover:bg-zinc-100 hover:text-neutral-400 rounded-full"
          onClick={handleCancel}
        />

        {/* Complete Service Button */}
        <ButtonComponent
          label="ส่งข้อความ"
          className="flex items-center justify-center px-8 py-3 text-base font-semibold text-primary border border-primary hover:bg-secondary hover:text-white rounded-full"
          onClick={handleSubmit}
        />
      </div>
    </Layout>
  );
};

export default Detail;
