import React, { useState, useEffect } from "react";
import { isSaturday, isSunday, isSameMonth } from "date-fns";
import { th } from "date-fns/locale";
import dayjs from "dayjs";
import "dayjs/locale/th";
import localizedFormat from "dayjs/plugin/localizedFormat";
import CalendarPopup from "./CalendarPopup";

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
      const next30Days = today.add(30, "day");
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

const DateRangePicker = ({ onDateChange, label }) => {
  if (typeof onDateChange !== "function") {
    console.error(
      "onDateChange is not a function. Please pass a valid callback."
    );
  }

  const today = dayjs();
  const [selectedRange, setSelectedRange] = useState([
    {
      startDate: today.toDate(),
      endDate: today.toDate(),
      key: "selection",
    },
  ]);

  const [isCalendarOpen, setIsCalendarOpen] = useState(false);

  useEffect(() => {
    if (onDateChange && selectedRange) {
      const startDate = dayjs(selectedRange[0].startDate)
        .locale("th")
        .format("YYYY-MM-DD");
      const endDate = dayjs(selectedRange[0].endDate)
        .locale("th")
        .format("YYYY-MM-DD");

      if (dayjs(startDate).isValid() && dayjs(endDate).isValid()) {
        onDateChange({
          start_time: startDate,
          end_time: endDate,
        });
      } else {
        console.error("Invalid date object", {
          start_time: startDate,
          end_time: endDate,
        });
      }
    }
  }, [selectedRange, onDateChange]);

  const handlePredefinedRange = (range) => {
    const [startDate, endDate] = range.getValue();
    setSelectedRange([
      {
        startDate: startDate,
        endDate: endDate,
        key: "selection",
      },
    ]);

    // ตรวจสอบว่า startDate และ endDate เป็น valid date หรือไม่
    const startDayjs = dayjs(startDate);
    const endDayjs = dayjs(endDate);

    const startTime = startDayjs.locale("th").format("YYYY-MM-DD");
    const endTime = endDayjs.locale("th").format("YYYY-MM-DD");

    if (startDayjs.isValid() && endDayjs.isValid()) {
      if (onDateChange) {
        onDateChange({
          start_time: startTime,
          end_time: endTime,
        });
      }
    } else {
      console.error("Invalid date object", {
        start_time: startTime,
        end_time: endTime,
      });
    }
  };

  const handleSelect = (ranges) => {
    const { startDate, endDate } = ranges.selection;
    setSelectedRange([ranges.selection]);

    // ส่งข้อมูลไปยัง onDateChange โดยใช้ format "YYYY-MM-DD"
    if (onDateChange) {
      onDateChange({
        start_time: dayjs(startDate).locale("th").format("YYYY-MM-DD"),
        end_time: dayjs(endDate).locale("th").format("YYYY-MM-DD"),
      });
    }
  };

  const handleConfirm = () => {
    setIsCalendarOpen(false);
  };

  const handleCancel = () => {
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
    if (onDateChange) {
      onDateChange({
        start_time: dayjs(today)
          .locale("th")
          .format("YYYY-MM-DDTHH:mm:ss+07:00"),
        end_time: dayjs(today).locale("th").format("YYYY-MM-DDTHH:mm:ss+07:00"),
      });
    }
  };

  const isWeekend = (date) => isSaturday(date) || isSunday(date);

  const dayClassName = (date) => {
    const isInSameMonth = isSameMonth(date, new Date());
    if (isWeekend(date)) {
      return isInSameMonth ? "bg-red-700 text-white" : "bg-red-200 text-white";
    }
    return !isInSameMonth ? "text-gray-200" : "";
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
        {label}
      </label>
      <button
        onClick={() => setIsCalendarOpen(!isCalendarOpen)}
        className="w-full px-4 py-3 border rounded-lg text-left focus:outline-none focus:ring focus:ring-primary"
      >
        {selectedRange[0].startDate === selectedRange[0].endDate
          ? `${dayjs(selectedRange[0].startDate)
              .locale("th")
              .format("D MMMM YYYY")}`
          : `${dayjs(selectedRange[0].startDate)
              .locale("th")
              .format("D MMMM YYYY")} - ${dayjs(selectedRange[0].endDate)
              .locale("th")
              .format("D MMMM YYYY")}`}
      </button>
      {isCalendarOpen && (
        <CalendarPopup
          predefinedRanges={predefinedRanges}
          handlePredefinedRange={handlePredefinedRange}
          selectedRange={selectedRange}
          handleSelect={handleSelect}
          handleConfirm={handleConfirm}
          handleCancel={handleCancel}
          handleReset={handleReset}
          dayClassName={dayClassName}
          renderCustomDayContent={renderCustomDayContent}
        />
      )}
    </div>
  );
};

export default DateRangePicker;
