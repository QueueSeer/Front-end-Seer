import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import Layout from "./Layout";
import FortuneNowCard from "./CardFortuneNow/FortuneNowCard";
import StatusButtons from "./StatusButtons";

// ฟังก์ชันในการจัดรูปแบบวันที่
const formatDate = (isoDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoDate).toLocaleDateString("th-TH", options);
};

// ฟังก์ชันในการจัดรูปแบบเวลา
const formatTime = (isoDate) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(isoDate).toLocaleTimeString("th-TH", options);
};

// ฟังก์ชันในการคำนวณเวลาที่ผ่านไป
const timeDifference = (isoDate) => {
  const now = new Date();
  const targetTime = new Date(isoDate);
  const diffInMinutes = Math.floor((now - targetTime) / 60000);

  if (diffInMinutes > 59) {
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours} ชั่วโมง ${minutes} นาทีที่ผ่านมา`;
  }
  return `${diffInMinutes} นาทีที่ผ่านมา`;
};

const FortuneNow = () => {
  const [fortuneNows, setFortuneNows] = useState([]);
  const location = useLocation();
  const navigate = useNavigate();

  // กรณีที่มีข้อมูลใหม่มาจาก location.state
  useEffect(() => {
    if (location.state) {
      const updatedData = location.state;
      setFortuneNows((prevFortuneNows) =>
        prevFortuneNows.map((fortuneNow) =>
          fortuneNow.id === updatedData.id ? updatedData : fortuneNow
        )
      );
    } else {
      // กรณีไม่มีข้อมูล location.state ให้ใช้ค่า default
      setFortuneNows([
        {
          id: 1,
          icon: "/path/to/icon1.png",
          name: "สุรางคนางค์ เกตุยั่งยืนวงศ์",
          birthdate: "1990-04-08T04:45:25.448Z",
          dateappointment: "2025-01-20T10:06:38.448Z",
          packageName: "แพ็กเกจความรัก",
          code: "4QCFR",
          email: "25654@gmail.com",
          questions: `1. ความรักในช่วงนี้จะเป็นยังไง จะได้เจอคนที่ชอบไหม หรือมีโอกาสจะได้เจอคนที่ชอบหรือเปล่า`,
          status: "รอเข้ารับบริการ",
        },
        {
          id: 2,
          icon: "/path/to/icon2.png",
          name: "สมชาย ใจดี",
          birthdate: "1985-12-01T04:45:25.448Z",
          dateappointment: "2024-09-11T10:06:38.448Z",
          packageName: "แพ็กเกจสุขภาพ",
          code: "7XYZB",
          email: "25655@gmail.com",
          questions: `1. ความรักในช่วงนี้จะเป็นยังไง จะได้เจอคนที่ชอบไหม หรือมีโอกาสจะได้เจอคนที่ชอบหรือเปล่า`,
          status: "รอเข้ารับบริการ",
        },
      ]);
    }
  }, [location.state]);

  // ฟังก์ชันเมื่อคลิกที่การ์ด
  const handleCardClick = (id) => {
    const fortuneNow = fortuneNows.find((fortune) => fortune.id === id);
    if (fortuneNow) {
      navigate(`/fortuneNow/${id}`, { state: fortuneNow });
    }
  };

  // กรองรายการที่สถานะเป็น "รอเข้ารับบริการ"
  const filteredFortuneNows = fortuneNows.filter(
    (fortuneNow) => fortuneNow.status === "รอเข้ารับบริการ"
  );

  return (
    <Layout>
      <StatusButtons />
      <div className="space-y-5">
        {/* แสดงการ์ดทั้งหมดที่สถานะ "รอเข้ารับบริการ" */}
        {filteredFortuneNows.map((fortuneNow) => (
          <div
            key={fortuneNow.id}
            onClick={() => handleCardClick(fortuneNow.id)}
          >
            <FortuneNowCard
              icon={fortuneNow.icon}
              name={fortuneNow.name}
              birthdate={formatDate(fortuneNow.birthdate)}
              date={formatDate(fortuneNow.dateappointment)}
              time={formatTime(fortuneNow.dateappointment)}
              timeRemaining={timeDifference(fortuneNow.dateappointment)}
              packageName={fortuneNow.packageName}
              code={fortuneNow.code}
              email={fortuneNow.email}
            />
          </div>
        ))}
      </div>
    </Layout>
  );
};

export default FortuneNow;
