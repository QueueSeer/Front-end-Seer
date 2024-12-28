import React from "react";
import HeaderAppointment from "./HeaderAppointment";
import DateDropdown from "./DateDropdown";

const Appointment = () => {
  return (
    <div className="px-8 py-6 mx-auto bg-white border rounded-lg shadow-md">
      <HeaderAppointment />
      <div className="py-8 flex items-start space-y-0 flex-row space-x-[100px] ">
        <DateDropdown />
      </div>
    </div>
  );
};

export default Appointment;
