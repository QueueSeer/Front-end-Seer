import React, { useState, useEffect } from "react";
import Images from "../../assets";
import { getReceivedReviews } from "../../Data/Review/ReviewData";
import { format } from "date-fns";
import { th } from "date-fns/locale"; // ใช้ locale ไทย

const ReviewHeader = ({ selectedMonth, setSelectedMonth }) => {
  const [averageScore, setAverageScore] = useState(0);
  const [totalReviews, setTotalReviews] = useState(0);
  const [availableMonths, setAvailableMonths] = useState([]);

  useEffect(() => {
    const fetchReviews = async () => {
      try {
        const reviews = await getReceivedReviews();
        if (reviews.length > 0) {
          // คำนวณคะแนนเฉลี่ย
          const totalScore = reviews.reduce((sum, review) => sum + review.score, 0);
          setTotalReviews(reviews.length);
          setAverageScore((totalScore / reviews.length).toFixed(1));

          // ดึงรายการเดือนที่มีรีวิว และแปลงปีเป็น พ.ศ.
          const monthsSet = new Set(
            reviews.map((review) => {
              const reviewDate = new Date(review.date_created);
              const monthName = format(reviewDate, "MMMM", { locale: th });
              const buddhistYear = reviewDate.getFullYear() + 543;
              return `${monthName} ${buddhistYear}`;
            })
          );

          setAvailableMonths([...monthsSet].sort());

          // ตั้งค่าเริ่มต้นเป็นเดือนปัจจุบัน (แปลงเป็น พ.ศ.)
          const currentDate = new Date();
          const currentMonth = format(currentDate, "MMMM", { locale: th });
          const currentYear = currentDate.getFullYear() + 543;
          const formattedCurrentMonth = `${currentMonth} ${currentYear}`;

          if (!selectedMonth) setSelectedMonth(formattedCurrentMonth);
        }
      } catch (error) {
        console.error("Error fetching reviews:", error);
      }
    };

    fetchReviews();
  }, [selectedMonth, setSelectedMonth]);

  return (
    <div className="mb-6">
      {/* Header Section */}
      <div className="flex items-center space-x-2 mb-4">
        <img src={Images.Star} alt="Star Icon" className="w-6 h-6" />
        <h1 className="text-xl sm:text-2xl font-bold text-[#65558F]">จัดการรีวิว</h1>
      </div>

      {/* Divider Under Header */}
      <hr className="border-t border-gray-300 mb-4" />

      {/* Average Rating and Dropdown */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
        {/* Rating Section */}
        <div className="flex items-center space-x-4">
          {/* Stars */}
          <div className="flex space-x-1">
            {[...Array(5)].map((_, index) => (
              <img
                key={index}
                src={index < Math.round(averageScore) ? Images.Starcolor : Images.StarYellow}
                alt="Star"
                className="w-6 h-6"
              />
            ))}
          </div>
          {/* Average Rating Text */}
          <div className="text-lg font-bold text-[#F59E0B]">โดยเฉลี่ย {averageScore}</div>
          <div className="hidden sm:block text-gray-500">({totalReviews} รีวิว)</div>
        </div>

        {/* Dropdown Filter by Month */}
        <div className="flex items-center space-x-2">
          <select
            className="border border-gray-300 rounded-md p-2 text-sm sm:text-base"
            value={selectedMonth || ""} // Fallback to empty string if selectedMonth is null or undefined
            onChange={(e) => setSelectedMonth(e.target.value)}
          >
            {availableMonths.map((month, index) => (
              <option key={index} value={month}>
                {month}
              </option>
            ))}
          </select>
        </div>
      </div>
    </div>
  );
};

export default ReviewHeader;
