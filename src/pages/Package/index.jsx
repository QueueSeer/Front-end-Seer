import React, { useState, useEffect , useMemo  } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "./OverviewPackage/Layout";
import ChannelSelectDropdown from "../../components/Dropdown/ChannelSelectDropdown";
import PackageContext from "./OverviewPackage/PackageContext";
import QuestionCountDropdown from "../../components/Dropdown/QuestionCountDropdown";
import ShowExampleCard from "../../components/Card/ShowExampleCard";
import { fetchUserData } from "../../Data/Profile/ProfileApi"; // ใช้ API ดึงข้อมูลหมอดู

const Package = () => {
  const navigate = useNavigate();
  const [price, setPrice] = useState("");
  const [priceError, setPriceError] = useState("");

  const [time, setTime] = useState("");
  const [timeError, setTimeError] = useState("");

  const [packageName, setPackageName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState(""); // ค่าเริ่มต้น
  const [primary_skill, setprimary_skill] = useState(""); // ค่าเริ่มต้น

  const [questionCount, setQuestionCount] = useState(null);
  const [channel, setChannel] = useState("chat");
  const [details, setDetails] = useState("");

  const [savedData, setSavedData] = useState(null);
  const [fortuneTeller, setFortuneTeller] = useState("กำลังโหลด...");
  const [fortuneTellerImage, setFortuneTellerImage] = useState("");


  const newId = useMemo(() => {
    return PackageContext.length > 0
      ? Math.max(...PackageContext.map((pkg) => pkg.id)) + 1
      : 1;
  }, [PackageContext]);


  useEffect(() => {
    // ดึงข้อมูลหมอดูจาก API
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setFortuneTeller(data.display_name || "ไม่พบชื่อ");
        setFortuneTellerImage(data.image || "https://via.placeholder.com/300x300");

        // ดึง Primary Skill (Category) จาก API
        setprimary_skill(data.primary_skill || "ไพ่ยิปซี");
      } catch (error) {
        console.error("Error fetching fortune teller data:", error);
      }
    };

    getUserData();
  }, []);

  const handleInputChange = (e, setValue, setError, fieldName) => {
    let value = e.target.value;

    if (value === "0" || value.includes(".") || /^[^1-9]/.test(value) || /[^0-9]/.test(value)) {
      setError(`${fieldName} ต้องเป็นจำนวนเต็มที่มากกว่า 0 และไม่มีสัญลักษณ์`);
    } else {
      setError("");
    }

    if (/^[1-9][0-9]*$/.test(value) || value === "") {
      setValue(value);
    }
  };

  const handleTimeChange = (e) => handleInputChange(e, setTime, setTimeError, "เวลาที่ใช้");
  const handlePriceChange = (e) => handleInputChange(e, setPrice, setPriceError, "ราคา");

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

  const handleSave = () => {
    const newPackage = {
      id: newId,
      status: "draft",
      title: packageName,
      fortuneTeller: fortuneTeller,
      rating: 5,
      reviews: 1300,
      price: price,
      callTime: `${time} นาที`,
      packageType: channel,
      category: primary_skill, // เพิ่มหมวดหมู่ที่เลือก
    };

    PackageContext.push(newPackage);
    setSavedData(newPackage);
    navigate("/package/drafted");
  };

  return (
    <Layout>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 pr-8 pl-2 mr-4 space-y-6">
          {/* Package Name */}
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

          {/* Time Input */}
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

          {/* Price Input */}
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

          {/* Channel Selector */}
          <div className="mb-4">
            <div className="block text-gray-700 font-medium mb-2">
              รูปแบบดูดวง
            </div>
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

        {/* Example Card */}
        <div className="w-1/3 pt-6 flex items-start justify-center">
          <ShowExampleCard
            title={packageName || "ความรักอยู่ที่ไหน"}
            fortuneTeller={fortuneTeller}
            imageProfile={fortuneTellerImage}
            Category={primary_skill} // ใช้ค่า primary_skill จาก API
            rating={5}
            reviews={1300}
            price={price || "99"}
            callTime={`${time || "15"} นาที`}
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
