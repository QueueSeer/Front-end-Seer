import React from "react";
import PropTypes from "prop-types";

const MenuItem = ({ icon, children, onClick }) => {
  return (
    <li>
      <a
        href="#"
        className="flex items-center px-4 py-4 text-sm text-gray-700 hover:bg-gray-100 dark:hover:bg-gray-600 dark:text-gray-200 dark:hover:text-white"
        onClick={onClick}
      >
        {/* ไอคอน */}
        <span className="mr-2">{icon}</span>
        {/* ข้อความหรือคอนเทนต์ */}
        {children}
      </a>
    </li>
  );
};

// กำหนดประเภทของ Props
MenuItem.propTypes = {
  icon: PropTypes.node.isRequired, // ตรวจสอบให้ icon เป็นอะไรก็ได้ที่สามารถแสดงผลได้ เช่น JSX หรือ Element
  children: PropTypes.node.isRequired, // ใช้ children แทน text เพื่อให้สามารถใส่เนื้อหาหลายอย่างได้
  onClick: PropTypes.func, // ฟังก์ชันที่ใช้เมื่อคลิก
};

export default MenuItem;
