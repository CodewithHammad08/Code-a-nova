/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          primary: '#17243A',
          hover: '#243653',
          bg: '#F7F7F4',
          surface: '#FFFFFF',
          text: '#20242B',
          muted: '#6B7280',
          border: '#E5E7EB',
          accent: '#D6A64F',
          success: '#21845B',
          error: '#C44545',
        },
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', '-apple-system', 'sans-serif'],
        display: ['Manrope', 'Inter', 'system-ui', 'sans-serif'],
      },
      borderRadius: {
        'btn': '5px',
        'input': '5px',
        'card': '7px',
        'modal': '8px',
      },
    },
  },
  plugins: [],
}

