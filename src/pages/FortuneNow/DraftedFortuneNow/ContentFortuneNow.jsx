import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import Layout from "../Layout";
import BackButton from "../../../components/Button/BackButton";
import FortuneData from "../../../data/fortuneData"; // นำเข้าข้อมูล

const ContentFortuneNow = () => {
  const { id } = useParams(); // รับ ID จาก URL
  const [fortuneData, setFortuneData] = useState(null);

  useEffect(() => {
    const selectedData = FortuneData.find(item => item.id === parseInt(id)) || {
      id,
      details: "ไม่มีข้อมูล",
      questionCount: 0,
      price: 0,
      image: "/images/default.jpg",
    };

    setFortuneData(selectedData);
  }, [id]);

  if (!fortuneData) return <p>กำลังโหลดข้อมูล...</p>;

  const details = fortuneData.details
    .split("\n")
    .map((detail) => detail.trim())
    .filter((detail) => detail.length > 0);

  return (
    <Layout>
      <div className="pt-6 flex items-start pb-6">
        <BackButton />
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        รายละเอียดการดูดวงทันที (ID: {id})
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ช่องแสดงรายละเอียด */}
        <div className="lg:col-span-2 border border-gray-300 rounded-lg p-4 bg-gray-50 text-gray-700">
          {details.map((detail, index) => (
          <p key={index} className="text-[16px] mb-2">
            {detail}
          </p>
        ))}
        </div>

        {/* ส่วนขวา (รูป + ราคา) */}
        <div className="flex flex-col space-y-4">
          {/* แสดงรูปภาพ */}
          <div className="w-full h-[200px] border border-gray-300 rounded-lg flex items-center justify-center bg-gray-100">
            <img src={fortuneData.image} alt="fortune" className="w-full h-full object-cover rounded-lg" />
          </div>

          {/* จำนวนคำถาม */}
          <div>
            <label className="block text-gray-700 mb-1">จำนวนคำถาม</label>
            <div className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-700">
              {fortuneData.questionCount}
            </div>
          </div>

          {/* ราคา */}
          <div>
            <label className="block text-gray-700 mb-1">ราคา</label>
            <div className="w-full border border-gray-300 rounded-lg p-2 bg-gray-50 text-gray-700">
              {fortuneData.price}
            </div>
          </div>
        </div>
      </div>

      {/* ปุ่มเปิดดูดวง */}
      <div className="mt-6 flex justify-end">
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition">
          เปิดดูดวงทันที
        </button>
      </div>
    </Layout>
  );
};

export default ContentFortuneNow;
