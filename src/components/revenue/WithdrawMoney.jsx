import React, { useState, useEffect } from "react";
import Images from "../../assets";
import Navbar from "../../components/navbar";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import Sidebar from "../../components/Sidebar"; // เรียกใช้ Sidebar
import { fetchCoinsUser } from "../../Data/Profile/InfoDataUser"; // Assuming fetchCoinsUser is exported from your API file
import { fetchUserData } from "../../Data/Profile/ProfileApi"; // Assuming fetchUserData is exported from your API file
import { formatPhoneNumber } from "../../utils/utils";
import BackButton from "../Button/BackButton";

const WithdrawMoney = () => {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const [accountBalance, setAccountBalance] = useState(null); // Set initial state as null
  const [userData, setUserData] = useState({ bank_name: "", bank_no: "" }); // State for user data
  const [error, setError] = useState(""); // **Added the error state here**
  const navigate = useNavigate(); // Initialize navigate function

  // Fetch account balance using fetchCoinsUser
  useEffect(() => {
    const getAccountBalance = async () => {
      try {
        const balance = await fetchCoinsUser();
        setAccountBalance(balance); // Set the fetched balance
      } catch (error) {
        console.error("Error fetching account balance:", error);
      }
    };

    const getUserData = async () => {
      try {
        const data = await fetchUserData(); // Fetch the user data
        setUserData({ bank_name: data.bank_name, bank_no: data.bank_no }); // Set the user data
      } catch (error) {
        console.error("Error fetching user data:", error);
      }
    };

    getAccountBalance(); // Call the function to fetch balance when the component mounts
    getUserData(); // Call the function to fetch user data
  }, []);

  const handleWithdraw = () => {
    if (selectedAmount < 50) {
      setError("ขั้นต่ำในการถอน 50 บาทขึ้นไป"); // Set error message if amount is less than 50
    } else if (selectedAmount > 0 && selectedAmount <= accountBalance) {
      setError(""); // Clear error if the withdrawal is valid
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate("/proceed-withdraw", { state: { amount: selectedAmount } }); // Navigate with state
      }, 2000); // Mock API call delay
    } else {
      setError("จำนวนเงินไม่เพียงพอ หรือไม่ถูกต้อง");
    }
  };

  // If accountBalance or userData is null (still loading), show loading state
  if (accountBalance === null || !userData.bank_name || !userData.bank_no) {
    return (
      <div>Loading...</div> // You can replace this with a loading spinner or similar component
    );
  }

  const handleAmountChange = (e) => {
    // Prevent decimal values by checking if input is an integer
    const value = e.target.value;
    if (/^\d+$/.test(value)) {
      // Check if the value is a non-decimal number
      setSelectedAmount(Number(value));
    }
  };

  return (
    <div className="min-h-screen dark:bg-gray-900 flex flex-col ">
      {/* Navbar */}
      <Navbar />
      {/* Layout */}
      <div className="flex flex-1 px-12 pt-12 gap-14">
        {/* Sidebar */}
        <div className="hidden lg:block w-72">
          <Sidebar active="รายรับของฉัน" /> {/* กำหนด Active Item */}
        </div>
        {/* Main Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 p-6 ">
          <h1 className="text-xl font-bold text-purple-900 dark:text-purple-400 mb-2 flex items-center ml-5">
            <img
              src={Images.Wallet}
              alt="Wallet Icon"
              className="w-6 h-6 mr-2"
            />
            ถอนเงิน
          </h1>
          <hr className="border-gray-300 dark:border-gray-700 mb-6" />
          {/* Back Button */}
          <div className="mb-6">
            <BackButton />
          </div>

          {/* User Information Card */}
          <div className="bg-[#8677A7] text-white rounded-lg p-4 shadow-md mb-6 max-w-2xl mx-auto ml-5">
            <h2 className="text-[20px] font-semibold">{userData.bank_name}</h2>
            <p className="text-[16px]">
              พร้อมเพย์ {formatPhoneNumber(userData.bank_no)}
            </p>
            <p className="text-3xl font-bold mt-3 text-start">
              {accountBalance.toLocaleString()} coins
            </p>
          </div>

          {/* Amount Selection */}
          <div className="mb-6 max-w-2xl mx-auto ml-5">
            <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-4">
              จำนวนเงิน
            </h3>
            <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
              {[
                50, 100, 200, 300, 400, 500, 1000, 2000, 3000, 4000, 5000, 6000,
              ].map((amount, index) => (
                <button
                  key={index}
                  onClick={() =>
                    amount <= accountBalance && setSelectedAmount(amount)
                  } // Only set the amount if it's <= accountBalance
                  className={`py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base text-gray-700  ${
                    amount <= accountBalance
                      ? selectedAmount === amount
                        ? "bg-secondary2 text-white" // Selected button
                        : "border border-secondary2 text-secondary2"
                      : "bg-gray-100 text-gray-200 border border-gray-200 cursor-not-allowed" // Disabled button
                  }`}
                  disabled={amount > accountBalance} // Disable button if amount is greater than accountBalance
                >
                  {amount.toLocaleString()} บาท
                </button>
              ))}
            </div>
          </div>

          {/* Manual Input */}
          <div className="mb-6 max-w-2xl mx-auto ml-5">
            <input
              value={selectedAmount}
              onChange={handleAmountChange}
              className="w-full pr-4 border border-gray-300 text-right dark:border-gray-700 rounded-md p-3 text-sm sm:text-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
            />
          </div>

          {/* Warning Section */}
          <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-6 max-w-2xl mx-auto ml-5 flex items-center">
            <img
              src={Images.marbelQseer}
              alt="Info Icon"
              className="w-6 h-6 mr-2"
            />
            <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
              ถอนเงินขั้นต่ำ 50 บาทขึ้นไป และจะได้รับเงินภายใน 7 วันหลังจากทำการ
            </p>
          </div>

          {/* Error Message for Withdrawal */}
          {error && (
            <div className="bg-red-100 text-red-700 p-4 rounded-md mb-6 max-w-2xl mx-auto ml-5">
              <p className="text-sm">{error}</p>
            </div>
          )}

          {/* Withdraw Button */}
          <button
            onClick={handleWithdraw}
            disabled={
              selectedAmount <= 0 ||
              selectedAmount < 50 ||
              selectedAmount > accountBalance ||
              isLoading
            }
            className={`w-full mb-6 max-w-2xl mx-auto ml-5 py-3 font-semibold text-sm sm:text-lg rounded-md ${
              selectedAmount >= 50 && selectedAmount <= accountBalance
                ? "bg-[#420F75] text-white hover:bg-[#350d60]"
                : "bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed"
            }`}
          >
            {isLoading ? "กำลังดำเนินการ..." : "ถอนเงิน"}
          </button>
        </div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
