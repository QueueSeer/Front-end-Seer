const ConfirmationPopup = ({ isVisible, action, onConfirm, onClose }) => {
    if (!isVisible) return null;
  
    return (
      <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
        <div className="bg-white rounded-lg p-6 w-96 shadow-lg">
          <h2 className="text-lg font-bold mb-4 text-gray-800 text-center">
            คุณยืนยันที่จะ {action === "cancel" ? "ยกเลิกการให้บริการ?" : "ทำการบริการเสร็จสิ้น?"}
          </h2>
          <div className="flex justify-between mt-4">
            <button
              onClick={onClose}
              className="px-6 py-2 text-sm font-medium text-gray-600 bg-gray-200 hover:bg-gray-300 rounded-lg"
            >
              ยกเลิก
            </button>
            <button
              onClick={onConfirm}
              className={`px-6 py-2 text-sm font-medium rounded-lg ${action === "cancel" ? "bg-red-600 text-white hover:bg-red-700" : "bg-green-600 text-white hover:bg-green-700"}`}
            >
              ยืนยัน
            </button>
          </div>
        </div>
      </div>
    );
  };
  
  export default ConfirmationPopup;
  