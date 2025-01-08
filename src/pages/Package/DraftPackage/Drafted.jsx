import React from "react";
import Layout from "../OverviewPackage/Layout"; // Path ที่ถูกต้อง

const Drafted = () => {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-purple-600">ร่างแล้ว</h1>
        <p className="mt-2 text-gray-700">นี่คือหน้าสำหรับ "ร่างแล้ว" ของคุณ</p>
      </div>
    </Layout>
  );
};

export default Drafted;
