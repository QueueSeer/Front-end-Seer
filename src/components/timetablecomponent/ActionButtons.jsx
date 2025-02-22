const ActionButtons = ({ onSave, onReset }) => {
  return (
    <div className="flex justify-end gap-4 mt-6">
      {/* ปุ่มล้าง */}
      <button
        className="bg-gray-300 px-6 py-2 rounded-full shadow-md text-gray-700 hover:bg-gray-400 transition"
        onClick={onReset} // เรียกฟังก์ชันรีเซ็ต
      >
        ล้าง
      </button>

      {/* ปุ่มบันทึก */}
      <button
        className="bg-[#65558F] text-white px-6 py-2 rounded-full shadow-md hover:bg-[#54357A] transition"
        onClick={onSave} // เรียกฟังก์ชันบันทึก
      >
        บันทึก
      </button>
    </div>
  );
};

export default ActionButtons;
