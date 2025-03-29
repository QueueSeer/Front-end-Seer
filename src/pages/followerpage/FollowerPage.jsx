import React, { useEffect, useState } from 'react';
import Navbar from "../../components/navbar";
import Images from "../../assets";
import Sidebar from "../../components/Sidebar"; 
import { getFollowers } from "../../Data/Followers/Followers"; 
import { fetchUserData } from "../../Data/Profile/ProfileApi";  // Assuming this fetches user data
import Pagination from "../../components/revenue/element/Pagination"; // Import Pagination component

const FollowerPage = () => {
  const [followers, setFollowers] = useState([]);
  const [totalFollowers, setTotalFollowers] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(0);
  const [seerId, setSeerId] = useState(null); // To store seerId fetched from user data

  useEffect(() => {
    // Fetch user info to get the seerId
    fetchUserData()
      .then((userData) => {
        setSeerId(userData.id);  // Assuming userData contains an 'id' field
      })
      .catch((error) => console.error("Error fetching user data:", error));
  }, []);

  useEffect(() => {
    if (seerId !== null) {
      // Fetch followers and total followers after getting seerId
      getFollowers(seerId, 0, 10)
        .then((followerData) => {
          setFollowers(followerData);
          setTotalFollowers(followerData.length); // Adjust based on actual data if total followers count available
          setTotalPages(Math.ceil(followerData.length / 10)); // Calculate total pages based on data
        })
        .catch((error) => console.error("Error fetching followers:", error));
    }
  }, [seerId]);  // Only fetch followers when seerId is available

  useEffect(() => {
    if (seerId !== null) {
      // Fetch followers for the current page
      getFollowers(seerId, (currentPage - 1) * 10, 10)
        .then((followerData) => {
          setFollowers(followerData);
        })
        .catch((error) => console.error("Error fetching followers for the current page:", error));
    }
  }, [currentPage, seerId]);  // Refetch followers when currentPage or seerId changes

  return (
    <div className="min-h-screen dark:bg-gray-900 flex flex-col">
      {/* Navbar */}
      <Navbar />

      {/* Layout */}
      <div className="flex px-12 pt-12 gap-14">
        {/* Sidebar */}
        <div className="hidden lg:block w-72 lg:sticky lg:top-[88px] lg:self-start">
          <Sidebar active="ผู้ติดตาม" />
        </div>

        {/* Main Content */}
        <div className="flex-1 bg-white dark:bg-gray-800 rounded-lg border border-gray-200 shadow-lg p-6 flex flex-col justify-between">
        {/* Header */}
          <div>
            <div className="flex items-center space-x-2 mb-4">
            <img src={Images.membericon} alt="Follower Icon" className="w-7 h-7" />
            <h1 className="text-xl font-bold" style={{ color: '#65558F' }}>ผู้ติดตาม</h1>
          </div>
          <hr className="border-gray-300 mb-4" />
          <p className="text-lg mb-6">
            <span className="font-bold" style={{ color: '#420F75', fontSize: '1rem' }}>
              จำนวนผู้ติดตาม - {totalFollowers} คน
            </span>
          </p>

          {/* Follower List */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-8">
            {followers.map((follower) => (
              <div key={follower.id} className="flex items-center space-x-4">
                <img
                  src={follower.image || Images.defaultAvatar} // Fallback image if no image provided
                  alt={follower.display_name}
                  className="w-16 h-16 rounded-full shadow-md"
                />
                <div>
                  <h2 className="text-lg font-bold text-gray-800">{follower.display_name}</h2>
                  <p className="text-sm text-gray-600">@{follower.username || "No username"}</p>
                </div>
              </div>
            ))}
          </div>
          </div>
          

          {/* Pagination */}
          <Pagination 
            currentPage={currentPage} 
            setCurrentPage={setCurrentPage} 
            totalPages={totalPages} 
          />
        </div>
      </div>
    </div>
  );
};

export default FollowerPage;
