/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    "./app/**/*.{js,ts,tsx,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        "main-page-image": "url('/cinema.jpg')",
        "hero": "linear-gradient(to right bottom, rgba(24, 26, 27, 0.84), rgba(0,0,0, 0.8)), url('/cinema.jpg')"
      }
    },
  },
  plugins: [
    require("tailwind-scrollbar"),
    require("@tailwindcss/aspect-ratio")
  ],
  important: true,
}
