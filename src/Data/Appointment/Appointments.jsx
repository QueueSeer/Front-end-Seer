import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.qseer.app/api/appointment",
  withCredentials: true,
});

const fetchAppointmentReceivedData = async ({
  last_id,
  limit = 90,
  client_id,
  status,
  direction = "asc",
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

const fetchAppointmentDetails = async (apmt_id) => {
  try {
    if (!apmt_id) {
      throw new Error("ต้องระบุ apmt_id");
    }
    
    // Log the API request URL for debugging
    const url = `/${apmt_id}`;
    console.log(`Requesting appointment details from: ${url}`);
    
    const response = await axiosInstance.get(url);
    console.log("Response:", response);
    
    if (response.status === 200) {
      return response.data;
    } else {
      console.error(`Unexpected response status: ${response.status}`);
      throw new Error("ไม่สามารถดึงข้อมูลการนัดหมายได้");
    }
    
  } catch (error) {
    // Log more detailed error information
    console.error("Error fetching appointment details:", error);
    if (error.response) {
      // If the error is a response error (e.g., 404 or 500), log the response
      console.error("Response error details:", error.response.data);
    }
    throw new Error("ไม่สามารถดึงข้อมูลการนัดหมายได้");
  }
};

const updateAppointmentStatus = async (apmt_id, status) => {
  try {
    if (!apmt_id) throw new Error("ต้องระบุ apmt_id");
    if (!status) throw new Error("ต้องระบุสถานะ");

    const response = await axiosInstance.patch(`/${apmt_id}/status/${status}`);
    
    if (response.status === 200) {
      console.log(`Appointment ${apmt_id} updated to ${status}`);
      return response.data;
    } else {
      throw new Error("ไม่สามารถอัปเดตสถานะการนัดหมายได้");
    }
  } catch (error) {
    console.error("Error updating appointment status:", error);
    throw new Error("ไม่สามารถอัปเดตสถานะการนัดหมายได้");
  }
};


export { fetchAppointmentReceivedData, fetchAppointmentDetails, updateAppointmentStatus };
