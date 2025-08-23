/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      animation: {
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
      },

      colors: {
        primary: colors.green["600"],
        // You can also define shades
        "primary-light": colors.green["500"],
        "primary-dark": colors.green["700"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
