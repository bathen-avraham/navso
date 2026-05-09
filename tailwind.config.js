/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          'Heebo',
          'Assistant',
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'Roboto',
          'sans-serif',
        ],
        display: [
          'Heebo',
          'Inter',
          'system-ui',
          '-apple-system',
          'Segoe UI',
          'sans-serif',
        ],
      },
      colors: {
        brand: {
          50: '#eef3ff',
          100: '#dde6ff',
          200: '#bccdff',
          300: '#8ea8ff',
          400: '#5e80f7',
          500: '#3a5fe6',
          600: '#2747cc',
          700: '#1f3aa3',
          800: '#1d3382',
          900: '#1c2e6a',
        },
        accent: {
          50: '#ecfbf8',
          100: '#d2f4ed',
          200: '#a7e7da',
          300: '#6fd2c0',
          400: '#34b8a4',
          500: '#179a89',
          600: '#0e7c70',
          700: '#0e635b',
        },
        ink: {
          900: '#0f172a',
          800: '#1e293b',
          700: '#334155',
          600: '#475569',
          500: '#64748b',
          400: '#94a3b8',
        },
      },
      boxShadow: {
        soft: '0 6px 20px -10px rgba(31, 58, 163, 0.18)',
        lift: '0 14px 40px -16px rgba(31, 58, 163, 0.28)',
        ring: '0 0 0 1px rgba(15, 23, 42, 0.04)',
      },
      borderRadius: {
        '2xl': '1rem',
        '3xl': '1.25rem',
      },
      backgroundImage: {
        'brand-gradient':
          'linear-gradient(135deg, #2747cc 0%, #3a5fe6 50%, #179a89 100%)',
        'soft-gradient':
          'linear-gradient(180deg, #eef3ff 0%, #ffffff 60%, #ffffff 100%)',
      },
      keyframes: {
        'fade-up': {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
      },
      animation: {
        'fade-up': 'fade-up 0.5s ease-out both',
      },
    },
  },
  plugins: [],
};
