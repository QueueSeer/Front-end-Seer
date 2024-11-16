import React from "react";
import UserInfo from "../NavbarProfile/UserInfo";
import Logout from "../NavbarProfile/Logout";
import Item from "../NavbarProfile/Item";

const NotificationMenu = () => {
  return (
    <div
      className="z-50 my-2 px-6 text-base list-none rounded-3xl dark:bg-gray-700"
      id="user-dropdown"
    >
      {/* User Info */}
      <UserInfo
        name="การแจ้งเตือน"
        username="@FahKu64"
        border={true} // Adds the bottom border
      />

      <Item />
      <Logout />
    </div>
  );
};

export default NotificationMenu;
