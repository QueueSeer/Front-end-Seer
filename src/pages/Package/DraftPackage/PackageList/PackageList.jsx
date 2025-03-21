// PackageList.js
import React from "react";
import PackageCardCheckbox from "../../../../components/Card/PackageCardCheckbox";

// ฟังก์ชันสำหรับแปลงจากวินาทีเป็นนาที
const convertSecondsToMinutes = (seconds) => {
  return seconds / 60; // แปลงจากวินาทีเป็นนาที
};

const PackageList = ({
  packages,
  selectedPackages,
  setSelectedPackages,
  primarySkill,
  loading,
}) => {
  const handleSelect = (pkgId) => {
    setSelectedPackages((prev) =>
      prev.includes(pkgId)
        ? prev.filter((id) => id !== pkgId)
        : [...prev, pkgId]
    );
  };

  return loading ? (
    <div className="text-center text-lg text-gray-500 mt-8">
      กำลังโหลดข้อมูล...
    </div>
  ) : packages.length === 0 ? (
    <div className="text-center text-lg text-gray-500 mt-8">
      ไม่มีแพ็กเกจที่ร่างไว้
    </div>
  ) : (
    <div
      className={`flex flex-wrap gap-8 mx-2 md:mx-6 md:gap-10 ${
        packages.length <= 2 ? "justify-start" : "justify-around"
      }`}
    >
      {packages.map((pkg) => (
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
          Category={primarySkill}
          rating={pkg.seer_rating ?? 0}
          reviews={pkg.seer_review_count}
          price={pkg.price}
          callTime={`${convertSecondsToMinutes(pkg.duration)} นาที`}
          packageType={pkg.foretell_channel}
          status={pkg.status}
          isSelected={selectedPackages.includes(pkg.id)}
          onSelectClick={() => handleSelect(pkg.id)}
        />
      ))}
    </div>
  );
};

export default PackageList;
