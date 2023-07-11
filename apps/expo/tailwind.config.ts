import { type Config } from "tailwindcss";

import baseConfig from "@acme/tailwind-config";

export default {
  presets: [baseConfig],
  theme: {
    extend: {
      colors: {
        primary: "#F191A8",
      },
    },
  },
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
} satisfies Config;
