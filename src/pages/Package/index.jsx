import React, { useState } from "react";

import Layout from "./OverviewPackage/Layout";

const Package = () => {
  return (
    <Layout>
      {/* <div className="p-4">
        <h1 className="text-2xl font-bold text-purple-600">กำลังร่าง</h1>
        <p className="mt-2 text-gray-700">
          นี่คือหน้าสำหรับ "กำลังร่าง" ของคุณ
        </p>
      </div> */}
      <div className="pt-8 flex min-h-screen">
        {/* Left Column */}
        <div className="flex-1 pr-8 pl-2 mr-4 space-y-6">
          <div className="mb-4">
            <label
              htmlFor="package-name"
              className="block text-gray-700 font-medium mb-2"
            >
              ชื่อแพคเกจ 3
            </label>
            <input
              id="package-name"
              type="text"
              placeholder="ความรักอยู่ที่ไหน"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-purple-200 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="time"
              className="block text-gray-700 font-medium mb-2"
            >
              เวลาที่ใช้ (นาที)
            </label>
            <input
              id="time"
              type="number"
              placeholder="15"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-purple-200 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="price"
              className="block text-gray-700 font-medium mb-2"
            >
              ราคา (Coin)
            </label>
            <input
              id="price"
              type="number"
              placeholder="99"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-purple-200 focus:outline-none"
            />
          </div>
          <div className="mb-4">
            <label
              htmlFor="type"
              className="block text-gray-700 font-medium mb-2"
            >
              รูปแบบดูดวง
            </label>
            <select
              id="type"
              className="w-full px-4 py-3 border border-gray-300 rounded-md focus:ring focus:ring-purple-200 focus:outline-none"
            >
              <option value="chat">ช่องทางสนทนา</option>
              <option value="call">การโทร</option>
            </select>
          </div>
        </div>

        {/* Right Column */}
        <div className="w-1/3  p-6 ">
          <div className="mb-4">
            <img
              src="https://via.placeholder.com/300"
              alt="Tarot cards"
              className="w-full h-[200px] rounded-lg mb-4"
            />
            <span className="bg-purple-200 text-purple-700 text-xs font-medium px-2 py-1 rounded-full">
              ดูดวงไพ่ยิปซี
            </span>
          </div>
          <h3 className="text-gray-800 text-lg font-semibold mb-2">
            ความรักอยู่ที่ไหน
          </h3>
          <p className="text-gray-600 text-sm mb-2">
            <span className="text-purple-700 font-medium">หมอดูแพรี่ 1</span>
          </p>
          <p className="text-yellow-500 text-sm mb-2">
            4.0 ★★★★★ <span className="text-gray-600">(935 reviews)</span>
          </p>
          <p className="text-purple-700 text-2xl font-bold mb-4">99 Coins</p>
          <div className="flex items-center text-gray-600 text-sm mb-4">
            <svg
              className="w-5 h-5 mr-1 text-gray-400"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M15 12h6m-6 0a6 6 0 110-12 6 6 0 010 12zm6 0H9m3-3v3m-3-3v3m3-3v3"
              />
            </svg>
            15 นาที
          </div>
          <button className="bg-purple-700 text-white w-full py-2 rounded-md hover:bg-purple-800">
            จองเลย
          </button>
        </div>
      </div>
    </Layout>
  );
};

export default Package;
