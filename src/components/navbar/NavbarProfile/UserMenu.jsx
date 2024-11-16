import React from "react";
import UserInfo from "./UserInfo";
import Logout from "./Logout";
import Item from "./Item";

const UserMenu = () => {
  return (
    <div
      className="z-50 my-2 px-6 text-base list-none rounded-3xl dark:bg-gray-700"
      id="user-dropdown"
    >
      {/* User Info */}
      <UserInfo
        name="เพียงฟ้า พาขวัญ"
        username="@FahKu64"
        border={true} // Adds the bottom border
      />

      <Item />
      <Logout />
    </div>
  );
};

export default UserMenu;
