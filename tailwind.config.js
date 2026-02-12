/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        // Sets Inter as the default sans font and adds the custom Khmer font
        sans: ['Inter', 'sans-serif'],
        khmer: ['Kantumruy Pro', 'sans-serif'],
      },
      colors: {
        // You can use these custom names or stay with the standard pink/amber classes
        brand: {
          gold: '#fbbf24', // Matches amber-400
          pink: '#ec4899', // Matches pink-500
          rose: '#e11d48', // Matches rose-600
          dark: '#050505',
        },
      },
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
      },
      animation: {
        'float': 'float 6s ease-in-out infinite',
      },
      keyframes: {
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-20px)' },
        },
      },
    },
  },
  plugins: [],
}
