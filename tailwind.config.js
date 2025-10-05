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
          DEFAULT: '#6366f1',
          50: '#eef2ff',
          100: '#e0e7ff',
          200: '#c7d2fe',
          300: '#a5b4fc',
          400: '#818cf8',
          500: '#6366f1',
          600: '#4f46e5',
          700: '#4338ca',
          800: '#3730a3',
          900: '#312e81',
          950: '#1e1b4b',
        },
        background: 'var(--background)',
        foreground: 'var(--foreground)',
        input: 'var(--input)',
        card: 'var(--card)',
        'card-foreground': 'var(--card-foreground)',
        ring: 'var(--color-ring)',
        border: 'var(--color-border)'
      },
      backgroundColor: theme => ({
        'background': 'var(--background)',
        'card': 'var(--card)',
        'popover': 'var(--popover)'
      }),
      textColor: theme => ({
        'foreground': 'var(--foreground)',
        'card-foreground': 'var(--card-foreground)'
      }),
      borderColor: theme => ({
        'border': 'var(--color-border)'
      }),
      ringColor: theme => ({
        'ring': 'var(--color-ring)'
      })
    },
  },
  plugins: [],
}

