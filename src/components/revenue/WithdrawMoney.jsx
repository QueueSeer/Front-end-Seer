import React, { useState } from 'react';
import Images from "../../assets";
import Navbar from "../../components/navbar"; 
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import Sidebar from "../../components/Sidebar"; // เรียกใช้ Sidebar

const WithdrawMoney = () => {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const accountBalance = 1024; // Mocked account balance
  const navigate = useNavigate(); // Initialize navigate function

  const handleWithdraw = () => {
    if (selectedAmount > 0 && selectedAmount <= accountBalance) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        navigate('/proceed-withdraw', { state: { amount: selectedAmount } }); // Navigate with state
      }, 2000); // Mock API call delay
    } else {
      alert('จำนวนเงินไม่เพียงพอ หรือไม่ถูกต้อง');
    }
  };
  
  return (
    <div className="min-h-screen  dark:bg-gray-900 flex flex-col">
      {/* Navbar */}
      <Navbar />
      {/* Layout */}
      <div className="flex flex-1 px-12 pt-12 gap-14">
        {/* Sidebar */}
        <div className="hidden lg:block w-72">
        <Sidebar active="รายรับของฉัน" /> {/* กำหนด Active Item */}
        </div>
        {/* Main Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200  p-6">
            <h1 className="text-xl font-bold text-purple-900 dark:text-purple-400 mb-2 flex items-center ml-5">
              <img src={Images.Wallet} alt="Wallet Icon" className="w-6 h-6 mr-2" />
              ถอนเงิน
            </h1>
            <hr className="border-gray-300 dark:border-gray-700 mb-6" />
            {/* Back Button */}
            <div className="mb-6">
              <button
                onClick={() => navigate(-1)} // Navigate back to the previous page
                className="flex items-center space-x-2 text-gray-600 dark:text-gray-300 hover:text-gray-800 dark:hover:text-white border border-gray-300 dark:border-gray-700 rounded-full px-4 py-2"
              >
                <img src={Images.ArrowLeft} alt="Arrow Left Icon" className="w-5 h-5" />
                <span className="text-sm">ย้อนกลับ</span>
              </button>
            </div>

            {/* User Information Card */}
            <div className="bg-[#8677A7] text-white rounded-lg p-4 shadow-md mb-6 max-w-2xl mx-auto ml-5">
              <h2 className="text-lg font-semibold">สุรีกรณ์ พานวังษ์</h2>
              <p className="text-sm">พร้อมเพย์ 094-857-5897</p>
              <p className="text-3xl font-bold mt-2 text-start">{accountBalance.toLocaleString()} บาท</p>
            </div>

            {/* Amount Selection */}
            <div className="mb-6 max-w-2xl mx-auto ml-5">
              <h3 className="text-gray-700 dark:text-gray-300 font-semibold mb-4">จำนวนจำนวนเงิน</h3>
              <div className="grid grid-cols-3 sm:grid-cols-4 gap-2 sm:gap-4">
                {[50, 100, 200, 300, 400, 500, 1000, 2000, 3000, 4000, 5000, 6000].map((amount, index) => (
                  <button
                    key={index}
                    onClick={() => setSelectedAmount(amount)}
                    className={`py-2 px-3 sm:px-4 rounded-md text-sm sm:text-base text-gray-700 dark:text-gray-300 hover:bg-gray-300 dark:hover:bg-gray-700 ${
                      selectedAmount === amount ? 'bg-gray-400 dark:bg-gray-600 text-white' : 'bg-gray-200 dark:bg-gray-700'
                    }`}
                  >
                    {amount.toLocaleString()} บาท
                  </button>
                ))}
              </div>
            </div>

            {/* Manual Input */}
            <div className="mb-6 max-w-2xl mx-auto ml-5">
              <input
                type="number"
                placeholder="0"
                value={selectedAmount}
                onChange={(e) => setSelectedAmount(Number(e.target.value))}
                className="w-full border border-gray-300 dark:border-gray-700 rounded-md p-3 text-sm sm:text-lg text-gray-700 dark:text-gray-300 bg-white dark:bg-gray-800"
              />
            </div>

            {/* Warning Section */}
            <div className="bg-gray-100 dark:bg-gray-800 p-4 rounded-md mb-6 max-w-2xl mx-auto ml-5 flex items-center">
              <img src={Images.marbelQseer} alt="Info Icon" className="w-6 h-6 mr-2" />
              <p className="text-xs sm:text-sm text-gray-700 dark:text-gray-300">
                ถอนเงินขั้นต่ำ 50 บาทขึ้นไป และจะได้รับเงินภายใน 7 วันหลังจากทำการ
              </p>
            </div>

            {/* Withdraw Button */}
            <button
              onClick={handleWithdraw}
              disabled={selectedAmount <= 0 || selectedAmount > accountBalance || isLoading}
              className={`w-full mb-6 max-w-2xl mx-auto ml-5 py-3 font-semibold text-sm sm:text-lg rounded-md ${
                selectedAmount > 0 && selectedAmount <= accountBalance
                  ? 'bg-[#420F75] text-white hover:bg-[#350d60]'
                  : 'bg-gray-400 dark:bg-gray-600 text-white cursor-not-allowed'
              }`}
            >
              {isLoading ? 'กำลังดำเนินการ...' : 'ถอนเงิน'}
            </button>
          </div>
        </div>
      </div>
   
  );
};

export default WithdrawMoney;
