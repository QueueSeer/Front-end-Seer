import React, { useState } from "react";
import { Link } from "react-router-dom";
import Images from "../../assets";
import Navbar from "../../components/navbar"; // เรียกใช้ path ที่ถูกต้อง

export default function Register() {
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  return (
    <div>
      <Navbar /> {/* เรียกใช้ Navbar */}
      <div className="flex h-screen font-sans lg:flex-row flex-col">
        {/* ด้านซ้าย: พื้นหลังเบลอ */}
        <div className="w-full lg:w-1/2 relative flex flex-col bg-gray-50 lg:bg-gray-50 p-8">
          {/* ส่วนพื้นหลังและภาพที่ไม่เปลี่ยน */}
          <div className="absolute top-5 left-10 rounded-full w-96 h-96 bg-yellow-100 opacity-70 blur-3xl hidden lg:block"></div>
          <div className="absolute top-1/2 right-[25%] transform -translate-y-1/2 rounded-full w-96 h-96 bg-purple-300 opacity-70 blur-3xl hidden lg:block"></div>
          <div className="absolute top-1/2 right-[1%] transform -translate-y-1/2 rounded-full w-96 h-96 bg-purple-200 opacity-70 blur-3xl hidden lg:block"></div>
          <img
            src={Images.marble}
            alt="marble"
            className="w-36 h-36 mx-auto mt-1 lg:absolute lg:top-[calc(50%-60px)] lg:right-[calc(30px)] lg:left-30 lg:transform lg:-translate-y-1/2 lg:translate-x-[calc(10px)] lg:w-[28rem] lg:h-[28rem] lg:mx-0"
          />

          <div className="relative z-10 ml-10 mt-10 hidden lg:block">
            <h2 className="text-2xl lg:text-4xl font-bold text-gray-800">
              Sign Up to <br /> booking Qseer
            </h2>
            <p className="text-lg lg:text-xl text-gray-700 mt-4">
              If You Have An Account? <br /> You Can
              <Link to="/login" className="text-purple-500 hover:underline ml-2">
                Login Here!
              </Link>
            </p>
          </div>
        </div>

      {/* ฟอร์ม Register */}
      <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gray-50 px-6 lg:px-20 mt-0 lg:mt-0 mb-4 lg:mb-12 relative lg:static top-[-20px] lg:top-0">
  <div className="w-full max-w-2xl p-6 bg-white shadow-lg rounded-lg">
    <h2 className="text-2xl font-bold text-gray-900 mb-6 text-center">
              ลงทะเบียน
            </h2>
            <form className="space-y-4">
              {/* User Name และ ID Name */}
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="Username"
                  className="w-1/2 py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                />
                <input
                  type="text"
                  placeholder="Display Name"
                  className="w-1/2 py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                />
              </div>

              {/* First Name และ Last Name */}
              <div className="flex space-x-4">
                <input
                  type="text"
                  placeholder="First Name"
                  className="w-1/2 py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                />
                <input
                  type="text"
                  placeholder="Last Name"
                  className="w-1/2 py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                />
              </div>

              {/* Email และ Phone Number */}
              <div className="flex space-x-4">
                <input
                  type="email"
                  placeholder="Email"
                  className="w-1/2 py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                />
                <input
                  type="text"
                  placeholder="Phone Number"
                  className="w-1/2 py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                />
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                />
                <span
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? Images.eyeopenIcon : Images.eyeIcon}
                    alt="Toggle Password Visibility"
                    className="w-5 h-5"
                  />
                </span>
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className="w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm"
                />
                <span
                  className="absolute right-4 top-1/2 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img
                    src={showConfirmPassword ? Images.eyeopenIcon : Images.eyeIcon}
                    alt="Toggle Confirm Password Visibility"
                    className="w-5 h-5"
                  />
                </span>
              </div>

              {/* ปุ่มยืนยัน */}
              <button
                type="submit"
                className="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200"
              >
                ยืนยัน
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">OR Sign in with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition duration-200">
              <img
                src="https://www.google.com/favicon.ico"
                alt="Google icon"
                className="w-5 h-5 mr-2"
              />
              Login with Google
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}