import React, { useState, useEffect } from "react";
import UserInfo from "./UserInfo";
import Logout from "./Logout";
import Item from "./Item";
import { fetchUserData } from "../../../Data/Profile/ProfileApi"; // ใช้ API ที่มีอยู่

const UserMenu = () => {
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData(); // ดึงข้อมูล user
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    getUserData();
  }, []);

  // ฟังก์ชันที่ใช้ในการออกจากระบบ
  const handleLogout = () => {
    console.log("Logging out...");
    // คุณสามารถทำการลบข้อมูลที่เกี่ยวข้องกับการออกจากระบบได้ที่นี่
    // เช่น ลบ token, redirect ไปที่หน้า Login เป็นต้น
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error || !userData) {
    return <div>Error loading user data</div>;
  }

  return (
    <div
      className="z-50 my-2 px-6 list-none rounded-3xl dark:bg-gray-700"
      id="user-dropdown"
    >
      {/* User Info */}
      <UserInfo
        name={userData.display_name || "ไม่พบชื่อ"} // ใช้ display_name จาก API
        border={true}
      />

      <Item />
      {/* ส่ง onLogout prop ไปที่ Logout */}
      <Logout onLogout={handleLogout} />
    </div>
  );
};

export default UserMenu;
