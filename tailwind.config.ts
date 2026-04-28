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
          DEFAULT: '#1E3932',
          light: '#00754A',
          dark: '#0F1F1A',
        },
        accent: {
          DEFAULT: '#CBA258',
          light: '#E6CC8A',
          dark: '#8D6E00',
        },
        green: {
          deep: '#1E3932',
          core: '#00754A',
          classic: '#006241',
          soft: '#D4E9E2',
          mist: '#EAF3EF',
        },
        background: '#F7F4EE',
        foreground: '#1E3932',
        muted: {
          DEFAULT: '#4A5A54',
          light: '#7A8985',
        },
        border: '#E3DDD0',
        surface: {
          DEFAULT: '#EFEAE0',
          light: '#F7F4EE',
        },
        ink: {
          DEFAULT: '#1E3932',
          soft: '#4A5A54',
        },
      },
      fontFamily: {
        sans: ['var(--font-work-sans)', 'system-ui', 'sans-serif'],
        serif: ['var(--font-fraunces)', 'Georgia', 'serif'],
      },
    },
  },
  plugins: [],
};
export default config;
