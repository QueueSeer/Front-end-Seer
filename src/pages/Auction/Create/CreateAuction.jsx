import React, { useState, useEffect } from "react";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import Layout from "../Layout";
import BackButton from "../../../components/Button/BackButton";
import ImageUploader from "../../../components/Card/ImageUploader";
import DateRangePicker from "../../../components/RangePicker/DateRangePicker";
import TimeAuction from "./TimeAuction";
import TimeFortune from "./TimeFortune";
import ButtonComponent from "../../../components/Popup/profile/ButtonComponent";
import { createAuctionSeer } from "../../../Data/Auction/Auction";

const CreateAuction = () => {
  const [price, setPrice] = useState("");
  const [increment, setIncrement] = useState("");

  const [packageName, setPackageName] = useState("");
  const [description, setDescription] = useState("");
  const [details, setDetails] = useState("");
  const [dateTime, setDateTime] = useState({
    startDate: new Date(),
    endDate: new Date(),
  });
  const [dateTimeappoint, setDateTimeappoint] = useState({
    startDateappoint: new Date(),
    endDateappoint: new Date(),
  });
  const [timeAuction, setTimeAuction] = useState({
    startTime: "",
    endTime: "",
  }); // Store both start and end time
  const [timeAppoint, setTimeAppoint] = useState({
    startTimeAppoint: "",
    endTimeAppoint: "",
  }); // Store both start and end time

  const [isFormValid, setIsFormValid] = useState(true);
  const [isPriceValid, setIsPriceValid] = useState(true);
  const [image, setImage] = useState(null);
  const [isImageValid, setIsImageValid] = useState(true);
  const [resetImage, setResetImage] = useState(false);

  const handleImageUpload = (file) => {
    setImage(file);
    setIsImageValid(true);
  };

  const handleDateChange = (date) => {
    // ตรวจสอบว่า start_time และ end_time เป็นวันที่ที่ถูกต้อง
    const newStartDate = new Date(date.start_time);
    const newEndDate = new Date(date.end_time);

    // ถ้าแปลงแล้วเป็นวันที่ที่ไม่ถูกต้อง, จะได้ "Invalid Date"
    if (isNaN(newStartDate.getTime()) || isNaN(newEndDate.getTime())) {
      console.error("Invalid date received:", date);
      return; // ถ้าเป็นวันที่ไม่ถูกต้อง, ไม่ให้ดำเนินการต่อ
    }

    // แปลงค่าจาก start_time และ end_time ให้อยู่ในรูปแบบ YYYY-MM-DD
    const formattedStartDate = newStartDate.toISOString().split("T")[0]; // ได้ค่าในรูปแบบ '2025-03-30'
    const formattedEndDate = newEndDate.toISOString().split("T")[0]; // ได้ค่าในรูปแบบ '2025-03-30'

    // ถ้ามีการเปลี่ยนแปลงใน startDate หรือ endDate ก็อัพเดท state
    setDateTime((prevDateTime) => {
      if (
        prevDateTime.startDate !== formattedStartDate ||
        prevDateTime.endDate !== formattedEndDate
      ) {
        return {
          ...prevDateTime,
          startDate: formattedStartDate,
          endDate: formattedEndDate,
        };
      }
      return prevDateTime; // ถ้าไม่มีการเปลี่ยนแปลง ก็คืนค่าเดิม
    });
  };

  const handleDateAppointChange = (date) => {
    // ตรวจสอบว่า start_time และ end_time เป็นวันที่ที่ถูกต้อง
    const newStartDate = new Date(date.start_time);
    const newEndDate = new Date(date.end_time);

    // ถ้าแปลงแล้วเป็นวันที่ที่ไม่ถูกต้อง, จะได้ "Invalid Date"
    if (isNaN(newStartDate.getTime()) || isNaN(newEndDate.getTime())) {
      console.error("Invalid date received:", date);
      return; // ถ้าเป็นวันที่ไม่ถูกต้อง, ไม่ให้ดำเนินการต่อ
    }

    // แปลงค่าจาก start_time และ end_time ให้อยู่ในรูปแบบ YYYY-MM-DD
    const formattedStartDate = newStartDate.toISOString().split("T")[0]; // ได้ค่าในรูปแบบ '2025-03-30'
    const formattedEndDate = newEndDate.toISOString().split("T")[0]; // ได้ค่าในรูปแบบ '2025-03-30'

    // ถ้ามีการเปลี่ยนแปลงใน startDateappoint หรือ endDateappoint ก็อัพเดท state
    setDateTimeappoint((prevDateTime) => {
      if (
        prevDateTime.startDateappoint !== formattedStartDate ||
        prevDateTime.endDateappoint !== formattedEndDate
      ) {
        return {
          ...prevDateTime,
          startDateappoint: formattedStartDate,
          endDateappoint: formattedEndDate,
        };
      }
      return prevDateTime; // ถ้าไม่มีการเปลี่ยนแปลง ก็คืนค่าเดิม
    });
  };

  const handleTimeChange = (start, end) => {
    setTimeAuction({ startTime: start, endTime: end });
  };

  const handleTimeAppointChange = (start, end) => {
    setTimeAppoint({ startTimeAppoint: start, endTimeAppoint: end });
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

  const handleIncrementChange = (event) => {
    const value = event.target.value;
    if (/^\d*\.?\d*$/.test(value)) {
      setIncrement(value);
      setIsPriceValid(true);
    } else {
      setIsPriceValid(false);
    }
  };

  const handleCancel = () => {
    setPackageName("");
    setDescription("");
    setPrice("");
    setIncrement("");
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
    console.log("Handle submit function called");

    // ตรวจสอบว่าไม่มีข้อมูลครบหรือไม่
    if (
      !packageName ||
      !description ||
      !price ||
      !increment ||
      !details ||
      !image ||
      !dateTimeappoint.startDateappoint ||
      !dateTimeappoint.endDateappoint ||
      !dateTime.startDate ||
      !dateTime.endDate ||
      !timeAuction.startTime ||
      !timeAuction.endTime
    ) {
      console.log("Form validation failed");
      setIsFormValid(false);
      if (!price) setIsPriceValid(false);
      if (!increment) setIsPriceValid(false);
      if (!image) setIsImageValid(false);
      return;
    }

    setIsFormValid(true);
    setIsPriceValid(true);
    setIsImageValid(true);

    // สร้าง start_time โดยรวม dateTime.startDate และ timeAuction.startTime
    const startTimeString = `${dateTime.startDate}T${timeAuction.startTime}:00.000+07:00`;
    const startTimeAppoint = `${dateTimeappoint.startDateappoint}T${timeAppoint.startTimeAppoint}:00.000+07:00`;
    // สร้าง end_time ด้วยวิธีเดียวกัน (สามารถใช้ timeAuction.endTime)
    const endTimeString = `${dateTime.endDate}T${timeAuction.endTime}:00.000+07:00`;
    const endTimeAppoint = `${dateTimeappoint.endDateappoint}T${timeAppoint.endTimeAppoint}:00.000+07:00`;

    // สร้างข้อมูลที่จะส่ง
    const auctionData = {
      name: packageName,
      short_description: description,
      description: details,
      start_time: startTimeString,
      end_time: endTimeString,
      appoint_start_time: startTimeAppoint,
      appoint_end_time: endTimeAppoint,
      initial_bid: parseFloat(price),
      min_increment: parseFloat(increment),
    };

    console.log("ข้อมูลที่กรอกครบ:", JSON.stringify(auctionData, null, 2));
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
              className={`w-full h-[150px] lg:h-[180px] border ${
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
        </div>

        <div className="flex flex-col">
          <ImageUploader
            onImageUpload={handleImageUpload}
            isImageValid={isImageValid}
            setIsImageValid={setIsImageValid}
            resetImage={resetImage}
          />

          {!image && !isFormValid && (
            <p className="text-sm text-bordercancel">กรุณาอัพโหลดภาพ</p>
          )}
        </div>
      </div>

      <div className="space-y-8 mt-8 ">
        <DateRangePicker
          onDateChange={handleDateChange}
          label="วันที่เริ่มประมูล"
          ranges={[
            { startDate: new Date(), endDate: new Date(), key: "selection" },
          ]}
        />
        <TimeAuction onTimeChange={handleTimeChange} />
        {/* Pass time to handler */}
        <div className="flex space-x-[54px] ">
          <div className=" w-[220px]">
            <label className="text-lg font-semibold text-gray-900 ">
              ราคาเริ่มต้นประมูล
            </label>
            <div
              className={`relative flex items-center border rounded-md shadow-sm mt-4 px-4 py-3 focus-within:ring-2 focus-within:ring-primary focus:outline-none ${
                !isPriceValid ? "border-bordercancel" : "border-gray-300"
              }`}
            >
              <input
                type="text"
                className="w-full pl-2 text-gray-700 outline-none"
                value={price} // ใช้ price สำหรับราคาเริ่มต้น
                onChange={handlePriceChange} // ใช้ handler สำหรับการอัปเดต price
                placeholder="ระบุราคา"
              />
              <span className="text-gray-500 mr-2">coin</span>
            </div>
            {!isPriceValid && !price && (
              <p className="text-sm text-bordercancel mt-1">กรุณากรอกข้อมูล</p>
            )}
          </div>

          <div className=" w-[220px]">
            <label className="text-lg font-semibold text-gray-900">
              ราคาขั้นต่ำในการลงประมูล
            </label>
            <div
              className={`relative flex items-center border rounded-md shadow-sm mt-4 px-4 py-3 focus-within:ring-2 focus-within:ring-primary focus:outline-none ${
                !isPriceValid ? "border-bordercancel" : "border-gray-300"
              }`}
            >
              <input
                type="text"
                className="w-full pl-2 text-gray-700 outline-none"
                value={increment} // ใช้ increment สำหรับราคาขั้นต่ำ
                onChange={handleIncrementChange} // ใช้ handler สำหรับการอัปเดต increment
                placeholder="ระบุราคา"
              />
              <span className="text-gray-500 mr-2">coin</span>
            </div>
            {!isPriceValid && !increment && (
              <p className="text-sm text-bordercancel mt-1">กรุณากรอกข้อมูล</p>
            )}
          </div>
        </div>

        <DateRangePicker
          onDateChange={handleDateAppointChange}
          label="วันที่ให้บริการ"
          ranges={[
            {
              startDateappoint: new Date(),
              endDateappoint: new Date(),
              key: "selection",
            },
          ]}
        />
        <TimeFortune onTimeChange={handleTimeAppointChange} />

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
