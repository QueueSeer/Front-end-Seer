import { useState } from "react";

const ToggleSwitch = ({ options, onChange }) => {
  const [activeIndex, setActiveIndex] = useState(0);

  const handleToggle = (index) => {
    setActiveIndex(index);
    if (onChange) {
      onChange(index);
    }
  };

  return (
    <div className="flex flex-col gap-4">
      {options.map((option, index) => (
        <div
          key={index}
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => handleToggle(index)}
        >
          <span
            className={`text-sm font-medium ${
              activeIndex === index ? "text-gray-700" : "text-gray-400"
            }`}
          >
            {option.label}
          </span>
          <div
            className={`w-12 h-6 flex items-center rounded-full p-1 ${
              activeIndex === index ? "bg-[#65558F]" : "bg-gray-300"
            }`}
          >
            <div
              className={`w-4 h-4 bg-white rounded-full shadow-md transform duration-300 ${
                activeIndex === index ? "translate-x-6" : "translate-x-0"
              }`}
            ></div>
          </div>
        </div>
      ))}
    </div>
  );
};

export default ToggleSwitch;
