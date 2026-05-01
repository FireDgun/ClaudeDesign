/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        display: ["Orbitron", "system-ui", "sans-serif"],
        sans: ["Heebo", "system-ui", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        plex: ["'IBM Plex Mono'", "monospace"],
        magazine: ["'Frank Ruhl Libre'", "'Cormorant Garamond'", "Georgia", "serif"],
        editorial: ["Bellefair", "'Frank Ruhl Libre'", "Georgia", "serif"],
        instrument: ["'Instrument Serif'", "'Frank Ruhl Libre'", "serif"],
        cormorant: ["'Cormorant Garamond'", "'Frank Ruhl Libre'", "serif"],
        garamond: ["'EB Garamond'", "'Frank Ruhl Libre'", "serif"],
        italiana: ["Italiana", "'Cormorant Garamond'", "serif"],
        major: ["'Major Mono Display'", "monospace"],
        archivo: ["'Archivo Black'", "Heebo", "sans-serif"],
        slab: ["'Big Shoulders Display'", "Heebo", "sans-serif"],
      },
      colors: {
        ink: {
          900: "#050507",
          800: "#0a0a0d",
          700: "#101015",
          600: "#1a1a22",
          500: "#2a2a36",
        },
        accent: {
          DEFAULT: "#7cf9ff",
          glow: "#3b82f6",
          warm: "#ff6b6b",
        },
      },
      animation: {
        "float": "float 6s ease-in-out infinite",
        "marquee": "marquee 30s linear infinite",
        "marquee-r": "marquee-r 30s linear infinite",
        "shimmer": "shimmer 2.5s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-12px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "marquee-r": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "pulse-glow": {
          "0%, 100%": { opacity: "0.5", filter: "blur(40px)" },
          "50%": { opacity: "0.9", filter: "blur(50px)" },
        },
      },
    },
  },
  plugins: [],
};
