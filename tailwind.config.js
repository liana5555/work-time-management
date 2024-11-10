/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],

  theme: {
    extend: {
      colors: {
        'bg-olive': '#34403A',
        'accept-bg': '#18FF6D',
        'bg-lghter': '#285238',
        'light-green': '#D9F7E4',
        'darker-blue': '#91AEC1',
      },
      keyframes: {
        slideInFromBottom: {
          '0%': { transform: 'translateX(-50%) translateY(100vh)' },
          '100%': { transform: 'translateX(-50%) translateY(-50%)' },
        },
      },

      animation: {
        slideInFromBottom: 'slideInFromBottom ease-in-out 1s',
      },
    },
  },
  plugins: [],
}
