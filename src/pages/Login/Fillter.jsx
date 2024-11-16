import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ใช้ useNavigate สำหรับการนำทาง
import Images from "../../assets";
import Fillterbar from "../../components/fillterbar";

export default function Fillter() {
  const [selectedTags, setSelectedTags] = useState([]);
  const [step, setStep] = useState(1);
  const navigate = useNavigate(); // ใช้ hook นี้สำหรับการนำทาง

  const tags = [
    "ไพ่ยิปซี",
    "โหราศาสตร์ไทย",
    "ศาสตร์ตัวเลข",
    "ไพ่ออราเคิล",
    "ไพ่พรหมญาณ",
    "ศาสตร์รูนส์",
    "ลายมือ",
    "โหราศาสตร์สากล",
    "โหราศาสตร์จีน",
    "โหงวเฮ้ง",
  ];

  const toggleTag = (tag) => {
    setSelectedTags((prev) =>
      prev.includes(tag)
        ? prev.filter((t) => t !== tag)
        : [...prev, tag]
    );
  };

  const handleNext = () => {
    if (step === 1) {
      setStep(2);
      setSelectedTags([]); // รีเซ็ตแท็กเมื่อไปขั้นตอนถัดไป
    }
  };

  return (
    <div>
      <Fillterbar /> {/* เรียกใช้ FillterNavbar */}
      <div className="flex h-screen font-sans lg:flex-row flex-col">
        {/* ด้านซ้าย: พื้นหลังเบลอ */}
        <div className="w-full lg:w-1/2 relative flex flex-col bg-gray-50 lg:bg-gray-50 p-8">
          {/* พื้นหลังเบลอ */}
          <div className="absolute top-5 left-10 rounded-full w-96 h-96 bg-yellow-100 opacity-70 blur-3xl hidden lg:block"></div>
          <div className="absolute top-1/2 right-[25%] transform -translate-y-1/2 rounded-full w-96 h-96 bg-purple-300 opacity-70 blur-3xl hidden lg:block"></div>
          <div className="absolute top-1/2 right-[1%] transform -translate-y-1/2 rounded-full w-96 h-96 bg-purple-200 opacity-70 blur-3xl hidden lg:block"></div>

          {/* ภาพ marble */}
          <img
            src={Images.marble}
            alt="marble"
            className="w-36 h-36 mx-auto mt-1 lg:absolute lg:top-[calc(50%-60px)] lg:right-[calc(30px)] lg:left-30 lg:transform lg:-translate-y-1/2 lg:translate-x-[calc(10px)] lg:w-[28rem] lg:h-[28rem] lg:mx-0"
          />

          {/* ข้อความ */}
          <div className="relative z-10 ml-10 mt-10 hidden lg:block">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">
              เลือกเเท็กสำหรับคุณ
            </h2>
            <p className="text-lg lg:text-xl text-gray-700 mt-4">
              รับการเเนะนำให้เหมาะกับคุณ{" "}
            </p>
          </div>
        </div>

        {/* ด้านขวา */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gray-50 p-1 lg:p-8 -mt-10 lg:mt-0 mb-20">
          <div className="w-full max-w-lg p-6 md:p-10 bg-white shadow-md rounded-lg">
            {step === 1 ? (
              <>
                <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center mt-4 sm:mt-8 md:mt-4 lg:mt-0">
                  เลือกศาสตร์ดูดวงที่สนใจของคุณ
                </h2>
                <p className="text-gray-700 text-center mt-2 mb-6 sm:mt-8 md:mt-4 lg:mt-2">
                  เลือกศาสตร์หมอดูที่คุณเชี่ยวชาญ
                </p>
                {/* แท็ก */}
                <div className="flex flex-wrap gap-4 justify-center">
                  {tags.map((tag, index) => (
                    <button
                      key={index}
                      onClick={() => toggleTag(tag)}
                      className={`px-4 py-1.5 ${
                        selectedTags.includes(tag)
                          ? "bg-purple-500 text-white"
                          : "bg-white text-gray-700"
                      } border ${
                        selectedTags.includes(tag)
                          ? "border-purple-500"
                          : "border-gray-300"
                      } rounded-full hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                    >
                      {tag}
                    </button>
                  ))}
                </div>
              </>
            ) : (
              <>
               <h2 className="text-2xl font-bold text-gray-900 mb-4 text-center mt-4 sm:mt-8 md:mt-4 lg:mt-0">
                เลือกเรื่องที่สนใจของคุณ
                </h2>
                <p className="text-gray-700 text-center mt-2 mb-6 sm:mt-8 md:mt-4 lg:mt-2">
                เลือกเรื่องดูดวงที่เกี่ยวข้องกับการทำนายของคุณ
                </p>
                <div className="flex flex-wrap gap-4 justify-center">
                  {[
                    "ความรัก",
                    "การงาน",
                    "การเงิน",
                    "สุขภาพ",
                    "ภาพรวม",
                    "ดวงรายเดือน",
                    "ดวงรายปี",
                    "เนื้อคู่",
                    "ค้นหาตัวตน",
                    "การเรียน",
                    "ย้ายงาน",
                    "อุปสรรค",
                    "อื่นๆ",
                  ].map((topic, index) => (
                    <button
                      key={index}
                      onClick={() => toggleTag(topic)}
                      className={`px-4 py-1.5 ${
                        selectedTags.includes(topic)
                          ? "bg-purple-500 text-white"
                          : "bg-white text-gray-700"
                      } border ${
                        selectedTags.includes(topic)
                          ? "border-purple-500"
                          : "border-gray-300"
                      } rounded-full hover:bg-purple-100 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2`}
                    >
                      {topic}
                    </button>
                  ))}
                </div>
              </>
            )}
            {/* ปุ่มย้อนกลับ และถัดไป */}
            <div className="flex justify-end gap-4 mt-8">
              <button
                className="px-6 py-2 bg-white text-gray-700 border border-[#65558F] rounded-lg hover:bg-gray-100"
                onClick={() => {
                  if (step === 1) {
                    navigate("/login"); // นำทางไปยังหน้า Login
                  } else {
                    setStep(1);
                  }
                }}
              >
                ย้อนกลับ
              </button>
              <button
                className="px-6 py-2 bg-[#65558F] text-white rounded-lg hover:bg-[#4d4170]"
                onClick={handleNext}
              >
                ถัดไป
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
