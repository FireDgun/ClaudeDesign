/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: ["Inter", "Heebo", "system-ui", "sans-serif"],
        heebo: ["Heebo", "system-ui", "sans-serif"],
        display: ["Orbitron", "Heebo", "sans-serif"],
        mono: ["'JetBrains Mono'", "monospace"],
        plex: ["'IBM Plex Mono'", "'JetBrains Mono'", "monospace"],
        space: ["'Space Mono'", "'JetBrains Mono'", "monospace"],
        major: ["'Major Mono Display'", "monospace"],
        serif: ["'Playfair Display'", "'Frank Ruhl Libre'", "Georgia", "serif"],
        magazine: ["'Frank Ruhl Libre'", "'Cormorant Garamond'", "serif"],
        bricolage: ["'Bricolage Grotesque'", "Inter", "Heebo", "sans-serif"],
        dm: ["'DM Sans'", "Inter", "Heebo", "sans-serif"],
        grotesk: ["'Space Grotesk'", "Inter", "Heebo", "sans-serif"],
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "marquee-r": "marquee-r 30s linear infinite",
        "shimmer": "shimmer 3s linear infinite",
        "pulse-glow": "pulse-glow 3s ease-in-out infinite",
      },
      keyframes: {
        marquee: { "0%": { transform: "translateX(0)" }, "100%": { transform: "translateX(-50%)" } },
        "marquee-r": { "0%": { transform: "translateX(-50%)" }, "100%": { transform: "translateX(0)" } },
        shimmer: { "0%": { backgroundPosition: "-200% 0" }, "100%": { backgroundPosition: "200% 0" } },
        "pulse-glow": { "0%, 100%": { opacity: "0.5" }, "50%": { opacity: "0.95" } },
      },
    },
  },
  plugins: [],
};
