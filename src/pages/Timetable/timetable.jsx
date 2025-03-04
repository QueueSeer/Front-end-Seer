import Navbar from "../../components/navbar"; 
import Sidebar from "../../components/Sidebar"; 
import CalendarHeader from "../../components/timetablecomponent/CalendarHeader"; 
import FormSection from "../../components/timetablecomponent/FormSection"; 
import TimeSlots from "../../components/timetablecomponent/TimeSlots"; 
import ActionButtons from "../../components/timetablecomponent/ActionButtons"; 
import ToggleSwitch from "../../components/timetablecomponent/ToggleSwitchComponent";
import FullCalendarPage from "../../components/timetablecomponent/FullCalendarPage"; // เพิ่ม FullCalendarPage

import { useState } from "react";

const timetable = () => {
  const [showFullCalendar, setShowFullCalendar] = useState(false); // State สำหรับสลับหน้า
  const [formData, setFormData] = useState(null); // เก็บข้อมูลที่กรอกจาก FormSection
  const [toggleOption, setToggleOption] = useState(0); // เก็บสถานะของ ToggleSwitch (วันนี้/ทั้งสัปดาห์)

  const handleToggleChange = (index) => {
    setToggleOption(index); // เก็บสถานะของ ToggleSwitch
    console.log(`Toggle switched to: ${index === 0 ? "Today" : "This Week"}`);
  };

  const handleSave = (data) => {
    // บันทึกข้อมูลฟอร์มและสลับไปยังหน้า FullCalendarPage
    setFormData(data);
    setShowFullCalendar(true);
  };

  const handleEdit = () => {
    // กลับไปที่หน้าฟอร์ม
    setShowFullCalendar(false);
  };

  const handlePost = () => {
    // แสดง Popup แจ้งว่าโพสต์สำเร็จ
    alert("โพสต์ข้อมูลสำเร็จ!");
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex px-12 pt-12 gap-14">
        {/* Sidebar */}
        <div className="hidden lg:block w-72">
          <Sidebar />
        </div>

        {/* Main Content */}
        <div className="relative flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-lg p-6">
          {showFullCalendar ? (
            // แสดงหน้า FullCalendarPage
            <FullCalendarPage onEdit={handleEdit} onPost={handlePost} formData={formData} />
          ) : (
            <>
              {/* Calendar Header */}
              <CalendarHeader toggleOption={toggleOption} />

              {/* ToggleSwitch: วางถัดจาก CalendarHeader */}
              <div className="mt-4 flex justify-end">
                <ToggleSwitch
                  options={[
                    { label: "ใช้เฉพาะวันนี้" },
                    { label: "ใช้ทั้งสัปดาห์" },
                  ]}
                  onChange={handleToggleChange}
                />
              </div>

              {/* Other components */}
              <FormSection
                onSave={(data) => setFormData(data)} // รับข้อมูลจากฟอร์มและบันทึกลง state
              />
              <TimeSlots formData={formData} toggleOption={toggleOption} /> {/* ส่ง toggleOption เพื่อปรับการแสดงผล */}
              <ActionButtons onSave={() => handleSave(formData)} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default timetable;
