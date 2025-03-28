import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.qseer.app/api/seer", // Use the base URL for your API
  withCredentials: true,
});

const getFollowers = async (seerId, lastId, limit) => {
  try {
    // Use the passed `limit`, or set a default if not provided
    const response = await axiosInstance.get(`/${seerId}/followers`, {
      params: { last_id: lastId, limit: limit || 10 }, // Default to 10 if limit is undefined
    });
    return response.data.followers; // Returns the followers list
  } catch (error) {
    console.error("Error fetching followers:", error);
    throw new Error("ไม่สามารถดึงข้อมูลผู้ติดตามได้"); // Custom error message
  }
};

export { getFollowers };
