import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../OverviewPackage/Layout";
import PackageCardCheckbox from "../../../components/Card/PackageCardCheckbox";
import { fetchUserData } from "../../../Data/Profile/ProfileApi"; // API for fetching user data
import {
  fetchPackagePublishedData,
  updatePackageStatus,
  deletePackages,
} from "../../../Data/Package/PackageApi"; // นำเข้า updatePackageStatus จาก PackageApi

const Published = () => {
  const navigate = useNavigate();
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
        const result = await fetchPackagePublishedData(); // เรียกใช้ฟังก์ชัน fetchPackagePublishedData
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


  const handleDelete = async () => {
    if (selectedPackages.length === 0) {
      alert("กรุณาเลือกแพ็กเกจที่ต้องการลบ");
      return;
    }

    try {
      // แสดงข้อความโหลดเมื่อเริ่มการลบ
      setLoading(true);

      // ลบแต่ละแพ็กเกจที่ถูกเลือก
      for (const pkgId of selectedPackages) {
        await deletePackages(pkgId); // ลบแพ็กเกจจาก API
      }

      // รีเฟรชข้อมูลแพ็กเกจใน UI
      const updatedPackages = packages.filter(
        (pkg) => !selectedPackages.includes(pkg.id)
      );
      setPackages(updatedPackages);
      setSelectedPackages([]); // เคลียร์แพ็กเกจที่เลือก

      alert("ลบแพ็กเกจที่เลือกสำเร็จ!");
    } catch (error) {
      console.error("Error deleting packages:", error);
      alert("เกิดข้อผิดพลาดในการลบแพ็กเกจ");
    } finally {
      setLoading(false); // ยกเลิกสถานะโหลด
    }
  };


  const handleHidden = async () => {
    try {
      // เปลี่ยนสถานะของแพ็กเกจที่เลือกทั้งหมดเป็น 'hidden'
      for (const pkgId of selectedPackages) {
        await updatePackageStatus(pkgId, "hidden"); // เรียกใช้ฟังก์ชัน updatePackageStatus
      }
      setSelectedPackages([]); // รีเซ็ต selectedPackages
      alert("Selected published packages have been Hidden!");
      navigate("/package/hiddenPackage");
    } catch (error) {
      console.error("Error hiding packages:", error);
      alert("An error occurred while hiding the packages.");
    }
  };

  // Ensure packages is always an array and filter for "published" status
  const publishedPackages = Array.isArray(packages)
    ? packages.filter((pkg) => pkg.status === "published")
    : [];

  return (
    <Layout>
      {loading ? (
        <div className="text-center text-lg text-gray-500 mt-8">
          กำลังโหลดข้อมูล...
        </div>
      ) : publishedPackages.length === 0 ? (
        <div className="text-center text-lg text-gray-500 mt-8">
          ไม่มีแพ็กเกจที่ร่างไว้
        </div>
      ) : (
        <div className="flex flex-wrap gap-9 mx-auto">
          {publishedPackages.map((pkg) => (
            <div
              key={pkg.id}
              className="w-[30%] min-w-[250px] flex justify-around "
            >
              <PackageCardCheckbox
                id={pkg.id}
                imageSrc={
                  pkg.image ||
                  "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa3yrS9hPC7cLIunZiA3xEkolcqTUZWEonlIsj9zzqHOOWIemeASW.webp"
                }
                title={pkg.name}
                fortuneTeller={pkg.seer_display_name}
                imageProfile={
                  pkg.seer_image || "https://via.placeholder.com/300x300"
                }
                Category={primarySkill}
                rating={pkg.seer_rating !== null ? pkg.seer_rating : 0}
                reviews={pkg.seer_review_count}
                price={pkg.price}
                callTime={`${pkg.duration} นาที`}
                packageType={pkg.foretell_channel}
                status={pkg.status}
                isSelected={selectedPackages.includes(pkg.id)}
                onSelectClick={() => handleSelect(pkg.id)}
              />
            </div>
          ))}
        </div>
      )}

      <div className="flex justify-end mt-6 space-x-4">
        <button
          className=" text-primary py-2 w-[120px] rounded-full border-2 border-primary hover:bg-primary/60 hover:text-white focus:outline-none focus:ring-2 focus:ring-secondary/80"
          onClick={handleDelete}
          isabled={selectedPackages.length === 0}
          aria-disabled={selectedPackages.length === 0}
        >
          ลบ
        </button>

        <button
          className="bg-primary text-white py-2 w-[130px] border-2 border-secondary rounded-full hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-secondary/80"
          onClick={handleHidden}
          disabled={selectedPackages.length === 0}
        >
          ซ่อน
        </button>
      </div>
    </Layout>
  );
};

export default Published;
