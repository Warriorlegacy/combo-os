import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    '../../packages/unslop-tokens/**/*.{js,ts,jsx,tsx}'
  ],
  darkMode: 'class',
  theme: {
    extend: {
      colors: {
        unslop: {
          bg: '#f7f6f1',
          surface: '#fffef9',
          surface2: '#efeee6',
          ink: '#1c1f1a',
          ink2: '#4c524a',
          ink3: '#7a8074',
          line: '#dddccd',
          accent: '#17603a',
          accentSoft: '#e3efe4',
          warn: '#8a4b0d',
          warnSoft: '#f7ecd9',
          bad: '#9c2b1e',
          good: '#17603a',
          darkBg: '#111410',
          darkSurface: '#181b16',
          darkSurface2: '#1f231d',
          darkInk: '#e8eae3',
          darkLine: '#31362d',
          darkAccent: '#6fce96'
        }
      },
      fontFamily: {
        serif: ['"IBM Plex Serif"', 'Georgia', 'serif'],
        sans: ['"IBM Plex Sans"', 'system-ui', 'sans-serif'],
        mono: ['"IBM Plex Mono"', 'Menlo', 'Consolas', 'monospace']
      }
    }
  },
  plugins: []
};

export default config;
