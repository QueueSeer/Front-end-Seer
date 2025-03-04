import React from "react";

const InfoUser = ({ userData }) => {
  // ฟังก์ชันแปลงวันที่เป็นรูปแบบที่ต้องการ
  const formatDate = (dateString) => {
    const options = { year: "numeric", month: "long", day: "numeric" };
    const date = new Date(dateString);
    return date.toLocaleDateString("th-TH", options); // ใช้ locale เป็น 'th-TH' เพื่อให้แสดงเดือนภาษาไทย
  };

  const renderInfo = (label, value) => {
    return (
      <div className="flex">
        <div className="w-40 font-medium text-black">{label}</div>
        <div>{value || "ไม่มีข้อมูล"}</div>
      </div>
    );
  };

  return (
    <div className="flex-1 text-base">
      <h2 className="text-[24px] text-gray-800 font-semibold mb-6">
        ข้อมูลส่วนตัว
      </h2>
      <div className="space-y-4 text-[18px]">
        {renderInfo("ชื่อหมอดู", userData?.display_name)}
        {renderInfo("ชื่อจริง", userData?.first_name)}
        {renderInfo("นามสกุล", userData?.last_name)}
        {renderInfo("วันเริ่มประสบการณ์", userData?.experience ? formatDate(userData.experience) : undefined)}
        {renderInfo("อีเมล", userData?.email)}
        {renderInfo("เบอร์โทรศัพท์", userData?.phone)}
      </div>
    </div>
  );
};

export default InfoUser;
