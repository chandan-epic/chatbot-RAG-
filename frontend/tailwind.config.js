/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{html,js,jsx}"],
  theme: {
    extend: {
      colors: {
        darkNavy: '#070F36',
        purple: '#7e57c2',
        blue: '#42a5f5',
        pink: '#ec407a',
        lightBlue: '#80d8ff',
        lightPurple: '#b388ff',
        darkPurple: '#5e35b1',
      },
      backgroundImage: {
        'bluebg':'linear-gradient(105deg, rgba(1,8,37,1) 0%, rgba(9,14,54,1) 99%)',
        'purple-blue': 'linear-gradient(135deg, #7e57c2 0%, #42a5f5 100%)',
        'pink-lightBlue': 'linear-gradient(135deg, #ec407a 0%, #80d8ff 100%)',
        'dark-lightPurple': 'linear-gradient(135deg, #5e35b1 0%, #b388ff 100%)',
      },
    },
  },
  plugins: [],
}

