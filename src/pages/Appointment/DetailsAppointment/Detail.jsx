import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import BackButton from "../../../components/Button/BackButton";
import QuestionCard from "../../../components/Card/QuestionCard";
import ButtonComponent from "../../../components/Popup/profile/ButtonComponent";
import ConfirmationPopup from "../../../components/Popup/ConfirmationPopup";
import {
  fetchAppointmentDetails,
  updateAppointmentStatus,
} from "../../../Data/Appointment/Appointments";
import Layout from "../../Appointment/Layout";
import AppointmentInfoCard from "./element/AppointmentInfoCard";
import BookingInfoCard from "./element/BookingInfoCard";

const DetailsAppointment = () => {
  const { apmt_id } = useParams();
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupAction, setPopupAction] = useState("");

  const handleCancel = () => {
    setPopupAction("cancel");
    setIsPopupVisible(true);
  };

  const handleSave = () => {
    setPopupAction("save");
    setIsPopupVisible(true);
  };

  const handleUpdateStatus = async () => {
    try {
      let newStatus = "";
      if (popupAction === "cancel") {
        newStatus = "seer-cancel"; // เปลี่ยนสถานะให้ตรงกับ API
      } else if (popupAction === "save") {
        newStatus = "completed";
      }

      await updateAppointmentStatus(apmt_id, newStatus);

      setAppointmentDetails((prev) => ({
        ...prev,
        status: newStatus,
      }));

      console.log(`สถานะถูกเปลี่ยนเป็น: ${newStatus}`);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะอัปเดตสถานะ:", error);
    }
    setIsPopupVisible(false);
  };

  useEffect(() => {
    const getAppointmentDetails = async () => {
      try {
        const data = await fetchAppointmentDetails(apmt_id);
        setAppointmentDetails(data);
      } catch (err) {
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
        ไม่มีข้อมูลสำหรับ ID {apmt_id}
      </div>
    );
  }

  return (
    <Layout>
      <div className="pt-6 flex items-start">
        <BackButton />
      </div>

      {/* Confirmation Code */}
      <div className="flex justify-center items-center py-5">
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
          <AppointmentInfoCard appointmentDetails={appointmentDetails} />
          <BookingInfoCard client={appointmentDetails.client} />
        </div>

        {/* Question Section */}
        <div className="pt-8 text-[26px] md:text-2xl font-semibold text-gray-800 mb-5">
          คำถามดูดวง
        </div>
        {appointmentDetails.questions &&
        appointmentDetails.questions.length > 0 ? (
          appointmentDetails.questions.map((question, index) => (
            <QuestionCard key={index} questionText={question} index={index} />
          ))
        ) : (
          <p className="text-gray-500">ไม่มีคำถามในตอนนี้</p>
        )}

        <div className="flex justify-end space-x-6 mt-6 mb-2">
          {appointmentDetails.status === "s_cancelled" ||
          appointmentDetails.status === "u_cancelled" ||
          appointmentDetails.status === "completed" ? (
            <div className="text-[20px] font-semibold text-secondary2/80 italic">
              คุณได้ยืนยันการให้บริการเรียบร้อย
            </div>
          ) : (
            <>
              {/* Cancel Button */}
              <ButtonComponent
                label="ยกเลิกให้บริการ"
                onClick={handleCancel}
                className="flex items-center justify-center px-8 py-3 text-base font-semibold text-red-600 border border-red-500 hover:bg-red-700 hover:text-white rounded-full"
              />

              {/* Complete Service Button */}
              <ButtonComponent
                label="บริการเสร็จสิ้น"
                onClick={handleSave}
                className="flex items-center justify-center px-8 py-3 text-base font-semibold text-green-600 border border-green-600 hover:bg-green-700 hover:text-white rounded-full"
              />
            </>
          )}
        </div>

        {/* Confirmation Popup */}
        <ConfirmationPopup
          isOpen={isPopupVisible}
          onClose={() => setIsPopupVisible(false)}
          onConfirm={handleUpdateStatus}
          title={
            popupAction === "cancel"
              ? "คุณต้องการยกเลิกบริการใช่ไหม?"
              : "คุณต้องการยืนยันว่าบริการเสร็จสิ้น?"
          }
          message={
            popupAction === "cancel"
              ? "การยกเลิกจะไม่สามารถย้อนกลับได้"
              : "กรุณายืนยันว่าคุณได้ให้บริการเสร็จสมบูรณ์แล้ว"
          }
          confirmText={
            popupAction === "cancel" ? "ยืนยันยกเลิก" : "ยืนยันเสร็จสิ้น"
          }
        />
      </div>
    </Layout>
  );
};

export default DetailsAppointment;
