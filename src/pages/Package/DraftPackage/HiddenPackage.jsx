import React, { useState, useEffect, useCallback } from "react";
import Layout from "../OverviewPackage/Layout";
import PackageCardCheckbox from "../../../components/Card/PackageCardCheckbox";
import PackageContext from "../OverviewPackage/PackageContext";
import { fetchUserData } from "../../../Data/Profile/ProfileApi"; // นำเข้า API ดึงข้อมูลหมอดู

const HiddenPackage = () => {
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [fortuneTeller, setFortuneTeller] = useState("ไม่พบชื่อ");
  const [fortuneTellerImage, setFortuneTellerImage] = useState("https://via.placeholder.com/300x300");
  const [primarySkill, setPrimarySkill] = useState("...");
  const [loading, setLoading] = useState(true); // ✅ เพิ่มตัวแปร loading

  const getUserData = useCallback(async () => {
    try {
      setLoading(true); // ✅ เริ่มโหลดข้อมูล
      const data = await fetchUserData();
      setFortuneTeller(data.display_name || "ไม่พบชื่อ");
      setFortuneTellerImage(data.image || "https://via.placeholder.com/300x300");
      setPrimarySkill(data.primary_skill || "...");
    } catch (error) {
      console.error("Error fetching fortune teller data:", error);
    } finally {
      setLoading(false); // ✅ ปิดโหลดข้อมูลเมื่อเสร็จ
    }
  }, []);

  useEffect(() => {
    getUserData();
  }, [getUserData]);

  const handleSelect = (pkgId) => {
    setSelectedPackages((prevSelected) =>
      prevSelected.includes(pkgId)
        ? prevSelected.filter((id) => id !== pkgId)
        : [...prevSelected, pkgId]
    );
  };

  const handlePublish = () => {
    PackageContext.forEach((pkg) => {
      if (pkg.status === "hidden" && selectedPackages.includes(pkg.id)) {
        pkg.status = "published";
      }
    });

    setSelectedPackages([]);
    alert("Selected hidden packages have been published!");
  };

  const hiddenPackages = PackageContext.filter(pkg => pkg.status === "hidden");

  return (
    <Layout>
      {loading ? ( // ✅ แสดง Loading ขณะโหลดข้อมูล
        <div className="text-center text-lg text-gray-500 mt-8">
          กำลังโหลดข้อมูล...
        </div>
      ) : hiddenPackages.length === 0 ? (
        <div className="text-center text-lg text-gray-500 mt-8">
          ไม่มีแพ็กเกจที่ซ่อนอยู่
        </div>
      ) : (
        <div className="flex flex-wrap gap-9 justify-stretch mx-auto">
          {hiddenPackages.map(pkg => (
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

export default HiddenPackage;
