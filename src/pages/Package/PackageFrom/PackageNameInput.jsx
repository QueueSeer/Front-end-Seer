// src/components/PackageForm/PackageNameInput.js
import React from "react";

const PackageNameInput = ({ packageName, setPackageName }) => {
  return (
    <div className="mb-4">
      <label htmlFor="package-name" className="block text-gray-700 font-medium mb-2">
        ชื่อแพ็กเกจ
      </label>
      <input
        id="package-name"
        type="text"
        placeholder="ความรักอยู่ที่ไหน"
        value={packageName}
        onChange={(e) => setPackageName(e.target.value)}
        className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-purple-200 focus:outline-none"
      />
    </div>
  );
};

export default PackageNameInput;
