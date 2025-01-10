const TimeSlots = () => {
  return (
    <div className="mb-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <h3 className="text-lg font-bold text-gray-700">แสดงเวลาตัวอย่าง</h3>
        <select className="border border-gray-300 rounded-lg p-2 text-sm">
          <option>แพคเกจที่เปิดบริการ</option>
        </select>
      </div>

      {/* ช่วงเช้าและช่วงบ่าย */}
      <div className="grid grid-cols-2 gap-6">
        {/* ช่วงเช้า */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="radio"
              name="time"
              id="morning"
              className="form-radio h-4 w-4 text-purple-500"
              defaultChecked
            />
            <label htmlFor="morning" className="text-sm text-gray-700">
              ช่วงเช้า
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["09:30", "10:00", "11:00"].map((time, index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-4 py-2 border rounded-lg text-sm ${
                  index === 0 ? "bg-gray-200" : ""
                }`}
              >
                <span>{time}</span>
                <button className="text-red-500 font-semibold">x</button>
              </div>
            ))}
          </div>
        </div>

        {/* ช่วงบ่าย */}
        <div>
          <div className="flex items-center gap-2 mb-4">
            <input
              type="radio"
              name="time"
              id="afternoon"
              className="form-radio h-4 w-4 text-gray-400"
            />
            <label htmlFor="afternoon" className="text-sm text-gray-700">
              ช่วงบ่าย
            </label>
          </div>
          <div className="grid grid-cols-2 gap-2">
            {["10:30", "11:30", "10:45", "11:45"].map((time, index) => (
              <div
                key={index}
                className={`flex items-center justify-between px-4 py-2 border rounded-lg text-sm ${
                  index < 2 ? "bg-gray-200" : ""
                }`}
              >
                <span>{time}</span>
                <button className="text-red-500 font-semibold">x</button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlots;
