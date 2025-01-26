import React from "react";
import Layout from "../Layout";
import BackButton from "../../../components/Button/BackButton";
import ImageUploader from "../../../components/Card/ImageUploader";

const CreateFortuneNow = () => {
  const handleImageUpload = (file) => {
    console.log("อัพโหลดรูป:", file);
  };
  return (
    <Layout>
      <div className="pt-6 flex items-start pb-6">
        <BackButton />
      </div>
      {/* ส่วนหัวข้อ */}
      <h2 className="text-lg font-semibold text-gray-900 mb-3">
        รายละเอียดการดูดวงทันที
      </h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        {/* ช่องเขียนรายละเอียด */}
        <div className="lg:col-span-2">
          <textarea
            className="w-full h-full border border-gray-300 resize-none rounded-lg pt-4 px-6 text-[18px] text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none"
            placeholder="เขียนรายละเอียด"
          />
        </div>

        {/* ส่วนขวา (รูป + ราคาต่างๆ) */}
        <div className="flex flex-col space-y-4">
          {/* ช่องอัพโหลดรูป */}
          <ImageUploader onImageUpload={handleImageUpload} />


          {/* ช่องกรอกราคา */}
          <div>
            <label className="block text-gray-700 mb-1">จำนวนคำถาม</label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 pl-3 pr-10 text-gray-700"
                value="49"
              />
              <span className="absolute inset-y-0 right-3 flex items-center">
                <img
                  src="/path/to/fortune-icon.png"
                  alt="icon"
                  className="w-5 h-5"
                />
              </span>
            </div>
          </div>

          <div>
            <label className="block text-gray-700 mb-1">ราคา</label>
            <div className="relative">
              <input
                type="text"
                className="w-full border border-gray-300 rounded-lg p-2 pl-3 pr-10 text-gray-700"
                value="49"
              />
              <span className="absolute inset-y-0 right-3 flex items-center">
                <img
                  src="/path/to/fortune-icon.png"
                  alt="icon"
                  className="w-5 h-5"
                />
              </span>
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

export default CreateFortuneNow;
