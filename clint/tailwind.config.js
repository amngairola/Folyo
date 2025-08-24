/** @type {import('tailwindcss').Config} */
import forms from "@tailwindcss/forms";
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
        "move-lr": "moveLeftRight 2s ease-in-out infinite",
        "fade-in-down": "fade-in-down 0.6s ease-out forwards",
      },
      keyframes: {
        "fade-in-down": {
          "0%": {
            opacity: "0",
            transform: "translateY(-20px)",
          },
          "100%": {
            opacity: "1",
            transform: "translateY(0)",
          },
        },
        moveLeftRight: {
          "0%, 100%": { transform: "translateX(-50px)" },
          "50%": { transform: "translateX(50px)" },
        },
      },
    },
  },
  plugins: [forms],
};
