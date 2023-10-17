import type { Config } from "tailwindcss";

import baseConfig from "@flavoury/tailwind-config";

export default {
  content: ["./src/**/*.tsx"],
  presets: [baseConfig],
} satisfies Config;
