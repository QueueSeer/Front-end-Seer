import React, { useState } from "react";
import Layout from "../Layout";
import BackButton from "../../../components/Button/BackButton";
import ImageUploader from "../../../components/Card/ImageUploader";
import QuestionCountDropdown from "../../../components/Dropdown/QuestionCountDropdown";

const CreateFortuneNow = () => {
  const [questionCount, setQuestionCount] = useState(null);
  const [price, setPrice] = useState(""); // เก็บค่าราคา

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

      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        รายละเอียดการดูดวงทันที
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2">
          <textarea
            className="w-full h-[250px] lg:h-full border border-gray-300 resize-none rounded-lg pt-4 px-6 text-[18px] text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="เขียนรายละเอียด"
          />
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

export default CreateFortuneNow;
