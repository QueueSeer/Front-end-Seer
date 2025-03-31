import React, { useState, useEffect } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/Sidebar";
import CalendarHeader from "../../components/timetablecomponent/CalendarHeader";
import FormSection from "../../components/timetablecomponent/FormSection";
import TimeSlots from "../../components/timetablecomponent/TimeSlots";
import ActionButtons from "../../components/timetablecomponent/ActionButtons";
import ToggleSwitch from "../../components/timetablecomponent/ToggleSwitchComponent";
import FullCalendarPage from "../../components/timetablecomponent/FullCalendarPage";
import HolidaySection from "../../components/timetablecomponent/HolidaySection"; // Import the HolidaySection
import { fetchUserData } from "../../Data/Profile/ProfileApi";
import Header from "../../components/Profile/Header";
import images from "../../assets";

const Timetable = () => {
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [formData, setFormData] = useState(null);
  const [toggleOption, setToggleOption] = useState(0);
  const [userId, setUserId] = useState(null);
  const [holiday, setHoliday] = useState(""); // State for holiday
  const [holidayError, setHolidayError] = useState(""); // Error for holiday
  const [holidaySaved, setHolidaySaved] = useState(false); // Track if holiday is saved successfully

  useEffect(() => {
    const getUserData = async () => {
      try {
        const userData = await fetchUserData();
        setUserId(userData.id);
      } catch (error) {
        console.error("Failed to fetch user data:", error);
      }
    };
    getUserData();
  }, []);

  const handleToggleChange = (index) => {
    setToggleOption(index);
    console.log(`Toggle switched to: ${index === 0 ? "Today" : "This Week"}`);
  };

  const handleSave = (data) => {
    setFormData(data);
    setShowFullCalendar(true);
  };

  const handleEdit = () => {
    setShowFullCalendar(false);
  };

  const handlePost = () => {
    alert("โพสต์ข้อมูลสำเร็จ!");
  };

  const handleHolidayChange = (value) => {
    setHoliday(value);
    setHolidayError(""); // Clear holiday error on change
  };

  const handleHolidayReset = () => {
    setHoliday("");
    setHolidayError("");
    setHolidaySaved(false);
    alert("ล้างข้อมูลวันหยุดสำเร็จ!");
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 flex flex-col pb-10 relative">
      {/* Navbar (อยู่หน้าสุด) */}
      <div className="fixed top-0 left-0 w-full z-[1000] shadow-md bg-white dark:bg-gray-900">
        <Navbar />
      </div>

      <div className="flex px-12 pt-[80px] gap-14">
        {/* Sidebar */}
        <div className="hidden lg:block w-72 lg:sticky lg:top-[88px] lg:self-start z-[900]">
          <Sidebar />
        </div>

        {/* Content */}
        <div className="relative flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-lg p-6 z-[800]">
          {showFullCalendar ? (
            <FullCalendarPage
              onEdit={handleEdit}
              onPost={handlePost}
              formData={formData}
            />
          ) : (
            <>
              <div className="pb-10">
                <Header
                  image={images.Clock_CircleIcon}
                  alt="Clock_CircleIcon Icon"
                  text="ตารางเวลา"
                />
              </div>

              <CalendarHeader toggleOption={toggleOption} seerId={userId} />
              {userId && (
                <FormSection
                  onSave={(data) => setFormData(data)}
                  userId={userId}
                />
              )}

              {/* Include the Holiday Section */}
              <HolidaySection
                holiday={holiday}
                onHolidayChange={handleHolidayChange}
                onHolidaySave={setHolidaySaved}
                onResetHoliday={handleHolidayReset}
                error={holidayError}
                userId={userId}
              />
              {holidaySaved && (
                <p className="text-green-500 mt-2">วันหยุดถูกบันทึกแล้ว</p>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timetable;
