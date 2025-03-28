import React from 'react';

const DateFilter = ({ dateFilter, handleDateFilterChange, uniqueMonths }) => {
  return (
    <div className="flex items-center space-x-2">
      <label htmlFor="date-filter" className="text-gray-700 dark:text-gray-300">
        วันที่
      </label>
      <select
        id="date-filter"
        name="date-filter"
        value={dateFilter}
        onChange={handleDateFilterChange}
        className="border border-gray-300 dark:border-gray-700 rounded-md p-2  bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
      >
        <option value="today">วันนี้</option>
        
        {uniqueMonths.map((month, index) => (
          <option key={index} value={month}>
            {month}
          </option>
        ))}
      </select>
    </div>
  );
};

export default DateFilter;
