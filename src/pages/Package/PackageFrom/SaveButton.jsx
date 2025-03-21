// src/components/PackageForm/SaveButton.js
import React from "react";

const SaveButton = ({ status, handleSave, isLoading }) => {
  return (
    <div className="flex justify-end">
      {status !== "draft" && (
        <p className="text-red-500 text-sm mr-4 self-center">
          แพ็กเกจนี้ได้ถูกเผยแพร่แล้ว จึงไม่สามารถบันทึกการแก้ไขรายละเอียดได้{" "}
        </p>
      )}
      <button
        className={`bg-primary text-white py-2 px-14 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-secondary/80 ${
          status !== "draft" ? "opacity-50 cursor-not-allowed" : ""
        }`}
        onClick={handleSave}
        disabled={status !== "draft" || isLoading}
      >
        บันทึก
      </button>
    </div>
  );
};

export default SaveButton;
