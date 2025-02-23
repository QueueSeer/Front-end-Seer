import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./OverviewPackage/Layout";
import QuestionCountDropdown from "../../components/Dropdown/QuestionCountDropdown";
import ChannelSelectDropdown from "../../components/Dropdown/ChannelSelectDropdown";
import PackageContext from "./OverviewPackage/PackageContext";
import ShowExampleCard from "../../components/Card/ShowExampleCard";

const Package = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  const [time, setTime] = useState("");
  const [timeError, setTimeError] = useState("");

  const [packageName, setPackageName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [questionCount, setQuestionCount] = useState(null);
  const [channel, setChannel] = useState("chat");
  const [details, setDetails] = useState("");

  const [savedData, setSavedData] = useState(null);

  // Calculate new package ID based on the latest saved package
  const [newId, setNewId] = useState(0);

  useEffect(() => {
    // Get the last ID from PackageContext
    if (PackageContext.length > 0) {
      const lastId = Math.max(...PackageContext.map(pkg => pkg.id));
      setNewId(lastId + 1);
    }
  }, []);

  // Handle input changes and validate input
  const handleInputChange = (e, setValue, setError, fieldName) => {
    let value = e.target.value;

    // Validate values
    if (
      value === "0" || 
      value.includes(".") || 
      /^[^1-9]/.test(value) || 
      /[^0-9]/.test(value)
    ) {
      setError(`${fieldName} ต้องเป็นจำนวนเต็มที่มากกว่า 0 และไม่มีสัญลักษณ์`);
    } else {
      setError(""); // Clear error message when value is valid
    }

    if (/^[1-9][0-9]*$/.test(value) || value === "") {
      setValue(value);
    }
  };

  const handleTimeChange = (e) => handleInputChange(e, setTime, setTimeError, "เวลาที่ใช้");
  const handlePriceChange = (e) => handleInputChange(e, setPrice, setPriceError, "ราคา");

  const categories = [
    "ความรัก", "การงาน", "การเงิน", "สุขภาพ", "ภาพรวม", "ดวงรายเดือน", 
    "ดวงรายปี", "เนื้อคู่", "ค้นหาตัวตน", "การเรียน", "ย้ายงาน", "อื่นๆ"
  ];

  const handleChannelChange = (selectedChannel) => setChannel(selectedChannel);
  const handleCategoryClick = (category) => setSelectedCategory(category);
  const handleDetailsChange = (e) => setDetails(e.target.value);

  const handleSave = () => {
    const newPackage = {
      id: newId, 
      status: "draft",
      title: packageName,
      fortuneTeller: "หมอดูออม 1",
      rating: 5,
      reviews: 1300,
      price: price,
      callTime: `${time} นาที`,
      packageType: channel,
    };

    // Add the new package to PackageContext
    PackageContext.push(newPackage);

    // Update saved data for preview
    setSavedData(newPackage);

    // Navigate to the drafted packages page
    navigate("/package/drafted");
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 pr-8 pl-2 mr-4 space-y-6">
          {/* Package Name */}
          <div className="mb-4">
            <div className="block text-gray-700 font-medium mb-2">ชื่อแพคเกจ</div>
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
            <div className="block text-gray-700 font-medium mb-2">เวลาที่ใช้ (นาที)</div>
            <input
              id="time"
              type="number"
              placeholder="15"
              value={time}
              onChange={handleTimeChange}
              className={`w-full px-4 py-3 border rounded-md focus:ring focus:ring-purple-200 focus:outline-none ${timeError ? "border-red-500" : "border-gray-300"}`}
            />
            {timeError && <p className="text-red-500 text-sm mt-1">{timeError}</p>}
          </div>

          {/* Price Input */}
          <div className="mb-4">
            <div className="block text-gray-700 font-medium mb-2">ราคา (Coin)</div>
            <input
              id="price"
              type="number"
              placeholder="99"
              value={price}
              onChange={handlePriceChange}
              className={`w-full px-4 py-3 border rounded-md focus:ring focus:ring-purple-200 focus:outline-none ${priceError ? "border-red-500" : "border-gray-300"}`}
            />
            {priceError && <p className="text-red-500 text-sm mt-1">{priceError}</p>}
          </div>

          {/* Channel Selector */}
          <div className="mb-4">
            <div className="block text-gray-700 font-medium mb-2">รูปแบบดูดวง</div>
            <ChannelSelectDropdown onChannelChange={setChannel} />
          </div>

          {/* Category Selection */}
          <div className="mb-4">
            <div className="block text-gray-700 font-medium mb-2">หมวดหมู่</div>
            <div className="flex flex-wrap gap-2">
              {categories.map((category) => (
                <button
                  key={category}
                  onClick={() => handleCategoryClick(category)}
                  className={`px-4 py-2 rounded-full border ${selectedCategory === category ? "bg-purple-600 text-white" : "bg-white text-gray-700 border-gray-300"} transition-all duration-200`}
                >
                  {category}
                </button>
              ))}
            </div>
          </div>

          {/* Question Count */}
          <div className="mb-4">
            <div className="block text-gray-700 font-medium mb-2">จำนวนคำถาม</div>
            <QuestionCountDropdown onQuestionCountChange={setQuestionCount} />
          </div>
        </div>

        <div className="w-full md:w-1/3 p-6 flex items-start justify-center">
          <ShowExampleCard
            title={packageName}
            fortuneTeller="หมอดูออม 1"
            imageProfile="https://via.placeholder.com/300x300"
            Category="ไพ่ยิปซี"
            rating={5}
            reviews={1300}
            price={price}
            callTime={`${time} นาที`}
            packageType={channel}
            status="draft"
          />
        </div>
      </div>

      {/* Package Details */}
      <div className="pl-2 my-4">
        <div className="block text-gray-700 font-medium mb-2">รายละเอียดแพ็กเกจ</div>
        <form className="text-[16px]">
          <textarea
            className="w-full h-[225px] pt-4 px-6 border border-zinc-300 rounded-md resize-none"
            value={details}
            onChange={handleDetailsChange}
          />
        </form>
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

      {/* Display Saved Data */}
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
