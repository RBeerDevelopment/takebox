/** @type {import("tailwindcss").Config} */
module.exports = {
  presets: [require("@acme/tailwind-config")],
  theme: {
    extend: {
      colors: {
        primary: "#F191A8",
      },
    },
  },
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: "#F191A8",
        },
      },
    ],
  },
  plugins: [require("daisyui")],
};
