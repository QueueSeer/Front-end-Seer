import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../OverviewPackage/Layout";
import PackageCardCheckbox from "../../../components/Card/PackageCardCheckbox";
import { fetchUserData } from "../../../Data/Profile/ProfileApi";
import {
  fetchPackageDraftData,
  updatePackageStatus,
  deletePackages,
} from "../../../Data/Package/PackageApi";

const Drafted = () => {
  const navigate = useNavigate();
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [user, setUser] = useState(null);
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    const fetchData = async () => {
      setLoading(true);
      setError("");

      try {
        const [userData, packageData] = await Promise.all([
          fetchUserData(),
          fetchPackageDraftData(),
        ]);
        setUser(userData);
        setPackages(packageData.packages || []);
      } catch (error) {
        console.error("Error fetching data:", error);
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    };

    fetchData();
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

  const handlePublish = async () => {
    try {
      for (const pkgId of selectedPackages) {
        await updatePackageStatus(pkgId, "published");
      }
      // รีเฟรชข้อมูลแพ็กเกจที่แสดงใหม่หลังจากการเปลี่ยนสถานะ
      const updatedPackages = packages.map((pkg) =>
        selectedPackages.includes(pkg.id)
          ? { ...pkg, status: "published" }
          : pkg
      );
      setPackages(updatedPackages);
      setSelectedPackages([]);
      alert("Selected draft packages have been published!");
      navigate("/package/published");
    } catch (error) {
      console.error("Error publishing packages:", error);
      alert("An error occurred while publishing the packages.");
    }
  };

  const draftedPackages = packages.filter((pkg) => pkg.status === "draft");

  return (
    <Layout>
      {loading ? (
        <div className="text-center text-lg text-gray-500 mt-8">
          กำลังโหลดข้อมูล...
        </div>
      ) : error ? (
        <div className="text-center text-lg text-red-500 mt-8">{error}</div>
      ) : draftedPackages.length === 0 ? (
        <div className="text-center text-lg text-gray-500 mt-8">
          ไม่มีแพ็กเกจที่ร่างไว้
        </div>
      ) : (
        <div
          className={`flex flex-wrap gap-9 mx-auto ${
            draftedPackages.length === 2 ? "justify-start" : "justify-stretch"
          }`}
        >
          {draftedPackages.map((pkg) => (
            <PackageCardCheckbox
              key={pkg.id}
              id={pkg.id}
              imageSrc={
                pkg.image ||
                "https://static.thairath.co.th/media/dFQROr7oWzulq5Fa3yrS9hPC7cLIunZiA3xEkolcqTUZWEonlIsj9zzqHOOWIemeASW.webp"
              }
              title={pkg.name}
              fortuneTeller={pkg.seer_display_name}
              imageProfile={pkg.seer_image || "https://via.placeholder.com/300"}
              Category={user?.primary_skill || "..."}
              rating={pkg.seer_rating ?? 0}
              reviews={pkg.seer_review_count}
              price={pkg.price}
              callTime={`${pkg.duration} นาที`}
              packageType={pkg.foretell_channel}
              status={pkg.status}
              isSelected={selectedPackages.includes(pkg.id)}
              onSelectClick={() => handleSelect(pkg.id)}
            />
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
          onClick={handlePublish}
          disabled={selectedPackages.length === 0}
          aria-disabled={selectedPackages.length === 0}
        >
          เผยแพร่
        </button>
      </div>
    </Layout>
  );
};

export default Drafted;
