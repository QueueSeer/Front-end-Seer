import React from "react";
import MenuItem from "./MenuItem";
import Images from "../../../assets";

const menuItems = [
  {
    icon: Images.UserIcon,
    label: "โปรไฟล์",
    to: "/profile",
  },
  {
    icon: Images.calendarIcon,
    label: "จองคิว",
    to: "/appointment",
  },
  {
    icon: Images.BoxIcon,
    label: "แพ็กเกจ",
    to: "/package",
  },
  // {
  //   icon: Images.BoltIcon,
  //   label: "ดูดวงทันที",
  //   to: "/fortuneNow",
  // },
  {
    icon: Images.SledgehammerIcon,
    label: "ประมูล",
    to: "/auction",
  },
  {
    icon: Images.Clock_CircleIcon,
    label: "ตารางเวลา",
    to: "/timetable",
  },
  {
    icon: Images.OutlineIcon,
    label: "รายรับของฉัน",
    to: "/revenue",
  },
  {
    icon: Images.Users_GroupIcon,
    label: "ผู้ติดตาม",
    to: "/follower",
  },
  {
    icon: Images.Star_Icon,
    label: "จัดการรีวิว",
    to: "/reviews",
  },
];

const Item = () => {
  return (
    <div>
      {menuItems.map((item, index) => (
        <MenuItem
          key={index}
          icon={<img src={item.icon} alt={`${item.label} Icon`} />}
          children={item.label}
          to={item.to} // ส่งค่าของ `to` ที่เป็นเส้นทาง
        />
      ))}
    </div>
  );
};

export default Item;
