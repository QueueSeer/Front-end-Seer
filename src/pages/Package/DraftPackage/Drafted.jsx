import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../OverviewPackage/Layout";
import PackageCardCheckbox from "../../../components/Card/PackageCardCheckbox";
import { fetchUserData } from "../../../Data/Profile/ProfileApi";
import {
  fetchPackageDraftData,
  updatePackageStatus,
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
              imageSrc={pkg.image || "https://via.placeholder.com/300"}
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

      <div className="flex justify-end mt-6">
        <button
          className="bg-primary text-white py-2 px-14 rounded-md hover:bg-primary/80 focus:outline-none focus:ring-2 focus:ring-secondary/80"
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
