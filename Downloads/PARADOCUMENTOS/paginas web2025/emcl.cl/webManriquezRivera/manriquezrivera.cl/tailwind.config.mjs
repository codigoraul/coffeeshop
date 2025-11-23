/** @type {import('tailwindcss').Config} */
export default {
  content: ['./src/**/*.{astro,html,js,jsx,md,mdx,svelte,ts,tsx,vue}'],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#053237',
          dark: '#042529',
          light: '#0a5a63',
        },
        secondary: {
          DEFAULT: '#DFBF68',
          dark: '#d4b05a',
          light: '#e8d08f',
        },
        cream: {
          DEFAULT: '#FCF9EE',
          dark: '#f5f1e8',
        }
      },
      maxWidth: {
        'container': '1400px',
      },
      fontFamily: {
        sans: ['Lato', 'system-ui', '-apple-system', 'BlinkMacSystemFont', 'Segoe UI', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
