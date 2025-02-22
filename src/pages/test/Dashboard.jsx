import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

axios.defaults.withCredentials = true; // ให้ axios ส่ง Cookies ไปกับทุก Request

export default function Dashboard() {
  const [userData, setUserData] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUserData = async () => {
      setIsLoading(true);
      setError(null);

      try {
        const response = await axios.get("https://backend.qseer.app/api/user/me", {
          withCredentials: true, // ต้องใส่ตรงนี้ด้วย เพื่อให้แน่ใจว่า Cookie ถูกส่ง
        });

        if (response.status === 200) {
          setUserData(response.data);
        } else {
          setError("ไม่สามารถดึงข้อมูลผู้ใช้ได้ กรุณาลองใหม่อีกครั้ง");
        }
      } catch (error) {
        if (error.response?.status === 401) {
          setError("Session หมดอายุ กรุณาเข้าสู่ระบบใหม่");
          navigate("/login"); // ถ้าเซสชันหมดอายุให้ไปหน้า Login
        } else {
          setError("เกิดข้อผิดพลาดในการดึงข้อมูลผู้ใช้");
        }
      } finally {
        setIsLoading(false);
      }
    };

    fetchUserData();
  }, [navigate]);

  if (isLoading) return <div>กำลังโหลด...</div>;

  return (
    <div className="p-8">
      <h1 className="text-2xl font-bold mb-4">ยินดีต้อนรับเข้าสู่แดชบอร์ดของคุณ</h1>

      {error ? (
        <div className="text-red-500">{error}</div>
      ) : userData ? (
        <div>
          <h2 className="text-xl font-semibold">ข้อมูลผู้ใช้</h2>
          <div className="flex items-center space-x-4">
            <img src={userData.image} alt="User Avatar" className="w-20 h-20 rounded-full" />
            <div>
              <p><strong>ชื่อแสดงผล:</strong> {userData.display_name || "ไม่มีข้อมูล"}</p>
              <p><strong>อีเมล:</strong> {userData.email}</p>
              <p><strong>ชื่อเต็ม:</strong> {userData.first_name} {userData.last_name}</p>
              <p><strong>Coins:</strong> {userData.coins}</p>
            </div>
          </div>
        </div>
      ) : (
        <p>ไม่มีข้อมูลผู้ใช้</p>
      )}
    </div>
  );
}
