import React, { useState } from 'react';
import Images from "../../assets";
import { useNavigate } from 'react-router-dom';

const Revenue = () => {
  const navigate = useNavigate(); // สำหรับเปลี่ยนเส้นทาง
  const [mockData, setMockData] = useState([
    { id: 'TXN-20230910-0001', date: '10 กันยายน 2567 13.30 น.', amount: 49, status: 'ชำระแล้ว', type: 'การจอง' },
    { id: 'TXN-20230911-0002', date: '11 กันยายน 2567 10.15 น.', amount: 30, status: 'ชำระแล้ว', type: 'ดูดวงทันที' },
    { id: 'TXN-20230912-0003', date: '12 กันยายน 2567 16.45 น.', amount: -75, status: 'ถอน', type: 'การถอน' },
    { id: 'TXN-20230913-0004', date: '13 กันยายน 2567 09.00 น.', amount: 60, status: 'ชำระแล้ว', type: 'การประมูล' },
    { id: 'TXN-20230914-0005', date: '14 กันยายน 2567 12.20 น.', amount: -45, status: 'ถอน', type: 'การถอน' },
  ]);
  

  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;

  return (
    <div className="min-h-screen bg-gray-100 flex">
      {/* Main Content */}
      <div className="flex flex-1 justify-end p-4">
        <div className="bg-white w-3/4 rounded-lg shadow-lg p-6">
          <h1 className="text-xl font-bold text-purple-700 mb-2 flex items-center">
            <img src={Images.Wallet} alt="Wallet Icon" className="w-6 h-6 mr-2" />
            รายรับของฉัน
          </h1>
          <hr className="border-gray-300 mb-6" />

          {/* Filter Bar */}
          <div className="flex items-center justify-between mb-6">
            <div className="flex items-center space-x-2">
              <label htmlFor="rows" className="text-gray-700">แสดง</label>
              <select id="rows" name="rows" className="border border-gray-300 rounded-md p-2">
                <option value="5">5 แถว</option>
                <option value="10">10 แถว</option>
                <option value="15">15 แถว</option>
              </select>
              <span className="text-gray-700">แถว</span>
            </div>

            <div className="flex items-center space-x-2">
              <label htmlFor="date-filter" className="text-gray-700">วันที่</label>
              <select id="date-filter" name="date-filter" className="border border-gray-300 rounded-md p-2">
                <option value="today">วันนี้</option>
                <option value="week">สัปดาห์นี้</option>
                <option value="month">เดือนนี้</option>
              </select>
            </div>
          </div>

          {/* Table */}
          <div className="overflow-x-auto">
            <table className="min-w-full text-sm text-left text-gray-500">
              <thead className="bg-gray-200 text-gray-700 uppercase">
                <tr>
                  <th className="px-4 py-3">Transaction ID</th>
                  <th className="px-4 py-3">วันที่ชำระเงิน</th>
                  <th className="px-4 py-3">รายรับ</th>
                  <th className="px-4 py-3">ประเภทรายการ</th>
                </tr>
              </thead>
              <tbody>
                {mockData.map((item, index) => (
                  <tr key={index} className="border-b">
                    <td className="px-4 py-3">{item.id}</td>
                    <td className="px-4 py-3">{item.date}</td>
                    <td className={`px-4 py-3 ${item.amount < 0 ? 'text-red-500' : 'text-gray-700'}`}>
                      {item.amount < 0 ? `-${Math.abs(item.amount).toLocaleString()}` : item.amount.toLocaleString()} คอยน์
                    </td>
                    <td className="px-4 py-3">
                      <button
                        className={`w-24 px-4 py-2 text-white rounded-md ${
                          item.status === 'ชำระแล้ว' ? 'bg-[#8677A7] hover:bg-[#755c97]' : 'bg-[#990033] hover:bg-[#7a0028]'
                        }`}
                      >
                        {item.type}
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Pagination */}
          <div className="flex items-center justify-end mt-6 mb-4">
            <button
              onClick={() => setCurrentPage((prev) => Math.max(prev - 1, 1))}
              className="p-2 mx-2 rounded-full hover:bg-gray-300"
              disabled={currentPage === 1}
            >
              <img
                src={currentPage === 1 ? Images.backpage : Images.backstep}
                alt="Back Icon"
                className="w-10 h-10"
              />
            </button>
            <span className="text-gray-700">{currentPage} of {totalPages}</span>
            <button
              onClick={() => setCurrentPage((prev) => Math.min(prev + 1, totalPages))}
              className="p-2 mx-2 rounded-full hover:bg-gray-300"
              disabled={currentPage === totalPages}
            >
              <img
                src={Images.next}
                alt="Next Icon"
                className="w-10 h-10"
              />
            </button>
          </div>

          {/* Footer Section */}
          <div className="flex items-center justify-between">
            <div className="bg-[#8677A7] flex justify-between items-center w-full p-4 rounded-md shadow-md">
              <span className="text-white font-semibold text-lg">รวม</span>
              <span className="text-white font-semibold text-lg">259 ฿</span>
            </div>
            <div className="flex flex-col items-center ml-4">
              <button
                onClick={() => navigate('/withdraw-money')} // Navigate ไปที่ WithdrawMoney
                className="w-16 h-16 flex items-center justify-center bg-white border border-gray-300 rounded-full shadow-md hover:shadow-lg"
              >
                <img src={Images.Wallet} alt="Wallet Icon" className="w-8 h-8" />
              </button>
              <span className="mt-2 text-sm text-gray-700">ถอนเงิน</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
