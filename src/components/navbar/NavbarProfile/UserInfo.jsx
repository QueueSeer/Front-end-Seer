// src/components/UserInfo.jsx
import React from "react";

const UserInfo = ({ name, border }) => {
  return (
    <div
      className={`px-4 py-2 ${
        border ? "mb-1 border-b border-gray-200 dark:border-gray-600" : ""
      }`}
    >
      <span className="block text-secondary2 dark:text-white font-semibold text-[20px] ">
        {name}
      </span>
      
    </div>
  );
};

export default UserInfo;
