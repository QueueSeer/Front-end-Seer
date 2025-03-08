import axios from "axios";

// สร้าง instance ของ axios
const axiosInstance = axios.create({
  baseURL: "https://backend.qseer.app/api/image/package/fortune/",
  withCredentials: true, 
});

// ฟังก์ชันสำหรับการส่งภาพไปยัง API
export const postImagepackage = async (imageFile, packageId) => {
  if (!imageFile || !packageId) {
    console.error("❌ Missing image file or packageId");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await axiosInstance.post(`${packageId}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", // ต้องกำหนด multipart/form-data
      },
    });

    console.log("✅ Image uploaded successfully:", response.data);
    return response.data;
  } catch (error) {
    console.error("❌ Error uploading image:", error.response?.data || error);
    throw error;
  }
};
