/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#E92C33',
          hover: '#C72229',
        },
        dark: {
          DEFAULT: '#2C2C2C',
          light: '#3D3D3D',
        },
        gray: {
          text: '#5D5D5D',
          light: '#888888',
        },
      },
    },
  },
  plugins: [],
};
