import React from "react";

const ConfirmationPopup = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText,
}) => {
  if (!isOpen) return null;

  return (
    <div
    className="fixed top-0 left-0 w-screen h-screen flex items-center justify-center bg-black bg-opacity-50 z-[9999]"
      onClick={onClose}
    >
      <div
        className="bg-white px-8 py-8 rounded-xl shadow-lg w-[450px] h-auto flex flex-col justify-between text-center space-y-4"
        onClick={(e) => e.stopPropagation()}
      >
        <h2 className="text-[22px] font-semibold text-gray-900 pt-3">
          {title}
        </h2>
        <p className="text-[18px] text-gray-600">{message}</p>
        <div className="flex justify-center gap-5 pt-1">
          <button
            className="bg-primary text-white py-2 w-[130px] border-2 border-secondary rounded-full hover:bg-primary/80"
            onClick={onConfirm}
          >
            {confirmText}
          </button>
          <button
            className="text-primary py-2 w-[120px] rounded-full border-2 border-primary hover:bg-primary/60 hover:text-white"
            onClick={onClose}
          >
            ย้อนกลับ
          </button>
        </div>
      </div>
    </div>
  );
};

export default ConfirmationPopup;
