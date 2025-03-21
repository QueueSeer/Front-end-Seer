// src/pages/DetailPackage.js
import React, { useState, useEffect } from "react";
import { useParams, useNavigate } from "react-router-dom";
import LayoutDetails from "../OverviewPackage/LayoutDetails";
import PackageNameInput from "../PackageFrom/PackageNameInput";
import TimeInput from "../PackageFrom/TimeInput";
import PriceInput from "../PackageFrom/PriceInput";
import CategorySelector from "../PackageFrom/CategorySelector";
import QuestionCountSelector from "../PackageFrom/QuestionCountSelector";
import PackageDetailsTextarea from "../PackageFrom/PackageDetailsTextarea";
import SaveButton from "../PackageFrom/SaveButton";
import ShowExampleCard from "../../../components/Card/ShowExampleCard";
import {
  fetchPackageDetailsData,
  updatePackageDetailsData,
} from "../../../Data/Package/PackageApi";
import { postImagepackage } from "../../../Data/Image/ImagesApi";
import { fetchUserData } from "../../../Data/Profile/ProfileApi";
import ChannelSelectDropdown from "../../../components/Dropdown/ChannelSelectDropdown";

const DetailPackage = () => {
  const navigate = useNavigate();
  const { id } = useParams();

  const [price, setPrice] = useState(0);
  const [time, setTime] = useState(0);
  const [packageName, setPackageName] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [primarySkill, setPrimarySkill] = useState("");
  const [questionCount, setQuestionCount] = useState(null);
  const [channel, setChannel] = useState("chat");
  const [details, setDetails] = useState("");
  const [imagespackage, setImagespackage] = useState("");
  const [fortuneTeller, setFortuneTeller] = useState("กำลังโหลด...");
  const [fortuneTellerImage, setFortuneTellerImage] = useState("");
  const [uploadedImage, setUploadedImage] = useState("");
  const [isLoading, setIsLoading] = useState(false);
  const [status, setStatus] = useState("");

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

  useEffect(() => {
    const fetchPackageDetails = async () => {
      try {
        const data = await fetchPackageDetailsData(id); // Fetch data based on package ID
        if (data) {
          setPackageName(data.name);
          setPrice(data.price ? parseInt(data.price, 10) : 0);
          setTime(data.duration ? data.duration / 60 : 0);
          setDetails(data.description);
          setQuestionCount(data.question_limit);
          setChannel(data.foretell_channel);
          setImagespackage(data.image);
          setSelectedCategory(data.category);
          setPrimarySkill(data.reading_type);
          setStatus(data.status); // กำหนดสถานะของ package
        }
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackageDetails();
  }, [id]);

  const handleTimeChange = (e) => {
    const value = e.target.value;
    const parsedValue = parseInt(value, 10);

    if (value === "" || parsedValue > 0) {
      setTime(parsedValue); // แก้ไขให้สามารถกรอกตัวเลขที่ถูกต้องได้
    }
  };

  const handlePriceChange = (e) => {
    const value = e.target.value;
    const parsedValue = Number(value); // ใช้ Number แทน parseInt

    if (value === "" || parsedValue >= 0) {
      setPrice(parsedValue || 0); // ถ้า parsedValue เป็น NaN หรือค่าว่าง ให้ใช้ 0
    }
  };

  const handleImageUpload = (file) => {
    setUploadedImage(file); // Update the uploaded image state
  };

  const handleSave = async () => {
    setIsLoading(true); // Show loading state

    const newPackage = {
      name: packageName,
      price: price.toString(), // Convert price to string
      duration: `PT${parseInt(time, 10)}M`, // Convert to ISO 8601 format
      description: details,
      question_limit: parseInt(questionCount, 10) || 0, // Ensure questionCount is a valid number, fallback to 0 if invalid
      foretell_channel: channel,
      reading_type: primarySkill,
      category: selectedCategory,
      required_data: ["name"],
    };

    try {
      const response = await updatePackageDetailsData(id, newPackage);

      if (uploadedImage) {
        const responseImage = await postImagepackage(
          uploadedImage,
          response?.id
        );
        console.log("บันทึกรูปภาพสำเร็จ:", responseImage);
      }

      navigate("/package/drafted");
    } catch (error) {
      console.error("Error saving package:", error);
      setIsLoading(false);
    }
  };

  return (
    <LayoutDetails>
      <div className="flex flex-col md:flex-row gap-6">
        <div className="flex-1 pr-8 pl-2 mr-4 space-y-6">
          <PackageNameInput
            packageName={packageName}
            setPackageName={setPackageName}
          />
          <TimeInput time={time} handleTimeChange={handleTimeChange} />
          <PriceInput price={price} handlePriceChange={handlePriceChange} />
          <div className="mb-4">
            <label className="block text-gray-700 font-medium mb-2">
              รูปแบบดูดวง
            </label>
            <ChannelSelectDropdown
              selectedChannel={channel}
              onChannelChange={setChannel}
            />
          </div>
          <CategorySelector
            selectedCategory={selectedCategory}
            setSelectedCategory={setSelectedCategory}
          />
          <QuestionCountSelector setQuestionCount={setQuestionCount} />
        </div>

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
            defaultImage={imagespackage}
          />
        </div>
      </div>

      <PackageDetailsTextarea details={details} setDetails={setDetails} />

      <SaveButton
        status={status}
        handleSave={handleSave}
        isLoading={isLoading}
      />

      {isLoading && (
        <div className="fixed inset-0 flex justify-center items-center bg-opacity-50 bg-gray-900 z-50">
          <div className="text-white text-lg font-semibold">
            กำลังบันทึกข้อมูล...
          </div>
        </div>
      )}
    </LayoutDetails>
  );
};

export default DetailPackage;
