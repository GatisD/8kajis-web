/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        heading: ["Plus Jakarta Sans", "sans-serif"],
        body: ["Inter", "sans-serif"],
      },
      colors: {
        // Landing split
        "split-blue-from": "#A8C5E8",
        "split-blue-to": "#7BA3D9",
        "split-purple-from": "#9B7EDE",
        "split-purple-to": "#7B5FC9",

        // E-veikals (light theme)
        navy: {
          DEFAULT: "#1B2B5E",
          50: "#eef1fb",
          100: "#d9dff5",
          900: "#0d1630",
        },
        teal: {
          DEFAULT: "#00685d",
          light: "#00877a",
          dark: "#004d44",
        },
        "cta-orange": "#E8813A",
        "cta-orange-text": "#1A0A00",

        // Sensorā telpa (dark theme)
        "sensor-bg": "#0A0A0F",
        "sensor-surface": "#111118",
        "sensor-purple": "#9B7EDE",
        "sensor-mint": "#00E5CC",

        // Shared
        brand: "#00685d",
      },
      letterSpacing: {
        widest: "0.25em",
        "4px": "0.25rem",
      },
      animation: {
        float: "float 4s ease-in-out infinite",
        "float-slow": "float 6s ease-in-out infinite",
        shimmer: "shimmer 3s ease-in-out infinite",
        "bounce-slow": "bounce 1.5s ease infinite",
        "wave-left": "wave-left 20s linear infinite",
        "wave-right": "wave-right 20s linear infinite",
        "tentacle-1": "tentacle 4s ease-in-out infinite",
        "tentacle-2": "tentacle 4.2s ease-in-out 0.3s infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        shimmer: {
          "0%, 100%": { opacity: "0.4" },
          "50%": { opacity: "1" },
        },
        "wave-left": {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-50%)" },
        },
        "wave-right": {
          "0%": { transform: "translateX(-50%)" },
          "100%": { transform: "translateX(0%)" },
        },
        tentacle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
      },
    },
  },
  plugins: [],
};
