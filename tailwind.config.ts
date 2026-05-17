import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        bg: '#F5EDD8',
        'bg-2': '#EDE0C4',
        'bg-3': '#E8D9B8',
        paper: '#FAF4E2',
        rojo: '#8B2020',
        'rojo-dark': '#6B1818',
        'rojo-light': '#B14040',
        ink: '#1C1008',
        'ink-2': '#3D2A14',
        brown: '#6B4C2A',
        'brown-soft': '#8C6B42',
        border: '#C4A882',
      },
      fontFamily: {
        serif: ["var(--font-playfair)", 'Playfair Display', 'Georgia', 'serif'],
        sans: ["var(--font-inter)", 'Inter', 'system-ui', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

export default config
