import React, { useEffect } from "react";
import Images from "../../assets";

const EmailVerification = () => {
  useEffect(() => {
    const getCookie = (name) => {
      const match = document.cookie.match(
        new RegExp("(^| )" + name + "=([^;]+)")
      );
      return match ? match[2] : null;
    };

    // ดึง token จาก Cookie
    const token = getCookie("verificationToken"); // ชื่อ cookie: verificationToken

    if (token) {
      // เชื่อมต่อ API
      fetch(`https://backend.qseer.app/api/user/verify/${token}`, {
        method: "GET",
        headers: {
          Accept: "application/json",
        },
      })
        .then((response) => {
          if (response.ok) {
            console.log("ยืนยันสำเร็จ!");
            alert("ยืนยันสำเร็จ! คุณสามารถเข้าสู่ระบบได้");
          } else {
            console.error("การยืนยันล้มเหลว", response.status);
            alert(`การยืนยันล้มเหลว: ${response.status}`);
          }
        })
        .catch((error) => {
          console.error("เกิดข้อผิดพลาด", error);
          alert("เกิดข้อผิดพลาดในการเชื่อมต่อ API");
        });
    } else {
      alert("ไม่พบ token ใน Cookie");
    }
  }, []);

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#65558F] p-4 sm:p-6 relative">
      {/* Card */}
      <div
        className="bg-cover bg-center rounded-lg w-full max-w-md sm:max-w-lg md:max-w-xl h-[300px] sm:h-[350px] md:h-[400px] p-4 sm:p-6 text-center relative overflow-hidden"
        style={{
          backgroundImage: `url(${Images.cardverify})`,
        }}
      >
        {/* Tick Circle */}
        <div className="absolute top-[100px] sm:top-[120px] md:top-[130px] left-1/2 transform -translate-x-1/2 rounded-full w-12 h-12 sm:w-16 sm:h-16 flex items-center justify-center">
          <img
            src={Images.tickcircle}
            alt="Tick Circle"
            className="w-10 h-10 sm:w-12 sm:h-12 md:w-14 md:h-14"
          />
        </div>

        {/* Content */}
        <div className="absolute bottom-[40px] sm:bottom-[60px] md:bottom-[80px] left-1/2 transform -translate-x-1/2 text-center">
          <h1 className="text-base sm:text-lg md:text-xl font-semibold text-black">
            เปิดใช้งานบัญชีแล้ว
          </h1>
          <p className="text-xs sm:text-sm md:text-base text-gray-600 mt-2">
            มาเริ่มการเป็นหมอดูที่ยอดเยี่ยมกันเถอะ
          </p>
        </div>
      </div>
    </div>
  );
};

export default EmailVerification;
