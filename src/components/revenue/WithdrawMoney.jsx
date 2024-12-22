import React, { useState } from 'react';
import Images from "../../assets";
import Navbar from "../../components/navbar"; 

const WithdrawMoney = () => {
  const [selectedAmount, setSelectedAmount] = useState(0);
  const [isLoading, setIsLoading] = useState(false);
  const accountBalance = 1024; // Mocked account balance
  const [showPopup, setShowPopup] = useState(false);
  const [withdrawnAmount, setWithdrawnAmount] = useState(null);

  const handleWithdraw = () => {
    if (selectedAmount > 0 && selectedAmount <= accountBalance) {
      setIsLoading(true);
      setTimeout(() => {
        setIsLoading(false);
        setWithdrawnAmount(selectedAmount); 
        setShowPopup(true); 
        setSelectedAmount(0); 
      }, 2000); // Mock API call delay
    } else {
      alert('จำนวนเงินไม่เพียงพอ หรือไม่ถูกต้อง');
    }
  };
  

  return (
    <div className="min-h-screen bg-gray-100 flex flex-col">
  {/* Navbar Component */}
  <Navbar />
    <div className="min-h-screen bg-gray-100 flex">
      <div className="flex flex-1 justify-end p-4 ml-5">
        <div className="bg-white w-3/4 rounded-lg shadow-lg p-6 ml-5">
          <h1 className="text-xl font-bold text-purple-700 mb-2 flex items-center ml-5">
            <img src={Images.Wallet} alt="Wallet Icon" className="w-6 h-6 mr-2" />
            ถอนเงิน
          </h1>
          <hr className="border-gray-300 mb-6" />
          {/* Back Button */}
            <div className="mb-6">
            <button
                onClick={() => window.history.back()} // Uses browser history
                className="flex items-center space-x-2 text-gray-600 hover:text-gray-800 border border-gray-300 rounded-full px-4 py-2"
            >
                <img src={Images.ArrowLeft} alt="Arrow Left Icon" className="w-5 h-5" />
                <span className="text-sm">ย้อนกลับ</span>
            </button>
            </div>



               {/* User Information Card */}
                    <div className="bg-[#8677A7] text-white rounded-lg p-4 shadow-md mb-6 max-w-2xl mx-auto ml-5">
                    <h2 className="text-lg font-semibold">สุรีกรณ์ พานวังษ์</h2>
                    <p className="text-sm">พร้อมเพย์ 094-857-5897</p>
                    <p className="text-3xl font-bold mt-2">{accountBalance.toLocaleString()} บาท</p>
                    </div>

                    {/* Amount Selection */}
                    <div className="mb-6 max-w-2xl mx-auto ml-5">
                    <h3 className="text-gray-700 font-semibold mb-4">จำนวนจำนวนเงิน</h3>
                    <div className="grid grid-cols-3 gap-4">
                        {[50, 100, 200, 300, 400, 500, 1000, 2000, 3000, 4000, 5000, 6000].map((amount, index) => (
                        <button
                            key={index}
                            onClick={() => setSelectedAmount(amount)}
                            className={`py-2 px-4 rounded-md text-gray-700 hover:bg-gray-300 ${
                            selectedAmount === amount ? 'bg-gray-400 text-white' : 'bg-gray-200'
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
              className="w-full border border-gray-300 rounded-md p-3 text-lg text-gray-700"
            />
          </div>

          {/* Warning Section */}
          <div className="bg-gray-100 p-4 rounded-md mb-6 max-w-2xl mx-auto ml-5 flex items-center">
            <img src={Images.marbelQseer} alt="Info Icon" className="w-6 h-6 mr-2" />
            <p className="text-sm text-gray-700">
              ถอนเงินขั้นต่ำ 50 บาทขึ้นไป และจะได้รับเงินภายใน 7 วันหลังจากทำการ
            </p>
          </div>

          {/* Withdraw Button */}
          <button
            onClick={handleWithdraw}
            disabled={selectedAmount <= 0 || selectedAmount > accountBalance || isLoading}
            className={`w-full mb-6 max-w-2xl mx-auto ml-5 py-3 font-semibold text-lg rounded-md ${
              selectedAmount > 0 && selectedAmount <= accountBalance
                ? 'bg-[#420F75] text-white hover:bg-[#350d60]'
                : 'bg-gray-400 text-white cursor-not-allowed'
            }`}
          >
            {isLoading ? 'กำลังดำเนินการ...' : 'ถอนเงิน'}
          </button>
        </div>
 {/* Pop-Up for Success */}
 {showPopup && (
          <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
            <div className="bg-white rounded-lg shadow-lg p-6 w-96 max-w-lg text-center relative">
              {/* ปุ่มกากบาท */}
              <button
                onClick={() => setShowPopup(false)}
                className="absolute top-3 right-3 text-gray-500 hover:text-gray-700"
              >
                ✕
              </button>

              {/* ไอคอน */}
              <img src={Images.marbelQseer} alt="Success Icon" className="w-16 h-16 mx-auto mb-4" />

              {/* ข้อความ */}
              <h2 className="text-lg font-bold text-gray-700 mb-2">ถอนเงินสำเร็จ</h2>
              <p className="text-sm text-gray-600">
                จำนวนเงิน <span className="font-bold text-gray-800">{withdrawnAmount?.toLocaleString()} บาท</span>
              </p>
            </div>
          </div>
        )}
</div>
      </div>
    </div>
  );
};

export default WithdrawMoney;
