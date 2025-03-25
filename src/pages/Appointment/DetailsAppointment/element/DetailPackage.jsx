import React, { useState } from "react";
import { motion, AnimatePresence } from "framer-motion"; // Import AnimatePresence
import { renderInfoSection, getChannelLabel } from "../utils/utils";

const DetailPackage = ({ appointmentDetails, packageDetails }) => {
  const [isVisible, setIsVisible] = useState(false);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  return (
    <div>
      {/* ปุ่มกดเพื่อแสดง/ซ่อนรายละเอียด */}
      <button
        onClick={toggleVisibility}
        className="relative px-4 py-2 mt-4 text-black w-full text-center border-none"
      >
        {/* สร้างเส้นด้วย pseudo-elements */}
        <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full border-t border-gray-300"></span>
        <span className="relative z-10 bg-white px-2">
          {isVisible ? "ซ่อนรายละเอียดแพ็กเกจ" : "แสดงรายละเอียดแพ็กเกจ"}
        </span>
        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-full border-t border-gray-300"></span>
      </button>

      {/* ส่วนที่มีแอนิเมชัน */}
      <AnimatePresence>
        {isVisible && (
          <motion.div
            initial={{ opacity: 0, height: 0 }}
            animate={{ opacity: 1, height: "auto" }}
            exit={{ opacity: 0, height: 0 }}
            transition={{ duration: 0.3, ease: "easeInOut" }}
            className="overflow-hidden"
          >
            <div className="px-10 py-8 mt-6 border border-gray-300 rounded-md bg-gray-50">
              <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5">
                รายละเอียดแพ็กเกจ
              </h3>
              <div className="space-y-4 text-[18px]">
                {renderInfoSection("ชื่อแพ็กเกจ", appointmentDetails.package.name)}
                {renderInfoSection("ราคา (coin)", packageDetails.price + " คอยน์")}
                {renderInfoSection("เวลาที่ใช้ ", packageDetails.duration + " นาที")}
                {renderInfoSection(
                  "รูปแบบดูดวง",
                  getChannelLabel(packageDetails.foretellChannel)
                )}
                {renderInfoSection("หมวดหมู่", packageDetails.category)}
                {renderInfoSection("จำนวนคำถาม", packageDetails.questionLimit + " คำถาม")}
                {renderInfoSection("รายละเอียด", packageDetails.description)}
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default DetailPackage;
