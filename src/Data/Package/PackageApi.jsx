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

// ฟังก์ชันที่ใช้ดึงข้อมูลแพ็กเกจ Hidden
export const fetchPackageHiddenData = async () => {
  try {
    const response = await axiosInstance.get('/me/package/fortune?status=hidden&last_id=0&limit=10');
    return response.data;
  } catch (error) {
    console.error("Error fetching package data:", error);
    throw error; 
  }
};

// ฟังก์ชันที่ใช้เปลี่ยนสถานะแพ็กเกจ (published หรือ hidden)
export const updatePackageStatus = async (packageId, status) => {
  try {
    const response = await axiosInstance.patch(`/me/package/fortune/${packageId}/status`, { status });
    return response.data;
  } catch (error) {
    console.error("Error updating package status:", error);
    throw error;
  }
};
