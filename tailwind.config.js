/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: {
          dark: "#0F0E0D",
          subtle: "#141210",
        },
        surface: {
          elevated: "#1A1816",
          elevatedHover: "#23201D",
          border: "#2E2924",
          borderGlow: "rgba(212, 175, 55, 0.25)",
        },
        accent: {
          copper: "#C4683C",
          copperHover: "#A8542D",
          brass: "#D4AF37",
          brassGlow: "#F3D874",
          vermilion: "#8A1C14",
          vermilionHover: "#6F150F",
          patina: "#4A7C59",
        },
        text: {
          parchment: "#F5EFEB",
          stone: "#A89F91",
          muted: "#6E665B",
        },
      },
      fontFamily: {
        serif: ["var(--font-cinzel)", "Cinzel", "Cormorant Garamond", "Georgia", "serif"],
        sans: ["var(--font-jakarta)", "Plus Jakarta Sans", "Inter", "sans-serif"],
        telugu: ["var(--font-telugu)", "Noto Sans Telugu", "sans-serif"],
      },
      boxShadow: {
        'metallic-glow': '0 0 25px rgba(212, 175, 55, 0.15)',
        'copper-glow': '0 10px 30px rgba(196, 104, 60, 0.2)',
        'brass-card': '0 12px 36px -8px rgba(0, 0, 0, 0.8), 0 0 0 1px rgba(212, 175, 55, 0.1)',
      },
      backgroundImage: {
        'radial-patina': 'radial-gradient(circle at 50% 0%, rgba(196, 104, 60, 0.15), transparent 70%)',
        'radial-brass': 'radial-gradient(circle at 50% 50%, rgba(212, 175, 55, 0.12), transparent 60%)',
        'subtle-grain': 'linear-gradient(to bottom, #0F0E0D, #161412)',
      },
    },
  },
  plugins: [],
};
