import React from "react";

import Navbar from "../../components/navbar"; 
import Sidebar from "../../components/Sidebar"; 
import ReviewHeader from "../../components/Reviewcomponent/ReviewHeader"; 
import ReviewFilter from "../../components/Reviewcomponent/ReviewFilter"; 
import ReviewList from "../../components/Reviewcomponent/ReviewList"; 

const ReviewPage = () => {
  return (
    <div className="min-h-screen dark:bg-gray-900 flex flex-col">
      <Navbar />
      <div className="flex px-12 pt-12 gap-14">
        {/* Sidebar */}
        <div className="hidden lg:block w-72">
          <Sidebar />
        </div>
        {/* Main Content */}
        <div className="flex-1 bg-white dark:bg-gray-800  rounded-lg border border-gray-200 rounded-lg shadow-lg p-6">
          <ReviewHeader />
          <ReviewFilter />
          <ReviewList />
        </div>
      </div>
    </div>
  );
};

export default ReviewPage;
