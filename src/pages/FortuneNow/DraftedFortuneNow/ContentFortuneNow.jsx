import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import BackButton from "../../../components/Button/BackButton";
import FortuneData from "../../../Data/FortuneData";
import ConfirmPopup from "../../../components/Popup/ConfirmPopup"; // ✅ นำเข้า Popup

const ContentFortuneNow = () => {
  const { id } = useParams();
  const [fortuneData, setFortuneData] = useState(null);
  const [isConfirmOpen, setConfirmOpen] = useState(false);
  const [isConflictOpen, setConflictOpen] = useState(false); // ✅ Popup แจ้งเตือนเมื่อมี ID เปิดอยู่แล้ว
  const [currentOpenId, setCurrentOpenId] = useState(null); // ✅ เก็บ ID ที่เปิดอยู่

  useEffect(() => {
    // หา ID ที่มี "เปิดให้บริการ"
    const openService = FortuneData.find((item) => item.status === "กำลังเปิดให้บริการ");
    setCurrentOpenId(openService ? openService.id : null);

    const selectedData = FortuneData.find((item) => item.id === parseInt(id)) || {
      id,
      details: "ไม่มีข้อมูล",
      questionCount: 0,
      price: 0,
      image: "/images/default.jpg",
      status: "ไม่เปิดให้บริการ",
    };

    setFortuneData(selectedData);
  }, [id]);

  if (!fortuneData) return <p>กำลังโหลดข้อมูล...</p>;

  const toggleStatus = () => {
    if (fortuneData.status === "ไม่เปิดให้บริการ") {
      // เช็คว่ามี ID อื่นเปิดอยู่ไหม
      if (currentOpenId && currentOpenId !== fortuneData.id) {
        setConflictOpen(true); // ❌ แจ้งเตือนว่าต้องปิดอันเก่าก่อน
        return;
      }
      setCurrentOpenId(fortuneData.id); // ✅ อัปเดต ID ที่เปิดอยู่
    } else {
      setCurrentOpenId(null); // ✅ ล้างค่าเมื่อปิด
    }

    setFortuneData((prev) => ({
      ...prev,
      status: prev.status === "ไม่เปิดให้บริการ" ? "กำลังเปิดให้บริการ" : "ไม่เปิดให้บริการ",
    }));
    setConfirmOpen(false);
  };

  const details = fortuneData.details
    .split("\n")
    .map((detail) => detail.trim())
    .filter((detail) => detail.length > 0);

  return (
    <Layout>
      <div className="pt-6 flex items-start pb-6">
        <BackButton />
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">
        รายละเอียดการดูดวงทันที
        <span className="ml-6 text-[16px]">
          {fortuneData.status === "ไม่เปิดให้บริการ" ? (
            <span className="text-white bg-red-600 px-4 py-1 rounded-full">ไม่เปิดให้บริการ</span>
          ) : (
            <span className="text-white bg-green-600 px-4 py-1 rounded-full">กำลังให้บริการ</span>
          )}
        </span>
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 border border-gray-300 rounded-lg p-4 bg-gray-50 text-gray-700">
          {details.map((detail, index) => (
            <p key={index} className="text-[16px] mb-2">{detail}</p>
          ))}
        </div>

        <div className="flex flex-col space-y-4">
          <div className="w-full h-[200px] border border-gray-300 rounded-lg flex items-center justify-center bg-gray-100">
            <img src={fortuneData.image} alt="fortune" className="w-full h-full object-cover rounded-lg" />
          </div>

          <div>
            <label className="block text-gray-700 mb-1">จำนวนคำถาม</label>
            <div className="w-full bg-gray-50 border rounded-md px-4 py-3">{fortuneData.questionCount}</div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">ราคา</label>
            <div className="w-full bg-gray-50 border rounded-md px-4 py-3">{fortuneData.price}</div>
          </div>
        </div>
      </div>

      {/* ปุ่มเปิด/ปิดดูดวง */}
      <div className="mt-6 flex justify-end">
        <button
          className={`px-6 py-3 rounded-lg font-medium transition ${
            fortuneData.status === "ไม่เปิดให้บริการ"
              ? "bg-gray-400 text-white"
              : "bg-purple-600 text-white hover:bg-purple-700"
          }`}
          onClick={() => setConfirmOpen(true)}
        >
          {fortuneData.status === "ไม่เปิดให้บริการ" ? "เปิดให้บริการ" : "ปิดให้บริการ"}
        </button>
      </div>

      {/* ✅ Popup ยืนยันเปิด/ปิด */}
      <ConfirmPopup
        isOpen={isConfirmOpen}
        onClose={() => setConfirmOpen(false)}
        onConfirm={toggleStatus}
        message={`คุณแน่ใจหรือไม่ที่จะ ${fortuneData.status === "ไม่เปิดให้บริการ" ? "เปิดให้บริการ" : "ปิดให้บริการ"}?`}
      />

      {/* ❌ Popup แจ้งเตือนให้ปิดของเก่าก่อน */}
      <ConfirmPopup
        isOpen={isConflictOpen}
        onClose={() => setConflictOpen(false)}
        message={`มีบริการที่เปิดอยู่แล้ว กรุณาปิดบริการ ID: ${currentOpenId} ก่อน`}
      />
    </Layout>
  );
};

export default ContentFortuneNow;
