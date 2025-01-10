import React from 'react';

const FormSection = () => {
  return (
    <div className="grid grid-cols-2 gap-6 mb-6">
      {/* เวลาเปิดทำการ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          เวลาเปิดทำการ
        </label>
        <input
          type="text"
          placeholder="09.00-17.00 น."
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* แพคเกจที่เปิดบริการ */}
      <div>
        <label className="block text-sm font-medium text-gray-700 mb-2">
          แพคเกจที่เปิดบริการ
        </label>
        <select
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        >
          <option>เลือกแพคเกจ</option>
        </select>
      </div>

      {/* เวลาพัก */}
      <div>
        <div className="flex items-center gap-4 mb-2">
          <label className="text-sm font-medium text-gray-700">เวลาพัก</label>
          <input
            type="radio"
            name="break"
            id="break"
            className="form-radio h-4 w-4 text-purple-500 focus:ring-purple-500"
          />
          <label htmlFor="break" className="text-sm text-gray-700">
            พักเที่ยง
          </label>
        </div>
        <input
          type="text"
          placeholder="10 นาที"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>

      {/* จำนวนสูงสุดที่รับ */}
      <div>
        <div className="flex items-center gap-4 mb-2">
          <label className="text-sm font-medium text-gray-700">
            จำนวนสูงสุดที่รับ
          </label>
          <input
            type="radio"
            name="max"
            id="unlimited"
            className="form-radio h-4 w-4 text-purple-500 focus:ring-purple-500"
          />
          <label htmlFor="unlimited" className="text-sm text-gray-700">
            ไม่จำกัด
          </label>
        </div>
        <input
          type="number"
          placeholder="10"
          className="w-full border border-gray-300 rounded-lg p-3 text-sm focus:outline-none focus:ring-2 focus:ring-purple-500"
        />
      </div>
    </div>
  );
};

export default FormSection;




