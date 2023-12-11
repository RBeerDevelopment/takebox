import { type Config } from "tailwindcss";
import colors from "tailwindcss/colors";

export default {
  theme: {
    extend: {
      colors: {
        primary: colors.green[500],
        background: colors.slate[950],
      },
    },
  },
  content: ["./app/**/*.{ts,tsx}", "./src/**/*.{ts,tsx}"],
} satisfies Config;
