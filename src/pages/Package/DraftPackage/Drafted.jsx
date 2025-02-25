import React, { useState, useEffect } from "react";
import Layout from "../OverviewPackage/Layout";
import PackageCardCheckbox from "../../../components/Card/PackageCardCheckbox";
import { fetchUserData } from "../../../Data/Profile/ProfileApi"; // API for fetching user data
import { fetchPackageDraftData } from "../../../Data/Package/PackageApi"; // นำเข้า fetchPackageDraftData จาก PackageApi

const Drafted = () => {
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [primarySkill, setPrimarySkill] = useState("...");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getUserData = async () => {
      try {
        setLoading(true); // เริ่มการโหลดข้อมูล
        const data = await fetchUserData();
        setPrimarySkill(data.primary_skill || "...");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    // ฟังก์ชันที่ใช้ดึงข้อมูลแพ็กเกจ
    const getPackageData = async () => {
      try {
        const result = await fetchPackageDraftData(); // เรียกใช้ฟังก์ชัน fetchPackageDraftData
        console.log("Package data:", result); // ตรวจสอบข้อมูลที่ได้รับจาก API
        setPackages(result.packages || []); // เข้าถึง result.packages
        setLoading(false); // ปิดการโหลดข้อมูลเมื่อข้อมูลถูกดึงมาแล้ว
      } catch (error) {
        console.error("Error fetching package data:", error);
        setLoading(false); // ปิดการโหลดข้อมูลเมื่อเกิดข้อผิดพลาด
      }
    };

    getUserData();
    getPackageData(); // เรียกใช้ฟังก์ชัน getPackageData
  }, []);

  const handleSelect = (pkgId) => {
    setSelectedPackages((prevSelected) =>
      prevSelected.includes(pkgId)
        ? prevSelected.filter((id) => id !== pkgId)
        : [...prevSelected, pkgId]
    );
  };

  const handlePublish = () => {
    setSelectedPackages([]);
    alert("Selected drafted packages have been published!");
  };

  const draftedPackages = Array.isArray(packages) 
    ? packages.filter(pkg => pkg.status === "draft") 
    : [];



  return (
    <Layout>
      {loading ? (
        <div className="text-center text-lg text-gray-500 mt-8">
          กำลังโหลดข้อมูล...
        </div>
      ) : draftedPackages.length === 0 ? (
        <div className="text-center text-lg text-gray-500 mt-8">
          ไม่มีแพ็กเกจที่ร่างไว้
        </div>
      ) : (
        <div className="flex flex-wrap gap-9 justify-stretch mx-auto">
          {draftedPackages.map((pkg) => (
           <PackageCardCheckbox
           key={pkg.id} // Using id as the unique key
           id={pkg.id} // Using id for the package id
           imageSrc={pkg.image || "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa3yrS9hPC7cLIunZiA3xEkolcqTUZWEonlIsj9zzqHOOWIemeASW.webp"} // Use the package image or default if none
           title={pkg.name}
           fortuneTeller={pkg.seer_display_name} // ใช้ค่า seer_display_name ที่ได้จาก package
           imageProfile={pkg.seer_image || "https://via.placeholder.com/300x300"} // Use the seer image or default if none
           Category={primarySkill}
           rating={pkg.seer_rating !== null ? pkg.seer_rating : 0} // ถ้า seer_rating เป็น null ให้เป็น 0
           reviews={pkg.seer_review_count}
           price={pkg.price}
           callTime={`${pkg.duration} นาที` } 
           packageType={pkg.foretell_channel}
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
