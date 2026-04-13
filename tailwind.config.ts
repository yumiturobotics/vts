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
        primary: {
          DEFAULT: "#0B3C5D",
          50: "#E8F0F5",
          100: "#C5D9E8",
          200: "#8FB3D1",
          300: "#598DBA",
          400: "#2367A3",
          500: "#0B3C5D",
          600: "#09324E",
          700: "#07283F",
          800: "#051E30",
          900: "#031421",
        },
        accent: {
          DEFAULT: "#F57C00",
          50: "#FFF3E0",
          100: "#FFE0B2",
          200: "#FFCC80",
          300: "#FFB74D",
          400: "#FFA726",
          500: "#F57C00",
          600: "#EF6C00",
          700: "#E65100",
          800: "#BF360C",
          900: "#8D2709",
        },
        neon: {
          blue: "#00D4FF",
          glow: "#00B4D8",
        },
        dark: {
          DEFAULT: "#0A1628",
          100: "#1A2744",
          200: "#0F1D32",
          300: "#0A1628",
        },
      },
      fontFamily: {
        heading: ["Poppins", "Montserrat", "sans-serif"],
        body: ["Inter", "Open Sans", "sans-serif"],
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow": "glow 2s ease-in-out infinite alternate",
        "slide-up": "slideUp 0.6s ease-out",
        "slide-down": "slideDown 0.6s ease-out",
        "fade-in": "fadeIn 0.8s ease-out",
        "pulse-glow": "pulseGlow 2s ease-in-out infinite",
        "spin-slow": "spin 8s linear infinite",
        "counter": "counter 2s ease-out forwards",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        glow: {
          "0%": { boxShadow: "0 0 5px #00D4FF, 0 0 10px #00D4FF" },
          "100%": { boxShadow: "0 0 20px #00D4FF, 0 0 40px #00D4FF, 0 0 60px #00D4FF" },
        },
        slideUp: {
          "0%": { opacity: "0", transform: "translateY(30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        slideDown: {
          "0%": { opacity: "0", transform: "translateY(-30px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
        fadeIn: {
          "0%": { opacity: "0" },
          "100%": { opacity: "1" },
        },
        pulseGlow: {
          "0%, 100%": { boxShadow: "0 0 5px rgba(0,212,255,0.3)" },
          "50%": { boxShadow: "0 0 20px rgba(0,212,255,0.6), 0 0 40px rgba(0,212,255,0.3)" },
        },
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "hero-gradient": "linear-gradient(135deg, #0A1628 0%, #0B3C5D 50%, #1A2744 100%)",
        "card-gradient": "linear-gradient(135deg, rgba(11,60,93,0.8), rgba(10,22,40,0.9))",
        "glass": "linear-gradient(135deg, rgba(255,255,255,0.1), rgba(255,255,255,0.05))",
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};

export default config;
