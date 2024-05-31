/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "main-color": "#065AD8",
      },
      boxShadow: {
        "main-shadow": "0px 4px 10.899999618530273px 0px #00000012",
      },
    },
  },
  plugins: [],
};
