import React from 'react';
import DateFilter from './DateFilter';

const FilterBar = ({ dateFilter, handleDateFilterChange, uniqueMonths }) => {
  return (
    <div className="flex flex-wrap items-center justify-between mb-6 gap-4">
      <div className="flex items-center space-x-2">
        <label htmlFor="rows" className="text-gray-700 dark:text-gray-300">
          แสดง
        </label>
        <select
          id="rows"
          name="rows"
          className="border border-gray-300 dark:border-gray-700 rounded-md p-2 bg-white dark:bg-gray-700 text-gray-700 dark:text-gray-300"
        >
          <option value="5">5 แถว</option>
          <option value="10">10 แถว</option>
          <option value="15">15 แถว</option>
        </select>
        <span className="text-gray-700 dark:text-gray-300">แถว</span>
      </div>

      <DateFilter
        dateFilter={dateFilter}
        handleDateFilterChange={handleDateFilterChange}
        uniqueMonths={uniqueMonths}
      />
    </div>
  );
};

export default FilterBar;
