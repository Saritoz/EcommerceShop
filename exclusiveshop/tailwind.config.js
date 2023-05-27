/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      animation: {
        'fade-in': 'fade 0.5s ease'
      },
      keyframes: {
        fade: {
          from: { transform: 'translateX(50px)', opacity: 0 },
          to: { transform: 'translateX(0px)', opacity: 1 }
        }
      }
    }
  },
  plugins: []
}
