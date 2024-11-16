import React from "react";
import MenuItem from "./MenuItem";
import UserInfo from "./UserInfo";
import Images from "../../assets";
import Logout from "./Logout";


const UserMenu = () => {
  return (
    <div
      className="z-50 my-2 px-6 text-base list-none rounded-3xl dark:bg-gray-700"
      id="user-dropdown"
    >
      {/* User Info with Bottom Border */}
      {/* User Info */}
      <UserInfo
        name="เพียงฟ้า พาขวัญ"
        username="@FahKu64"
        border={true} // Adds the bottom border
      />

      {/* Menu Items without Divider */}
      <MenuItem
        icon={
          <img
            src={Images.calendarIcon}
            alt="calendarIcon"
          />
        }
        children="จองคิว"
        onClick={() => console.log("Go to จองคิว")}
      />
      <MenuItem
        icon={
          <img
            src={Images.BoxIcon}
            alt="BoxIcon"
          />
        }
        children="แพ็กเกจ"
        onClick={() => console.log("Go to แพ็กเกจ")}
      />
      <MenuItem
        icon={
          <img
            src={Images.BoltIcon}
            alt="calendarIcon"
          />
        }
        children="ดูดวงทันที"
        onClick={() => console.log("Go to ดูดวงทันที")}
      />
      <MenuItem
        icon={
          <img
            src={Images.SledgehammerIcon}
            alt="SledgehammerIcon"
          />
        }
        children="ประมูล"
        onClick={() => console.log("Go to ประมูล")}
      />
      <MenuItem
        icon={
          <img
            src={Images.Clock_CircleIcon}
            alt="Clock_CircleIcon"
          />
        }
        children="ตารางเวลา"
        onClick={() => console.log("Go to ตารางเวลา")}
      />
      <MenuItem
        icon={
          <img
            src={Images.OutlineIcon}
            alt="cardicon"
          />
        }
        children="รายรับของฉัน"
        onClick={() => console.log("Go to รายรับของฉัน")}
      />
      <MenuItem
        icon={
          <img
            src={Images.Users_GroupIcon}
            alt="Users_GroupIcon"
          />
        }
        children="ผู้ติดตาม"
        onClick={() => console.log("Go to ผู้ติดตาม")}
      />
      <MenuItem
        icon={
          <img
            src={Images.Star_Icon}
            alt="StarIcon"
          />
        }
        children="จัดการรีวิว"
        onClick={() => console.log("Go to จัดการรีวิว")}
      />
    <Logout/>
    </div>
  );
};

export default UserMenu;
