import React, { useState } from "react";

const PredefinedRangeSelector = ({ predefinedRanges, handlePredefinedRange }) => {
  const [selectedLabel, setSelectedLabel] = useState(""); // Manage selected value in state

  const handleSelectChange = (e) => {
    const selectedRange = predefinedRanges.find(
      (range) => range.label === e.target.value
    );
    if (selectedRange) {
      handlePredefinedRange(selectedRange);
      setSelectedLabel(e.target.value); // Update the selected value in state
    }
  };

  return (
    <div className="flex flex-col space-y-2 w-[180px]">
      <select
        className="border border-secondary2 rounded-lg px-3 py-1 mb-1 bg-white focus:outline-none focus:ring focus:ring-primary"
        value={selectedLabel} // Use value prop to control selected option
        onChange={handleSelectChange}
      >
        <option value="" disabled>
          เลือกช่วงวันที่ลัด
        </option>
        {predefinedRanges.map((range, index) => (
          <option key={index} value={range.label}>
            {range.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default PredefinedRangeSelector;
