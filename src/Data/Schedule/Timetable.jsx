import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.qseer.app/api/",
  withCredentials: true,
});

const updateSeerSchedule = async (schedules) => {
  try {
    const response = await axiosInstance.put("seer/me/schedule", { schedules });
    return response.data; // ส่งคืนข้อมูลที่ได้รับหลังจากอัปเดตสำเร็จ
  } catch (error) {
    console.error("Error updating seer schedule:", error);
    throw new Error("ไม่สามารถแก้ไขตารางเวลาหมอดูได้"); // ข้อความแจ้งเตือนข้อผิดพลาด
  }
};

const addSeerDayoff = async (dayoffDate) => {
  try {
    // Ensure the dayoffDate is passed correctly as a string in the required format
    if (!dayoffDate) {
      throw new Error("วันหยุดไม่สามารถเป็นค่าว่างได้"); // Ensure the date is not empty
    }

    const response = await axiosInstance.post(
      "seer/me/dayoff", 
      { day_off: dayoffDate },
    );

    return response.data; // Return the response data from the API
  } catch (error) {
    console.error("Error updating seer schedule:", error);
    throw new Error("ไม่สามารถแก้ไขตารางเวลาหมอดูได้"); // ข้อความแจ้งเตือนข้อผิดพลาด
  }
};



const getSeerCalendar = async (seerId) => {
  try {
    const response = await axiosInstance.get(`seer/${seerId}/calendar`);
    return response.data; // ส่งคืนข้อมูลตารางเวลาของหมอดู
  } catch (error) {
    console.error("Error fetching seer calendar:", error);
    throw new Error("ไม่สามารถดึงข้อมูลตารางเวลาหมอดูได้"); // ข้อความแจ้งเตือนข้อผิดพลาด
  }
};

const deleteSeerDayoff = async (dayoffDate) => {
  try {
    const response = await axiosInstance.delete(`seer/me/dayoff/${dayoffDate}`);
    return response.data;
  } catch (error) {
    console.error("Error deleting seer dayoff:", error);
    throw new Error("ไม่สามารถลบวันหยุดหมอดูได้");
  }
};



const updateSeerBreakDuration = async (breakDuration) => {
    try {
      const response = await axiosInstance.patch("seer/me", { break_duration: breakDuration });
      return response.data; // ส่งคืนข้อมูลหลังจากอัปเดตสำเร็จ
    } catch (error) {
      console.error("Error updating seer break duration:", error);
      throw new Error("ไม่สามารถแก้ไขช่วงเวลาพักของหมอดูได้"); // ข้อความแจ้งเตือนข้อผิดพลาด
    }
  };

export { updateSeerSchedule, addSeerDayoff, getSeerCalendar, deleteSeerDayoff, updateSeerBreakDuration  };
