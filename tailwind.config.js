import plugin from "tailwindcss/plugin.js";
import colors from "tailwindcss/colors.js";
import forms from "@tailwindcss/forms";
export default {
  content: ["./index.html", "./src/**/*.{svelte,js,ts}"],

  theme: {
    extend: {
      colors: {
        dark: {
          50: "#fafbfd",
          100: "#f2f2f2",
          300: "#374151",
        },
        light: {
          300: "#bc74a5",
        },

        custom: {
          whatsapp: "#1db656",
          telegram: "#37aee2",
          gcolor: "#fcbf02",
          tcolor: "#00b67b",
          fcolor: "#4267b2",
        },
      },
      fontFamily: {
        titillium: "var(--font-family)",
      },
    },
  },

  plugins: [forms],
};
