import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        surface: {
          DEFAULT: "#0a0e17",
          elevated: "#111827",
          muted: "#1f2937",
          glass: "rgba(17, 24, 39, 0.7)",
        },
        accent: {
          DEFAULT: "#10b981",
          emerald: "#10b981",
          mint: "#34d399",
          cyan: "#22d3ee",
          glow: "#6ee7b7",
        },
        border: {
          DEFAULT: "rgba(255, 255, 255, 0.08)",
          hover: "rgba(52, 211, 153, 0.3)",
        },
      },
      fontFamily: {
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
        body: ["var(--font-dm-sans)", "system-ui", "sans-serif"],
      },
      animation: {
        "fade-in": "fadeIn 0.6s ease-out forwards",
        "fade-in-up": "fadeInUp 0.6s ease-out forwards",
        "slide-up": "slideUp 0.5s ease-out forwards",
        "scale-in": "scaleIn 0.4s ease-out forwards",
        float: "float 6s ease-in-out infinite",
        "glow-pulse": "glowPulse 2s ease-in-out infinite",
        shimmer: "shimmer 2s linear infinite",
      },
      keyframes: {
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        fadeInUp: {
          "0%": { opacity: "0", transform: "translateY(20px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(16px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        scaleIn: {
          "0%": { opacity: "0", transform: "scale(0.96)" },
          "100%": { opacity: "1", transform: "scale(1)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        glowPulse: {
          "0%, 100%": { boxShadow: "0 0 20px rgba(16, 185, 129, 0.3)" },
          "50%": { boxShadow: "0 0 40px rgba(16, 185, 129, 0.5)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "gradient-mesh": "radial-gradient(at 40% 20%, rgba(16, 185, 129, 0.15) 0px, transparent 50%), radial-gradient(at 80% 0%, rgba(34, 211, 238, 0.1) 0px, transparent 50%), radial-gradient(at 0% 50%, rgba(16, 185, 129, 0.08) 0px, transparent 50%)",
      },
      boxShadow: {
        glow: "0 0 40px -10px rgba(16, 185, 129, 0.4)",
        "glow-cyan": "0 0 40px -10px rgba(34, 211, 238, 0.3)",
        card: "0 4px 24px -4px rgba(0, 0, 0, 0.4)",
      },
    },
  },
  plugins: [],
};

export default config;
