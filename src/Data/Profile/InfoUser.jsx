import axios from "axios";

// สร้าง instance ของ axios
const axiosInstance = axios.create({
  baseURL: "https://backend.qseer.app/api/user",
  withCredentials: true, 
});

// ฟังก์ชันดึงข้อมูลผู้ใช้
export const fetchInfoUserData = async () => {
  try {
    const response = await axiosInstance.get("/me");
    return response.data;
  } catch (error) {
    console.error("Error fetching user data:", error);
    throw new Error("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
  }
};

export const UpdateInfoUserData = async (display_name, first_name, last_name, phone_number) => {
  try {
    const userData = {
      display_name: display_name,
      first_name: first_name,
      last_name: last_name,
      phone_number: phone_number, 
    };

    const response = await axiosInstance.patch("/me", userData);
    return response.data;
  } catch (error) {
    console.error("Error edit user data:", error);
    throw new Error("ไม่สามารถแก้ไขข้อมูลผู้ใช้ได้");
  }
};
