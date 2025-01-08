import React, { useState } from "react";
import Layout from "./OverviewPackage/Layout";
import QuestionCountDropdown from "../../components/Dropdown/QuestionCountDropdown";
import ChannelSelectDropdown from "../../components/Dropdown/ChannelSelectDropdown";

const Package = () => {
  const [price, setPrice] = useState(""); // เก็บค่าราคา
  const [priceError, setPriceError] = useState(""); // ข้อความแจ้งเตือนสำหรับราคา

  const [time, setTime] = useState(""); // เก็บค่าเวลาที่ใช้
  const [timeError, setTimeError] = useState(""); // ข้อความแจ้งเตือนสำหรับเวลา

  const [packageName, setPackageName] = useState(""); // เก็บชื่อแพคเกจ
  const [selectedCategory, setSelectedCategory] = useState("");
  const [questionCount, setQuestionCount] = useState(null);
  const [channel, setChannel] = useState("chat");
  const [details, setDetails] = useState(""); // เก็บรายละเอียดแพคเกจ

  const [savedData, setSavedData] = useState(null); // เก็บข้อมูลที่บันทึกแล้ว
  const handleInputChange = (e, setValue, setError, fieldName) => {
    let value = e.target.value;

    // ตรวจสอบค่าที่ไม่อนุญาต
    if (
      value === "0" || // ไม่อนุญาตค่า 0
      value.includes(".") || // ไม่อนุญาตทศนิยม
      /^[^1-9]/.test(value) || // ไม่อนุญาตรูปแบบที่ขึ้นต้นด้วยตัวอักษรหรือ 0
      /[^0-9]/.test(value) // ไม่อนุญาตอักขระที่ไม่ใช่ตัวเลข
    ) {
      setError(`${fieldName} ต้องเป็นจำนวนเต็มที่มากกว่า 0 และไม่มีสัญลักษณ์`);
    } else {
      setError(""); // ล้างข้อความแจ้งเตือนเมื่อค่าถูกต้อง
    }

    // อัปเดตค่าเฉพาะเมื่อเป็นจำนวนเต็มที่ถูกต้อง
    if (/^[1-9][0-9]*$/.test(value) || value === "") {
      setValue(value);
    }
  };

  const handleTimeChange = (e) => {
    handleInputChange(e, setTime, setTimeError, "เวลาที่ใช้");
  };

  const handlePriceChange = (e) => {
    handleInputChange(e, setPrice, setPriceError, "ราคา");
  };

  const categories = [
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
    "อื่นๆ",
  ];

  const handleQuestionCountChange = (count) => {
    setQuestionCount(count); // เก็บค่าที่เลือกจาก Dropdown
  };

  const handleChannelChange = (selectedChannel) => {
    setChannel(selectedChannel); // เก็บค่าช่องทางที่เลือก
  };

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleDetailsChange = (e) => {
    setDetails(e.target.value); // อัปเดตค่ารายละเอียด
  };

  const handleSave = () => {
    // เก็บข้อมูลทั้งหมดใน state savedData
    setSavedData({
      packageName,
      time,
      price,
      channel,
      selectedCategory,
      questionCount,
      details,
    });
  };

  return (
    <Layout>
      <div className="pt-8 flex ">
        {/* Left Column */}
        <div className="flex-1 pr-8 pl-2 mr-4 space-y-6">
          <div className="mb-4">
            <label
              htmlFor="package-name"
              className="block text-gray-700 font-medium mb-2"
            >
              ชื่อแพคเกจ
            </label>
            <input
              id="package-name"
              type="text"
              placeholder="ความรักอยู่ที่ไหน"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-purple-200 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-gray-700 font-medium mb-2"
            >
              เวลาที่ใช้ (นาที)
            </label>
            <input
              id="time"
              type="number"
              placeholder="15"
              value={time}
              onChange={handleTimeChange}
              className={`w-full px-4 py-3 border rounded-md focus:ring focus:ring-purple-200 focus:outline-none ${
                timeError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {/* แสดงข้อความแจ้งเตือน */}
            {timeError && (
              <p className="text-red-500 text-sm mt-1">{timeError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-medium mb-2"
            >
              ราคา (Coin)
            </label>
            <input
              id="price"
              type="number"
              placeholder="99"
              value={price}
              onChange={handlePriceChange}
              className={`w-full px-4 py-3 border rounded-md focus:ring focus:ring-purple-200 focus:outline-none ${
                priceError ? "border-red-500" : "border-gray-300"
              }`}
            />
            {/* แสดงข้อความแจ้งเตือน */}
            {priceError && (
              <p className="text-red-500 text-sm mt-1">{priceError}</p>
            )}
          </div>
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-medium mb-2"
            >
              รูปแบบดูดวง
            </label>
            <ChannelSelectDropdown onChannelChange={setChannel} />
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-medium mb-2"
            >
              หมวดหมู่
            </label>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-full border ${
                    selectedCategory === category
                      ? "bg-purple-600 text-white"
                      : "bg-white text-gray-700 border-gray-300"
                  } transition-all duration-200`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-medium mb-2"
            >
              จำนวนคำถาม
            </label>
            <QuestionCountDropdown onQuestionCountChange={setQuestionCount} />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/3 p-6">
          <div className="mb-4">
            <img
              src="https://via.placeholder.com/300"
              alt="Tarot cards"
              className="w-full h-[200px] rounded-lg mb-4"
            />
            <span className="bg-purple-200 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
              ดูดวงไพ่ยิปซี
            </span>
          </div>
          <h3 className="text-gray-800 text-lg font-semibold mb-2">
            ความรักอยู่ที่ไหน
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            <span className="text-purple-700 font-medium">หมอดูแพรี่ 1</span>
          </p>
          <p className="text-yellow-500 text-sm mb-2">
            4.0 ★★★★★ <span className="text-gray-600">(935 reviews)</span>
          </p>
          <p className="text-purple-700 text-2xl font-bold mb-4">99 Coins</p>
          <div className="flex items-center text-gray-600 text-sm mb-4">
            <svg
              className="w-5 h-5 mr-1 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12h6m-6 0a6 6 0 110-12 6 6 0 010 12zm6 0H9m3-3v3m-3-3v3m3-3v3"
              />
            </svg>
            15 นาที
          </div>
        </div>
      </div>
      <div className="pl-2 my-4">
        <label htmlFor="type" className="block text-gray-700 font-medium mb-2">
          รายละเอียดแพ็กเกจ
        </label>
        <form className="text-[16px]">
          <textarea
            className="w-full h-[225px] pt-4 px-6 border border-zinc-300 rounded-md resize-none"
            value={details} // ผูกกับ state
            onChange={handleDetailsChange} // อัปเดตค่าตามที่พิมพ์
          />
        </form>
      </div>
      <div className="flex justify-end">
        <button
          className="bg-primary text-white py-2 px-14 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-secondary/80"
          onClick={handleSave}
        >
          บันทึก
        </button>
      </div>

      {/* แสดงข้อมูลที่บันทึก */}
      {savedData && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h4 className="font-bold">ข้อมูลที่บันทึก:</h4>
          <pre className="text-sm">{JSON.stringify(savedData, null, 2)}</pre>
        </div>
      )}
    </Layout>
  );
};

export default Package;
