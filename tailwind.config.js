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
        sm: '8px',
        md: '12px',
        lg: '16px',
        xl: '20px',
        '2xl': '24px',
      },
      boxShadow: {
        'xs': '0 1px 3px rgba(0,0,0,0.04)',
        'sm': '0 2px 8px rgba(0,0,0,0.05)',
        'md': '0 4px 16px rgba(0,0,0,0.06)',
        'lg': '0 8px 24px rgba(0,0,0,0.07)',
        'xl': '0 12px 36px rgba(0,0,0,0.08)',
        '2xl': '0 20px 48px rgba(0,0,0,0.10)',
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
