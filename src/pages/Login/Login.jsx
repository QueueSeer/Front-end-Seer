// src/pages/Login/Login.jsx
import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../../assets";
import Navbar from "../../components/navbar"; // Navbar ที่อยู่ใน components


export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate(); // ใช้ useNavigate สำหรับนำทาง

  const handleLogin = (e) => {
    e.preventDefault(); // ป้องกันการรีเฟรชหน้า
    navigate("/fillter"); // นำทางไปยังหน้า Fillter
  };

  return (
    <div>
      <Navbar />
      <div className="flex h-screen font-notosans lg:flex-row flex-col">
        {/* ด้านซ้าย: พื้นหลังเบลอ */}
        <div className="w-full lg:w-1/2 relative flex flex-col bg-gray-50 lg:bg-gray-50 p-8">
          {/* พื้นหลังเบลอ */}
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
              Sign In to apply for <br /> a Fortune teller
            </h2>
            <p className="text-lg lg:text-xl text-gray-700 mt-4">
              Don’t Have An Account?{" "}
              <Link to="/register" className="text-purple-500 hover:underline">
                <br /> Register Here!
              </Link>
            </p>
          </div>
        </div>

        {/* ฟอร์ม Login */}
        <div className="w-full lg:w-1/2 flex flex-col justify-center items-center bg-gray-50 p-1 lg:p-8 -mt-10 lg:mt-0 mb-20">
          <div className="w-full max-w-lg p-6 md:p-10 bg-white shadow-md rounded-lg">
            <h2 className="text-2xl font-bold text-gray-900 mb-8 text-center mt-4 lg:mt-0">
              เข้าสู่ระบบ
            </h2>
            <form className="space-y-4" onSubmit={handleLogin}>
              {/* Email Field */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <img src={Images.letterIcon} alt="Email Icon" className="w-5 h-5" />
                </span>
                <input
                  type="email"
                  id="email"
                  placeholder="Email"
                  className="w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
                />
              </div>

              {/* Password Field */}
              <div className="relative">
                <span className="absolute left-4 top-1/2 transform -translate-y-1/2">
                  <img src={Images.keyIcon} alt="Password Icon" className="w-5 h-5" />
                </span>
                <input
                  type={showPassword ? "text" : "password"}
                  id="password"
                  placeholder="Password"
                  className="w-full pl-12 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600"
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

              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center">
                  <input type="checkbox" className="mr-2" />
                  Remember me
                </label>
                <Link to="/forgot-password" className="text-purple-500 hover:underline">
                  Forgot Password?
                </Link>
              </div>
              <button
                type="submit"
                className="w-full py-2 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200 relative z-10"
              >
                เข้าสู่ระบบ
              </button>
            </form>

            <div className="text-center mt-4 text-sm">
              Don’t have an account?{" "}
              <Link to="/register" className="text-purple-500 hover:underline">
                Register
              </Link>
            </div>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">OR Sign in with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button className="w-full flex items-center justify-center border border-gray-300 py-2 rounded-lg hover:bg-gray-100 transition duration-200">
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
