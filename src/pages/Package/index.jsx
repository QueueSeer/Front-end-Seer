import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./OverviewPackage/Layout";
import ChannelSelectDropdown from "../../components/Dropdown/ChannelSelectDropdown";
import QuestionCountDropdown from "../../components/Dropdown/QuestionCountDropdown";
import ShowExampleCard from "../../components/Card/ShowExampleCard";
import { fetchUserData } from "../../Data/Profile/ProfileApi";
import { createPackagedraft } from "../../Data/Package/PackageApi";

// Helper function for input validation
const validateInput = (value, fieldName) => {
  if (
    value === "0" ||
    value.includes(".") ||
    /^[^1-9]/.test(value) ||
    /[^0-9]/.test(value)
  ) {
    return `${fieldName} ต้องเป็นจำนวนเต็มที่มากกว่า 0 และไม่มีสัญลักษณ์`;
  }
  return "";
};

const Package = () => {
  const navigate = useNavigate();

  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");
  const [time, setTime] = useState("");
  const [timeError, setTimeError] = useState("");
  const [packageName, setPackageName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [primarySkill, setPrimarySkill] = useState("");
  const [questionCount, setQuestionCount] = useState(null);
  const [channel, setChannel] = useState("chat");
  const [details, setDetails] = useState("");
  const [savedData, setSavedData] = useState(null);
  const [fortuneTeller, setFortuneTeller] = useState("กำลังโหลด...");
  const [fortuneTellerImage, setFortuneTellerImage] = useState("");

  // Fetch fortune teller data on mount
  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setFortuneTeller(data.display_name || "ไม่พบชื่อ");
        setFortuneTellerImage(
          data.image || "https://via.placeholder.com/300x300"
        );
        setPrimarySkill(data.primary_skill || "ไพ่ยิปซี");
      } catch (error) {
        console.error("Error fetching fortune teller data:", error);
      }
    };

    getUserData();
  }, []);

  const handleInputChange = (e, setValue, setError, fieldName) => {
    const value = e.target.value;
    const error = validateInput(value, fieldName);
    setError(error);
    if (!error || value === "") setValue(value);
  };

  const handleTimeChange = (e) => {
    const value = e.target.value;
    const error = validateTime(value);
    setTimeError(error);

    if (!error) {
      setTime(value); // เก็บค่าเวลาที่กรอก
    }
  };

  const validateTime = (value) => {
    if (isNaN(value) || value <= 0) {
      return "กรุณากรอกเวลาที่มากกว่า 0 นาที";
    }
    return "";
  };

  // Convert time to timedelta (in minutes)
  const convertTimeToTimedelta = (time) => {
    const minutes = parseInt(time, 10);
    const hours = Math.floor(minutes / 60); // แปลงเป็นชั่วโมง
    const remainingMinutes = minutes % 60; // คำนวณนาทีที่เหลือ

    // คืนค่าในรูปแบบ timedelta string (ISO 8601)
    return `P0DT${hours}H${remainingMinutes}M`;
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const error = validateInput(value, "ราคา");
    setPriceError(error);

    // ตรวจสอบว่าเป็นตัวเลข และเปลี่ยนเป็นเลขจำนวนเต็ม
    if (!error || value === "") {
      const numericValue = Number(value);
      if (!isNaN(numericValue) && numericValue > 0) {
        setPrice(value); // เก็บค่าเป็น string ที่แปลงเป็นตัวเลขแล้ว
      } else {
        setPriceError("ราคา ต้องเป็นจำนวนที่มากกว่า 0");
      }
    }
  };

  // Categories array
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

  const handleChannelChange = (selectedChannel) => setChannel(selectedChannel);
  const handleCategoryClick = (category) => setSelectedCategory(category);
  const handleDetailsChange = (e) => setDetails(e.target.value);

  const handleSave = async () => {
    const formattedTime = convertTimeToTimedelta(time); // แปลงเวลาที่กรอกเป็น timedelta

    const newPackage = {
      name: packageName,
      price: parseInt(price, 10),
      duration: formattedTime,
      description: details,
      question_limit: questionCount,
      foretell_channel: channel,
      reading_type: primarySkill,
      category: selectedCategory,
      required_data: ["name"],
    };

    try {
      const response = await createPackagedraft(newPackage);
      setSavedData(response);
      navigate("/package/drafted");
    } catch (error) {
      console.error("Error saving package draft:", error);
    }
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 pr-8 pl-2 mr-4 space-y-6">
          {/* Package Name */}
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

          {/* Time Input */}
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
            {timeError && (
              <p className="text-red-500 text-sm mt-1">{timeError}</p>
            )}
          </div>

          {/* Price Input */}
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
            {priceError && (
              <p className="text-red-500 text-sm mt-1">{priceError}</p>
            )}
          </div>

          {/* Channel Selector */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              รูปแบบดูดวง
            </label>
            <ChannelSelectDropdown onChannelChange={setChannel} />
          </div>

          {/* Category Selection */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
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

          {/* Question Count */}
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              จำนวนคำถาม
            </label>
            <QuestionCountDropdown onQuestionCountChange={setQuestionCount} />
          </div>
        </div>

        {/* Example Card */}
        <div className="w-[330px] md:w-1/3 pt-6 flex items-start justify-center mx-auto">
          <ShowExampleCard
            title={packageName || "ความรักอยู่ที่ไหน"}
            fortuneTeller={fortuneTeller}
            imageProfile={fortuneTellerImage}
            Category={primarySkill}
            rating={5}
            reviews={1300}
            price={parseInt(price, 10) || 99}
            callTime={`${time || "15"} นาที`}
            packageType={channel}
            status="draft"
          />
        </div>
      </div>

      {/* Package Details */}
      <div className="pl-2 my-4">
        <label className="block text-gray-700 font-medium mb-2">
          รายละเอียดแพ็กเกจ
        </label>
        <textarea
          className="w-full h-[225px] pt-4 px-6 border border-zinc-300 rounded-md resize-none"
          value={details}
          onChange={handleDetailsChange}
        />
      </div>

      {/* Display Saved Data */}
      {savedData && (
        <div className="mt-6 p-4 bg-gray-100 rounded-md">
          <h4 className="font-bold">ข้อมูลที่บันทึก:</h4>
          <pre className="text-sm">{JSON.stringify(savedData, null, 2)}</pre>
        </div>
      )}

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          className="bg-primary text-white py-2 px-14 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-secondary/80"
          onClick={handleSave}
        >
          บันทึก
        </button>
      </div>
    </Layout>
  );
};

export default Package;
