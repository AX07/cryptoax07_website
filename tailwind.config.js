/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'brand-bg': '#10141F',
        'brand-surface': '#1A202C',
        'brand-primary': '#38BDF8', // light blue
        'brand-secondary': '#34D399', // green
        'brand-accent': '#F472B6', // pink
        'brand-orange': '#F7931A', // bitcoin orange
        'brand-text': '#E2E8F0',
        'brand-text-secondary': '#94A3B8',
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'fade-in': 'fadeIn 0.8s ease-out forwards',
        'fade-in-fast': 'fadeIn 0.3s ease-out forwards',
        'slide-in-up': 'slideInUp 0.8s ease-out forwards',
        'slide-in-left': 'slideInLeft 0.8s ease-out forwards',
        'slide-in-right': 'slideInRight 0.8s ease-out forwards',
        'pop-in': 'popIn 0.6s ease-out forwards',
        'pulse-slow': 'pulseSlow 10s infinite',
        'gradient-shift': 'gradientShift 10s ease infinite',
        'shake': 'shake 0.5s cubic-bezier(.36,.07,.19,.97) both',
        'subtle-bounce': 'subtleBounce 2s infinite ease-in-out',
        'pulse-glow-blue': 'pulseGlowBlue 2.5s infinite ease-in-out',
        'pulse-glow-orange': 'pulseGlowOrange 2.5s infinite ease-in-out',
      },
      keyframes: {
        fadeIn: { '0%': { opacity: '0' }, '100%': { opacity: '1' } },
        slideInUp: { '0%': { opacity: '0', transform: 'translateY(30px)' }, '100%': { opacity: '1', transform: 'translateY(0)' } },
        slideInLeft: { '0%': { opacity: '0', transform: 'translateX(-30px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        slideInRight: { '0%': { opacity: '0', transform: 'translateX(30px)' }, '100%': { opacity: '1', transform: 'translateX(0)' } },
        popIn: { '0%': { opacity: '0', transform: 'scale(0.9)' }, '100%': { opacity: '1', transform: 'scale(1)' } },
        pulseSlow: { '0%, 100%': { transform: 'scale(1)' }, '5%, 15%': { transform: 'scale(1.05)' } },
        gradientShift: { '0%, 100%': { 'background-position': '0% 50%' }, '50%': { 'background-position': '100% 50%' } },
        shake: {
          '10%, 90%': { transform: 'translateX(-1px)' },
          '20%, 80%': { transform: 'translateX(2px)' },
          '30%, 50%, 70%': { transform: 'translateX(-4px)' },
          '40%, 60%': { transform: 'translateX(4px)' },
        },
        subtleBounce: { '0%, 100%': { transform: 'translateY(0) scale(1.05)' }, '50%': { transform: 'translateY(-5px) scale(1.05)' } },
        pulseGlowBlue: { '0%, 100%': { boxShadow: '0 0 25px 5px rgba(56, 189, 248, 0.4)' }, '50%': { boxShadow: '0 0 40px 10px rgba(56, 189, 248, 0.6)' } },
        pulseGlowOrange: { '0%, 100%': { boxShadow: '0 0 15px 3px rgba(247, 154, 26, 0.4)' }, '50%': { boxShadow: '0 0 25px 8px rgba(247, 154, 26, 0.6)' } },
        'confetti-fall': {
          '0%': { opacity: '1', transform: 'translateY(-10vh) rotateZ(0deg)' },
          '100%': { opacity: '0', transform: 'translateY(110vh) rotateZ(720deg)' },
        },
      }
    },
  },
  plugins: [],
}