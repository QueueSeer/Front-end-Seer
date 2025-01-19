import React, { useState } from "react";
import Layout from "../OverviewPackage/Layout";
import PackageCardCheckbox from "../../../components/Card/PackageCardCheckbox";
import PackageContext from "../OverviewPackage/PackageContext"; // นำเข้า context

const Published = () => {
  const [selectedPackages, setSelectedPackages] = useState([]); // State to track selected packages

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

  // Function to handle hiding selected packages
  const handleHide = () => {
    // Update only selected packages with status "published"
    PackageContext.forEach((pkg) => {
      if (pkg.status === "published" && selectedPackages.includes(pkg.id)) {
        pkg.status = "hidden"; // Change status to "hidden"
      }
    });

    // Clear the selected packages after hiding
    setSelectedPackages([]);

    alert("Selected published packages have been hidden!");
  };

  return (
    <Layout>
      <div className="flex flex-wrap gap-9 justify-stretch px-12 mx-auto">
        {PackageContext
          .filter(pkg => pkg.status === "published") // กรองเฉพาะแพ็กเกจที่มีสถานะเป็น "published"
          .map(pkg => (
            <PackageCardCheckbox
              key={pkg.id} // ใช้ id แทน title เป็น key
              id={pkg.id}
              imageSrc="https://via.placeholder.com/300x300"
              title={pkg.title}
              fortuneTeller={pkg.fortuneTeller}
              imageProfile="https://via.placeholder.com/300x300"
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

      {/* Hide Button */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-red-500 text-white py-2 px-14 rounded-md hover:bg-red-400 focus:outline-none focus:ring-2 focus:ring-red-300"
          onClick={handleHide} // Handle hide button click
          disabled={selectedPackages.length === 0} // Disable button if no packages are selected
        >
          ซ่อน
        </button>
      </div>
    </Layout>
  );
};

export default Published;
