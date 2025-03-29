import axios from "axios";

// สร้าง instance ของ axios
const axiosInstance = axios.create({
  baseURL: "https://backend.qseer.app/api/image/auction/",
  withCredentials: true, 
});

// ฟังก์ชันสำหรับการส่งภาพไปยัง API
export const postImageauction = async (imageFile, auction_id) => {
  if (!imageFile || !auction_id) {
    console.error("❌ Missing image file or auction_id");
    return;
  }

  try {
    const formData = new FormData();
    formData.append("file", imageFile);

    const response = await axiosInstance.post(`${auction_id}`, formData, {
      headers: {
        "Content-Type": "multipart/form-data", 
      },
    });

    return response.data;
  } catch (error) {
    console.error("❌ Error uploading image:", error.response?.data || error);
    throw error;
  }
};
