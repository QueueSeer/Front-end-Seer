import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Layout from "../Layout";
import BackButton from "../../../components/Button/BackButton";
import ImageUploader from "../../../components/Card/ImageUploader";
import DateRangePicker from "./DateRangePicker";
import TimeAuction from "./TimeAuction";
import TimeFortune from "./TimeFortune";
import ButtonComponent from "../../../components/Popup/profile/ButtonComponent";

const CreateAuction = () => {
  const [price, setPrice] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");

  const [isFormValid, setIsFormValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const [image, setImage] = useState(null);
  const [isImageValid, setIsImageValid] = useState(true);
  const [resetImage, setResetImage] = useState(false);

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

  const handleCategoryClick = (category) => {
    setSelectedCategory(category);
  };

  const handleImageUpload = (file) => {
    setImage(file);
    setIsImageValid(true);
  };

  const handlePriceChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setPrice(value);
      setIsPriceValid(true);
    } else {
      setIsPriceValid(false);
    }
  };

  const handleCancel = () => {
    setPackageName("");
    setDescription("");
    setPrice("");
    setSelectedCategory("");
    setDetails("");
    setImage(null);
    setIsFormValid(true);
    setIsImageValid(true);
    setIsPriceValid(true);
    setResetImage(true);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  useEffect(() => {
    if (resetImage) {
      setImage(null);
      setResetImage(false);
    }
  }, [resetImage]);

  const handleSubmit = () => {
    if (
      !packageName ||
      !description ||
      !selectedCategory ||
      !price ||
      !details ||
      !image
    ) {
      setIsFormValid(false);
      if (!price) setIsPriceValid(false);
      if (!image) setIsImageValid(false);
      return;
    }

    setIsFormValid(true);
    setIsPriceValid(true);
    setIsImageValid(true);

    console.log("ข้อมูลที่กรอกครบ:", {
      packageName,
      description,
      selectedCategory,
      price,
      details,
      image,
    });
    alert("บันทึกคำตอบเรียบร้อย!");
  };

  return (
    <Layout>
      <div className="pt-6 flex items-start pb-6">
        <BackButton />
      </div>

      <h2 className="text-lg font-semibold text-gray-900 mb-4">ชื่อแพคเกจ</h2>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-10">
        <div className="lg:col-span-2 space-y-6">
          <div>
            <input
              id="package-name"
              type="text"
              placeholder="ความรักอยู่ที่ไหน"
              className={`w-full px-4 py-3 border ${
                !packageName && !isFormValid
                  ? "border-bordercancel"
                  : "border-gray-300"
              } rounded-md text-[16px] text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none`}
              value={packageName}
              onChange={(e) => setPackageName(e.target.value)}
            />
            {!packageName && !isFormValid && (
              <p className="text-sm text-bordercancel">กรุณากรอกชื่อแพคเกจ</p>
            )}
          </div>

          <div>
            <h2 className="text-lg font-semibold text-gray-900 mb-4">
              คำอธิบายสั้น ๆ
            </h2>
            <textarea
              className={`w-full h-[100px] lg:h-[120px] border ${
                !description && !isFormValid
                  ? "border-bordercancel"
                  : "border-gray-300"
              } resize-none rounded-lg pt-3 px-4 text-[16px] text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none`}
              placeholder="เขียนอธิบาย"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
            />
            {!description && !isFormValid && (
              <p className="text-sm text-bordercancel">กรุณากรอกคำอธิบาย</p>
            )}
          </div>

          <div className="flex flex-col space-y-6">
            <DateRangePicker />
            <TimeAuction />
            <div>
              <div className="text-lg font-semibold text-gray-900 mb-4">
                หมวดหมู่
              </div>
              <div className="flex flex-wrap gap-2">
                {categories.map((category) => (
                  <button
                    key={category}
                    onClick={() => handleCategoryClick(category)}
                    className={`px-4 py-2 rounded-full border ${
                      selectedCategory === category
                        ? "bg-secondary text-white"
                        : "bg-white text-gray-700 border-gray-300"
                    } transition-all duration-200`}
                  >
                    {category}
                  </button>
                ))}
              </div>
              {!selectedCategory && !isFormValid && (
                <p className="text-sm text-bordercancel mt-2">
                  กรุณาเลือกหมวดหมู่
                </p>
              )}
            </div>

            <div className="mb-6 space-y-4">
              <label className="text-lg font-semibold text-gray-900">
                ราคาเริ่มต้น
              </label>
              <div
                className={`w-[220px] relative flex items-center border rounded-md shadow-sm px-4 py-3 focus-within:ring-2 focus-within:ring-primary focus:outline-none ${
                  !isPriceValid ? "border-bordercancel" : "border-gray-300"
                }`}
              >
                <span className="text-gray-500 mr-2">฿</span>
                <input
                  type="text"
                  className="w-full pl-2 text-gray-700 outline-none"
                  value={price}
                  onChange={handlePriceChange}
                  placeholder="ระบุราคา"
                />
              </div>
              {!isPriceValid && !price && (
                <p className="text-sm text-bordercancel mt-1">
                  กรุณากรอกข้อมูล
                </p>
              )}
            </div>

            <TimeFortune />
            <div>
              <h2 className="text-lg font-semibold text-gray-900 mb-4">
                รายละเอียด
              </h2>
              <textarea
                className={`w-full h-[150px] lg:h-[250px] border ${
                  !details && !isFormValid
                    ? "border-bordercancel"
                    : "border-gray-300"
                } resize-none rounded-lg pt-3 px-4 text-[16px] text-gray-700 focus:ring-2 focus:ring-primary focus:outline-none`}
                placeholder="เขียนรายละเอียด"
                value={details}
                onChange={(e) => setDetails(e.target.value)}
              />
              {!details && !isFormValid && (
                <p className="text-sm text-bordercancel mt-1">
                  กรุณากรอกรายละเอียด
                </p>
              )}
            </div>
          </div>
        </div>

        <div className="flex flex-col space-y-4">
          <ImageUploader
            onImageUpload={handleImageUpload}
            isImageValid={isImageValid}
            resetImage={resetImage}
          />
        </div>
      </div>

      <div className="flex justify-end space-x-6 mt-3">
        <ButtonComponent
          label="ยกเลิก"
          className="flex items-center justify-center px-8 py-3 text-base font-semibold text-gray-500 border border-gray-400 hover:bg-zinc-100 hover:text-neutral-400 rounded-full"
          onClick={handleCancel}
        />
        <ButtonComponent
          label="บันทึก"
          className="flex items-center justify-center px-8 py-3 text-base font-semibold text-white bg-primary border border-secondary2 hover:bg-secondary hover:text-white rounded-full"
          onClick={handleSubmit}
        />
      </div>
    </Layout>
  );
};

export default CreateAuction;
