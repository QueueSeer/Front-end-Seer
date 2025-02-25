import React, { useState, useEffect } from "react";
import Layout from "../OverviewPackage/Layout";
import PackageCardCheckbox from "../../../components/Card/PackageCardCheckbox";
import PackageContext from "../OverviewPackage/PackageContext";
import { fetchUserData } from "../../../Data/Profile/ProfileApi"; // นำเข้า API ดึงข้อมูลหมอดู

const Drafted = () => {
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [fortuneTeller, setFortuneTeller] = useState("ไม่พบชื่อ");
  const [fortuneTellerImage, setFortuneTellerImage] = useState("https://via.placeholder.com/300x300");
  const [primarySkill, setPrimarySkill] = useState("...");

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData();
        setFortuneTeller(data.display_name || "ไม่พบชื่อ");
        setFortuneTellerImage(data.image || "https://via.placeholder.com/300x300");
        setPrimarySkill(data.primary_skill || "");
      } catch (error) {
        console.error("Error fetching fortune teller data:", error);
      }
    };

    getUserData();
  }, []);

  const handleSelect = (pkgId) => {
    setSelectedPackages((prevSelected) =>
      prevSelected.includes(pkgId)
        ? prevSelected.filter((id) => id !== pkgId)
        : [...prevSelected, pkgId]
    );
  };

  const handlePublish = () => {
    PackageContext.forEach((pkg) => {
      if (pkg.status === "draft" && selectedPackages.includes(pkg.id)) {
        pkg.status = "published";
      }
    });

    setSelectedPackages([]);
    alert("Selected drafted packages have been published!");
  };

  const draftedPackages = PackageContext.filter(pkg => pkg.status === "draft");

  return (
    <Layout>
      {draftedPackages.length === 0 ? (
        <div className="text-center text-lg text-gray-500 mt-8">
          ไม่มีแพ็กเกจที่ร่างไว้
        </div>
      ) : (
        <div className="flex flex-wrap gap-9 justify-stretch mx-auto">
          {draftedPackages.map(pkg => (
            <PackageCardCheckbox
              key={pkg.id}
              id={pkg.id}
              imageSrc="https://static.thairath.co.th/media/dFQROr7oWzulq5Fa3yrS9hPC7cLIunZiA3xEkolcqTUZWEonlIsj9zzqHOOWIemeASW.webp"
              title={pkg.title}
              fortuneTeller={fortuneTeller}
              imageProfile={fortuneTellerImage}
              Category={primarySkill}
              rating={pkg.rating}
              reviews={pkg.reviews}
              price={pkg.price}
              callTime={pkg.callTime}
              packageType={pkg.packageType}
              status={pkg.status}
              isSelected={selectedPackages.includes(pkg.id)}
              onSelectClick={() => handleSelect(pkg.id)}
            />
          ))}
        </div>
      )}

      <div className="flex justify-end mt-6">
        <button
          className="bg-primary text-white py-2 px-14 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-secondary/80"
          onClick={handlePublish}
          disabled={selectedPackages.length === 0}
        >
          เผยแพร่
        </button>
      </div>
    </Layout>
  );
};

export default Drafted;
