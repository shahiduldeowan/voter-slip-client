/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        "app-primary": "#f7dd13",
      },
    },
  },
  plugins: [require("daisyui")],
};
