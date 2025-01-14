import { useState } from "react";

const ToggleSwitch = ({ options, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex(index);
    if (onChange) {
      onChange(index); // ส่งค่า index ไปยัง Parent Component
    }
  };

  return (
    <div className="flex gap-6 items-center">
      {options.map((option, index) => (
        <div
          key={index}
          className="flex items-center gap-4 cursor-pointer"
          onClick={() => handleToggle(index)}
        >
          {/* Label */}
          <span
            className={`text-sm font-semibold transition ${
              activeIndex === index ? "text-gray-800" : "text-gray-400"
            }`}
          >
            {option.label}
          </span>

          {/* Toggle */}
          <div
            className={`relative w-14 h-7 rounded-full transition-all duration-300 ${
              activeIndex === index ? "bg-purple-600" : "bg-gray-300"
            }`}
          >
            <div
              className={`absolute top-1 left-1 w-5 h-5 bg-white rounded-full shadow-md transition-transform duration-300 ${
                activeIndex === index ? "translate-x-7" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToggleSwitch;
