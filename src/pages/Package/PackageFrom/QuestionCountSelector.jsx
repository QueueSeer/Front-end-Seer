// src/components/PackageForm/QuestionCountSelector.js
import React from "react";
import QuestionCountDropdown from "../../../components/Dropdown/QuestionCountDropdown";

const QuestionCountSelector = ({ setQuestionCount }) => {
  return (
    <div className="mb-4">
      <label className="block text-gray-700 font-medium mb-2">
        จำนวนคำถาม
      </label>
      <QuestionCountDropdown onQuestionCountChange={setQuestionCount} />
    </div>
  );
};

export default QuestionCountSelector;
