import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./OverviewPackage/Layout";
import ChannelSelectDropdown from "../../components/Dropdown/ChannelSelectDropdown";
import QuestionCountDropdown from "../../components/Dropdown/QuestionCountDropdown";
import ShowExampleCard from "../../components/Card/ShowExampleCard";
import { fetchUserData } from "../../Data/Profile/ProfileApi";
import { createPackagedraft } from "../../Data/Package/PackageApi";
import { postImagepackage } from "../../Data/Image/ImagesApi";

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
  const [fortuneTeller, setFortuneTeller] = useState("กำลังโหลด...");
  const [fortuneTellerImage, setFortuneTellerImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);

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

  
  const handleTimeChange = (e) => {
    const value = e.target.value;
    const error = validateTime(value);
    setTimeError(error);
    if (!error) setTime(value); // Set the value if there's no error
  };

  const validateTime = (value) => {
    if (isNaN(value) || value <= 0 || value.includes(".")) {
      return "กรุณากรอกเวลาที่มากกว่า 0 นาที";
    }
    return "";
  };

  const convertTimeToTimedelta = (time) => {
    return parseInt(time, 10); // Convert string to integer
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const error = validateInput(value, "ราคา");
    setPriceError(error);

    if (!error || value === "") {
      const numericValue = Number(value);
      if (numericValue > 0 && Number.isInteger(numericValue)) {
        setPrice(value);
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

  const handleImageUpload = (file) => {
    setUploadedImage(file);
  };
  const handleSave = async () => {
    setIsLoading(true); // เปิดหน้าโหลด
  
    // ปิดการเลื่อนหน้าจอขณะบันทึก
    document.body.style.overflow = "hidden";
    document.documentElement.style.overflow = "hidden"; // ปิดการเลื่อนใน html
  
    const formattedTime = convertTimeToTimedelta(time); // Convert time input to an integer
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
  
    console.log("ข้อมูลที่กรอก:", newPackage);
  
    try {
      const response = await createPackagedraft(newPackage);
  
      if (uploadedImage) {
        const responseImage = await postImagepackage(
          uploadedImage,
          response?.id
        ); // ส่งรูปภาพไปบันทึก
        console.log("บันทึกรูปภาพสำเร็จ:", responseImage);
      }
  
      console.log("ID ของแพ็คเกจที่บันทึก:", response?.id);
      setIsLoading(false); // ซ่อนหน้าโหลด
      navigate("/package/drafted");
    } catch (error) {
      console.error("Error saving package draft:", error);
      setIsLoading(false); // ซ่อนหน้าโหลดเมื่อเกิดข้อผิดพลาด
    } finally {
      // เปิดการเลื่อนหน้าจอเมื่อบันทึกเสร็จ
      document.body.style.overflow = "auto";
      document.documentElement.style.overflow = "auto"; // เปิดการเลื่อนใน html
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
            onImageUpload={handleImageUpload}
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

      {/* Save Button */}
      <div className="flex justify-end">
        <button
          className="bg-primary text-white py-2 px-14 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-secondary/80"
          onClick={handleSave}
        >
          บันทึก
        </button>
      </div>

      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-gray-900 z-50">
          <div className="text-white text-lg font-semibold">
            กำลังบันทึกข้อมูล...
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Package;
