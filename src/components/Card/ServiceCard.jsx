import React from "react";

const ServiceCard = ({ image, avatar, title, description, details, fortuneTeller, date }) => {
  return (
    <div className="max-w-[320px] bg-white rounded-xl shadow-md overflow-hidden border mt-5">
      {/* ส่วนของรูปภาพ */}
      <div className="relative">
        <img className="w-full h-48 object-cover" src={image} alt="Fortune" />
      </div>

      {/* ส่วนของเนื้อหา */}
      <div className="p-4">
        <h2 className="text-lg font-semibold text-gray-800">{title}</h2>
        <p className="text-gray-600 text-sm mt-2">{description}</p>

        <ul className="text-gray-700 text-sm mt-2 space-y-1">
          {details.map((item, index) => (
            <li key={index}>{item}</li>
          ))}
        </ul>

        {/* ส่วนของหมอดู */}
        <div className="flex items-center mt-4 border-t border-zinc-300 pt-3">
          <img className="w-8 h-8 rounded-full" src={avatar} alt={fortuneTeller} />
          <div className="ml-2">
            <p className="text-sm font-medium text-gray-800">{fortuneTeller}</p>
            <p className="text-xs text-gray-500">{date}</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ServiceCard;
