import React, { useState } from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/Sidebar";
import ReviewHeader from "../../components/Reviewcomponent/ReviewHeader";
import ReviewFilter from "../../components/Reviewcomponent/ReviewFilter";
import ReviewList from "../../components/Reviewcomponent/ReviewList";

const ReviewPage = () => {
  const [selectedScore, setSelectedScore] = useState(null); // ค่าเริ่มต้นคือแสดงทั้งหมด
  const [selectedMonth, setSelectedMonth] = useState(null);

  return (
    <div className="min-h-screen dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex px-12 pt-12 gap-14">
        <div className="hidden lg:block w-72 lg:sticky lg:top-[88px] lg:self-start">
          <Sidebar />
        </div>
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-lg p-6">
          <ReviewHeader
            selectedMonth={selectedMonth}
            setSelectedMonth={setSelectedMonth}
          />
          <ReviewFilter setSelectedScore={setSelectedScore} />
          <ReviewList selectedScore={selectedScore} />
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
