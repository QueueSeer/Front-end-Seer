import React, { useState } from "react";
import Images from "../../../assets";
import HeaderProfile from "./HeaderProfile";
import ContentUser from "./ContentUser";
import AboutUser from "./AboutUser";

const Profile = () => {
  const Aboutme =
    "ฉันเป็นหมอดูที่มีประสบการณ์ในการทำนายดวงชะตาและให้คำปรึกษาเรื่องชีวิตส่วนตัว การงาน ความรัก และสุขภาพ ด้วยศาสตร์การพยากรณ์หลากหลายรูปแบบ เช่น ไพ่ยิปซี, โหราศาสตร์ไทย และการใช้พลังงาน จิตในการแนะนำเส้นทาง ชีวิตของคุณ ฉันตั้งใจให้คำปรึกษาที่ชัดเจนและตรงประเด็น โดยจะช่วยให้คุณ มองเห็นแนวทางในการแก้ไขปัญหา และตัดสินใจในเรื่องสำคัญอย่างมั่นใจ";

  const [isPopupOpen, setIsPopupOpen] = useState(false);

  const [textarea, setTextarea] = useState(Aboutme);

  const handleChange = (event) => {
    setTextarea(event.target.value);
  };

  // Function to toggle the popup visibility
  const togglePopup = () => setIsPopupOpen(!isPopupOpen);

  return (
    <div className="px-8 py-6 mx-auto bg-white border rounded-lg shadow-md">
      <HeaderProfile />

      <ContentUser />
      <div className="flex flex-col gap-[30px] px-[30px] pb-[18px]">
        {/* Button to show the popup */}
        <AboutUser/>

        <div>
          <h2 className="text-xl text-gray-800 font-semibold mb-4">
            เรื่องที่เชี่ยวชาญของฉัน
          </h2>
          <button  className=" border-2 px-[30px] py-[20px] rounded-[5px] w-[420px]">
            <div className="flex flex-row gap-[20px] items-center">
              <img
                src={Images.StarsIcon}
                alt="Starts Icon"
                className="mr-3 w-8 h-8 items-center"
              />
              <div className="flex flex-col gap-[5px] items-start">
                <div className="font-semibold text-black">หมวดหมู่ดูดวง</div>
                <div className="font-regular text-black/80 text-[18px]">
                  โหราศาสตร์ไทย / ไพ่ยิปซี{" "}
                </div>
              </div>
            </div>
          </button>
        </div>

        <div>
          <h2 className="text-xl text-gray-800 font-semibold mb-4">
            ช่องทางการติดตาม
          </h2>
          <button className=" border-2 h-[90px] px-[30px] py-[20px] rounded-[5px] w-[420px]">
            <div className="flex flex-row gap-[20px] items-center">
              <img
                src={Images.LinkIcon}
                alt="Starts Icon"
                className="mr-3 w-8 h-8 items-center"
              />
              <div className="flex flex-col gap-[5px] items-start">
                <div className="font-semibold text-black text-[18px]">
                  ลิงก์ช่องทางการติดตาม
                </div>
              </div>
            </div>
          </button>
        </div>

        <div>
          <h2 className="text-xl text-gray-800 font-semibold mb-4">
            ข้อมูลบัญชีพร้อมเพย์
          </h2>
          <button className=" border-2 h-[90px]  px-[30px] py-[20px] rounded-[5px] w-[420px]">
            <div className="flex flex-row gap-[20px] items-center">
              <img
                src={Images.WalletIcon}
                alt="Starts Icon"
                className="mr-3 w-8 h-8 items-center"
              />
              <div className="flex flex-col gap-[5px] items-start">
                <div className="font-semibold text-black text-[18px]">
                  บัญชีพร้อมเพย์
                </div>
              </div>
            </div>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
