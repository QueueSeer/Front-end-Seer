import React, { useState } from "react";
import Layout from "./Layout";
import AuctionPopup from "./Popup/AuctionPopup";

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

      {/* Popup */}
      <AuctionPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </Layout>
  );
};

export default Auction;
