import baseConfig from "@flavoury/tailwind-config";
import { type Config } from "tailwindcss";

import { colors } from "./src/utils/colors";

export default {
  presets: [baseConfig],
  theme: {
    extend: {
      colors: {
        ...colors,
      },
    },
  },
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
} satisfies Config;
