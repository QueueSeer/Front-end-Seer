import axiosInstance from '../AxiosConfig'; // ใช้ axios ที่ตั้งค่าไว้

// ฟังก์ชันที่ใช้ดึงข้อมูลแพ็กเกจ Draft
export const fetchPackageDraftData = async () => {
  try {
    const response = await axiosInstance.get('/me/package/fortune?status=draft&last_id=0&limit=10');
    return response.data;
  } catch (error) {
    console.error("Error fetching package data:", error);
    throw error; 
  }
};

// ฟังก์ชันที่ใช้ดึงข้อมูลแพ็กเกจ Published
export const fetchPackagePublishedData = async () => {
  try {
    const response = await axiosInstance.get('/me/package/fortune?status=published&last_id=0&limit=10');
    return response.data;
  } catch (error) {
    console.error("Error fetching package data:", error);
    throw error; 
  }
};

// ฟังก์ชันที่ใช้ดึงข้อมูลแพ็กเกจ Published
export const fetchPackageHiddenData = async () => {
  try {
    const response = await axiosInstance.get('/me/package/fortune?status=hidden&last_id=0&limit=10');
    return response.data;
  } catch (error) {
    console.error("Error fetching package data:", error);
    throw error; 
  }
};
