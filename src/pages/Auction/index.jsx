import React, { useState } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import AuctionPopup from "./Popup/AuctionPopup";
import ServiceCard from "../../components/Card/ServiceCard";
import AuctionData from "../../Data/AuctionData";

const Auction = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);

  return (
    <Layout>
      <div className="pt-8 font-normal text-[18px] text-gray-800 leading-relaxed break-words">
        <p>
          <span className="font-semibold whitespace-nowrap">
            การประมูลดูดวง
          </span>{" "}
          คือระบบที่เปิดให้ลูกค้าสามารถเข้าร่วมประมูลเพื่อขอคำปรึกษา
          หรือดูดวงจากหมอดู โดยที่ลูกค้าสามารถเสนอราคาสำหรับบริการดูดวง
          ตามที่ตนเองต้องการ
        </p>
      </div>

      {/* ปุ่มเปิด Popup */}
      <div
        className="pt-3 font-regular text-[18px] text-secondary2 underline mt-3 cursor-pointer hover:underline"
        onClick={() => setPopupOpen(true)}
      >
        ดูรายละเอียดเพิ่มเติม
      </div>

      {/* แสดงรายการประมูล */}
      {AuctionData.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-4 mt-4">
          {AuctionData.map((fortune) => (
            <Link
              key={fortune.id}
              to={`/auction/${fortune.id}`}
              state={fortune}
              className="block"
            >
              <ServiceCard
                image={fortune.image}
                avatar={fortune.avatar}
                title={fortune.title}
                description={fortune.details}
                fortuneTeller={fortune.fortuneTeller}
                createdate={fortune.createdate}
                fortune={fortune.status}
                publicdate={fortune.publicdate}
              />
            </Link>
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">
          ไม่มีข้อมูลการประมูลในขณะนี้
        </p>
      )}

      <div className="flex justify-end pt-4">
        <Link
          to="/auction/create"
          onClick={() => window.scrollTo(0, 0)} // เพิ่ม scrollTo
          className="flex items-center mt-4 px-4 py-2 border border-secondary rounded-full text-gray-900 font-medium hover:bg-primary/30 transition"
        >
          <div className="w-6 h-6 flex items-center justify-center text-secondary mr-2">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              strokeWidth={1.7}
              stroke="currentColor"
              className="w-6 h-6"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                d="M12 9v6m3-3H9m12 0a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
              />
            </svg>
          </div>
          <p className="text-black/80 hover:text-gray-700">สร้างดูดวงทันที</p>
        </Link>
      </div>

      {/* Popup */}
      <AuctionPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </Layout>
  );
};

export default Auction;
