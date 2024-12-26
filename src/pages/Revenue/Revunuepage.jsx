import React from "react";
import Navbar from "../../components/navbar"; 
import Revenue from "../../components/revenue"; 

const RevenuePage = () => {
  return (
    <div className="min-h-screen bg-gray-100">
      {/* Navbar Component */}
      <Navbar />

      {/* Revenue Component */}
      <Revenue />
    </div>
  );
};

export default RevenuePage;
