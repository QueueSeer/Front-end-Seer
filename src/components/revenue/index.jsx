// src/pages/Revenue.js
import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../../assets";
import { fetchSelfTransactions } from "../../Data/Transaction/Transaction";
import TransactionTable from "./element/TransactionTable";
import Pagination from "./element/Pagination";
import FilterBar from "./element/FilterBar";

const Revenue = () => {
  const navigate = useNavigate();
  const [transactions, setTransactions] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [currentPage, setCurrentPage] = useState(1);
  const totalPages = 10;
  const [dateFilter, setDateFilter] = useState("month");

  const handleDateFilterChange = (event) => {
    setDateFilter(event.target.value);
  };

  const filteredTransactions = transactions.filter((item) => {
    const transactionDate = new Date(item.date_created);
    const now = new Date();

    if (dateFilter === "today") {
      return transactionDate.toDateString() === now.toDateString();
    } else if (dateFilter === "month") {
      return (
        transactionDate.getMonth() === now.getMonth() &&
        transactionDate.getFullYear() === now.getFullYear()
      );
    }
    return true;
  });

  const getUniqueMonths = (transactions) => {
    const months = transactions.map((item) => {
      const transactionDate = new Date(item.date_created);
      const month = transactionDate.toLocaleString("th-TH", { month: "long" });
      return month;
    });

    return [...new Set(months)].sort((a, b) => {
      const monthOrder = [
        "มกราคม",
        "กุมภาพันธ์",
        "มีนาคม",
        "เมษายน",
        "พฤษภาคม",
        "มิถุนายน",
        "กรกฎาคม",
        "สิงหาคม",
        "กันยายน",
        "ตุลาคม",
        "พฤศจิกายน",
        "ธันวาคม",
      ];
      return monthOrder.indexOf(a) - monthOrder.indexOf(b);
    });
  };

  useEffect(() => {
    const loadTransactions = async () => {
      try {
        const data = await fetchSelfTransactions();
        setTransactions(data);
      } catch (err) {
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    };
    loadTransactions();
  }, []);

  if (loading)
    return (
      <p className="text-center text-gray-700 dark:text-gray-300">
        กำลังโหลดข้อมูล...
      </p>
    );
  if (error) return <p className="text-center text-red-500">{error}</p>;

  const uniqueMonths = getUniqueMonths(transactions);

  return (
    <div className="min-h-screen dark:bg-gray-900 flex justify-center items-start">
      <div className="bg-white dark:bg-gray-800 w-full lg:w-[105%] rounded-lg p-6 pb-10">
        <h1 className="text-xl font-bold text-[#65558F] dark:text-purple-400 mb-4 flex items-center">
          <img src={Images.Wallet} alt="Wallet Icon" className="w-6 h-6 mr-2" />
          รายรับของฉัน
        </h1>

        <hr className="border-gray-300 dark:border-gray-700 mb-6" />

        <FilterBar
          dateFilter={dateFilter}
          handleDateFilterChange={handleDateFilterChange}
          uniqueMonths={uniqueMonths}
        />

        <TransactionTable transactions={filteredTransactions} />

        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />

        <div className="flex items-center justify-between">
          <div className="bg-[#8677A7] flex justify-between items-center w-full p-4 rounded-md shadow-md">
            <span className="text-white font-semibold text-lg">รวม</span>
            <span className="text-white font-semibold text-lg">259 ฿</span>
          </div>
          <div className="flex flex-col items-center ml-4">
            <button
              onClick={() => navigate("/withdraw-money")}
              className="w-16 h-16 flex items-center justify-center bg-white dark:bg-gray-700 border border-gray-300 dark:border-gray-700 rounded-full shadow-md hover:shadow-lg"
            >
              <img src={Images.Wallet} alt="Wallet Icon" className="w-8 h-8" />
            </button>
            <span className="mt-2 text-sm text-gray-700 dark:text-gray-300">
              ถอนเงิน
            </span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Revenue;
