import React, { useState } from "react";
import Layout from "../OverviewPackage/Layout";
import PackageCardCheckbox from "../../../components/Card/PackageCardCheckbox";
import PackageContext from "../OverviewPackage/PackageContext"; // นำเข้า context

const HiddenPackage = () => {
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

  // Function to handle changing the status of selected packages to "published"
  const handlePublish = () => {
    // Update only selected packages with status "hidden"
    PackageContext.forEach((pkg) => {
      if (pkg.status === "hidden" && selectedPackages.includes(pkg.id)) {
        pkg.status = "published"; // Change status to "published"
      }
    });

    // Clear the selected packages after publishing
    setSelectedPackages([]);

    alert("Selected hidden packages have been published!");
  };

  return (
    <Layout>
      <div className="flex flex-wrap gap-9 justify-stretch mx-auto">
        {PackageContext.filter((pkg) => pkg.status === "hidden") // กรองเฉพาะแพ็กเกจที่มีสถานะเป็น "hidden"
          .map((pkg) => (
            <PackageCardCheckbox
              key={pkg.id} // ใช้ id แทน title เป็น key
              id={pkg.id}
              imageSrc="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa3yrS9hPC7cLIunZiA3xEkolcqTUZWEonlIsj9zzqHOOWIemeASW.webp"
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

      {/* Publish Button */}
      <div className="flex justify-end mt-4">
        <button
          className="bg-primary text-white py-2 px-14 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-secondary/80"
          onClick={handlePublish} // Handle publish button click
          disabled={selectedPackages.length === 0} // Disable button if no packages are selected
        >
          เผยแพร่
        </button>
      </div>
    </Layout>
  );
};

export default HiddenPackage;
