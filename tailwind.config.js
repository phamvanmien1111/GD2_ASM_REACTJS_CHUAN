/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        card: "#f8f9fa", // Màu nền card (có thể đổi thành màu mong muốn)
        "card-foreground": "#212529", // Màu chữ của card
      },
    },
  },
  plugins: [],
}
