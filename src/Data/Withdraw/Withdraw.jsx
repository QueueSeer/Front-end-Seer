import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.qseer.app/api/withdraw",
  withCredentials: true,
});

// Function to make the POST request to request a withdrawal
const requestWithdraw = async (amount) => {
  try {
    const response = await axiosInstance.post("", { amount });
    return response.data; // Returns the response data after successful request
  } catch (error) {
    console.error("Error requesting withdrawal:", error);
    throw new Error("ไม่สามารถสร้างคำขอถอนเงินได้"); // Custom error message
  }
};

export { requestWithdraw };
