import Navbar from "../../components/navbar";
import Sidebar from "../../components/Sidebar";
import CalendarHeader from "../../components/timetablecomponent/CalendarHeader";
import FormSection from "../../components/timetablecomponent/FormSection";
import TimeSlots from "../../components/timetablecomponent/TimeSlots";
import ActionButtons from "../../components/timetablecomponent/ActionButtons";
import ToggleSwitch from "../../components/timetablecomponent/ToggleSwitchComponent";
import FullCalendarPage from "../../components/timetablecomponent/FullCalendarPage";
import { useState, useEffect } from "react";
import { fetchUserData } from "../../Data/Profile/ProfileApi";

const Timetable = () => {
  const [showFullCalendar, setShowFullCalendar] = useState(false);
  const [formData, setFormData] = useState(null);
  const [toggleOption, setToggleOption] = useState(0);
  const [userId, setUserId] = useState(null);
  
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

  return (
    <div className="min-h-screen dark:bg-gray-900 flex flex-col pb-10">
      <Navbar />
      <div className="flex px-12 pt-12 gap-14">
        <div className="hidden lg:block w-72 lg:sticky lg:top-[88px] lg:self-start">
          <Sidebar />
        </div>

        <div className="relative flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-lg p-6">
          {showFullCalendar ? (
            <FullCalendarPage onEdit={handleEdit} onPost={handlePost} formData={formData} />
          ) : (
            <>
              <CalendarHeader toggleOption={toggleOption} seerId={userId} />
              <FormSection onSave={(data) => setFormData(data)} userId={userId} />
              <TimeSlots formData={formData} toggleOption={toggleOption} />
              <ActionButtons onSave={() => handleSave(formData)} />
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default Timetable;