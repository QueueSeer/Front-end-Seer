import React, { useState, useRef, useEffect } from "react";
import { renderInfoSection, getChannelLabel } from "../../../../utils/utils";

const DetailPackage = ({ appointmentDetails, packageDetails }) => {
  const [isVisible, setIsVisible] = useState(false);
  const contentRef = useRef(null);

  const toggleVisibility = () => {
    setIsVisible(!isVisible);
  };

  useEffect(() => {
    if (contentRef.current) {
      if (isVisible) {
        contentRef.current.style.maxHeight =
          contentRef.current.scrollHeight + "px";
        contentRef.current.style.opacity = "1";
      } else {
        contentRef.current.style.maxHeight = "0px";
        contentRef.current.style.opacity = "0";
      }
    }
  }, [isVisible]);

  return (
    <div>
      <button
        onClick={toggleVisibility}
        className="relative px-4 py-2 mt-4 text-black w-full text-center border-none"
      >
        <span className="absolute left-0 top-1/2 transform -translate-y-1/2 w-full border-t border-gray-300"></span>
        <span className="relative z-10 bg-white px-2">
          {isVisible ? "ซ่อนรายละเอียดแพ็กเกจ" : "แสดงรายละเอียดแพ็กเกจ"}
        </span>
        <span className="absolute right-0 top-1/2 transform -translate-y-1/2 w-full border-t border-gray-300"></span>
      </button>

      <div
        ref={contentRef}
        className="overflow-hidden transition-all duration-300 ease-in-out opacity-0 max-h-0"
      >
        <div className="px-10 py-8 mt-6 border border-gray-300 rounded-md bg-gray-50">
          <h3 className="text-xl md:text-2xl font-semibold text-gray-800 mb-5">
            รายละเอียดแพ็กเกจ
          </h3>
          <div className="space-y-4 text-[18px]">
            {renderInfoSection(
              "ชื่อแพ็กเกจ",
              appointmentDetails.package?.name || "ประมูลดูดวง"
            )}
            {renderInfoSection("ราคา (coin)", packageDetails.price + " คอยน์")}
            {renderInfoSection(
              "เวลาที่ใช้ ",
              packageDetails.duration + " นาที"
            )}
            {renderInfoSection(
              "รูปแบบดูดวง",
              getChannelLabel(packageDetails.foretellChannel)
            )}
            {renderInfoSection("หมวดหมู่", packageDetails.category)}
            {renderInfoSection(
              "จำนวนคำถาม",
              packageDetails.questionLimit + " คำถาม"
            )}
            {renderInfoSection("รายละเอียด", packageDetails.description)}
          </div>
        </div>
      </div>
    </div>
  );
};

export default DetailPackage;
