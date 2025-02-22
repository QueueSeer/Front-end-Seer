module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: "#8677A7", // ตั้งค่า primary color
        secondary: "#65558F",
        secondary2: "#420F75",
        background: "#b2aac7",
        cancel: "#800020",
        bordercancel:"#990033",
      },
      fontFamily: {
        notosans: ['Noto Sans Thai', 'sans-serif'], // ฟอนต์ที่กำหนดเอง
      },
      screens: {
        'xxl': '1800px', // สร้างคีย์ xxl สำหรับ 1800px
      },
    },
  },
  plugins: [require("daisyui")],
};
