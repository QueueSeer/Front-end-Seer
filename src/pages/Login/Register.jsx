import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import Images from "../../assets";
import Navbar from "../../components/navbar"; // เรียกใช้ path ที่ถูกต้อง

export default function Register() {
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [username, setUsername] = useState("");
  const [displayName, setDisplayName] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [email, setEmail] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [passwordError, setPasswordError] = useState("");
  const [confirmPasswordError, setConfirmPasswordError] = useState("");
  const [formError, setFormError] = useState({});
  const [isLoading, setIsLoading] = useState(false);

  const validatePassword = (password) => {
    const regex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return regex.test(password);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setPasswordError("");
    setConfirmPasswordError("");
    setFormError({});
    setIsLoading(true);

    let errors = {};

    if (!username) errors.username = "กรุณากรอกชื่อผู้ใช้";
    if (!displayName) errors.displayName = "กรุณากรอกชื่อที่จะแสดง";
    if (!firstName) errors.firstName = "กรุณากรอกชื่อ";
    if (!lastName) errors.lastName = "กรุณากรอกนามสกุล";
    if (!email) errors.email = "กรุณากรอกอีเมล";
    if (!phoneNumber) errors.phoneNumber = "กรุณากรอกหมายเลขโทรศัพท์";
    else if (!/^\d+$/.test(phoneNumber)) errors.phoneNumber = "หมายเลขโทรศัพท์ต้องเป็นตัวเลขเท่านั้น";

    if (!password) errors.password = "กรุณากรอกรหัสผ่าน";
    else if (!validatePassword(password)) {
      errors.password = "รหัสผ่านต้องมีความยาวอย่างน้อย 8 ตัวอักษรและประกอบด้วยตัวพิมพ์ใหญ่ ตัวพิมพ์เล็ก ตัวเลข และอักขระพิเศษ";
    }

    if (!confirmPassword) errors.confirmPassword = "กรุณายืนยันรหัสผ่าน";
    else if (password !== confirmPassword) {
      errors.confirmPassword = "รหัสผ่านไม่ตรงกัน";
    }

    if (Object.keys(errors).length > 0) {
      setFormError(errors);
      setIsLoading(false);
      return;
    }

    // หากข้อมูลครบถ้วนและถูกต้องทั้งหมด นำทางไปหน้า Login
    setTimeout(() => {
      setIsLoading(false);
      navigate("/login");
    }, 2000); // ตั้งเวลาเพื่อแสดง loading
  };

  const handleGoogleLogin = () => {
    alert("กำลังเข้าสู่ระบบด้วย Google...");
  };

  return (
    <div>
      <Navbar />
      
      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white bg-opacity-70 flex items-center justify-center z-50">
          <svg
            className="animate-spin h-12 w-12 text-purple-600"
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
          >
            <circle
              className="opacity-25"
              cx="12"
              cy="12"
              r="10"
              stroke="currentColor"
              strokeWidth="4"
            ></circle>
            <path
              className="opacity-75"
              fill="currentColor"
              d="M4 12a8 8 0 018-8v8h8a8 8 0 11-16 0z"
            ></path>
          </svg>
        </div>
      )}
      
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
            <form className="space-y-4" onSubmit={handleSubmit}>
              {/* User Name และ ID Name */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Username"
                    className={`w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm ${formError.username ? 'border-red-500' : ''}`}
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                  />
                  {formError.username && <p className="text-red-500 text-xs mt-1">{formError.username}</p>}
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Display Name"
                    className={`w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm ${formError.displayName ? 'border-red-500' : ''}`}
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                  />
                  {formError.displayName && <p className="text-red-500 text-xs mt-1">{formError.displayName}</p>}
                </div>
              </div>

              {/* First Name และ Last Name */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="First Name"
                    className={`w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm ${formError.firstName ? 'border-red-500' : ''}`}
                    value={firstName}
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                  {formError.firstName && <p className="text-red-500 text-xs mt-1">{formError.firstName}</p>}
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Last Name"
                    className={`w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm ${formError.lastName ? 'border-red-500' : ''}`}
                    value={lastName}
                    onChange={(e) => setLastName(e.target.value)}
                  />
                  {formError.lastName && <p className="text-red-500 text-xs mt-1">{formError.lastName}</p>}
                </div>
              </div>

              {/* Email และ Phone Number */}
              <div className="flex space-x-4">
                <div className="w-1/2">
                  <input
                    type="email"
                    placeholder="Email"
                    className={`w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm ${formError.email ? 'border-red-500' : ''}`}
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                  />
                  {formError.email && <p className="text-red-500 text-xs mt-1">{formError.email}</p>}
                </div>
                <div className="w-1/2">
                  <input
                    type="text"
                    placeholder="Phone Number"
                    className={`w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm ${formError.phoneNumber ? 'border-red-500' : ''}`}
                    value={phoneNumber}
                    onChange={(e) => setPhoneNumber(e.target.value)}
                  />
                  {formError.phoneNumber && <p className="text-red-500 text-xs mt-1">{formError.phoneNumber}</p>}
                </div>
              </div>

              {/* Password */}
              <div className="relative">
                <input
                  type={showPassword ? "text" : "password"}
                  placeholder="Password"
                  className={`w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm ${formError.password ? 'border-red-500' : ''}`}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                <span
                  className="absolute right-4 top-1/3 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  <img
                    src={showPassword ? Images.eyeopenIcon : Images.eyeIcon}
                    alt="Toggle Password Visibility"
                    className="w-5 h-5"
                  />
                </span>
                {formError.password && <p className="text-red-500 text-xs mt-1">{formError.password}</p>}
              </div>

              {/* Confirm Password */}
              <div className="relative">
                <input
                  type={showConfirmPassword ? "text" : "password"}
                  placeholder="Confirm Password"
                  className={`w-full py-2 px-4 border rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-600 text-sm ${formError.confirmPassword ? 'border-red-500' : ''}`}
                  value={confirmPassword}
                  onChange={(e) => setConfirmPassword(e.target.value)}
                />
                <span
                  className="absolute right-4 top-1/3 transform -translate-y-1/2 cursor-pointer"
                  onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                >
                  <img
                    src={showConfirmPassword ? Images.eyeopenIcon : Images.eyeIcon}
                    alt="Toggle Confirm Password Visibility"
                    className="w-5 h-5"
                  />
                </span>
                {formError.confirmPassword && <p className="text-red-500 text-xs mt-1">{formError.confirmPassword}</p>}
              </div>

              {/* ปุ่มยืนยัน */}
              <button
                type="submit"
                className="w-full py-3 bg-purple-700 text-white rounded-lg hover:bg-purple-800 transition duration-200 flex justify-center items-center"
              >
                ยืนยัน
              </button>
            </form>

            <div className="flex items-center my-6">
              <div className="flex-grow border-t border-gray-300"></div>
              <span className="mx-4 text-gray-500">OR Sign in with</span>
              <div className="flex-grow border-t border-gray-300"></div>
            </div>

            <button
              onClick={handleGoogleLogin}
              className="w-full flex items-center justify-center border border-gray-300 py-3 rounded-lg hover:bg-gray-100 transition duration-200"
            >
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
