import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // เพิ่มการนำเข้า useNavigate
import Layout from "./OverviewPackage/Layout";
import QuestionCountDropdown from "../../components/Dropdown/QuestionCountDropdown";
import ChannelSelectDropdown from "../../components/Dropdown/ChannelSelectDropdown";
import PackageCard from "../../components/Card/PackageCard";
import PackageContext from "./OverviewPackage/PackageContext"; // Import the PackageContext data
import ImageUploader from "../../components/Card/ImageUploader";
import ShowExampleCard from "./DraftPackage/ShowexampleCard";

const Package = () => {
  const navigate = useNavigate(); // ใช้ useNavigate เพื่อใช้ navigate
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

  const [imageSrc, setImageSrc] = useState(""); // เก็บ URL ของรูป

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
    // หาค่า id ล่าสุดใน PackageContext
    const lastId =
      PackageContext.length > 0
        ? Math.max(...PackageContext.map((pkg) => pkg.id))
        : 0;
    const newId = lastId + 1; // เพิ่ม 1 จาก id ล่าสุด

    // เก็บข้อมูลทั้งหมดใน state savedData
    const newPackage = {
      id: newId, // เพิ่ม id ใหม่
      status: "draft", // Always set the status to "draft"
      title: packageName,
      fortuneTeller: "หมอดูออม 1", // Static value for now, you can change it if needed
      rating: 5, // Static value for now, you can change it if needed
      reviews: 1300, // Static value for now
      price: price,
      callTime: time + " นาที", // Combine time with "นาที"
      packageType: channel,
    };

    // Add the new package to the PackageContext
    PackageContext.push(newPackage); // You should ideally manage this with a state or context

    // Update saved data for preview
    setSavedData(newPackage);

    // Navigate to /package/drafted
    navigate("/package/drafted"); // ทำการนำทางไปหน้า /package/drafted
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-6">
        {/* Left Column */}
        <div className="flex-1 pr-8 pl-2 mr-4 space-y-6">
          {/* ชื่อแพคเกจ */}
          <div className="mb-4">
            <div className="block text-gray-700 font-medium mb-2">
              ชื่อแพคเกจ
            </div>
            <input
              id="package-name"
              type="text"
              placeholder="ความรักอยู่ที่ไหน"
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-purple-200 focus:outline-none"
            />
          </div>

          {/* เวลาที่ใช้ */}
          <div className="mb-4">
            <div className="block text-gray-700 font-medium mb-2">
              เวลาที่ใช้ (นาที)
            </div>
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

          {/* ราคา */}
          <div className="mb-4">
            <div className="block text-gray-700 font-medium mb-2">
              ราคา (Coin)
            </div>
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

          {/* รูปแบบดูดวง */}
          <div className="mb-4">
            <div className="block text-gray-700 font-medium mb-2">
              รูปแบบดูดวง
            </div>
            <ChannelSelectDropdown onChannelChange={setChannel} />
          </div>

          {/* หมวดหมู่ */}
          <div className="mb-4">
            <div className="block text-gray-700 font-medium mb-2">หมวดหมู่</div>
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

          {/* จำนวนคำถาม */}
          <div className="mb-4">
            <div className="block text-gray-700 font-medium mb-2">
              จำนวนคำถาม
            </div>
            <QuestionCountDropdown onQuestionCountChange={setQuestionCount} />
          </div>
        </div>

        {/* Right Column */}
        <div className="w-full md:w-1/3 p-6 flex items-start justify-center">

          <ShowExampleCard
            title={packageName} // แสดงชื่อแพ็กเกจที่กรอก
            fortuneTeller="หมอดูออม 1"
            imageProfile="https://via.placeholder.com/300x300"
            Category="ไพ่ยิปซี" // แสดงหมวดหมู่ที่เลือก
            rating={5}
            reviews={1300}
            price={price} // แสดงราคาที่กรอก
            callTime={time + " นาที"} // แสดงเวลาที่ใช้
            packageType={channel} // แสดงช่องทางที่เลือก
            status="draft" // สถานะ: "ร่างแล้ว"
          />
        </div>
      </div>

      {/* รายละเอียดแพ็กเกจ */}
      <div className="pl-2 my-4">
        <div className="block text-gray-700 font-medium mb-2">
          รายละเอียดแพ็กเกจ
        </div>
        <form className="text-[16px]">
          <textarea
            className="w-full h-[225px] pt-4 px-6 border border-zinc-300 rounded-md resize-none"
            value={details} // ผูกกับ state
            onChange={handleDetailsChange} // อัปเดตค่าตามที่พิมพ์
          />
        </form>
      </div>

      {/* บันทึกข้อมูล */}
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
