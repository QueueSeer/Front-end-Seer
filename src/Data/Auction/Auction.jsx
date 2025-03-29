import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://backend.qseer.app/api/auction",
  withCredentials: true,
});

// ฟังก์ชันค้นหาประมูล
const searchAuctions = async ({
  last_id,
  limit = 10,
  seer_id,
  seer_display_name,
  name,
  exclude_ended,
  order_by = "date_created",
  direction = "desc",
} = {}) => {
  try {
    const params = {
      limit,
      order_by,
      direction,
    };

    if (last_id !== undefined) params.last_id = last_id;
    if (seer_id !== undefined) params.seer_id = seer_id;
    if (seer_display_name !== undefined) params.seer_display_name = seer_display_name;
    if (name !== undefined) params.name = name;
    if (exclude_ended !== undefined) params.exclude_ended = exclude_ended;

    const response = await axiosInstance.get("/search", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching auction search:", error);
    throw new Error("ไม่สามารถดึงข้อมูลประมูลได้");
  }
};

// ฟังก์ชันดึงประมูลของหมอดู
const getSeerAuctions = async ({
  last_id,
  limit = 10,
  name,
  exclude_ended = false,
  order_by = "id",
  direction = "desc",
} = {}) => {
  try {
    const params = {
      limit,
      order_by,
      direction,
      exclude_ended,
    };

    if (last_id !== undefined) params.last_id = last_id;
    if (name !== undefined) params.name = name;

    const response = await axiosInstance.get("/seer/me", { params });
    return response.data;
  } catch (error) {
    console.error("Error fetching seer auctions:", error);
    throw new Error("ไม่สามารถดึงข้อมูลประมูลของหมอดูได้");
  }
};

// ✅ ฟังก์ชันสร้างประมูลใหม่
const createAuctionSeer = async ({
  name,
  short_description,
  description,
  start_time,
  end_time,
  appoint_start_time,
  appoint_end_time,
  initial_bid,
  min_increment,
}) => {
  try {
    const payload = {
      name,
      short_description,
      description,
      start_time,
      end_time,
      appoint_start_time,
      appoint_end_time,
      initial_bid,
      min_increment,
    };

    const response = await axiosInstance.post("/", payload);
    return response.data;
  } catch (error) {
    console.error("Error creating auction:", error);
    throw new Error("ไม่สามารถสร้างประมูลได้");
  }
};

export { searchAuctions, getSeerAuctions, createAuctionSeer };
