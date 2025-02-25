import React, { useState } from "react";
import Layout from "../OverviewPackage/Layout";
import PackageCardCheckbox from "../../../components/Card/PackageCardCheckbox";
import PackageContext from "../OverviewPackage/PackageContext"; // นำเข้า context
import Images from "../../../assets";

const Published = () => {
  const [selectedPackages, setSelectedPackages] = useState([]); // State to track selected packages
  const [publishedPackages, setPublishedPackages] = useState(
    PackageContext.filter((pkg) => pkg.status === "published") // กรองเฉพาะแพ็กเกจที่เผยแพร่
  );
  const [isConfirmHideOpen, setIsConfirmHideOpen] = useState(false); // ควบคุม Popup

  // Function to handle checkbox selection
  const handleSelect = (pkgId) => {
    setSelectedPackages((prevSelected) => {
      if (prevSelected.includes(pkgId)) {
        return prevSelected.filter((id) => id !== pkgId); // Deselect
      } else {
        return [...prevSelected, pkgId]; // Select
      }
    });
  };

  // Function to open confirmation popup
  const openConfirmHide = () => {
    setIsConfirmHideOpen(true);
  };

  // Function to confirm hiding selected packages
  const confirmHide = () => {
    const updatedPackages = publishedPackages.map((pkg) => {
      if (selectedPackages.includes(pkg.id)) {
        return { ...pkg, status: "hidden" }; // เปลี่ยนสถานะเป็น hidden
      }
      return pkg;
    });

    setPublishedPackages(updatedPackages); // อัปเดตแพ็กเกจใน State
    setSelectedPackages([]); // ล้างแพ็กเกจที่เลือก
    setIsConfirmHideOpen(false); // ปิด Popup

    alert("แพ็กเกจที่เลือกถูกซ่อนเรียบร้อยแล้ว!");
  };

  return (
    <Layout>
      {/* Check if there are published packages */}
      {publishedPackages.length === 0 ? (
        <div className="text-center text-lg text-gray-500 mt-8">
          ไม่มีแพ็กเกจที่เผยแพร่
        </div>
      ) : (
        <div className="flex flex-wrap gap-9 justify-stretch mx-auto">
          {publishedPackages.map((pkg) => (
            <PackageCardCheckbox
              key={pkg.id} // ใช้ id แทน title เป็น key
              id={pkg.id}
              imageSrc="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa3yrS9hPC7cLIunZiA3xEkolcqTUZWEonlIsj9zzqHOOWIemeASW.webp"
              title={pkg.title}
              fortuneTeller={pkg.fortuneTeller}
              imageProfile={Images.gray}
              Category="ไพ่ยิปซี"
              rating={pkg.rating}
              reviews={pkg.reviews}
              price={pkg.price}
              callTime={pkg.callTime}
              packageType={pkg.packageType}
              status={pkg.status}
              isSelected={selectedPackages.includes(pkg.id)} // Check if the package is selected
              onSelectClick={() => handleSelect(pkg.id)} // Handle selection
            />
          ))}
        </div>
      )}

      {/* Buttons Section */}
      <div className="flex justify-end mt-6">
        {/* ปุ่มซ่อน */}
        <button
          className={`py-2 px-8 rounded-md font-semibold transition ${
            selectedPackages.length > 0
              ? "bg-red-500 text-white hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={openConfirmHide}
          disabled={selectedPackages.length === 0} // ปิดปุ่มถ้าไม่มีแพ็กเกจที่ถูกเลือก
        >
          ซ่อน
        </button>
      </div>

      {/* Popup ยืนยันการซ่อนแพ็กเกจ */}
      {isConfirmHideOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-[#65558F] text-center mb-4">
              ยืนยันการซ่อนแพ็กเกจ
            </h2>
            <div className="flex justify-center gap-4">
              {/* ปุ่ม "ไม่ใช่" */}
              <button
                className="bg-gray-300 text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-400 transition"
                onClick={() => setIsConfirmHideOpen(false)}
              >
                ไม่ใช่
              </button>

              {/* ปุ่ม "ใช่" */}
              <button
                className="bg-[#8677A7] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#6E5A99] transition"
                onClick={confirmHide}
              >
                ใช่
              </button>
            </div>
          </div>
        </div>
      )}
    </Layout>
  );
};

export default Published;
