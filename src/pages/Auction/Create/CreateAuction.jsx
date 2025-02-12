import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { addDays } from "date-fns"; // ฟังก์ชันสำหรับการคำนวณวันที่
import "react-date-range/dist/styles.css"; // สไตล์ของ React Date Range
import "react-date-range/dist/theme/default.css"; // ธีมของ React Date Rang
import { th } from "date-fns/locale"; // นำเข้า locale ภาษาไทย

import Layout from "../Layout";
import BackButton from "../../../components/Button/BackButton";
import ImageUploader from "../../../components/Card/ImageUploader";
import QuestionCountDropdown from "../../../components/Dropdown/QuestionCountDropdown";
import DateRangePicker from "./DateRangePicker";

const CreateAuction = () => {
  const [questionCount, setQuestionCount] = useState(null);
  const [price, setPrice] = useState(""); // เก็บค่าราคา
  const [startDate, setStartDate] = useState("");
  const [endDate, setEndDate] = useState("");

  const [state, setState] = useState([
    {
      startDate: new Date(),
      endDate: addDays(new Date(), 7),
      key: "selection",
    },
  ]);

  const handleSelect = (ranges) => {
    setState([ranges.selection]);
  };
  const handleStartDateChange = (e) => {
    setStartDate(e.target.value);
  };

  const handleEndDateChange = (e) => {
    setEndDate(e.target.value);
  };

  const handleQuestionCountChange = (count) => {
    setQuestionCount(count);
  };

  const handleImageUpload = (file) => {
    console.log("อัพโหลดรูป:", file);
  };

  const handlePriceChange = (event) => {
    let value = event.target.value;

    // ตรวจสอบให้เป็นตัวเลขเท่านั้น (รองรับทศนิยม)
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
    }
  };

  return (
    <Layout>
      <div className="pt-6 flex items-start pb-6">
        <BackButton />
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-3">ชื่อแพคเกจ</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2">
          <input
            id="package-name"
            type="text"
            placeholder="ความรักอยู่ที่ไหน"
            className="w-full mb-4 px-4 py-3 border border-gray-300 rounded-md text-[16px] text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none"
          />
          <h2 className="text-lg font-semibold text-gray-900 mb-3">
            คำอธิบายสั้น ๆ
          </h2>
          <textarea
            className="w-full h-[100px] lg:h-[120px] border border-gray-300 resize-none rounded-lg pt-3 mb-4 px-4 text-[16px] text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="เขียนรายละเอียด"
          />
          {/* วันที่เปิดประมูล */}
          <div className="flex flex-col">
            <DateRangePicker />
            {/* เวลาที่เปิดประมูล */}
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">
                เวลาที่เปิดประมูล
              </label>
              <div className="relative">
                <input
                  type="time"
                  className="w-full p-3 border rounded-lg text-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>

            {/* เวลาที่ปิดประมูล */}
            <div className="flex flex-col">
              <label className="text-gray-600 text-sm mb-1">
                เวลาที่ปิดประมูล
              </label>
              <div className="relative">
                <input
                  type="time"
                  className="w-full p-3 border rounded-lg text-gray-500 focus:ring-2 focus:ring-purple-500 focus:outline-none"
                />
              </div>
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <ImageUploader onImageUpload={handleImageUpload} />

          <div>
            <label className="block text-gray-700 font-medium mb-1">
              จำนวนคำถาม
            </label>
            <div className="w-full">
              <QuestionCountDropdown onQuestionCountChange={setQuestionCount} />
            </div>
          </div>

          {/* ช่องกรอกราคา */}
          <div>
            <label className="block text-gray-700 font-medium mb-1">ราคา</label>
            <div className="relative flex items-center border rounded-md border-gray-300 shadow-sm px-4 py-3 focus-within:ring-2 focus-within:ring-primary focus:outline-none">
              {/* ไอคอนราคา */}
              <span className="text-gray-500 mr-2">฿</span>

              {/* ช่องกรอกราคา */}
              <input
                type="text"
                className="w-full pl-2 text-gray-700 outline-none"
                value={price}
                onChange={handlePriceChange}
                placeholder="ระบุราคา"
              />
            </div>
          </div>
        </div>
      </div>

      <div className="mt-6 flex justify-end">
        <button className="bg-purple-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-purple-700 transition">
          เปิดดูดวงทันที
        </button>
      </div>
    </Layout>
  );
};

export default CreateAuction;
