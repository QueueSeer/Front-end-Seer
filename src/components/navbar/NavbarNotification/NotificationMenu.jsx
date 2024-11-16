import React from "react";
import Item from "../NavbarProfile/Item";
import NotificationInfo  from "./NotificationInfo";

const NotificationMenu = () => {
  return (
    <div
      className="z-50 my-2 px-6 text-base list-none rounded-3xl dark:bg-gray-700"
      id="user-dropdown"
    >
      {/* User Info */}
      <NotificationInfo
      />

      <Item />
    </div>
  );
};

export default NotificationMenu;
