import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.qseer.app/api/",
  withCredentials: true,
});

const getReceivedReviews = async ({
  last_id,
  limit = 100,
  order_by,
  direction = "asc",
} = {}) => {
  try {
    const params = {
      limit,
      direction,
    };
    if (last_id !== undefined) params.last_id = last_id;
    if (order_by !== undefined) params.order_by = order_by;

    const response = await axiosInstance.get("review/received", { params });
    return response.data; // ส่งคืนข้อมูลที่ได้รับหลังจากอัปเดตสำเร็จ
  } catch (error) {
    console.error("Error reviews seer :", error);
    throw new Error("ไม่สามารถดูรายการรีวิวที่เราถูกรีวิว"); // ข้อความแจ้งเตือนข้อผิดพลาด
  }
};

export { getReceivedReviews };
