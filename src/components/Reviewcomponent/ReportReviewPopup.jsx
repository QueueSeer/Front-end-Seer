import React, { useState } from "react";
import ReportConfirmationPopup from "./ReportConfirmationPopup";

const ReportReviewPopup = ({ review, onClose }) => {
  const [selectedReasons, setSelectedReasons] = useState([]);
  const [additionalDetails, setAdditionalDetails] = useState("");
  const [isConfirmationVisible, setConfirmationVisible] = useState(false);

  const reasons = [
    "ไม่เกี่ยวกับบริการ: เนื้อหาไม่เกี่ยวกับการทำนาย",
    "ภาษาหยาบคาย: ใช้คำไม่สุภาพ",
    "ละเมิดกฎแพลตฟอร์ม: โฆษณาหรือสแปม",
    "เผยแพร่ข้อมูลส่วนตัว: ละเมิดความเป็นส่วนตัว",
    "รีวิวปลอม: คอมเมนต์จากบัญชีปลอมหรือไม่มีการใช้บริการ",
    "อคติเชิงลบ: มีอคติโดยไม่มีเหตุผล",
  ];

  const isReportButtonEnabled =
    selectedReasons.length > 0 || additionalDetails.trim().length > 0;

  const handleReasonChange = (reason) => {
    setSelectedReasons((prev) =>
      prev.includes(reason)
        ? prev.filter((r) => r !== reason)
        : [...prev, reason]
    );
  };

  const handleSubmit = () => {
    if (isReportButtonEnabled) {
      console.log("Reported Review:", review);
      console.log("Selected Reasons:", selectedReasons);
      console.log("Additional Details:", additionalDetails);

      setConfirmationVisible(true);
    }
  };

  const handleCloseConfirmation = () => {
    setConfirmationVisible(false);
    onClose();
  };

  return (
    <>
      {/* Main Report Popup */}
      <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50 p-4">
        <div className="bg-white rounded-lg p-6 w-full max-w-lg shadow-lg relative">
          <button
            onClick={onClose}
            className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
          >
            ✕
          </button>
          <h2 className="text-xl text-center font-bold text-[#65558F] mb-6">
            รายงานรีวิวที่ไม่เหมาะสม
          </h2>
          <form>
            {reasons.map((reason, index) => {
              const [mainText, grayText] = reason.split(": ");
              return (
                <div key={index} className="flex items-center mb-3">
                  <input
                    type="checkbox"
                    id={`reason-${index}`}
                    value={reason}
                    checked={selectedReasons.includes(reason)}
                    onChange={() => handleReasonChange(reason)}
                    className="mr-3 w-5 h-5 rounded border-gray-400 focus:ring-[#65558F]"
                  />
                  <label
                    htmlFor={`reason-${index}`}
                    className="text-gray-700 text-sm flex items-center"
                  >
                    <span>{mainText}</span>
                    <span className="ml-1 text-[#757575]">
                      {grayText && `: ${grayText}`}
                    </span>
                  </label>
                </div>
              );
            })}
            <textarea
              placeholder="กรุณาแจ้งรายละเอียดเพิ่มเติม"
              value={additionalDetails}
              onChange={(e) => setAdditionalDetails(e.target.value)}
              className="w-full mt-4 p-3 border border-gray-300 rounded-lg resize-none text-sm focus:outline-none focus:ring-1 focus:ring-[#E0E0E0]"
              rows="4"
              style={{ borderWidth: "1px", borderColor: "#E0E0E0" }}
            />
            <div className="flex justify-end mt-4 space-x-4">
              <button
                type="button"
                onClick={onClose}
                className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg text-sm"
              >
                ยกเลิก
              </button>
              <button
                type="button"
                onClick={handleSubmit}
                disabled={!isReportButtonEnabled}
                className={`px-4 py-2 rounded-lg text-sm ${
                  isReportButtonEnabled
                    ? "bg-[#65558F] text-white"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
              >
                รายงาน
              </button>
            </div>
          </form>
        </div>
      </div>

      {/* Confirmation Popup */}
      {isConfirmationVisible && (
        <ReportConfirmationPopup onClose={handleCloseConfirmation} />
      )}
    </>
  );
};

export default ReportReviewPopup;
