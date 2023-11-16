/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        primary: "Poppins, sans-serif",
      },
      colors: {
        gray: "hsl(257, 7%, 63%)",
        blue: "hsl(180, 66%, 49%)",
        lightblue: "hsl(180, 77%, 78%)",
        brow: "hsl(260, 8%, 14%)",
        lightgray: "hsl(0, 0%, 75%)",
      },
    },
  },
  plugins: [],
};
