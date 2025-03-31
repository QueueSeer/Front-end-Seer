import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import Layout from "./Layout";
import AuctionPopup from "./Popup/AuctionPopup";
import ServiceCard from "../../components/Card/ServiceCard";
import { getSeerAuctions } from "../../Data/Auction/Auction";

const Auction = () => {
  const [isPopupOpen, setPopupOpen] = useState(false);
  const [auctions, setAuctions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchAuctions = async () => {
      try {
        const data = await getSeerAuctions();
        setAuctions(data);
      } catch (err) {
        setError("ไม่สามารถโหลดข้อมูลการประมูลได้");
      } finally {
        setLoading(false);
      }
    };
    fetchAuctions();
  }, []);

  return (
    <Layout>
      <div className="pt-8 font-normal text-[18px] text-gray-800 leading-relaxed break-words">
        <p>
          <span className="font-semibold whitespace-nowrap">การประมูลดูดวง</span>{" "}
          คือระบบที่เปิดให้ลูกค้าสามารถเข้าร่วมประมูลเพื่อขอคำปรึกษา
          หรือดูดวงจากหมอดู โดยที่ลูกค้าสามารถเสนอราคาสำหรับบริการดูดวง
          ตามที่ตนเองต้องการ
        </p>
      </div>

      <div
        className="pt-3 font-regular text-[18px] text-secondary2 underline mt-3 cursor-pointer hover:underline"
        onClick={() => setPopupOpen(true)}
      >
        ดูรายละเอียดเพิ่มเติม
      </div>

      {loading ? (
        <p className="text-center text-gray-500 mt-6">กำลังโหลดข้อมูล...</p>
      ) : error ? (
        <p className="text-center text-red-500 mt-6">{error}</p>
      ) : auctions.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xxl:grid-cols-4 gap-4 mt-4">
          {auctions.map((fortune) => {
            const now = new Date();
            const startTime = new Date(fortune.start_time);
            const endTime = new Date(fortune.end_time);

            let statusAuction = "";
            let timeRemaining = "";

            if (now < startTime) {
              statusAuction = "ยังไม่เปิดให้บริการ";
            } else if (now >= startTime && now <= endTime) {
              statusAuction = "เปิดให้บริการ";
              const diffMs = endTime - now;
              const days = Math.floor(diffMs / (1000 * 60 * 60 * 24));
              const hours = Math.floor((diffMs % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
              const minutes = Math.floor((diffMs % (1000 * 60 * 60)) / (1000 * 60));
              timeRemaining = `เหลือเวลา ${days} วัน ${hours} ชั่วโมง ${minutes} นาที`;
            } else {
              statusAuction = "ปิดให้บริการ";
            }

            return (
              <Link
                key={fortune.id}
                to={`https://qseer.app/detailAuction/${fortune.id}`}
                state={fortune}
                className="block"
              >
                <ServiceCard
                  image={fortune.image}
                  avatar={fortune.seer.image}
                  title={fortune.name}
                  description={fortune.short_description}
                  fortuneTeller={fortune.seer.display_name}
                  createdate={fortune.date_created}
                  fortune={statusAuction}
                  publicdate={fortune.start_time}
                  enddate={fortune.end_time}
                  timeRemaining={timeRemaining}
                />
              </Link>
            );
          })}
        </div>
      ) : (
        <p className="text-center text-gray-500 mt-6">ไม่มีข้อมูลการประมูลในขณะนี้</p>
      )}

      <div className="flex justify-end pt-4">
        <Link
          to="/auction/create"
          onClick={() => window.scrollTo(0, 0)}
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
          <p className="text-black/80 hover:text-gray-700">สร้างประมูลดูดวง</p>
        </Link>
      </div>

      <AuctionPopup isOpen={isPopupOpen} onClose={() => setPopupOpen(false)} />
    </Layout>
  );
};

export default Auction;