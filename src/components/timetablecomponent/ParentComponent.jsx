import { useState } from "react";
import dayjs from "dayjs";
import FormSection from "./FormSection";
import TimeSlots from "./TimeSlots";

const ParentComponent = () => {
  const [formData, setFormData] = useState({
    startTime: dayjs("09:00", "HH:mm"),
    endTime: dayjs("18:00", "HH:mm"),
    packageDuration: 10, // in minutes
    breakTime: 10, // in minutes
    maxSlots: 3,
    lunchBreak: {
      start: dayjs("12:00", "HH:mm"),
      end: dayjs("13:00", "HH:mm"),
    },
  });

  const handleFormChange = (updatedData) => {
    setFormData((prevData) => ({
      ...prevData,
      ...updatedData,
    }));
  };

  return (
    <div>
      <FormSection onChange={handleFormChange} />
      <TimeSlots formData={formData} />
    </div>
  );
};

export default ParentComponent;
