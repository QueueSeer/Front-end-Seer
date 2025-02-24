import axiosInstance from '../AxiosConfig'; // ใช้ axios ที่ตั้งค่าไว้

// API call to get the user data
export const fetchUserData = async () => {
  try {
    const response = await axiosInstance.get("/me");
    return response.data;
  } catch (error) {
    // Log error to track the issue
    console.error("Error fetching user data:", error);
    throw new Error("ไม่สามารถดึงข้อมูลผู้ใช้ได้");
  }
};

// API call to update the description
export const updateDescription = async (description) => {
  if (!description) throw new Error("Description cannot be empty");

  try {
    const response = await axiosInstance.patch("/me", { description });
    return response.data;
  } catch (error) {
    // Log error to track the issue
    console.error("Error updating description:", error);
    throw new Error("ไม่สามารถอัปเดตคำอธิบายได้");
  }
};

// API call to get the user description
export const fetchDescription = async () => {
  try {
    const response = await axiosInstance.get("/me");
    return response.data.description || "ยังไม่มีคำอธิบาย"; // คืนค่า description
  } catch (error) {
    console.error("Error fetching description:", error);
    throw new Error("ไม่สามารถดึงข้อมูลคำอธิบายได้");
  }
};


// API call to update primary skill (category)
export const updatePrimarySkill = async (category) => {
  if (!category) throw new Error("Category cannot be empty");

  try {
    const response = await axiosInstance.patch("/me", { primary_skill: category });
    return response.data;
  } catch (error) {
    // Log error to track the issue
    console.error("Error updating category:", error);
    throw new Error("ไม่สามารถอัปเดตหมวดหมู่ได้");
  }
};
