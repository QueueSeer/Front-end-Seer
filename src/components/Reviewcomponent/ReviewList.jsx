import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Images from "../../assets";
import Pagination from "../Reviewcomponent/Pagination";
import ReportReviewPopup from "../Reviewcomponent/ReportReviewPopup";
import { getReceivedReviews } from "../../Data/Review/ReviewData";
import { formatDate, formatTime } from "../../utils/utils";

const ReviewList = ({ selectedScore }) => {
  const navigate = useNavigate();
  const [receivedReviews, setReceivedReviews] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [isReportOpen, setIsReportOpen] = useState(false);
  const [selectedReview, setSelectedReview] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const itemsPerPage = 10;

  useEffect(() => {
    const loadReceivedReviews = async () => {
      try {
        const data = await getReceivedReviews();
        setReceivedReviews(data);
      } catch (err) {
        setError("เกิดข้อผิดพลาดในการโหลดข้อมูล");
      } finally {
        setLoading(false);
      }
    };
    loadReceivedReviews();
  }, []);

  const handleReportClick = (review) => {
    setSelectedReview(review);
    setIsReportOpen(true);
  };

  const handleReportClose = () => {
    setIsReportOpen(false);
    setSelectedReview(null);
  };

  // กรองรีวิวตามคะแนนที่เลือก
  const filteredReviews = receivedReviews.filter((review) =>
    selectedScore ? review.score === selectedScore : true
  );

  // คำนวณหน้าที่จะแสดง
  const totalPages = Math.ceil(filteredReviews.length / itemsPerPage);
  const indexOfLastReview = currentPage * itemsPerPage;
  const indexOfFirstReview = indexOfLastReview - itemsPerPage;
  const currentReviews = filteredReviews.slice(
    indexOfFirstReview,
    indexOfLastReview
  );

  return (
    <div className="space-y-6 px-4 md:px-8 lg:px-12">
      {loading ? (
        <p>กำลังโหลด...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : currentReviews.length === 0 ? (
        <div className="h-[200px] flex items-center justify-center">
          <p className="text-gray-500 text-center">
            ไม่มีรีวิวที่ตรงกับการกรอง
          </p>
        </div>
      ) : (
        currentReviews.map((review) => (
          <div
            key={review.id}
            className="p-4 sm:p-6 bg-white rounded-lg border border-gray-300 shadow-sm"
          >
            <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center space-y-4 sm:space-y-0">
              {/* ข้อมูลผู้ใช้ */}
              <div className="flex items-start space-x-4">
                <img
                  src={review.client?.image || Images.defaultAvatar}
                  alt={review.client?.display_name || "Unknown"}
                  className="w-12 h-12 rounded-full object-cover"
                />
                <div>
                  <h2 className="text-lg font-bold">
                    {review.client?.display_name || "ไม่ทราบชื่อ"}
                  </h2>
                  <p className="text-sm text-gray-500">
                    {formatDate(review.date_created)}{" "}
                    {formatTime(review.date_created)} |{" "}
                    {review.package?.name || "ไม่มีแพ็กเกจ"}
                  </p>
                </div>
              </div>

              {/* คะแนนดาว */}
              <div className="flex items-center space-x-1">
                {[...Array(5)].map((_, index) => (
                  <img
                    key={index}
                    src={
                      index < review.score
                        ? Images.Starcolor
                        : Images.StarYellow
                    }
                    alt="Star"
                    className="w-5 h-5"
                  />
                ))}
              </div>
            </div>

            {/* เนื้อหารีวิว */}
            <hr className="my-4 border-t border-gray-200" />
            <p className="text-gray-700">{review.text}</p>

            {/* ปุ่มรายงาน */}
            <div className="flex justify-end mt-2">
              <button
                onClick={() => handleReportClick(review)}
                className="text-red-600 hover:underline text-sm"
              >
                รายงาน
              </button>
            </div>
          </div>
        ))
      )}

      {/* Pagination */}
      {totalPages > 1 && (
        <Pagination
          currentPage={currentPage}
          setCurrentPage={setCurrentPage}
          totalPages={totalPages}
        />
      )}

      {/* Popup รายงานรีวิว */}
      {isReportOpen && (
        <ReportReviewPopup
          review={selectedReview}
          onClose={handleReportClose}
        />
      )}
    </div>
  );
};

export default ReviewList;
