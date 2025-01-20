import React from "react";
import { useLocation, useParams } from "react-router-dom";
import Layout from "../Layout";
import BackButton from "../../../components/Button/BackButton";
import QuestionCard from "../../../components/Card/QuestionCard";

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
  const fortuneNowDetails = location.state;

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
    .split("\n") // แยกตามบรรทัด
    .map((question) => question.trim()) // ตัดช่องว่างออกจากแต่ละคำถาม
    .filter((question) => question.length > 0); // กรองคำถามที่ไม่ว่างเปล่า

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
      <div className="pt-8 text-[26px] md:text-2xl font-semibold text-gray-800 ">
        คำถามดูดวงทันที
      </div>
      <div className="px-10 py-8 mt-3 bg-primary text-white border rounded-lg shadow-md">
        {/* แสดงคำถามแต่ละข้อใน <p> เพื่อให้แสดงแต่ละคำถามในบรรทัดใหม่ */}
        {questions.map((question, index) => (
          <p key={index} className="text-[18px] mb-4">
            {question}
          </p>
        ))}
      </div>

      {/* Ans Section */}
      <div className="pt-8 text-[26px] md:text-2xl font-semibold text-gray-800 ">
        คำตอบ
      </div>
      <textarea
        rows="4"
        className="w-full px-8 py-6 mt-3 border resize-none rounded-lg shadow-sm text-black focus:outline-none focus:ring-2 focus:ring-primary"
        placeholder="กรุณากรอกคำตอบของคุณที่นี่"
      />
    </Layout>
  );
};

export default Detail;
