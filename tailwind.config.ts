import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: "#06142E",
        royal: "#1E4ED8",
        gold: "#F4B400",
        mist: "#D9E2F2",
      },
      boxShadow: {
        glow: "0 0 80px rgba(30, 78, 216, 0.22)",
        card: "0 20px 60px rgba(3, 10, 27, 0.45)",
      },
      backgroundImage: {
        noise:
          "radial-gradient(circle at 1px 1px, rgba(255,255,255,0.08) 1px, transparent 0)",
      },
      fontFamily: {
        sans: ["var(--font-inter)", "system-ui", "sans-serif"],
        display: ["var(--font-display)", "serif"],
      },
      animation: {
        "float-slow": "floatSlow 12s ease-in-out infinite",
        "pulse-soft": "pulseSoft 8s ease-in-out infinite",
      },
      keyframes: {
        floatSlow: {
          "0%, 100%": { transform: "translate3d(0, 0, 0)" },
          "50%": { transform: "translate3d(0, -12px, 0)" },
        },
        pulseSoft: {
          "0%, 100%": { opacity: "0.45", transform: "scale(1)" },
          "50%": { opacity: "0.9", transform: "scale(1.08)" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
