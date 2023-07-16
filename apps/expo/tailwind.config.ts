import { type Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config";

export default {
  presets: [baseConfig],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: "#F191A8",
          dark: "#FF4FC4",
        },
      },
    },
  },
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
} satisfies Config;
