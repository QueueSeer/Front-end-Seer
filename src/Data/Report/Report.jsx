import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.qseer.app/api/",
  withCredentials: true,
});

const reportReview = async ({ review_id, reasons }) => {
  try {
    console.log("Reporting review with ID:", review_id);
    console.log("Reasons:", reasons);

    const response = await axiosInstance.post("report", {
      review_id,
      reason: reasons.join(", "), // Joining reasons into a single string
    });

    console.log("API response:", response.data); // Log API response
    return response.data; // ส่งคืนข้อมูลจากการทำรายงานรีวิว
  } catch (error) {
    console.error("Error reporting review:", error);
    throw new Error("ไม่สามารถรายงานรีวิวได้");
  }
};

export { reportReview };
