import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          DEFAULT: '#2C3E2D',
          light: '#3D5240',
          dark: '#1E2B1F',
        },
        accent: {
          DEFAULT: '#D4A574',
          light: '#E0BB93',
          dark: '#C08E5A',
        },
        background: '#FAFAF7',
        foreground: '#1A1A1A',
        muted: '#6B7280',
        border: '#E5E5E0',
      },
      fontFamily: {
        sans: ['var(--font-dm-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-dm-serif)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
