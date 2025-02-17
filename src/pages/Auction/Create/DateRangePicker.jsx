import React, { useState } from "react";
import { DateRange } from "react-date-range";
import { isSaturday, isSunday, isSameMonth } from "date-fns";
import { th } from "date-fns/locale";
import "react-date-range/dist/styles.css";
import "react-date-range/dist/theme/default.css";
import dayjs from "dayjs";
import "dayjs/locale/th";
import localizedFormat from "dayjs/plugin/localizedFormat";

dayjs.extend(localizedFormat);

const predefinedRanges = [
  {
    label: "วันนี้",
    getValue: () => {
      const today = dayjs();
      return [today.toDate(), today.toDate()];
    },
  },
  {
    label: "สัปดาห์นี้",
    getValue: () => {
      const today = dayjs();
      return [today.toDate(), today.add(6, "day").toDate()];
    },
  },
  {
    label: "สัปดาห์หน้า",
    getValue: () => {
      const today = dayjs();
      const nextWeek = today.add(14, "day").toDate();
      return [today.add(7, "day").toDate(), nextWeek];
    },
  },
  {
    label: "30 วันถัดไป",
    getValue: () => {
      const today = dayjs();
      const next30Days = today.add(30, "day"); // เพิ่ม 30 วันจากวันนี้
      return [today.toDate(), next30Days.toDate()];
    },
  },
  {
    label: "เดือนหน้า",
    getValue: () => {
      const today = dayjs();
      const startOfNextMonth = today.endOf("month").add(1, "day");
      return [
        startOfNextMonth.toDate(),
        startOfNextMonth.endOf("month").toDate(),
      ];
    },
  },
];

const DateRangePicker = () => {
  const today = dayjs();
  const [state, setState] = useState([
    {
      startDate: today.toDate(),
      endDate: today.toDate(),
      key: "selection",
    },
  ]);
  const [isCalendarOpen, setIsCalendarOpen] = useState(false);
  const [selectedRange, setSelectedRange] = useState(state);

  const handleSelect = (ranges) => {
    setSelectedRange([ranges.selection]);
  };

  const handlePredefinedRange = (range) => {
    setSelectedRange([
      {
        startDate: range.getValue()[0],
        endDate: range.getValue()[1],
        key: "selection",
      },
    ]);
  };

  const handleConfirm = () => {
    setState(selectedRange);
    setIsCalendarOpen(false);
  };

  const handleCancel = () => {
    setSelectedRange(state);
    setIsCalendarOpen(false);
  };

  const handleReset = () => {
    const today = dayjs().toDate();
    setSelectedRange([
      {
        startDate: today,
        endDate: today,
        key: "selection",
      },
    ]);
  };

  const isWeekend = (date) => isSaturday(date) || isSunday(date);

  const dayClassName = (date) => {
    const isInSameMonth = isSameMonth(date, new Date());
    if (isWeekend(date)) {
      if (isInSameMonth) {
        return "bg-red-700 text-white";
      } else {
        return "bg-red-200 text-white";
      }
    } else if (!isInSameMonth) {
      return "text-gray-200";
    }
    return "";
  };

  const renderCustomDayContent = (date) => {
    if (isWeekend(date)) {
      return (
        <div className="text-center text-sm font-semibold text-red-600">
          {dayjs(date).date()}
        </div>
      );
    }
    return <div className="text-center">{dayjs(date).date()}</div>;
  };

  return (
    <div className="flex flex-col mb-6">
      <label className="text-lg font-semibold text-gray-900 mb-4">
        วันที่ประมูล
      </label>

      {/* Input ที่ใช้แสดง Popup */}
      <button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="w-full px-4 py-3 border rounded-lg text-left focus:outline-none focus:ring focus:ring-primary"
      >
        {state[0].startDate === state[0].endDate
          ? `${dayjs(state[0].startDate).locale("th").format("D MMMM YYYY")}`
          : `${dayjs(state[0].startDate)
              .locale("th")
              .format("D MMMM YYYY")} - ${dayjs(state[0].endDate)
              .locale("th")
              .format("D MMMM YYYY")}`}
      </button>

      {/* Popup Calendar */}
      {isCalendarOpen && (
        <div className="bg-white border rounded-lg shadow-lg mt-2 p-4 w-auto max-w-[850px]">
          {/* Dropdown ช่วงวันที่ลัด */}
          <div className="flex flex-col space-y-2 w-[180px]">
            <select
              className="border rounded-lg px-3 py-1 mb-1 bg-white focus:outline-none focus:ring focus:ring-primary"
              onChange={(e) => {
                const selectedRange = predefinedRanges.find(
                  (range) => range.label === e.target.value
                );
                if (selectedRange) handlePredefinedRange(selectedRange);
              }}
            >
              <option value="" disabled selected>
                เลือกช่วงวันที่ลัด
              </option>
              {predefinedRanges.map((range, index) => (
                <option key={index} value={range.label}>
                  {range.label}
                </option>
              ))}
            </select>
          </div>

          {/* ปฏิทิน */}
          <div className="flex justify-center mt-4">
            <div className="w-auto max-w-[800px]">
              <DateRange
                editableDateInputs={true}
                onChange={handleSelect}
                ranges={selectedRange}
                locale={th}
                months={2} // กำหนดจำนวนเดือนที่แสดงในปฏิทิน
                className="border rounded-lg text-gray-800 h-[430px] text-lg w-auto mx-4" // ปรับขนาดอัตโนมัติ
                direction="horizontal"
                dayClassName={(date) => `${dayClassName(date)} text-[16px] `}
                renderDayContents={renderCustomDayContent}
                showDateDisplay={true}
                moveRangeOnFirstSelection={false}
              />
            </div>
          </div>

          {/* ปุ่ม ยืนยัน และ ยกเลิก */}
          <div className="flex justify-end space-x-3 mt-4">
            <button
              onClick={handleCancel}
              className="px-4 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300"
            >
              ยกเลิก
            </button>
            <button
              onClick={handleReset}
              className="px-4 py-2 bg-yellow-500 text-white rounded-lg hover:bg-yellow-600"
            >
              รีเซ็ต
            </button>
            <button
              onClick={handleConfirm}
              className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              ยืนยัน
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default DateRangePicker;
