import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Fillterbar from "../../components/fillterbar";
import Images from "../../assets";

const RegisterMembership = () => {
  const navigate = useNavigate();
  const [currentStep, setCurrentStep] = useState(1); // ระบุขั้นตอนปัจจุบัน
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    experience: "",
    email: "",
    phone: "",
    agreement: false,
  });

  const [errors, setErrors] = useState({}); // เก็บสถานะ error ของฟอร์ม
  const [showPopup, setShowPopup] = useState(false); // สำหรับควบคุมการแสดง Pop-up

  useEffect(() => {
    if (currentStep === 2) {
      // แสดง Pop-up หลังจาก 3 วินาที
      const timer = setTimeout(() => {
        setShowPopup(true);
      }, 3000);
      return () => clearTimeout(timer); // ล้าง Timer เมื่อ Component ถูก Unmount
    }
  }, [currentStep]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({
      ...formData,
      [name]: type === "checkbox" ? checked : value,
    });
    setErrors({ ...errors, [name]: "" }); // เคลียร์ error เมื่อเริ่มพิมพ์
  };

  const validateForm = () => {
    const newErrors = {};
    if (!formData.firstName.trim()) newErrors.firstName = "กรุณากรอกชื่อจริง";
    if (!formData.lastName.trim()) newErrors.lastName = "กรุณากรอกนามสกุล";
    if (!formData.experience) newErrors.experience = "กรุณาเลือกประสบการณ์";
    if (!formData.email.trim()) newErrors.email = "กรุณากรอกอีเมล";
    if (!formData.phone.trim()) newErrors.phone = "กรุณากรอกหมายเลขโทรศัพท์";
    if (!formData.agreement)
      newErrors.agreement = "กรุณายอมรับเงื่อนไขการใช้งาน";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0; // ถ้าไม่มี errors แสดงว่าผ่าน
  };

  const handleNextStep = () => {
    if (currentStep === 1 && !validateForm()) return; // หยุดถ้า validation ไม่ผ่าน
    setCurrentStep((prev) => Math.min(prev + 1, 3));
  };

  const handleBackStep = () => {
    setCurrentStep((prev) => Math.max(1, prev - 1));
  };

  const closePopupAndGoToProfile = () => {
    setShowPopup(false); // ซ่อน Pop-up
    navigate("/profile"); // ไปหน้า Profile
  };

  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      <Fillterbar />
      <div className="flex flex-col items-center py-6">
        {/* Progress Steps */}
        <div className="flex w-full max-w-xl justify-between items-center mb-8">
          <div className="text-center flex-1">
            <img
              src={currentStep >= 1 ? Images.iconStart : Images.iconStart}
              alt="ข้อมูลส่วนตัว"
              className="w-10 h-10 mx-auto"
            />
            <p className="text-sm mt-2">ข้อมูลส่วนตัว</p>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="text-center flex-1">
            <img
              src={
                currentStep >= 2
                  ? Images.iconCheckedUserMale1
                  : Images.iconCheckedUserMale
              }
              alt="การยืนยันตัวตน"
              className="w-10 h-10 mx-auto"
            />
            <p className="text-sm mt-2">การยืนยันตัวตน</p>
          </div>
          <div className="w-8 h-0.5 bg-gray-300"></div>
          <div className="text-center flex-1">
            <img
              src={
                currentStep === 3 ? Images.iconCheckFile1 : Images.iconCheckFile
              }
              alt="เสร็จสิ้น"
              className="w-10 h-10 mx-auto"
            />
            <p className="text-sm mt-2">เสร็จสิ้น</p>
          </div>
        </div>

       {/* Step 1 */}
{currentStep === 1 && (
  <div className="bg-white w-full max-w-lg p-6 rounded-lg shadow-md">
    <h2 className="text-xl font-semibold text-gray-800 mb-6">
      ข้อมูลส่วนตัว
    </h2>
    <form className="space-y-4">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            ชื่อจริง *
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            className={`w-full mt-1 p-2 border ${
              errors.firstName ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
            placeholder="ชื่อจริง"
            required
          />
          {errors.firstName && (
            <p className="text-sm text-red-500">{errors.firstName}</p>
          )}
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            นามสกุล *
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            className={`w-full mt-1 p-2 border ${
              errors.lastName ? "border-red-500" : "border-gray-300"
            } rounded-lg`}
            placeholder="นามสกุล"
            required
          />
          {errors.lastName && (
            <p className="text-sm text-red-500">{errors.lastName}</p>
          )}
        </div>
      </div>

      {/* เปลี่ยนเป็น ประสบการณ์ */}
      <div>
        <label className="block text-sm font-medium text-gray-700">
          ประสบการณ์ *
        </label>
        <select
          name="experience"
          value={formData.experience}
          onChange={handleChange}
          className={`w-full mt-1 p-2 border ${
            errors.experience ? "border-red-500" : "border-gray-300"
          } rounded-lg`}
          required
        >
          <option value="">เลือกประสบการณ์</option>
          <option value="1 ปีขึ้นไป">1 ปีขึ้นไป</option>
          <option value="2 ปีขึ้นไป">2 ปีขึ้นไป</option>
          <option value="5 ปีขึ้นไป">5 ปีขึ้นไป</option>
          <option value="10 ปีขึ้นไป">10 ปีขึ้นไป</option>
          <option value="15 ปีขึ้นไป">15 ปีขึ้นไป</option>
        </select>
        {errors.experience && (
          <p className="text-sm text-red-500">{errors.experience}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          อีเมล *
        </label>
        <input
          type="email"
          name="email"
          value={formData.email}
          onChange={handleChange}
          className={`w-full mt-1 p-2 border ${
            errors.email ? "border-red-500" : "border-gray-300"
          } rounded-lg`}
          placeholder="example@email.com"
          required
        />
        {errors.email && (
          <p className="text-sm text-red-500">{errors.email}</p>
        )}
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700">
          หมายเลขโทรศัพท์ *
        </label>
        <input
          type="tel"
          name="phone"
          value={formData.phone}
          onChange={handleChange}
          className={`w-full mt-1 p-2 border ${
            errors.phone ? "border-red-500" : "border-gray-300"
          } rounded-lg`}
          placeholder="หมายเลขโทรศัพท์"
          required
        />
        {errors.phone && (
          <p className="text-sm text-red-500">{errors.phone}</p>
        )}
      </div>

      <div className="flex items-center">
        <input
          type="checkbox"
          name="agreement"
          checked={formData.agreement}
          onChange={handleChange}
          className={`h-4 w-4 text-purple-500 border-gray-300 rounded ${
            errors.agreement ? "border-red-500" : ""
          }`}
        />
        <label className="ml-2 text-sm text-gray-700">
          ฉันยินยอมให้เผยแพร่โปรไฟล์และข้อมูลการใช้บริการให้บริษัท
        </label>
      </div>
      {errors.agreement && (
        <p className="text-sm text-red-500">{errors.agreement}</p>
      )}
    </form>
  </div>
)}


        {/* Step 2 */}
        {currentStep === 2 && (
          <div className="bg-white w-full max-w-md p-6 sm:p-8 rounded-lg shadow-md text-center">
            <img
              src={Images.iconMarbel}
              alt="Icon"
              className="w-15 h-15 mx-auto mb-4"
            />
            <h2 className="text-lg font-semibold text-gray-800 mb-2">
              กรุณาตรวจสอบอีเมลของคุณ
            </h2>
            <p className="text-sm text-gray-600 mb-6">
              คลิกปุ่มยืนยันในอีเมล ปุ่มนี้จะหมดอายุภายใน 24 ชั่วโมง
            </p>
          </div>
        )}

        {/* Pop-up */}
        {showPopup && (
          <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
            <div className="bg-white p-6 rounded-lg shadow-lg text-center">
              <h2 className="text-lg font-bold text-gray-800 mb-4">
                สมัครสมาชิกสำเร็จ!
              </h2>
              <p className="text-sm text-gray-600 mb-6">
                โปรดเข้าสู่ระบบเพื่อเริ่มต้นใช้งาน
              </p>
              <button
                onClick={closePopupAndGoToProfile}
                className="bg-purple-500 text-white px-4 py-2 rounded-lg hover:bg-purple-600 transition"
              >
                ไปหน้าโปรไฟล์
              </button>
            </div>
          </div>
        )}

        {currentStep === 1 && (
          <div className="flex justify-end w-full max-w-lg mt-6 gap-4">
            <button
              type="button"
              onClick={handleBackStep}
              className={`bg-gray-300 text-gray-700 px-4 py-2 rounded-lg ${
                currentStep === 1 ? "opacity-50 cursor-not-allowed" : ""
              }`}
              disabled={currentStep === 1}
            >
              ย้อนกลับ
            </button>
            <button
              type="button"
              onClick={handleNextStep}
              className={`px-4 py-2 rounded-lg ${
                formData.agreement
                  ? "bg-purple-800 text-white"
                  : "bg-gray-300 text-gray-700"
              }`}
            >
              {currentStep === 3 ? "เสร็จสิ้น" : "ถัดไป"}
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RegisterMembership;
