import React from "react";
import Layout from "../OverviewPackage/Layout"; // Path ที่ถูกต้อง

const HiddenPackage = () => {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-purple-600">แพ็กเกจที่ซ่อนไว้</h1>
        <p className="mt-2 text-gray-700">
          นี่คือหน้าสำหรับ "แพ็กเกจที่ซ่อนไว้" ของคุณ
        </p>
      </div>
    </Layout>
  );
};

export default HiddenPackage;
