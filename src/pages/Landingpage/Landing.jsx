import React from "react";
import Fillterbar from "../../components/fillterbar"; 
import OracleCards1 from "../../assets/images/landingpage/OracleCards1.png";
import OracleCards2 from "../../assets/images/landingpage/OracleCards2.png";
import OracleCards3 from "../../assets/images/landingpage/OracleCards3.png";
import OracleIcon from "../../assets/images/landingpage/OracleIcon.png";
import EyecheckIcon from "../../assets/images/landingpage/eyecheckIcon.png";
import Topseer from "../../assets/images/landingpage/Topseer.png";
import VideoIcon from "../../assets/icon/landingpage/videoicon.png";


const LandingPage = () => {
  return (
    <div className="bg-gray-50 min-h-screen flex flex-col">
      {/* Navbar or Filter Bar */}
      <Fillterbar />

      {/* Main Content */}
      <div className="flex flex-col items-center py-8 px-4">
        {/* Header Section */}
        <div className="text-center max-w-4xl">
          <h1 className="text-4xl font-bold text-gray-800">Qseer</h1>
          <p className="text-2xl text-purple-600 mt-2">
            ผู้ช่วยอัจฉริยะสำหรับหมอดู <br /> ยกระดับการจัดการคิวอย่างมืออาชีพ
          </p>
          <p className="text-gray-500 mt-4">
            Qseer ช่วยให้หมอดูจัดการคิวลูกค้าได้อย่างง่ายดาย เพิ่มความสะดวกในการวางแผนการทำงาน
            และทำให้ลูกค้าได้รับบริการที่รวดเร็วและมีประสิทธิภาพ
          </p>
        </div>

        {/* Buttons */}
        <div className="flex gap-4 mt-6">
          <button className="bg-purple-500 text-white py-2 px-6 rounded-lg shadow hover:bg-purple-600">
            เริ่มต้นการใช้งาน
          </button>
          <button className="border border-gray-300 flex items-center text-gray-700 py-2 px-4 rounded-lg hover:border-purple-400">
            <img src={VideoIcon} alt="Watch Demo" className="w-5 h-5 mr-2" />
            Watch Demo
          </button>
        </div>

        {/* Image Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mt-10">
          <img
            src={OracleCards1}
            alt="Oracle Card 1"
            className="rounded-lg shadow-lg"
          />
          <img
            src={OracleCards2}
            alt="Oracle Card 2"
            className="rounded-lg shadow-lg"
          />
          <img
            src={OracleCards3}
            alt="Oracle Card 3"
            className="rounded-lg shadow-lg"
          />
        </div>

        {/* Additional Icon Section */}
        <div className="flex flex-wrap gap-4 mt-10">
          <img src={OracleIcon} alt="Oracle Icon" className="w-12 h-12" />
          <img src={EyecheckIcon} alt="Eyecheck Icon" className="w-12 h-12" />
          <img src={Topseer} alt="Top Seer Icon" className="w-12 h-12" />
        </div>
      </div>
    </div>
  );
};

export default LandingPage;
