module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        notosans: ['Noto Sans Thai', 'sans-serif'], // ฟอนต์ที่กำหนดเอง
      },
    },
  },
  plugins: [require("daisyui")],
};
