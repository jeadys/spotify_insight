/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/app/**/*.{js,ts,jsx,tsx}', './src/components/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      blur: {
        'xs': '2px',
      },
      backgroundColor: {
        'gray-1100': '#23252d',
        'gray-1200': '#191a20',
        'gray-1300': '#0c0e12',
      },
      screens: {
        '3xl': '1600px',
        '4xl': '1800px',
        '5xl': '1920px',
        '6xl': '2280px',
        '7xl': '2560px',
        // Max values set to hide album and duration column in the track table
        'album': { 'max': '768px' },
        'duration': { 'max': '440px' },
      },
      height: {
        '144': '36rem',
      },
      maxWidth: {
        '8xl': '90rem',
      },
      fontFamily: {
        saira: ['var(--font-saira)'],
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { transform: 'rotate(-20deg)' },
          '50%': { transform: 'rotate(20deg)' },
        },
        musicbar: {
          '10%': { transform: 'scaleY(0.3)' },
          '30%': { transform: 'scaleY(1)' },
          '60%': { transform: 'scaleY(0.5)' },
          '80%': { transform: 'scaleY(0.75)' },
          '100': { transform: 'scaleY(0.6)' },
        },
        shimmer: {
          '100%': {
            transform: 'translateX(100%)',
          },
        },
      },
      animation: {
        wiggle: 'wiggle 200ms ease-in-out',
        musicbar: 'musicbar 2200ms ease infinite alternate',
      },
    },
  },
  plugins: [require('@tailwindcss/line-clamp')],
}
