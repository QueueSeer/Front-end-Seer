import Images from "../../../assets";

const MenuItems = [
  { icon: Images.UserIcon, text: "โปรไฟล์", href: "/profile" },
  { icon: Images.calendarIcon, text: "จองคิว", href: "/appointment" },
  { icon: Images.BoxIcon, text: "แพ็กเกจ", href: "/package" },
  { icon: Images.BoltIcon, text: "ดูดวงทันที", href: "/fortuneNow" },
  { icon: Images.SledgehammerIcon, text: "ประมูล", href: "/auction" },
  { icon: Images.Clock_CircleIcon, text: "ตารางเวลา", href: "/timetable" },
  { icon: Images.OutlineIcon, text: "รายการของฉัน", href: ["/revenue", "/withdraw-money"] }, 
  { icon: Images.Users_GroupIcon, text: "ผู้ติดตาม", href: "/follower" },
  { icon: Images.Star_Icon, text: "จัดการรีวิว", href: "/reviews" },
];

export default MenuItems;
