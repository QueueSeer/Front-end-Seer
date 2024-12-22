import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { GoogleOAuthProvider, GoogleLogin } from "@react-oauth/google";
import axios from "axios";
import Images from "../../assets";
import Navbar from "../../components/navbar";

const GOOGLE_CLIENT_ID = "482872878938-qln7jlcv0elrffnnaqd4qpqs43jh4ob9.apps.googleusercontent.com";

export default function Login() {
  const [showPassword, setShowPassword] = useState(false);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const matchMedia = window.matchMedia("(prefers-color-scheme: dark)");
    setIsDarkMode(matchMedia.matches);

    const handleChange = (e) => setIsDarkMode(e.matches);
    matchMedia.addEventListener("change", handleChange);

    return () => matchMedia.removeEventListener("change", handleChange);
  }, []);

  const handleGoogleLoginSuccess = async (credentialResponse) => {
    const idToken = credentialResponse.credential;

    try {
      const formData = new URLSearchParams();
      formData.append("credential", idToken);

      const response = await axios.post(
        "https://backend.qseer.app/api/access/google/signin",
        formData,
        {
          headers: {
            "Content-Type": "application/x-www-form-urlencoded",
          },
        }
      );

      if (response.status === 200) {
        console.log("Login Successful:", response.data);
      }
    } catch (error) {
      console.error("Error:", error.response?.data || error.message);
    }
  };

  const handleGoogleLoginError = () => {
    alert("Google login failed. Please try again.");
  };

  const handleLogin = async (e) => {
    e.preventDefault();
  
    const email = document.getElementById("email").value.trim().toLowerCase(); // Normalize email
    const password = document.getElementById("password").value;
  
    if (!email || !password) {
      alert("กรุณากรอกอีเมลและรหัสผ่าน");
      return;
    }
  
    try {
      console.log("Attempting login with:", { email, password });
  
      // Make the login request
      const response = await axios.post(
        "https://backend.qseer.app/api/access/login",
        { email, password },
        { headers: { "Content-Type": "application/json" } }
      );
  
      if (response.status === 200) {
        console.log("Login Successful:", response.data);
        localStorage.setItem("token", response.data.token); // Save token to localStorage
        alert("เข้าสู่ระบบสำเร็จ!");
        navigate("/fillter"); // Redirect to the desired page
      }
    } catch (error) {
      // Handle different error scenarios
      if (error.response) {
        console.error("Login failed:", error.response.data);
        const errorMessage =
          error.response.data.detail || "เข้าสู่ระบบไม่สำเร็จ กรุณาตรวจสอบข้อมูลของคุณ";
        alert(errorMessage);
      } else {
        console.error("Unexpected error:", error.message);
        alert("เกิดข้อผิดพลาด โปรดลองอีกครั้ง");
      }
    }
  };
  

  return (
    <GoogleOAuthProvider clientId={GOOGLE_CLIENT_ID}>
      <div className={isDarkMode ? "dark" : ""}>
        <Navbar />
        <div
          className={`flex h-screen font-notosans lg:flex-row flex-col ${isDarkMode ? "bg-gray-900 text-white" : "bg-gray-50 text-black"}`}
        >
          {/* ด้านซ้าย: พื้นหลังเบลอ */}
          <div
            className={`w-full lg:w-1/2 relative flex flex-col p-8 ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <div
              className={`absolute top-5 left-10 rounded-full w-96 h-96 ${
                isDarkMode ? "bg-yellow-300" : "bg-yellow-100"
              } opacity-40 blur-2xl hidden lg:block`}
            ></div>
            <div
              className={`absolute top-1/2 right-[25%] transform -translate-y-1/2 rounded-full w-96 h-96 ${
                isDarkMode ? "bg-purple-500" : "bg-purple-300"
              } opacity-40 blur-2xl hidden lg:block`}
            ></div>
            <div
              className={`absolute top-1/2 right-[1%] transform -translate-y-1/2 rounded-full w-96 h-96 ${
                isDarkMode ? "bg-purple-400" : "bg-purple-200"
              } opacity-40 blur-2xl hidden lg:block`}
            ></div>
            <img
              src={Images.marble}
              alt="marble"
              className="w-36 h-36 mx-auto mt-1 lg:absolute lg:top-[calc(50%-60px)] lg:right-[calc(30px)] lg:left-30 lg:transform lg:-translate-y-1/2 lg:translate-x-[calc(10px)] lg:w-[28rem] lg:h-[28rem] lg:mx-0"
            />
            <div className="relative z-10 ml-10 mt-10 hidden lg:block">
              <h2 className="text-2xl lg:text-4xl font-bold">
                Sign In to apply for <br /> a Fortune teller
              </h2>
              <p className="text-lg lg:text-xl mt-4">
                Don’t Have An Account?{" "}
                <Link to="/register" className={`hover:underline ${isDarkMode ? "text-purple-300" : "text-purple-500"}`}>
                  <br /> Register Here!
                </Link>
              </p>
            </div>
          </div>

          {/* ฟอร์ม Login */}
          <div
            className={`w-full lg:w-1/2 flex flex-col justify-center items-center p-1 lg:p-8 -mt-10 lg:mt-0 mb-20 ${
              isDarkMode ? "bg-gray-900" : "bg-gray-50"
            }`}
          >
            <div
              className={`w-full max-w-lg p-6 md:p-10 shadow-md rounded-lg ${
                isDarkMode ? "bg-gray-800 text-white" : "bg-white text-black"
              }`}
            >
              <h2 className="text-2xl font-bold mb-8 text-center mt-4 lg:mt-0">
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
                    className={`w-full pl-12 pr-4 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      isDarkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-400" : "border-gray-300 focus:ring-purple-600"
                    }`}
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
                    className={`w-full pl-12 pr-12 py-2 border rounded-lg focus:outline-none focus:ring-2 ${
                      isDarkMode ? "bg-gray-700 border-gray-600 focus:ring-purple-400" : "border-gray-300 focus:ring-purple-600"
                    }`}
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
                  <Link to="/forgot-password" className={`hover:underline ${isDarkMode ? "text-purple-300" : "text-purple-500"}`}>
                    Forgot Password?
                  </Link>
                </div>
                <button
                  type="submit"
                  className={`w-full py-2 rounded-lg hover:bg-opacity-90 transition duration-200 relative z-10 ${
                    isDarkMode ? "bg-purple-500 text-white" : "bg-purple-700 text-white"
                  }`}
                >
                  เข้าสู่ระบบ
                </button>
              </form>

              <div className="text-center mt-4 text-sm">
                Don’t have an account?{" "}
                <Link to="/register" className={`hover:underline ${isDarkMode ? "text-purple-300" : "text-purple-500"}`}>
                  Register
                </Link>
              </div>

              {/* ปุ่ม Login with Google */}
              <div className="flex items-center my-6">
                <div className="flex-grow border-t border-gray-300"></div>
                <span className="mx-4">OR Sign in with</span>
                <div className="flex-grow border-t border-gray-300"></div>
              </div>
              <div className="w-full flex justify-center">
                <GoogleLogin
                  onSuccess={handleGoogleLoginSuccess}
                  onError={handleGoogleLoginError}
                  className="w-full py-2 rounded-lg"
                  style={{
                    background: "transparent",
                    border: "none",
                    boxShadow: "none",
                    fontSize: "14px",
                    color: isDarkMode ? "white" : "black",
                  }}
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </GoogleOAuthProvider>
  );
}
