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
    label: "Today",
    getValue: () => {
      const today = dayjs();
      return [today.toDate(), today.toDate()];
    },
  },
  {
    label: "This Week",
    getValue: () => {
      const today = dayjs();
      return [today.toDate(), today.add(6, "day").toDate()];
    },
  },
  {
    label: "Next Week",
    getValue: () => {
      const today = dayjs();
      const nextWeek = today.add(1, "week").startOf("week");
      return [nextWeek.toDate(), nextWeek.endOf("week").toDate()];
    },
  },
  {
    label: "Current Month",
    getValue: () => {
      const today = dayjs();
      return [today.startOf("month").toDate(), today.endOf("month").toDate()];
    },
  },
  {
    label: "Next Month",
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

  const handleSelect = (ranges) => {
    setState([ranges.selection]);
  };

  const handlePredefinedRange = (range) => {
    setState([
      {
        startDate: range.getValue()[0],
        endDate: range.getValue()[1],
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
    <div className="flex flex-col space-y-6">
      <label className="text-gray-600 text-sm mb-1">วันที่เปิดประมูล</label>
      <div className="relative flex gap-4">
        <div className="w-3/4 h-100">
          <DateRange
            editableDateInputs={true}
            onChange={handleSelect}
            ranges={state}
            locale={th}
            months={2} // แสดง 2 เดือน
            direction="horizontal"
            className="border rounded-lg text-gray-800"
            dayClassName={dayClassName}
            renderDayContents={renderCustomDayContent}
            showDateDisplay={true}
            moveRangeOnFirstSelection={false} // ห้ามย้ายเดือนเมื่อเลือกวันที่
          />
        </div>

        <div className="w-1/4 border-l pl-4 space-y-2">
          <h3 className="text-gray-700 font-semibold">ช่วงวันที่ลัด</h3>
          {predefinedRanges.map((range, index) => (
            <button
              key={index}
              className="w-full text-left px-4 py-2 bg-gray-100 rounded hover:bg-gray-200 transition"
              onClick={() => handlePredefinedRange(range)}
            >
              {range.label}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DateRangePicker;
