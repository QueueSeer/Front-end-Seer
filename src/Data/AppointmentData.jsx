import images from "../assets"; // นำเข้า assets

const appointmentData = [
  {
    id: 1,
    icon: images.gray, // ใช้ images.gray ให้ตรงกับที่ import มา
    name: "สุรางคนางค์ เกตุยั่งยืนวงศ์",
    birthdate: "2002-04-08T04:45:25.448Z",
    dateappointment: "2025-02-25T10:45:00.000Z", // เปลี่ยนเป็น 10:45
    packageName: "แพ็กเกจความรัก",
    type_package: "Questions",
    QuestionsNumber: 1,
    code: "4QCFR",
    status_service: "รอเข้ารับบริการ",
    email: "25654@gmail.com",
  },
];

export default appointmentData;
