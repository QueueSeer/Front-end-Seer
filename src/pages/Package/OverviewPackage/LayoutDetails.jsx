import React from "react";

import Navbar from "../../../components/navbar"; // เรียกใช้ path ที่ถูกต้อง
import Sidebar from "../../../components/Sidebar"; // เรียกใช้ path ที่ถูกต้อง
import Images from "../../../assets";
import Header from "../../../components/Profile/Header";
import BackButton from "../../../components/Button/BackButton";

const LayoutDetails = ({ children }) => {
  return (
    <div>
      {/* Navbar */}
      <Navbar />
      {/* Main Content */}
      <div className="flex px-12 pt-12 gap-14">
        {/* Sidebar */}
        <div className="hidden lg:block w-72">
          <Sidebar activeOverride={2} /> {/* กำหนด activeOverride เป็น 2 */}
        </div>
        {/* Content */}
        <div className="flex-1 pb-10">
          <div className="px-8 py-6 mx-auto bg-white border rounded-lg shadow-md">
            <Header image={Images.BoxIcon} alt="BoxIcon Icon" text="แพ็กเกจ" />
            <div className="flex flex-wrap gap-4 pt-10 justify-start items-center pb-8 relative">
                <BackButton />
            </div>
            {children}
          </div>
        </div>
      </div>
    </div>
  );
};

export default LayoutDetails;
