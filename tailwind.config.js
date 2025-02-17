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
        redTitle: "#f24822",
        purple: "#e3ccff",
        green: "#aff4c6",
        yellow: "#ffe8a3",
      },
    },
  },
  plugins: [
    require('@tailwindcss/line-clamp'),  // Ajoute cette ligne
  ],
}

