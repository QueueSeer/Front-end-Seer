import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../OverviewPackage/Layout";
import PackageList from "./PackageList/PackageList";
import ConfirmationPopup from "../../../components/Popup/ConfirmationPopup";
import { fetchUserData } from "../../../Data/Profile/ProfileApi";
import {
  fetchPackageDraftData,
  updatePackageStatus,
  deletePackages,
} from "../../../Data/Package/PackageApi";

const Drafted = () => {
  const navigate = useNavigate();
  const [selectedPackages, setSelectedPackages] = useState([]);
  const [primarySkill, setPrimarySkill] = useState("...");
  const [packages, setPackages] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [isPopupOpendelete, setIsPopupOpendelete] = useState(false);

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
        const result = await fetchPackageDraftData();
        console.log("Package data:", result);
        setPackages(result.packages || []);
        setLoading(false);
      } catch (error) {
        console.error("Error fetching package data:", error);
        setLoading(false);
      }
    };

    getUserData();
    getPackageData();
  }, []);

  const handleDelete = async () => {
    if (selectedPackages.length === 0) {
      alert("กรุณาเลือกแพ็กเกจที่ต้องการลบ");
      return;
    }

    try {
      setLoading(true);
      for (const pkgId of selectedPackages) {
        await deletePackages(pkgId);
      }
      const updatedPackages = packages.filter(
        (pkg) => !selectedPackages.includes(pkg.id)
      );
      setPackages(updatedPackages);
      setSelectedPackages([]);

      alert("ลบแพ็กเกจที่เลือกสำเร็จ!");
    } catch (error) {
      console.error("Error deleting packages:", error);
      alert("เกิดข้อผิดพลาดในการลบแพ็กเกจ");
    } finally {
      setLoading(false);
    }
  };

  const handlePublish = async () => {
    try {
      for (const pkgId of selectedPackages) {
        await updatePackageStatus(pkgId, "published");
      }
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

  return (
    <Layout>
      <PackageList
        packages={packages}
        selectedPackages={selectedPackages}
        setSelectedPackages={setSelectedPackages}
        primarySkill={primarySkill}
        loading={loading}
      />
      <div className="flex justify-end mt-6 space-x-4">
        <button
          className="text-primary py-2 w-[120px] rounded-full border-2 border-primary hover:bg-primary/60 hover:text-white"
          onClick={() => setIsPopupOpendelete(true)}
          disabled={selectedPackages.length === 0}
        >
          ลบ
        </button>
        <button
          className="bg-primary text-white py-2 w-[130px] border-2 border-secondary rounded-full hover:bg-primary/80"
          onClick={() => setIsPopupOpen(true)}
          disabled={selectedPackages.length === 0}
        >
          เผยแพร่
        </button>
      </div>

      <ConfirmationPopup
        isOpen={isPopupOpen}
        onClose={() => setIsPopupOpen(false)}
        onConfirm={handlePublish}
        title="คุณยืนยันที่เผยแพร่แพ็กเกจใช่ไหม?"
        message={
          <>
            แพ็กเกจที่คุณเลือกจะสามารถมองเห็น <br />
            และเข้าใช้บริการได้ทุกคน
          </>
        }
        confirmText="เผยแพร่"
      />
      <ConfirmationPopup
        isOpen={isPopupOpendelete}
        onClose={() => setIsPopupOpendelete(false)}
        onConfirm={handleDelete}
        title="คุณต้องการที่ลบแพ็กเกจใช่ไหม?"
        message="แพ็กเกจที่เลือกจะไม่สามารถกู้คืนได้หลังจากการลบ"
        confirmText="ลบ"
      />
    </Layout>
  );
};

export default Drafted;
