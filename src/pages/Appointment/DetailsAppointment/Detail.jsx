import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../../components/Button/BackButton";
import QuestionCard from "../../../components/Card/QuestionCard";
import ButtonComponent from "../../../components/Popup/profile/ButtonComponent";
import { fetchAppointmentDetails } from "../../../Data/Appointment/Appointments";
import Layout from "../../Appointment/Layout";

// ฟังก์ชันแปลงวันที่
const formatDate = (isoDate) => {
  const options = { year: "numeric", month: "long", day: "numeric" };
  return new Date(isoDate).toLocaleDateString("th-TH", options);
};

// ฟังก์ชันแปลงเวลา
const formatTime = (isoDate) => {
  const options = { hour: "2-digit", minute: "2-digit" };
  const time = new Date(isoDate).toLocaleTimeString("th-TH", options);
  return `${time} น.`;
};


const formatPhoneNumber = (number) => {
  if (!number) return "ไม่มีข้อมูล";
  const rawNumber = number.replace(/\D/g, "");
  if (rawNumber.length !== 10) return number;
  return `${rawNumber.slice(0, 3)}-${rawNumber.slice(3, 6)}-${rawNumber.slice(
    6
  )}`;
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

const renderStatus = (status) => {
  switch (status) {
    case "pending":
      return (
        <div className="inline-block w-[140px] py-2 bg-white text-secondary2/90 text-base font-medium rounded-full">
          รอเข้ารับบริการ
        </div>
      );
    case "completed":
      return (
        <div className="inline-block w-[140px] py-2 bg-primary text-white text-base font-medium rounded-full border border-secondary2">
          บริการสำเร็จ
        </div>
      );
    case "s_cancelled":
      return (
        <div className="inline-block w-[140px] py-2 bg-cancel text-white/90 text-base font-medium rounded-full border border-bordercancel">
          ยกเลิกบริการ
        </div>
      );
    case "u_cancelled":
      return (
        <div className="inline-block w-[140px] py-2 bg-cancel text-white/90 text-base font-medium rounded-full border border-bordercancel">
          ยกเลิกโดยผู้ใช้
        </div>
      );
    default:
      return null;
  }
};

const DetailsAppointment = () => {
  const { apmt_id } = useParams();
  console.log("Appointment ID: ", apmt_id); // ตรวจสอบค่า apmt_id

  const [appointmentDetails, setAppointmentDetails] = useState(null); // Changed to null
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
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

  useEffect(() => {
    const getAppointmentDetails = async () => {
      try {
        const data = await fetchAppointmentDetails(apmt_id);
        console.log("Fetched appointment details:", data); // ตรวจสอบข้อมูลที่ได้จาก API
        setAppointmentDetails(data);
      } catch (err) {
        console.error("Error fetching appointment details:", err);
        setError("ไม่สามารถดึงข้อมูลได้");
      } finally {
        setLoading(false);
      }
    };

    if (apmt_id) {
      getAppointmentDetails();
    }
  }, [apmt_id]);

  if (loading)
    return (
      <div className="flex items-center justify-center h-screen">
        กำลังโหลด...
      </div>
    );
  if (error)
    return (
      <div className="flex items-center justify-center h-screen text-red-500">
        {error}
      </div>
    );

  if (!appointmentDetails) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-xl font-medium text-gray-600 text-center">
          ไม่มีข้อมูลสำหรับ ID {apmt_id}
        </p>
      </div>
    );
  }

  return (
    <Layout>
      <div className="pt-6 flex items-start">
        <BackButton />
      </div>

      {/* Confirmation Code */}
      <div className="flex justify-center items-center py-4">
        <div className="text-center text-2xl md:text-3xl font-medium text-gray-700 flex items-center gap-2">
          รหัสยืนยันคิว คือ
          <span className="text-4xl md:text-5xl font-bold text-secondary">
            {appointmentDetails.confirmation_code}
          </span>
        </div>
      </div>

      {/* Appointment Information */}
      <div className="px-4 sm:px-8">
        <div className="pb-8 border-b-2 border-gray-300">
          <div className="bg-primary text-white rounded-lg p-6 sm:p-10 mt-4 shadow-lg">
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pb-8">
              <div className="text-center space-y-2">
                <p className="text-[16px] md:text-[20px] font-medium">
                  วันที่นัดหมาย
                </p>
                <p className="text-[18px] md:text-[24px] font-bold">
                  {formatDate(appointmentDetails.start_time)}
                </p>
              </div>
              <div className="text-center space-y-2 sm:border-x-2">
                <p className="text-[16px] md:text-[20px] font-medium">
                  เวลานัดหมาย
                </p>
                <p className="text-[18px] md:text-[24px] font-bold">
                  {formatTime(appointmentDetails.start_time)} น.
                </p>
              </div>
              <div className="text-center space-y-2">
                <p className="text-[16px] md:text-[20px] font-medium">สถานะ</p>
                <div className="mt-4">
                  {renderStatus(appointmentDetails.status)}
                </div>
              </div>
            </div>
            <div className="text-center mt-4 py-2">
              <p className="text-[24px] sm:text-[32px] font-semibold">
                {appointmentDetails.package.name}
              </p>
              <p className="text-lg font-medium">
                {appointmentDetails.seer.name}
              </p>
            </div>

            <div className="text-center mt-4 py-2">
              <p className="text-[16px] sm:text-[24px] font-semibold">
                รูปแบบดูดวง
              </p>
              <p className="text-[16px] font-medium">
                {appointmentDetails.seer.name}
              </p>
            </div>
          </div>

          {/* Booking Information */}
          <div className="px-10 py-8 mt-6 bg-white border border-gray-400 rounded-lg shadow-md">
            <h2 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5">
              ข้อมูลผู้จอง
            </h2>
            <div className="space-y-4 text-[18px]">
              {appointmentDetails.client.display_name &&
                renderInfoSection(
                  "ชื่อ-นามสกุล",
                  appointmentDetails.client.display_name
                )}

              {appointmentDetails.client.required.birthdate &&
                renderInfoSection(
                  "วันเกิด",
                  formatDate(appointmentDetails.client.required.birthdate)
                )}

              {appointmentDetails.client.required.birthdate &&
                renderInfoSection(
                  "เวลาเกิด",
                  formatTime(appointmentDetails.client.required.birthdate)
                )}

              {appointmentDetails.client.required.phone_number &&
                renderInfoSection(
                  "เบอร์โทรศัพท์",
                  formatPhoneNumber(
                    appointmentDetails.client.required.phone_number
                  )
                )}
            </div>
          </div>
        </div>

        {/* Question Section */}
        <div className="pt-8 text-[26px] md:text-2xl font-semibold text-gray-800 mb-5">
          คำถามดูดวง
        </div>
        {/* Check if questions exist and map through them */}
        {appointmentDetails.questions &&
        appointmentDetails.questions.length > 0 ? (
          appointmentDetails.questions.map((question, index) => (
            <QuestionCard key={index} questionText={question} index={index} />
          ))
        ) : (
          <p className="text-gray-500">ไม่มีคำถามในตอนนี้</p> // Display a message if there are no questions
        )}

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
    </Layout>
  );
};

export default DetailsAppointment;
