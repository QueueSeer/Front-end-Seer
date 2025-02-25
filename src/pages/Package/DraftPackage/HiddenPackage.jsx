import React, { useState } from "react";
import Layout from "../OverviewPackage/Layout";
import PackageCardCheckbox from "../../../components/Card/PackageCardCheckbox";
import PackageContext from "../OverviewPackage/PackageContext"; // นำเข้า context
import Images from "../../../assets";

const HiddenPackage = () => {
  const [selectedPackages, setSelectedPackages] = useState([]); // State to track selected packages
  const [hiddenPackages, setHiddenPackages] = useState(
    PackageContext.filter((pkg) => pkg.status === "hidden") // กรองเฉพาะแพ็กเกจที่ซ่อน
  );
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false); // ควบคุม Popup

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

  // Function to handle changing the status of selected packages to "published"
  const handlePublish = () => {
    const updatedPackages = hiddenPackages.map((pkg) => {
      if (selectedPackages.includes(pkg.id)) {
        return { ...pkg, status: "published" }; // เปลี่ยนสถานะเป็น published
      }
      return pkg;
    });

    setHiddenPackages(updatedPackages); // อัปเดตแพ็กเกจใน State
    setSelectedPackages([]); // ล้างแพ็กเกจที่เลือก

    alert("แพ็กเกจที่เลือกถูกเผยแพร่เรียบร้อยแล้ว!");
  };

  // Function to open confirmation popup
  const openConfirmDelete = () => {
    setIsConfirmDeleteOpen(true);
  };

  // Function to confirm delete
  const confirmDelete = () => {
    const updatedPackages = hiddenPackages.filter(
      (pkg) => !selectedPackages.includes(pkg.id) // ลบแพ็กเกจที่ถูกเลือกออก
    );

    setHiddenPackages(updatedPackages); // อัปเดตแพ็กเกจใน State
    setSelectedPackages([]); // ล้างแพ็กเกจที่เลือก
    setIsConfirmDeleteOpen(false); // ปิด Popup

    alert("แพ็กเกจที่เลือกถูกลบเรียบร้อยแล้ว!");
  };

  return (
    <Layout>
      {/* Check if there are hidden packages */}
      {hiddenPackages.length === 0 ? (
        <div className="text-center text-lg text-gray-500 mt-8">
          ไม่มีแพ็กเกจที่ซ่อน
        </div>
      ) : (
        <div className="flex flex-wrap gap-9 justify-stretch mx-auto">
          {hiddenPackages.map((pkg) => (
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
      <div className="flex justify-end gap-4 mt-6">
        {/* ปุ่มลบ */}
        <button
          className={`py-2 px-8 rounded-md font-semibold transition ${
            selectedPackages.length > 0
              ? "bg-gray-300 text-black hover:bg-gray-400"
              : "bg-gray-200 text-gray-500 cursor-not-allowed"
          }`}
          onClick={openConfirmDelete}
          disabled={selectedPackages.length === 0} // ปิดปุ่มถ้าไม่มีแพ็กเกจที่ถูกเลือก
        >
          ลบ
        </button>

        {/* ปุ่มเผยแพร่ */}
        <button
          className={`py-2 px-8 rounded-md font-semibold transition ${
            selectedPackages.length > 0
              ? "bg-primary text-white hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-secondary/80"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handlePublish}
          disabled={selectedPackages.length === 0} // ปิดปุ่มถ้าไม่มีแพ็กเกจที่ถูกเลือก
        >
          เผยแพร่
        </button>
      </div>

      {/* Popup ยืนยันการลบแพ็กเกจ */}
      {isConfirmDeleteOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-[#65558F] text-center mb-4">
              ยืนยันการลบแพ็กเกจ
            </h2>
            <div className="flex justify-center gap-4">
              {/* ปุ่ม "ไม่ใช่" */}
              <button
                className="bg-gray-300 text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-400 transition"
                onClick={() => setIsConfirmDeleteOpen(false)}
              >
                ไม่ใช่
              </button>

              {/* ปุ่ม "ใช่" */}
              <button
                className="bg-[#8677A7] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#6E5A99] transition"
                onClick={confirmDelete}
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

export default HiddenPackage;
