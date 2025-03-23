import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.qseer.app/api/transaction/user/me",
  withCredentials: true,
});

const fetchSelfTransactions = async ({
  last_id,
  limit = 100,
  activity_id,
  activity_type,
  txn_type,
  txn_status,
  direction = "desc",
} = {}) => {
  try {
    const params = {
      limit,
      direction,
    };

    if (last_id !== undefined) params.last_id = last_id;
    if (activity_id !== undefined) params.activity_id = activity_id;
    if (activity_type !== undefined) params.activity_type = activity_type;
    if (txn_type !== undefined) params.txn_type = txn_type;
    if (txn_status !== undefined) params.txn_status = txn_status;

    const response = await axiosInstance.get("", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching self transactions:", error);
    throw new Error("ไม่สามารถดึงข้อมูลธุรกรรมได้");
  }
};

export { fetchSelfTransactions };
