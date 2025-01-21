import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./Layout";
import FortuneNowCard from "./CardFortuneNow/FortuneNowCard";
import StatusButtons from "./StatusButtons";

const formatDate = (isoDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoDate).toLocaleDateString("th-TH", options);
};

const formatTime = (isoDate) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(isoDate).toLocaleTimeString("th-TH", options);
};

const timeDifference = (isoDate) => {
  const now = new Date();
  const targetTime = new Date(isoDate);
  const diffInMinutes = Math.floor((now - targetTime) / 60000);

  if (diffInMinutes > 59) {
    const hours = Math.floor(diffInMinutes / 60);
    const minutes = diffInMinutes % 60;
    return `${hours} ชั่วโมง ${minutes} นาทีผ่านไป`;
  }
  return `${diffInMinutes} นาทีผ่านไป`;
};

const FortuneNow = () => {
  const [fortuneNows] = useState([
    {
      id: 1,
      icon: "/path/to/icon1.png",
      name: "สุรางคนางค์ เกตุยั่งยืนวงศ์",
      birthdate: "1990-04-08T04:45:25.448Z",
      dateappointment: "2025-01-20T10:06:38.448Z",
      packageName: "แพ็กเกจความรัก",
      code: "4QCFR",
      email: "25654@gmail.com",
      questions: `1. ความรักในช่วงนี้จะเป็นยังไง จะได้เจอคนที่ชอบไหม หรือมีโอกาสจะได้เจอคนที่ชอบหรือเปล่า
2. การงานในช่วงนี้จะเป็นอย่างไร มีโอกาสก้าวหน้าหรือไม่
3. การเงินในช่วงนี้จะเป็นยังไง`,
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
      questions: `1. ความรักในช่วงนี้จะเป็นยังไง จะได้เจอคนที่ชอบไหม หรือมีโอกาสจะได้เจอคนที่ชอบหรือเปล่า ความรักในช่วงนี้จะเป็นยังไง จะได้เจอคนที่ชอบไหม หรือมีโอกาสจะได้เจอคนที่ชอบหรือเปล่า ความรักในช่วงนี้จะเป็นยังไง จะได้เจอคนที่ชอบไหม หรือมีโอกาสจะได้เจอคนที่ชอบหรือเปล่า`,
    },
  ]);

  const navigate = useNavigate();

  const handleCardClick = (id) => {
    const fortuneNow = fortuneNows.find((a) => a.id === id);
    navigate(`/fortuneNow/${id}`, { state: fortuneNow });
  };

  return (
    <Layout>
      <StatusButtons /> {/* แสดง StatusButtons */}
      <div className="space-y-5">
        {fortuneNows.map((fortuneNow) => (
          <div
            key={fortuneNow.id}
            onClick={() => handleCardClick(fortuneNow.id)}
          >
            <FortuneNowCard
              key={fortuneNow.id}
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
