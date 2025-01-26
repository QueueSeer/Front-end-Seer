import React, { useState } from "react";
import { useLocation, useParams } from "react-router-dom";
import BackButton from "../../../components/Button/BackButton";
import QuestionCard from "../../../components/Card/QuestionCard";
import ButtonComponent from "../../../components/Popup/profile/ButtonComponent";


// ฟังก์ชันแปลงวันที่
const formatDate = (isoDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoDate).toLocaleDateString("th-TH", options);
};

// ฟังก์ชันแปลงเวลา
const formatTime = (isoDate) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  return new Date(isoDate).toLocaleTimeString("th-TH", options);
};

// ฟังก์ชันในการ render ข้อมูล
const renderInfoSection = (title, content) => (
  <div className="flex flex-col sm:flex-row">
    <div className="w-full sm:w-40 font-medium text-gray-800 mb-1 sm:mb-0">
      {title}
    </div>
    <div className="flex-1">{content}</div>
  </div>
);

// ข้อมูลคำถาม
const questions = [
  "ความรักในช่วงนี้จะเป็นยังไง จะได้เจอคนที่ชอบไหม หรือมีโอกาสจะได้เจอคนที่ชอบหรือเปล่า",
  "การงานในช่วงนี้จะเป็นอย่างไร มีโอกาสก้าวหน้าหรือไม่",
  // เพิ่มคำถามเพิ่มเติมได้ที่นี่
];

const renderStatus = (status) => {
  switch (status) {
    case "รอเข้ารับบริการ":
      return (
        <div className="inline-block w-[140px] py-2 bg-white text-secondary2/90 text-base font-medium rounded-full">
          รอเข้ารับบริการ
        </div>
      );
    case "บริการสำเร็จ":
      return (
        <div className="inline-block w-[140px] py-2 bg-primary text-white text-base font-medium rounded-full border border-secondary2">
          บริการสำเร็จ
        </div>
      );
    case "ยกเลิกบริการ":
      return (
        <div className="inline-block w-[140px] py-2 bg-cancel text-white/90 text-base font-medium rounded-full border border-bordercancel">
          ยกเลิกบริการ
        </div>
      );
    default:
      return null;
  }
};

const Detail = () => {
  const { id } = useParams();
  const location = useLocation();
  const appointmentDetails = location.state;

  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupAction, setPopupAction] = useState("");

  const handleCancel = () => {
    setPopupAction("cancel");
    setIsPopupVisible(true); // แสดง Popup
  };

  const handleSave = () => {
    setPopupAction("save");
    setIsPopupVisible(true); // แสดง Popup
  };

  const confirmAction = () => {
    if (popupAction === "cancel") {
      console.log("Canceled the service");
    } else if (popupAction === "save") {
      console.log("Completed the service");
    }
    setIsPopupVisible(false); // ซ่อน Popup หลังยืนยัน
  };

  const closePopup = () => {
    setIsPopupVisible(false); // ซ่อน Popup
  };

  if (!appointmentDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-gray-600 text-center">
          ไม่มีข้อมูลสำหรับ ID {id}
        </p>
      </div>
    );
  }

  return (
    <div >
      
      <div className="pt-6 flex items-start">
        <BackButton />
      </div>

      {/* Confirmation Code */}
      <div className="flex justify-center items-center py-4">
        <div className="text-center text-2xl md:text-3xl font-medium text-gray-700 flex items-center gap-2">
          รหัสยืนยันคิว คือ
          <span className="text-4xl md:text-5xl font-bold text-secondary">
            {appointmentDetails.code}
          </span>
        </div>
      </div>

      {/* Appointment Information */}
      <div className="px-4 sm:px-8">
        <div className="pb-8 border-b-2">
          <div className="bg-primary text-white rounded-lg p-6 sm:p-10 mt-4 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8">
              <div className="text-center space-y-2">
                <p className="text-[16px] md:text-[20px] font-medium">
                  วันที่นัดหมาย
                </p>
                <p className="text-[18px] md:text-[24px] font-bold">
                  {formatDate(appointmentDetails.dateappointment)}
                </p>
              </div>
              <div className="text-center space-y-2 sm:border-x-2">
                <p className="text-[16px] md:text-[20px] font-medium">
                  เวลานัดหมาย
                </p>
                <p className="text-[18px] md:text-[24px] font-bold">
                  {formatTime(appointmentDetails.dateappointment)} น.
                </p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-[16px] md:text-[20px] font-medium">สถานะ</p>
                <div className="mt-4">{renderStatus(appointmentDetails.status_service)}</div>
              </div>
            </div>
            <div className="text-center mt-4 py-2">
              <p className="text-[24px] sm:text-[32px] font-semibold">
                {appointmentDetails.packageName}
              </p>
              <p className="text-lg font-medium">หมอดู เพียงฟ้า พยวัจญ</p>
            </div>
            <div className="text-center mt-6 py-2">
              <p className="text-sm py-2">ช่องทางติดต่อ</p>
              <p className="text-lg font-bold break-words">thrthrthtjtryjiyy</p>
            </div>
          </div>

          {/* Booking Information */}
          <div className="px-10 py-8 mt-6 bg-white border rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5">
              ข้อมูลผู้จอง
            </h2>
            <div className="space-y-4 text-[18px]">
              {renderInfoSection("ชื่อ-นามสกุล", appointmentDetails.name)}
              {renderInfoSection(
                "วันเดือนปีเกิด",
                formatDate(appointmentDetails.birthdate)
              )}
              {renderInfoSection(
                "เวลาเกิด",
                `${formatTime(appointmentDetails.birthdate)} น.`
              )}
              {renderInfoSection("อีเมล", appointmentDetails.email)}
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div className="pt-8 text-[26px] md:text-2xl font-semibold text-gray-800 mb-5">
          คำถามดูดวง
        </div>
        {questions.map((question, index) => (
          <QuestionCard key={index} questionText={question} index={index} />
        ))}

        {/* Buttons */}
        <div className="flex justify-end space-x-6 mt-6">
          {/* Cancel Button */}
          <ButtonComponent
            label={
              <div className="flex items-center gap-2">
                <span className="material-icons">ยกเลิกให้บริการ</span>
              </div>
            }
            onClick={handleCancel}
            className="flex items-center justify-center px-8 py-3 text-base font-semibold text-red-600 border border-red-500 hover:bg-red-700 hover:text-white rounded-full"
          />

          {/* Complete Service Button */}
          <ButtonComponent
            label={
              <div className="flex items-center gap-2">
                <span className="material-icons">บริการเสร็จสิ้น</span>
              </div>
            }
            onClick={handleSave}
            className="flex items-center justify-center px-8 py-3 text-base font-semibold text-green-600 border border-green-600 hover:bg-green-700 hover:text-white rounded-full"
          />
        </div>

        {/* Confirmation Popup */}
        {isPopupVisible && (
          <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
              <h2 className="text-lg font-bold mb-4 text-gray-800 text-center">
                คุณยืนยันที่จะ
                {popupAction === "cancel"
                  ? "ยกเลิกการให้บริการ?"
                  : "ทำการบริการเสร็จสิ้น?"}
              </h2>
              <div className="flex justify-between mt-4">
                <button
                  onClick={closePopup}
                  className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg"
                >
                  ยกเลิก
                </button>
                <button
                  onClick={confirmAction}
                  className={`px-6 py-2 text-sm font-medium rounded-lg ${
                    popupAction === "cancel"
                      ? "bg-red-600 text-white hover:bg-red-700"
                      : "bg-green-600 text-white hover:bg-green-700"
                  }`}
                >
                  ยืนยัน
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Detail;
