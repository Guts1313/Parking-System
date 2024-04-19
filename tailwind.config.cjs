module.exports = {
  content: ["./src/**/*.{html,js,ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        'noir': ['Noir Pro', 'sans-serif'],
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 1 },
        },
        scaleUp: {
          '0%': { transform: 'scale(0.95)' },
          '100%': { transform: 'scale(1)' },
        },
        scaleDown: { // Adding scale down animation
          '0%': { transform: 'scale(1)', opacity: 1 },
          '100%': { transform: 'scale(0.95)', opacity: 0 }
        },
      },
      animation: {
        fadeIn: 'fadeIn 0.3s ease-out',
        scaleUp: 'scaleUp 0.3s ease-out',
        scaleDown: 'scaleDown 0.3s ease-out forwards'
      }
    },
  },
  plugins: [],
};
