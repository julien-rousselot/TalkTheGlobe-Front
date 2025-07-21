/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}", // Ajoutez cette ligne pour inclure les fichiers TypeScript
  ],
  theme: {
    extend: {
      colors: {
        talktheglobe: "#E8FDF4",
        peach: "#FFF9F0",
        redTitle: "#f24822",
        redText: "#C6192E",
        purple: "#e3ccff",
        green: "#aff4c6",
        yellow: "#ffe8a3",
        text: '#1e293b'
      },
      fontFamily: {
        nunito: ['"Nunito"', 'sans-serif'],
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),  // Ajoute cette ligne
  ],
}

