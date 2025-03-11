import React, { useState, useEffect } from "react";
import { createPortal } from "react-dom";
import { UpdateInfoUserData } from "../../../Data/Profile/InfoUser";
import { Updateexperienceseer } from "../../../Data/Profile/ProfileApi";

const PopupEditProfile = ({
  isOpen,
  onClose,
  userData,
  email,
  phoneNumber,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    nickname: userData?.display_name || "",
    firstName: userData?.first_name || "",
    lastName: userData?.last_name || "",
    experience: userData?.experience || "",
    phoneNumber: phoneNumber || "",
    email: email || "",
    day: "01",
    month: "มกราคม",
    year: "",
  });

  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  const thaiMonths = [
    "มกราคม",
    "กุมภาพันธ์",
    "มีนาคม",
    "เมษายน",
    "พฤษภาคม",
    "มิถุนายน",
    "กรกฎาคม",
    "สิงหาคม",
    "กันยายน",
    "ตุลาคม",
    "พฤศจิกายน",
    "ธันวาคม",
  ];

  const currentYear = new Date().getFullYear() + 543;

  useEffect(() => {
    if (userData) {
      const experienceDate = new Date(userData.experience);
  
      setFormData({
        nickname: userData.display_name || "",
        firstName: userData.first_name || "",
        lastName: userData.last_name || "",
        experience: userData.experience || "",
        phoneNumber: formatPhoneNumber(phoneNumber || ""), // ✅ ฟอร์แมตเบอร์โทรทันที
        email: email || "",
        day: experienceDate.getDate().toString().padStart(2, "0"),
        month: thaiMonths[experienceDate.getMonth()],
        year: experienceDate.getFullYear() + 543,
      });
    }
  }, [userData, phoneNumber]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    if (name === "phoneNumber") {
      let rawValue = value.replace(/\D/g, "");

      if (rawValue.length > 10) {
        rawValue = rawValue.slice(0, 10);
      }

      const formattedNumber = formatPhoneNumber(rawValue);

      setFormData((prev) => ({ ...prev, phoneNumber: formattedNumber }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const formatPhoneNumber = (value) => {
    if (value.length <= 3) {
      return value;
    } else if (value.length <= 6) {
      return `${value.slice(0, 3)}-${value.slice(3)}`;
    } else {
      return `${value.slice(0, 3)}-${value.slice(3, 6)}-${value.slice(6)}`;
    }
  };

  const handleSubmit = async () => {
    try {
      setError(null);
      setIsLoading(true);

      if (!validatePhoneNumber(formData.phoneNumber)) {
        setError("กรุณากรอกเบอร์โทรศัพท์ให้ครบ 10 หลัก");
        setIsLoading(false);
        return;
      }
      const experienceDate = new Date(
        Date.UTC(
          formData.year - 543,
          thaiMonths.indexOf(formData.month),
          formData.day
        )
      );
      const experience = experienceDate.toISOString().split("T")[0];

      console.log("Saving Experience:", experience); // Debugging

      const phoneNumberRaw = formData.phoneNumber.replace(/\D/g, "");

      const userInfoResponse = await UpdateInfoUserData(
        formData.nickname,
        formData.firstName,
        formData.lastName,
        phoneNumberRaw
      );

      if (userInfoResponse) {
        const experienceResponse = await Updateexperienceseer(experience);

        if (experienceResponse) {
          setFormData((prev) => ({
            ...prev,
            experience: experience,
          }));

          onSave({
            ...formData,
            experience,
            phoneNumber: formData.phoneNumber,
          });

          onClose();
        } else {
          setError("ไม่สามารถอัปเดตประสบการณ์ได้ โปรดลองอีกครั้ง");
        }
      } else {
        setError("ไม่สามารถบันทึกข้อมูลได้ โปรดลองอีกครั้ง");
      }
    } catch (err) {
      console.error("Error updating user data:", err);
      setError("ไม่สามารถอัปเดตข้อมูลได้ โปรดลองอีกครั้ง");
    } finally {
      setIsLoading(false);
    }
  };

  // ✅ ฟังก์ชันตรวจสอบเบอร์โทร (ต้องเป็นตัวเลข 10 ตัว)
  const validatePhoneNumber = (phone) => {
    const rawNumber = phone.replace(/\D/g, ""); // เอาเฉพาะตัวเลข
    return rawNumber.length === 10;
  };

  const generateSelectOptions = (start, end) => {
    const options = [];
    for (let i = start; i <= end; i++) {
      options.push(
        <option key={i} value={i < 10 ? `0${i}` : i}>
          {i}
        </option>
      );
    }
    return options;
  };

  if (!isOpen) return null;

  return createPortal(
    <div className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg w-[500px] shadow-lg">
        <h2 className="text-xl font-semibold mb-4 text-purple-800">
          แก้ไขโปรไฟล์
        </h2>

        {error && (
          <div className="mb-4 bg-red-100 text-red-700 p-3 rounded-md">
            {error}
          </div>
        )}

        {/* ชื่อผู้ใช้ */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            ชื่อผู้ใช้ *
          </label>
          <input
            type="text"
            name="nickname"
            className="border rounded-md px-3 py-2 w-full"
            value={formData.nickname}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        {/* ชื่อจริง - นามสกุล */}
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              ชื่อจริง *
            </label>
            <input
              type="text"
              name="firstName"
              className="border rounded-md px-3 py-2 w-full"
              value={formData.firstName}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
          <div>
            <label className="block mb-1 font-medium text-gray-700">
              นามสกุล *
            </label>
            <input
              type="text"
              name="lastName"
              className="border rounded-md px-3 py-2 w-full"
              value={formData.lastName}
              onChange={handleChange}
              disabled={isLoading}
            />
          </div>
        </div>

        {/* ประสบการณ์ */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            ประสบการณ์ *
          </label>
          <div className="grid grid-cols-3 gap-4">
            <select
              name="day"
              className="border rounded-md px-3 py-2 w-full"
              value={formData.day || "01"}
              onChange={handleChange}
              disabled={isLoading}
            >
              {generateSelectOptions(1, 31)}
            </select>
            <select
              name="month"
              className="border rounded-md px-3 py-2 w-full"
              value={formData.month || "มกราคม"}
              onChange={handleChange}
              disabled={isLoading}
            >
              {thaiMonths.map((month, i) => (
                <option key={i} value={month}>
                  {month}
                </option>
              ))}
            </select>
            <select
              name="year"
              className="border rounded-md px-3 py-2 w-full"
              value={formData.year || currentYear - 20}
              onChange={handleChange}
              disabled={isLoading}
            >
              {generateSelectOptions(currentYear - 50, currentYear).map(
                (option) => option
              )}
            </select>
          </div>
        </div>

        {/* อีเมล */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            อีเมล (ไม่สามารถเปลี่ยนได้)
          </label>
          <input
            type="email"
            name="email"
            className="border rounded-md px-3 py-2 w-full bg-gray-100"
            value={formData.email || ""}
            disabled={true} // ไม่อนุญาตให้เปลี่ยนอีเมล
            title="ไม่สามารถเปลี่ยนอีเมลได้"
          />
          <p className="text-xs text-gray-500 mt-1">ไม่สามารถเปลี่ยนอีเมลได้</p>
        </div>

        {/* เบอร์โทรศัพท์ */}
        <div className="mb-4">
          <label className="block mb-1 font-medium text-gray-700">
            เบอร์โทรศัพท์ *
          </label>
          <input
            type="text"
            name="phoneNumber"
            className="border rounded-md px-3 py-2 w-full"
            value={formData.phoneNumber}
            onChange={handleChange}
            disabled={isLoading}
          />
        </div>

        {/* ปุ่ม ยกเลิก & บันทึก */}
        <div className="flex justify-end gap-3 mt-6">
          <button
            className="bg-gray-300 px-4 py-2 rounded-md disabled:opacity-50"
            onClick={onClose}
            disabled={isLoading}
          >
            ยกเลิก
          </button>
          <button
            className="bg-purple-800 text-white px-4 py-2 rounded-md disabled:opacity-50 flex items-center justify-center"
            onClick={handleSubmit}
            disabled={isLoading}
          >
            {isLoading ? "กำลังบันทึก..." : "บันทึก"}
          </button>
        </div>
      </div>
    </div>,
    document.body
  );
};

export default PopupEditProfile;
