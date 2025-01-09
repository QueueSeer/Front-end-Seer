const TimeSlots = () => {
    return (
      <div className="mb-6">
        <h3 className="text-lg font-bold mb-4">แสดงเวลาว่าง</h3>
        <div className="grid grid-cols-2 gap-4">
          <div className="flex items-center gap-2">
            <input type="text" value="09:30" className="w-20 border p-2 rounded" />
            <input type="text" value="09:45" className="w-20 border p-2 rounded" />
            <button className="text-red-500">x</button>
          </div>
          {/* เพิ่มช่องเวลาเพิ่มเติม */}
        </div>
      </div>
    );
  };
  
  export default TimeSlots;
  