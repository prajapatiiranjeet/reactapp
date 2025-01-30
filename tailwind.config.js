module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        poppins: ['Poppins', 'sans-serif'],
      },
      animation: {
        'profileIn': 'profileIn 0.2s ease-out forwards',
      },
      keyframes: {
        profileIn: {
          '0%': { 
            opacity: '0',
            transform: 'translate(-50%, -48%) scale(0.95)',
          },
          '100%': { 
            opacity: '1',
            transform: 'translate(-50%, -50%) scale(1)',
          },
        },
      },
      screens: {
        'sm': '320px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1536px',
      },
    },
  },
  plugins: [],
}