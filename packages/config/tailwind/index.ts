import type { Config } from "tailwindcss";

export default {
  content: ["./src/**/*.{ts,tsx}", "./src/_app.tsx"],
  theme: {
    extend: {
      colors: {
        primary: "#F191A8",
      },
    },
  },
  plugins: [],
} satisfies Config;
