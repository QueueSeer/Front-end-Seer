import React from 'react';
import DateFilter from './DateFilter';

const FilterBar = ({ dateFilter, handleDateFilterChange, uniqueMonths }) => {
  return (
    <div className="flex flex-wrap items-center justify-between mb-6 gap-4">

      <DateFilter
        dateFilter={dateFilter}
        handleDateFilterChange={handleDateFilterChange}
        uniqueMonths={uniqueMonths}
      />
    </div>
  );
};

export default FilterBar;
