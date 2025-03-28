import React from "react";
import Navbar from "../../components/navbar";
import Sidebar from "../../components/Sidebar"; 
import Revenue from "../../components/revenue"; 

export default function RevenuePage() {
  return (
    <div>
      <Navbar /> 
      <div className="flex px-12 pt-12 gap-14">
        <div className="hidden lg:block w-72">
          <Sidebar />
        </div>
        {/* Revenue Content */}
        <div className="flex-1   rounded-lg border border-gray-200 mb-10">
          <Revenue />
        </div>
      </div>
    </div>
  );
}