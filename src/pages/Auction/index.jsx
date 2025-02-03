import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import AuctionPopup from "./Popup/AuctionPopup";
import FortuneData from "../../data/fortuneData";
import ServiceCard from "../../components/Card/ServiceCard";

const Auction = () => {
  const [isPopupOpen, setPopupOpen] = useState(false); // ใช้ตัวแปรเดียว

  return (
    <Layout>
      <div className="pt-8 font-regular text-[18px] text-gray-800 leading-relaxed">
        <p>
          <span className="font-semibold">การประมูลดูดวง</span>{" "}
          คือระบบที่เปิดให้ลูกค้าสามารถเข้าร่วมประมูลเพื่อขอคำปรึกษาหรือดูดวงจากหมอดู
          โดยที่ลูกค้าสามารถเสนอราคาสำหรับบริการดูดวงตามที่ตนเองต้องการ
        </p>
      </div>

      {/* ปุ่มเปิด Popup */}
      <div
        className="pt-3 font-regular text-[18px] text-secondary2 underline mt-3 cursor-pointer hover:underline"
        onClick={() => setPopupOpen(true)}
      >
        ดูรายละเอียดเพิ่มเติม
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
        {/* แสดง ServiceCard สำหรับทุกๆ fortune */}
        {FortuneData.map((fortune) => (
          <Link
            key={fortune.id}
            to={`/fortuneNow/drafted/${fortune.id}`}
            className="block"
          >
            <ServiceCard
              image={fortune.image}
              avatar={fortune.avatar}
              title={fortune.status}
              description={fortune.details}
              fortuneTeller={fortune.fortuneTeller}
              createdate={fortune.createdate}
              fortune={fortune.status}
              publicdate={fortune.publicdate}
            />
          </Link>
        ))}
      </div>
      {/* Popup */}
      <AuctionPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </Layout>
  );
};

export default Auction;
