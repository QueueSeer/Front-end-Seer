import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom"; // Make sure you have this import
import UserInfo from "./UserInfo";
import Logout from "./Logout";
import Item from "./Item";
import { fetchUserData } from "../../../Data/Profile/ProfileApi"; // API for user data
import { fetchCoinsUser } from "../../../Data/Profile/InfoDataUser"; // API for coins
import Images from "../../../assets"

const UserMenu = () => {
  const [userData, setUserData] = useState(null);
  const [tokenAmount, setTokenAmount] = useState(0); // Store the coin amount here
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const getUserData = async () => {
      try {
        const data = await fetchUserData(); // Fetch user data
        setUserData(data);
      } catch (err) {
        console.error("Error fetching user data:", err);
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    const getCoinsData = async () => {
      try {
        const coinsData = await fetchCoinsUser(); // Fetch coin data
        setTokenAmount(coinsData); // Assuming coinsData has an 'amount' field
      } catch (err) {
        console.error("Error fetching coins data:", err);
        setError(true);
      }
    };

    getUserData();
    getCoinsData(); // Fetch the coins when the component mounts
  }, []);

  // Function to handle logout
  const handleLogout = () => {
    console.log("Logging out...");
    // Handle logout actions, e.g., clear tokens, redirect, etc.
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
        name={userData.display_name || "ไม่พบชื่อ"} // Use display_name from API
        border={true}
      />

      {/* Show coin balance */}
      <div className="border-b border-gray-200 py-4 px-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <div className="w-8 h-8 rounded-full bg-[#E6DFF6] flex items-center justify-center mr-2">
              <img src={Images.chock} alt="โชคคอยน์" className="w-5 h-5" />
            </div>
            <span className="text-gray-700">โชคคอยน์</span>
          </div>
          <div className="flex items-center">
            <span className="text-xl font-bold text-[#6A41AB] mr-2">{tokenAmount}</span>
            
          </div>
        </div>
      </div>

      <Item />
      {/* Send onLogout prop to Logout */}
      <Logout onLogout={handleLogout} />
    </div>
  );
};

export default UserMenu;
