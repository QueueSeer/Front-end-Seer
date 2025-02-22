import React from "react";
import DateFilterDropdown from "../../../components/Dropdown/DateFilterDropdown";

function DateDropdown() {
  const handleFilterChange1 = ({ filter, startDate, endDate }) => {
    console.log("filter วันจองคิว");
    console.log("ฟิลเตอร์ที่เลือก:", filter);
    console.log("เริ่มต้น:", startDate);
    console.log("สิ้นสุด:", endDate);
  };

  return (
    <div className="flex flex-col items-center justify-center gap-6">
      <DateFilterDropdown onFilterChange={handleFilterChange1} />

     
    </div>
  );
}

export default DateDropdown;
