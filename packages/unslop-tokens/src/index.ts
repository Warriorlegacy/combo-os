// Unslop Playbook Design System Tokens
// Inspired by the warm editorial monochrome style from Free and Open-Source Stack Research.html

export const unslopPalette = {
  light: {
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
    badSoft: '#f8e6e1',
    good: '#17603a',
    goodSoft: '#e3efe4'
  },
  dark: {
    bg: '#111410',
    surface: '#181b16',
    surface2: '#1f231d',
    ink: '#e8eae3',
    ink2: '#b3b8ac',
    ink3: '#828a7d',
    line: '#31362d',
    accent: '#6fce96',
    accentSoft: '#1d2f22',
    warn: '#e8b06a',
    warnSoft: '#2f2617',
    bad: '#f0937f',
    badSoft: '#331f1a',
    good: '#6fce96',
    goodSoft: '#1d2f22'
  }
} as const;

export const unslopTypography = {
  fontSerif: '"IBM Plex Serif", Georgia, serif',
  fontSans: '"IBM Plex Sans", -apple-system, BlinkMacSystemFont, "Segoe UI", Roboto, sans-serif',
  fontMono: '"IBM Plex Mono", Menlo, Consolas, Monaco, monospace'
} as const;

export const unslopBadges = {
  freeTier: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-800 font-mono text-xs px-2 py-0.5 rounded-full',
  commercialOk: 'bg-green-100 text-green-900 dark:bg-green-950 dark:text-green-300 border border-green-300 dark:border-green-800 font-mono text-xs px-2 py-0.5 rounded-full',
  ccRequired: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800 font-mono text-xs px-2 py-0.5 rounded-full',
  noCc: 'bg-blue-100 text-blue-900 dark:bg-blue-950 dark:text-blue-300 border border-blue-300 dark:border-blue-800 font-mono text-xs px-2 py-0.5 rounded-full',
  approvalPending: 'bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 font-mono text-xs px-2.5 py-1 rounded-md font-semibold',
  approvalApproved: 'bg-emerald-100 text-emerald-900 dark:bg-emerald-950 dark:text-emerald-300 border border-emerald-400 font-mono text-xs px-2.5 py-1 rounded-md font-semibold',
  approvalRejected: 'bg-rose-100 text-rose-900 dark:bg-rose-950 dark:text-rose-300 border border-rose-300 font-mono text-xs px-2.5 py-1 rounded-md font-semibold'
} as const;

