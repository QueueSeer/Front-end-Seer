import React from "react";
import { formatDate, formatTime } from "../../../utils/utils";

const TransactionTable = ({ transactions }) => {
  return (
    <div className="overflow-x-auto">
      <table className="min-w-full text-sm text-left text-gray-500 dark:text-gray-400">
        <thead className="bg-gray-200 dark:bg-gray-700 text-gray-700 dark:text-gray-300 uppercase">
          <tr>
            <th className="px-4 py-3">Transaction ID</th>
            <th className="px-4 py-3">วันที่ชำระเงิน</th>
            <th className="px-4 py-3">ประเภทรายการ</th>
            <th className="px-4 py-3 text-center">จำนวนคอยน์</th>
            <th className="px-4 py-3 text-center"></th>

          </tr>
        </thead>
        <tbody>
          {transactions.map((item, index) => (
            <tr
              key={index}
              className="border-b border-gray-300 dark:border-gray-700"
            >
              <td className="px-4 py-3">{item.id}</td>
              <td className="px-4 py-3">{`${formatDate(
                item.date_created
              )} ${formatTime(item.date_created)}`}</td>

              <td className="px-4 py-3">
                <button
                  className={`w-[120px] px-4 py-2 text-white rounded-full ${
                    item.status === "completed"
                      ? "bg-[#8677A7] hover:bg-[#755c97]"
                      : "bg-[#990033] hover:bg-[#7a0028]"
                  }`}
                >
                  {item.type}
                </button>
              </td>
              <td
                className={`px-4 py-3 ${
                  item.amount < 0
                    ? "text-red-500"
                    : "text-gray-700 dark:text-gray-300"
                } text-start`}
              >
                <div className=" flex justify-center text-[16px] ">
                    {item.amount < 0
                      ? `-${Math.abs(item.amount).toLocaleString()}`
                      : item.amount.toLocaleString()}
                </div>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TransactionTable;
