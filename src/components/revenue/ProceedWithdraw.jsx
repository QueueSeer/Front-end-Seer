import React, { useState, useEffect } from "react";
import Images from "../../assets";
import BackButton from "../../components/Button/BackButton";
import Fillterbar from "../../components/fillterbar";
import { useLocation, useNavigate } from "react-router-dom";
import { fetchUserData } from "../../Data/Profile/ProfileApi"; // Assuming fetchUserData is exported from your API file
import { formatPhoneNumber } from "../../utils/utils";
import { requestWithdraw } from "../../Data/Withdraw/Withdraw"; // Assuming requestWithdraw is exported from your API file

const ProceedWithdraw = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const { amount } = location.state || { amount: 0 };
  const [userData, setUserData] = useState({ bank_name: "", bank_no: "" }); // State for user data
  const [isLoading, setIsLoading] = useState(false);
  const [showPopup, setShowPopup] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData(); // Fetch the user data
        setUserData({ bank_name: data.bank_name, bank_no: data.bank_no }); // Set the user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getUserData();
  }, []);

  const handleConfirmWithdraw = async () => {
    setIsLoading(true);
    try {
      const response = await requestWithdraw(amount); // Send request to withdraw
      console.log("Withdrawal request successful:", response);
      setIsLoading(false);
      setShowPopup(true); // Show the success popup
    } catch (error) {
      console.error("Withdrawal request failed:", error);
      setIsLoading(false);
    }
  };

  const handleClosePopup = () => {
    setShowPopup(false);
    navigate("/revenue"); // Redirect to Revenue page
  };

  return (
    <div className="min-h-screen bg-gray-100 dark:bg-gray-900 flex flex-col">
      <Fillterbar />

      {/* Loading Overlay */}
      {isLoading && (
        <div className="fixed inset-0 bg-white dark:bg-gray-900 bg-opacity-70 flex items-center justify-center z-50">
          <svg
            className="animate-spin h-12 w-12 text-purple-600 dark:text-purple-400"
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

      {/* Success Popup */}
      {showPopup && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg w-96 p-6 relative">
            {/* Content */}
            <div className="flex flex-col items-center">
              <img
                src={Images.logomarbeltext}
                alt="Logo Marbel Text"
                className="w-20 h-20 mb-4"
              />
              <h2 className="text-[24px] font-bold text-secondary2 dark:text-purple-400 mb-2">
                Qseer
              </h2>
              <p className="text-black dark:text-gray-300">ถอนเงินสำเร็จ</p>
              {/* Go to My Revenue Button */}
              <button
                onClick={handleClosePopup} // Or create a separate function to handle navigation
                className="w-full mt-4 py-3 bg-primary text-white font-semibold rounded-full hover:bg-secondary"
              >
                กลับหน้ารายรับของฉัน
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Back Button */}
      <div className="mt-6 ml-4">
        <BackButton />
      </div>

      {/* Proceed Withdraw Content */}
      <div className="max-w-xl mx-auto p-8 bg-white dark:bg-gray-800 shadow-lg rounded-lg mt-4">
        {/* Image Section */}
        <div className="relative w-full h-48 bg-gray-100 dark:bg-gray-700 rounded-lg mb-4">
          <img
            src={Images.Packetphoto}
            alt="Packet Photo"
            className="w-full h-full object-cover rounded-lg"
          />
          <img
            src={Images.logomarbeltext}
            alt="Logo Marbel Text"
            className="absolute top-[65%] left-1/2 transform -translate-x-1/2 w-28"
          />
        </div>

        {/* Title */}
        <div className="text-center mb-6" style={{ marginTop: "3rem" }}>
          <span
            className="text-2xl font-extrabold text-purple-800 dark:text-purple-400"
            style={{ fontFamily: "Playfair Display", fontSize: "32px" }}
          >
            Qseer
          </span>
        </div>

        {/* Transaction Details */}
        <div className="bg-gray-100 dark:bg-gray-700 p-6 rounded-lg text-left shadow-md mb-6 mt-5">
          <div className="flex justify-between mb-3">
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              จำนวนเงิน
            </span>
            <span className="font-bold text-gray-800 dark:text-gray-100">
              {amount.toLocaleString()} บาท
            </span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              ช่องทางโอนเงิน
            </span>
            <span className="font-bold text-gray-800 dark:text-gray-100">
              พร้อมเพย์ (Promptpay)
            </span>
          </div>
          <div className="flex justify-between mb-3">
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              บัญชีปลายทาง
            </span>
            <span className="font-bold text-gray-800 dark:text-gray-100">
              {userData.bank_name}
            </span>
          </div>
          <div className="flex justify-between ">
            <span className="text-gray-600 dark:text-gray-300 font-medium">
              หมายเลขพร้อมเพย์
            </span>
            <span className="font-bold text-gray-800 dark:text-gray-100">
              {formatPhoneNumber(userData.bank_no)}
            </span>
          </div>
        </div>

        {/* Confirmation Button */}
        <button
          onClick={handleConfirmWithdraw}
          className="w-full mt-2 py-3 bg-[#420F75] text-white font-semibold rounded-lg hover:bg-[#350d60]"
        >
          ยืนยันการถอนเงิน
        </button>
      </div>
    </div>
  );
};

export default ProceedWithdraw;
