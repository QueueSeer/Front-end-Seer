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
import { fetchPackageDetailsData } from "../../../Data/Package/PackageApi";
import Layout from "../../Appointment/Layout";
import AppointmentInfoCard from "./element/AppointmentInfoCard";
import BookingInfoCard from "./element/BookingInfoCard";
import DetailPackage from "./element/DetailPackage";

const DetailsAppointment = () => {
  const { apmt_id } = useParams();
  const [appointmentDetails, setAppointmentDetails] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPopupVisible, setIsPopupVisible] = useState(false);
  const [popupAction, setPopupAction] = useState("");
  const [packageDetails, setPackageDetails] = useState(null);

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
      const newStatus = popupAction === "cancel" ? "seer-cancel" : "complete";
      await updateAppointmentStatus(apmt_id, newStatus);
      setAppointmentDetails((prev) => ({ ...prev, status: newStatus }));
      window.location.reload();
      window.scrollTo(0, 0);
    } catch (error) {
      console.error("เกิดข้อผิดพลาดขณะอัปเดตสถานะ:", error);
    }
    setIsPopupVisible(false);
  };

  // ✅ ดึงข้อมูลนัดหมาย
  useEffect(() => {
    const getAppointmentDetails = async () => {
      try {
        setLoading(true);
        const data = await fetchAppointmentDetails(apmt_id);
        setAppointmentDetails(data);
      } catch (err) {
        setError("ไม่สามารถดึงข้อมูลการนัดหมายได้");
      } finally {
        setLoading(false);
      }
    };

    if (apmt_id) getAppointmentDetails();
  }, [apmt_id]);

  // ✅ ดึงข้อมูล Package
  useEffect(() => {
    const fetchPackageDetails = async () => {
      if (!appointmentDetails?.package?.id) return; // ตรวจสอบก่อน

      try {
        const data = await fetchPackageDetailsData(
          appointmentDetails.package.id
        );
        if (data) {
          setPackageDetails({
            packageName: data.package?.name || "ประมูลดูดวง", // เพิ่มการเช็คให้แน่ใจว่า package มีข้อมูล
            price: data.price ? parseInt(data.price, 10) : 0,
            duration: data.duration ? data.duration / 60 : 0,
            foretellChannel: data.foretell_channel || "chat",
            description: data.description || "",
            questionLimit: data.question_limit || 0,
            category: data.category || "",
            requiredData: data.required_data || "",
            readingType: data.reading_type || "",
            image: data.image || "",
          });
        }
      } catch (error) {
        console.error("Error fetching package details:", error);
      }
    };

    fetchPackageDetails();
  }, [appointmentDetails?.package?.id]);

  // ✅ กำหนดค่าเริ่มต้นเพื่อป้องกัน Error
  const defaultPackageDetails = {
    price: 0,
    duration: 0,
    foretellChannel: " ",
    description: "",
    questionLimit: 0,
    category: "",
    requiredData: "",
    readingType: "",
    image: "",
  };

  // Function to check if the appointment is today
  const isAppointmentToday = () => {
    const now = new Date();
    const appointmentDate = new Date(appointmentDetails.start_time);

    const isSameDay =
      now.getDate() === appointmentDate.getDate() &&
      now.getMonth() === appointmentDate.getMonth() &&
      now.getFullYear() === appointmentDate.getFullYear();

    const isTimeReached = appointmentDate <= now;

    return isSameDay && isTimeReached;
  };

  // Function to check if the appointment is past 7 days from end_time
  const isAppointmentPast = () => {
    const currentTime = new Date();
    const appointmentEndTime = new Date(appointmentDetails.end_time);
    appointmentEndTime.setDate(appointmentEndTime.getDate() + 7);
    return currentTime > appointmentEndTime;
  };

  const isAppointmentTodayOrPast = () => {
    const now = new Date();
    const appointmentDate = new Date(appointmentDetails.start_time);
    const appointmentEndTime = new Date(appointmentDetails.end_time);
    // appointmentEndTime.setDate(appointmentEndTime.getDate() + 7);
    appointmentEndTime.setMinutes(appointmentEndTime.getMinutes() + 1);
    // ปุ่มจะแสดงเฉพาะช่วงเวลาเริ่มต้น ถึง สิ้นสุด + 1 นาที เท่านั้น
    return now >= appointmentStartTime && now <= appointmentEndTime;
  };

  // Check if the appointment is past and update the status
  useEffect(() => {
    if (appointmentDetails && isAppointmentPast()) {
      const updateStatusToCancelled = async () => {
        try {
          await updateAppointmentStatus(apmt_id, "seer-cancel");
          setAppointmentDetails((prev) => ({
            ...prev,
            status: "seer-cancel",
          }));
        } catch (error) {
          console.error("Error updating status to 'seer-cancel':", error);
        }
      };
      updateStatusToCancelled();
    }
  }, [appointmentDetails]);

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
  if (!appointmentDetails)
    return (
      <div className="flex items-center justify-center h-screen">
        ไม่มีข้อมูลสำหรับ ID {apmt_id}
      </div>
    );

  return (
    <Layout>
      <div className="pt-6 flex items-start">
        <BackButton />
      </div>

      <div className="flex justify-center items-center py-5">
        <div className="text-center text-2xl md:text-3xl font-medium text-gray-700 flex items-center gap-2">
          รหัสยืนยันคิว คือ
          <span className="text-4xl md:text-5xl font-bold text-secondary">
            {appointmentDetails.confirmation_code}
          </span>
        </div>
      </div>

      <div className="px-4 sm:px-8">
        <div className="pb-8 border-b-2 border-gray-300">
          <AppointmentInfoCard
            appointmentDetails={appointmentDetails}
            packageDetails={packageDetails || defaultPackageDetails}
          />
          <DetailPackage
            appointmentDetails={appointmentDetails}
            packageDetails={packageDetails || defaultPackageDetails}
          />
          <BookingInfoCard client={appointmentDetails.client} />
        </div>

        <div className="pt-8 text-[26px] md:text-2xl font-semibold text-gray-800 mb-5">
          คำถามดูดวง
        </div>
        {appointmentDetails.questions?.length ? (
          appointmentDetails.questions.map((question, index) => (
            <QuestionCard key={index} questionText={question} index={index} />
          ))
        ) : (
          <p className="text-gray-500">ไม่มีคำถามในตอนนี้</p>
        )}

        <div className="flex justify-end space-x-6 mt-6 mb-2">
          {["s_cancelled", "u_cancelled", "completed", "seer-cancel"].includes(
            appointmentDetails.status
          ) ? (
            appointmentDetails.status === "u_cancelled" ? (
              <div className="text-[20px] font-semibold text-secondary2/60 italic">
                ลูกค้าได้ยกเลิกบริการ
              </div>
            ) : appointmentDetails.status === "s_cancelled" ? (
              <div className="text-[20px] font-semibold text-red-500 italic">
                คุณไม่ได้ดำเนินการภายในเวลาที่กำหนด (ระบบยกเลิกอัตโนมัติ)
              </div>
            ) : (
              <div className="text-[20px] font-semibold text-secondary2/60 italic">
                คุณได้ยืนยันการให้บริการเรียบร้อย
              </div>
            )
          ) : isAppointmentPast() ? (
            <div className="text-[20px] font-semibold text-red-500 italic">
              ระบบยกเลิกอัตโนมัติเนื่องจากเลยเวลานัดหมาย
            </div>
          ) : (
            <>
              <ButtonComponent
                label="ยกเลิกให้บริการ"
                onClick={handleCancel}
                className="px-8 py-3 text-base font-semibold text-red-600 border border-red-500 hover:bg-red-700 hover:text-white rounded-full"
              />
              {isAppointmentTodayOrPast() ? (
                <ButtonComponent
                  label="บริการเสร็จสิ้น"
                  onClick={handleSave}
                  className="px-8 py-3 text-base font-semibold text-green-600 border border-green-600 hover:bg-green-700 hover:text-white rounded-full"
                />
              ) : (
                <div className="mt-[16px] py-3 text-base font-semibold text-gray-500 rounded-full">
                  ยังไม่ถึงเวลาให้บริการ
                </div>
              )}
            </>
          )}
        </div>

        <ConfirmationPopup
          isOpen={isPopupVisible}
          onClose={() => setIsPopupVisible(false)}
          onConfirm={handleUpdateStatus}
          title={
            popupAction === "cancel"
              ? "คุณต้องการยกเลิกบริการใช่ไหม?"
              : "คุณต้องการยืนยันว่าเสร็จสิ้นการให้บริการ?"
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
