import React, { useState } from "react";
import Layout from "./Layout";
import FortuneNowCard from "./CardFortuneNow/FortuneNowCard";

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

const FortuneNow = () => {
  const [fortuneNows] = useState([
    {
      id: 1,
      icon: "/path/to/icon1.png",
      name: "สุรางคนางค์ เกตุยั่งยืนวงศ์",
      birthdate: "1990-04-08T04:45:25.448Z",
      dateappointment: "2024-09-10T10:06:38.448Z",
      packageName: "แพ็กเกจความรัก",
      code: "4QCFR",
      email: "25654@gmail.com",
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
    },
  ]);

  return (
    <Layout>
      <div className="space-y-5">
        {fortuneNows.map((fortuneNow) => (
          <FortuneNowCard
            key={fortuneNow.id}
            icon={fortuneNow.icon}
            name={fortuneNow.name}
            birthdate={formatDate(fortuneNow.birthdate)}
            date={formatDate(fortuneNow.dateappointment)}
            time={formatTime(fortuneNow.dateappointment)}
            packageName={fortuneNow.packageName}
            code={fortuneNow.code}
            email={fortuneNow.email}
          />
        ))}
      </div>
    </Layout>
  );
};

export default FortuneNow;
