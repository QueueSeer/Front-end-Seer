import React from "react";
import Layout from "../OverviewPackage/Layout"; // Path ที่ถูกต้อง

const Published = () => {
  return (
    <Layout>
      <div className="p-4">
        <h1 className="text-2xl font-bold text-purple-600">เผยแพร่แล้ว</h1>
        <p className="mt-2 text-gray-700">
          นี่คือหน้าสำหรับ "เผยแพร่แล้ว" ของคุณ
        </p>
      </div>
    </Layout>
  );
};

export default Published;
