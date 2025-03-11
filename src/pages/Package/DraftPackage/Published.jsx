// Published.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Layout from "../OverviewPackage/Layout";
import PackageList from "./PackageList/PackageList";
import ConfirmationPopup from "../../../components/Popup/ConfirmationPopup";
import { fetchUserData } from "../../../Data/Profile/ProfileApi";
import { fetchPackagePublishedData, updatePackageStatus, deletePackages } from "../../../Data/Package/PackageApi";

const Published = () => {
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
        setLoading(true);
        const data = await fetchUserData();
        setPrimarySkill(data.primary_skill || "...");
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    const getPackageData = async () => {
      try {
        const result = await fetchPackagePublishedData();
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
    try {
      setLoading(true);
      for (const pkgId of selectedPackages) {
        await deletePackages(pkgId);
      }
      setPackages(packages.filter((pkg) => !selectedPackages.includes(pkg.id)));
      setSelectedPackages([]);
      alert("ลบแพ็กเกจที่เลือกสำเร็จ!");
    } catch (error) {
      console.error("Error deleting packages:", error);
      alert("เกิดข้อผิดพลาดในการลบแพ็กเกจ");
    } finally {
      setLoading(false);
    }
  };

  const handleHidden = async () => {
    try {
      for (const pkgId of selectedPackages) {
        await updatePackageStatus(pkgId, "hidden");
      }
      setSelectedPackages([]);
      alert("Selected published packages have been Hidden!");
      navigate("/package/hiddenPackage");
    } catch (error) {
      console.error("Error hiding packages:", error);
      alert("An error occurred while hiding the packages.");
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
        <button className="text-primary py-2 w-[120px] rounded-full border-2 border-primary hover:bg-primary/60 hover:text-white" onClick={() => setIsPopupOpendelete(true)} disabled={selectedPackages.length === 0}>
          ลบ
        </button>
        <button className="bg-primary text-white py-2 w-[130px] border-2 border-secondary rounded-full hover:bg-primary/80" onClick={() => setIsPopupOpen(true)} disabled={selectedPackages.length === 0}>
          ซ่อน
        </button>
      </div>

      <ConfirmationPopup isOpen={isPopupOpen} onClose={() => setIsPopupOpen(false)} onConfirm={handleHidden} title="คุณยืนยันที่จะซ่อนแพ็กเกจใช่ไหม?" message="แพ็กเกจที่เลือกจะไม่สามารถมองเห็นได้โดยคนทั่วไป" confirmText="ซ่อน" />
      <ConfirmationPopup isOpen={isPopupOpendelete} onClose={() => setIsPopupOpendelete(false)} onConfirm={handleDelete} title="คุณต้องการที่ลบแพ็กเกจใช่ไหม?" message="แพ็กเกจที่เลือกจะไม่สามารถกู้คืนได้หลังจากการลบ" confirmText="ลบ" />
    </Layout>
  );
};

export default Published;