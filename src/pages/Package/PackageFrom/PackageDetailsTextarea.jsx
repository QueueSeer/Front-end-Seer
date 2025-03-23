// src/components/PackageForm/PackageDetailsTextarea.js
import React from "react";

const PackageDetailsTextarea = ({ details, setDetails }) => {
  return (
    <div className="pl-2 my-4">
      <label className="block text-gray-700 font-medium mb-2">
        รายละเอียดแพ็กเกจ
      </label>
      <textarea
        className="w-full h-[225px] pt-4 px-6 border border-zinc-300 rounded-md resize-none"
        value={details}
        onChange={(e) => setDetails(e.target.value)}
      />
    </div>
  );
};

export default PackageDetailsTextarea;
