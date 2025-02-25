import React, { useState } from "react";
import { useNavigate } from "react-router-dom"; // ใช้สำหรับนำทาง
import Layout from "../OverviewPackage/Layout";
import PackageCardCheckbox from "../../../components/Card/PackageCardCheckbox";
import PackageContext from "../OverviewPackage/PackageContext"; // นำเข้า context
import Images from "../../../assets";

const Drafted = () => {
  const [selectedPackages, setSelectedPackages] = useState([]); // State to track selected packages
  const [isConfirmPublishOpen, setIsConfirmPublishOpen] = useState(false); // Popup ยืนยันโพสต์
  const navigate = useNavigate(); // ใช้ useNavigate() สำหรับเปลี่ยนหน้า

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
  const openConfirmPublish = () => {
    setIsConfirmPublishOpen(true);
  };

  // Function to confirm publishing
  const confirmPublish = () => {
    PackageContext.forEach((pkg) => {
      if (pkg.status === "draft" && selectedPackages.includes(pkg.id)) {
        pkg.status = "published"; // เปลี่ยนสถานะเป็น published
      }
    });

    // Clear the selected packages after publishing
    setSelectedPackages([]);
    setIsConfirmPublishOpen(false); // ปิด Popup

    alert("แพ็กเกจที่เลือกถูกเผยแพร่เรียบร้อยแล้ว!");
  };

  // Function to handle editing selected packages
  const handleEdit = () => {
    if (selectedPackages.length > 0) {
      navigate(`/edit-draft/${selectedPackages[0]}`); // นำทางไปหน้าแก้ไขแพ็กเกจแรกที่เลือก
    }
  };

  const draftedPackages = PackageContext.filter(pkg => pkg.status === "draft"); // กรองเฉพาะแพ็กเกจที่มีสถานะเป็น "draft"

  return (
    <Layout>
      {/* Check if there are drafted packages */}
      {draftedPackages.length === 0 ? (
        <div className="text-center text-lg text-gray-500 mt-8">
          ไม่มีแพ็กเกจที่ร่างไว้
        </div>
      ) : (
        <div className="flex flex-wrap gap-9 justify-stretch mx-auto">
          {draftedPackages.map(pkg => (
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
        {/* ปุ่มแก้ไข */}
        <button
          className={`py-2 px-8 rounded-md font-semibold transition ${
            selectedPackages.length > 0
              ? "bg-gray-500 text-white hover:bg-gray-600"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={handleEdit}
          disabled={selectedPackages.length === 0} // ปิดปุ่มถ้าไม่มีแพ็กเกจที่ถูกเลือก
        >
          แก้ไข
        </button>

        {/* ปุ่มเผยแพร่ */}
        <button
          className={`py-2 px-8 rounded-md font-semibold transition ${
            selectedPackages.length > 0
              ? "bg-primary text-white hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-secondary/80"
              : "bg-gray-300 text-gray-500 cursor-not-allowed"
          }`}
          onClick={openConfirmPublish}
          disabled={selectedPackages.length === 0} // ปิดปุ่มถ้าไม่มีแพ็กเกจที่ถูกเลือก
        >
          เผยแพร่
        </button>
      </div>

      {/* Popup ยืนยันการโพสต์ */}
      {isConfirmPublishOpen && (
        <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
          <div className="bg-white rounded-lg shadow-lg p-6 w-96">
            <h2 className="text-xl font-semibold text-[#65558F] text-center mb-4">
              ยืนยันการเผยเเพร่ใช่หรือไม่?
            </h2>
            <div className="flex justify-center gap-4">
              {/* ปุ่ม "ไม่ใช่" */}
              <button
                className="bg-gray-300 text-black px-6 py-2 rounded-md font-semibold hover:bg-gray-400 transition"
                onClick={() => setIsConfirmPublishOpen(false)}
              >
                ไม่ใช่
              </button>

              {/* ปุ่ม "ใช่" */}
              <button
                className="bg-[#8677A7] text-white px-6 py-2 rounded-md font-semibold hover:bg-[#6E5A99] transition"
                onClick={confirmPublish}
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

export default Drafted;
