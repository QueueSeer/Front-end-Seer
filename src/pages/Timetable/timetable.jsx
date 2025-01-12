import Navbar from "../../components/navbar"; 
import Sidebar from "../../components/Sidebar"; 
import CalendarHeader from "../../components/timetablecomponent/CalendarHeader"; 
import FormSection from "../../components/timetablecomponent/FormSection"; 
import TimeSlots from "../../components/timetablecomponent/TimeSlots"; 
import ActionButtons from "../../components/timetablecomponent/ActionButtons"; 
import ToggleSwitch from "../../components/timetablecomponent/ToggleSwitchComponent";

const timetable = () => {
  const handleToggleChange = (index) => {
    console.log("Toggle changed to:", index === 0 ? "ใช้เฉพาะวันนี้" : "ใช้ทั้งสัปดาห์");
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
  {/* Calendar Header */}
  <CalendarHeader />

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
  <FormSection />
  <TimeSlots />
  <ActionButtons />
</div>


      </div>
    </div>
  );
};

export default timetable;


