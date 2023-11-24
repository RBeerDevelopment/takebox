import { type Config } from "tailwindcss";

import { colors } from "./src/utils/colors";

export default {
  theme: {
    extend: {
      colors: {
        primary: colors.primary,
      },
    },
  },
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
} satisfies Config;
