import React, { useState, useEffect, useMemo } from "react";
import SidebarItem from "./item/SidebarItem";
import MenuItems from "./item/MenuItems";
import { useLocation, useNavigate } from "react-router-dom";
import Images from "../../assets";

const Sidebar = ({ activeOverride = null }) => {
  const location = useLocation();
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false); // for mobile sidebar toggle
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false); // for logout confirmation modal

  // Calculate activeIndex using useMemo to avoid recalculating on each render
  const activeIndex = useMemo(() => {
    if (activeOverride !== null) {
      return activeOverride;
    }
    const currentIndex = MenuItems.findIndex((item) =>
      Array.isArray(item.href)
        ? item.href.includes(location.pathname)
        : item.href === location.pathname
    );
    return currentIndex !== -1 ? currentIndex : 0; // Default to 0 if not found
  }, [location.pathname, activeOverride]);

  const handleLogout = () => {
    // Logic for logout
    navigate("/Login"); // Redirect to login page
  };

  return (
    <div className="relative">
      {/* Hamburger Button for Mobile */}
      {!isSidebarOpen && (
        <button
          onClick={() => setIsSidebarOpen(true)}
          className="lg:hidden fixed top-20 left-4 z-50 p-2 text-purple-700 text-2xl"
        >
          ☰
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-30 left-0 h-[calc(100vh-5rem)] bg-white border-r border-gray-200 shadow-lg transition-transform ${
          isSidebarOpen ? "translate-x-0 w-1/2" : "-translate-x-full w-1/2"
        } lg:translate-x-0 lg:w-full lg:static`}
      >
        {/* Close Button */}
        {isSidebarOpen && (
          <button
            onClick={() => setIsSidebarOpen(false)}
            className="absolute top-1 right-2 text-gray-700 text-xl z-50"
          >
            ✖
          </button>
        )}

        {/* Sidebar Content */}
        <div
          className={`bg-white p-3 w-full rounded-lg border border-gray-200 h-full flex flex-col justify-between mb-6  ${
            isSidebarOpen ? "pt-8" : "lg:pt-3"
          }`}
        >
          <ul className="space-y-2 list-none">
            {MenuItems.map((item, index) => (
              <SidebarItem
                key={index}
                icon={item.icon}
                text={item.text}
                href={Array.isArray(item.href) ? item.href[0] : item.href}
                isActive={activeIndex === index}
                onClick={() => setIsSidebarOpen(false)} // Close sidebar on item click
              />
            ))}
          </ul>

          {/* Logout Button */}
          <div className="mt-6">
            <button
              onClick={() => setIsLogoutModalOpen(true)} // Open Logout Confirmation Modal
              className="flex items-center justify-start w-full p-3 rounded-md cursor-pointer font-medium text-gray-700 hover:bg-[#B6AFCA] hover:text-black"
            >
              <img src={Images.Logout} alt="Logout Icon" className="w-5 h-5" />
              <span className="ml-3">ออกจากระบบ</span>
            </button>
          </div>
        </div>
      </div>

      {/* Logout Confirmation Modal */}
      {isLogoutModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg w-[450px]">
            <h2 className="text-xl font-bold text-gray-700 mb-4">
              คุณแน่ใจหรือไม่ว่าต้องการออกจากระบบ?
            </h2>
            <div className="flex justify-end gap-4">
              <button
                onClick={() => setIsLogoutModalOpen(false)} // Close modal
                className="px-4 py-2 bg-[#D9D9D9] text-gray-700 rounded hover:bg-gray-300"
              >
                ยกเลิก
              </button>
              <button
                onClick={handleLogout} // Confirm logout
                className="px-4 py-2 bg-[#8677A7] text-white rounded hover:bg-[#6D5A90]"
              >
                ยืนยัน
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Sidebar;
