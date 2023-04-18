/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        textPri: "#000000",
        textSec: "#545454",
        textOpt: "#FFFFFF",
        textFunc: "#A6A6A6",
        bgPri: "#FFFFFF",
        bgSec: "#EDEAE4",
        bgOpt: "#F2AF29",
        bgOpt2: "#FFB803",
        bgFunc: "#B8343A",
        bgFunc2: "#B8131A",
        bgFunc3: "#941F3A",
      },
      fontSize: {
        sizePri: 28.5,
        sizeParagraph: 14,
        sizeSec: 56,
      },
    },
  },
  plugins: [],
};
