import React from "react";
import Images from "../../../assets";

const Profile = () => {
  return (
    <div className="px-8 pt-6 mx-auto bg-white border rounded-lg shadow-md">
      <div className="pb-[12px] flex items-center gap-2 border-b-2">
        {/* ไอคอน */}
        <img src={Images.UserIcon} alt="User Icon" className="mr-3 w-7 h-7" />
        {/* ข้อความ */}
        <span className="text-secondary font-semibold text-xl">โปรไฟล์</span>
      </div>

      <div className="py-8 flex py-8 flex space-x-20 lg:px-[30px] lg:space-x-[100px]">
        {/* Column 1 */}
        <div className="flex-2 flex items-start">
          <div className="flex flex-col items-center">
            <div className="relative">
              <img
                // src="https://via.placeholder.com/100"
                alt="Profile Avatar"
                className="w-[200px] h-[200px] rounded-full border-2 border-purple-500"
              />
              <button
                className="absolute bottom-0 right-0 bg-purple-500 text-white text-sm p-1 rounded-full"
                title="Edit"
              >
                ✎
              </button>
            </div>
            <div className="mt-4 text-center">
              <h1 className="text-xl font-semibold">เพียงฟ้า พาชัย</h1>
            </div>
            {/* Buttons */}
            <div className="mt-3 flex flex-col gap-4 w-full">
              <button className="bg-purple-500 text-white px-4 py-2 rounded-md hover:bg-purple-600">
                แก้ไขโปรไฟล์
              </button>
              <button className="bg-gray-200 text-gray-700 px-4 py-2 rounded-md hover:bg-gray-300">
                แชร์โปรไฟล์
              </button>
            </div>
          </div>
        </div>

        {/* Column 2 */}
        <div className="flex-1 text-base">
          <h2 className="text-xl text-gray-800 font-semibold mb-4">
            ข้อมูลส่วนตัว
          </h2>
          <div className="space-y-2">
            <div className="flex">
              <div className="w-32 font-medium text-black">ชื่อหมอดู</div>
              <div>เพียงฟ้า พาชัย</div>
            </div>
            <div className="flex">
              <div className="w-32 font-medium text-black">ชื่อจริง</div>
              <div>สุรีภรณ์</div>
            </div>
            <div className="flex">
              <div className="w-32 font-medium text-black">นามสกุล</div>
              <div>นาภาลัย</div>
            </div>
            <div className="flex">
              <div className="w-32 font-medium text-black">วันเดือนปีเกิด</div>
              <div>17 ตุลาคม 2545</div>
            </div>
            <div className="flex">
              <div className="w-32 font-medium text-black">อีเมล</div>
              <div>
                <a
                  href="mailto:Sureeporn.SN@gmail.com"
                  className="text-blue-500"
                >
                  Sureeporn.SN@gmail.com
                </a>
              </div>
            </div>
            <div className="flex">
              <div className="w-32 font-medium text-black">เบอร์โทรศัพท์</div>
              <div>0956966952</div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
