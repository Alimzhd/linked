/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ink: '#121212',
        paper: '#F9F9FB',
        steel: '#E2E8F0',
        blush: '#F4E8E1',
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'sans-serif'],
        serif: ['"Instrument Serif"', 'serif'],
        mono: ['"Geist Mono"', 'monospace'],
      },
      borderRadius: {
        DEFAULT: '12px',
        lg: '12px',
        xl: '16px',
        '2xl': '20px',
      },
      backgroundImage: {
        'metallic-gradient': 'linear-gradient(135deg, #FFFFFF, #CBD5E1, #F1F5F9, #94A3B8)',
      },
      transitionTimingFunction: {
        'ease-out-expo': 'cubic-bezier(0.16, 1, 0.3, 1)',
      },
    },
  },
  plugins: [],
}
