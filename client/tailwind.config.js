/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      screens: {
        '3xl': '1600px',
        '4xl': '1800px',
        '5xl': '1920px',
        '6xl': '2280px',
        '7xl': '2560px',
        // Max values set to hide album and duration column in the track table
        'album': {'max': '800px'},
        'duration': {'max': '400px'},
      },
      maxWidth: {
        '8xl': '90rem',
      },
      fontFamily: {
        'maven': 'Maven Pro'
      },
      backgroundImage: (theme) => ({
        login: "url('/public/images/login.jpg')",
      }),
    },
  },
  plugins: [],
};
