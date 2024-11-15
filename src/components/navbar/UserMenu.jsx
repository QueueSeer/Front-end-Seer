import React from "react";
import MenuItem from "./MenuItem";
import Images from "../../assets";

const UserMenu = () => {
  return (
    <div
      className="z-50 my-2 text-base list-none bg-white rounded-lg dark:bg-gray-700"
      id="user-dropdown"
    >
      {/* User Info with Bottom Border */}
      <div className="px-4 py-3 border-b border-gray-200 dark:border-gray-600">
        <span className="block text-sm text-gray-900 dark:text-white">
          เพียงฟ้า พาขวัญ
        </span>
        <span className="block text-sm text-gray-500 truncate dark:text-gray-400">
          @FahKu64
        </span>
      </div>

      {/* Menu Items without Divider */}
      <MenuItem
        icon={
          <img
            src={Images.calendarIcon}
            alt="calendarIcon"
            className="w-5 h-5"
          />
        }
        children="จองคิว"
        onClick={() => console.log("Go to จองคิว")}
      />
      <MenuItem
        icon={
          <img src={Images.profile_seer} alt="Settings" className="w-5 h-5" />
        }
        children="Settings"
        onClick={() => console.log("Go to Settings")}
      />
      <MenuItem
        icon={
          <img src={Images.profile_seer} alt="Logout" className="w-5 h-5" />
        }
        children="Logout"
        onClick={() => console.log("Logging out...")}
      />
    </div>
  );
};

export default UserMenu;
