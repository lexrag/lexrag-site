import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './app/**/*.{ts,tsx}',
    './pages/**/*.{ts,tsx}',
    './components/**/*.{ts,tsx}',
    './lib/**/*.{ts,tsx}',
    './css/**/*.{css}',
  ],
  theme: {
    extend: {
      colors: {
        background: 'oklch(var(--background) / <alpha-value>)',
        foreground: 'oklch(var(--foreground) / <alpha-value>)',
        primary: 'oklch(var(--primary) / <alpha-value>)',
        'primary-foreground': 'oklch(var(--primary-foreground) / <alpha-value>)',
        secondary: 'oklch(var(--secondary) / <alpha-value>)',
        'secondary-foreground': 'oklch(var(--secondary-foreground) / <alpha-value>)',
        muted: 'oklch(var(--muted) / <alpha-value>)',
        'muted-foreground': 'oklch(var(--muted-foreground) / <alpha-value>)',
        accent: 'oklch(var(--accent) / <alpha-value>)',
        'accent-foreground': 'oklch(var(--accent-foreground) / <alpha-value>)',
        destructive: 'oklch(var(--destructive) / <alpha-value>)',
        border: 'oklch(var(--border) / <alpha-value>)',
        input: 'oklch(var(--input) / <alpha-value>)',
        ring: 'oklch(var(--ring) / <alpha-value>)',
      },
      borderRadius: {
        lg: '0.5rem',
        xl: '1rem',
        '2xl': '1.5rem',
      },
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
      },
      keyframes: {
        aurora: {
          '0%': {
            backgroundPosition: '0% 50%',
            transform: 'rotate(-5deg) scale(0.9)',
          },
          '25%': {
            backgroundPosition: '50% 100%',
            transform: 'rotate(5deg) scale(1.1)',
          },
          '50%': {
            backgroundPosition: '100% 50%',
            transform: 'rotate(-3deg) scale(0.95)',
          },
          '75%': {
            backgroundPosition: '50% 0%',
            transform: 'rotate(3deg) scale(1.05)',
          },
          '100%': {
            backgroundPosition: '0% 50%',
            transform: 'rotate(-5deg) scale(0.9)',
          },
        },
      },
      animation: {
        aurora: 'aurora 8s ease-in-out infinite alternate',
      },
    },
  },
  plugins: [
    require('tailwindcss-animate'),
  ],
};

export default config;