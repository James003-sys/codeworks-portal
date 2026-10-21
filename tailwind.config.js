/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        forest: {
          50: '#F2F7F4',
          100: '#E8F2EC',
          200: '#D1E6DA',
          300: '#A4CDBC',
          400: '#5C9E82',
          500: '#287052', // Supporting green
          600: '#1E5A42',
          700: '#174C3C', // Primary forest green
          800: '#123C30',
          900: '#0D2B22',
        },
        primary: {
          DEFAULT: '#174C3C',
          hover: '#123C30',
          supporting: '#287052',
          light: '#E8F2EC',
        },
        surface: {
          bg: '#F5F7F5', // Warm off-white/light gray page background
          card: '#FFFFFF', // White card surfaces
          subtle: '#FAFBF9',
          border: '#E4E9E5', // Subtle borders
          'border-dark': '#CBD5CE',
        },
        content: {
          heading: '#202923', // Dark charcoal headings
          body: '#3A473E',
          muted: '#647067', // Muted gray secondary text
          subtle: '#8C9890',
        },
        status: {
          success: '#15803D',
          'success-bg': '#DCFCE7',
          'success-border': '#BBF7D0',
          warning: '#B45309',
          'warning-bg': '#FEF3C7',
          'warning-border': '#FDE68A',
          error: '#B91C1C',
          'error-bg': '#FEE2E2',
          'error-border': '#FECACA',
          info: '#0369A1',
          'info-bg': '#E0F2FE',
          'info-border': '#BAE6FD',
        }
      },
      fontFamily: {
        sans: ['Plus Jakarta Sans', 'Inter', 'system-ui', '-apple-system', 'sans-serif'],
        mono: ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        subtle: '0 1px 2px 0 rgba(0, 0, 0, 0.04)',
        card: '0 1px 3px 0 rgba(0, 0, 0, 0.05), 0 1px 2px -1px rgba(0, 0, 0, 0.05)',
        elevated: '0 4px 6px -1px rgba(0, 0, 0, 0.06), 0 2px 4px -2px rgba(0, 0, 0, 0.06)',
        dropdown: '0 10px 15px -3px rgba(0, 0, 0, 0.08), 0 4px 6px -4px rgba(0, 0, 0, 0.04)',
      },
      borderRadius: {
        sm: '0.25rem',
        DEFAULT: '0.375rem',
        md: '0.5rem',
        lg: '0.625rem',
        xl: '0.75rem',
      }
    },
  },
  plugins: [],
}
