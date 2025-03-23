import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.qseer.app/api/appointment",
  withCredentials: true,
});

const fetchAppointmentReceivedData = async ({
  last_id,
  limit = 10,
  client_id,
  status,
  direction = "desc",
} = {}) => {
  try {
    const params = {
      limit,
      direction,
    };

    if (last_id !== undefined) params.last_id = last_id;
    if (client_id !== undefined) params.client_id = client_id;
    if (status !== undefined) params.status = status;

    const response = await axiosInstance.get("/received", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching appointment received:", error);
    throw new Error("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
  }
};

export { fetchAppointmentReceivedData };
