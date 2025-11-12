// Design System Tokens - AthleteAI Pro

export const spacing = {
  xs: '8px',
  sm: '12px',
  md: '16px',
  lg: '20px',
  xl: '24px',
  '2xl': '32px',
  '3xl': '40px',
  '4xl': '48px',
} as const;

export const borderRadius = {
  sm: '8px',
  md: '12px',
  lg: '16px',
  xl: '20px',
  '2xl': '24px',
  full: '9999px',
} as const;

export const colors = {
  light: {
    primary: '#007AFF',
    primaryHover: '#0051D5',
    secondary: '#FF6A00',
    secondaryHover: '#E65100',
    background: '#FFFFFF',
    backgroundSecondary: '#F5F5F7',
    backgroundTertiary: '#E8E8ED',
    surface: '#FFFFFF',
    surfaceHover: '#F5F5F7',
    text: '#1C1C1E',
    textSecondary: '#3A3A3C',
    textTertiary: '#8E8E93',
    border: '#D1D1D6',
    borderHover: '#C7C7CC',
    success: '#34C759',
    warning: '#FF9500',
    error: '#FF3B30',
    info: '#5AC8FA',
  },
  dark: {
    primary: '#0A84FF',
    primaryHover: '#409CFF',
    secondary: '#FF9F0A',
    secondaryHover: '#FFB340',
    background: '#000000',
    backgroundSecondary: '#1C1C1E',
    backgroundTertiary: '#2C2C2E',
    surface: '#1C1C1E',
    surfaceHover: '#2C2C2E',
    text: '#FFFFFF',
    textSecondary: '#EBEBF5',
    textTertiary: '#8E8E93',
    border: '#38383A',
    borderHover: '#48484A',
    success: '#32D74B',
    warning: '#FF9F0A',
    error: '#FF453A',
    info: '#64D2FF',
  },
} as const;

export const shadows = {
  sm: '0 1px 2px 0 rgba(0, 0, 0, 0.05)',
  md: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
  lg: '0 10px 15px -3px rgba(0, 0, 0, 0.1), 0 4px 6px -2px rgba(0, 0, 0, 0.05)',
  xl: '0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)',
  '2xl': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
} as const;

export const transitions = {
  fast: '150ms cubic-bezier(0.4, 0, 0.2, 1)',
  normal: '200ms cubic-bezier(0.4, 0, 0.2, 1)',
  slow: '300ms cubic-bezier(0.4, 0, 0.2, 1)',
  bounce: '400ms cubic-bezier(0.68, -0.55, 0.265, 1.55)',
  spring: '500ms cubic-bezier(0.34, 1.56, 0.64, 1)',
} as const;

export const typography = {
  display: {
    fontSize: '48px',
    lineHeight: '1.1',
    fontWeight: '700',
    letterSpacing: '-0.02em',
  },
  h1: {
    fontSize: '36px',
    lineHeight: '1.2',
    fontWeight: '700',
    letterSpacing: '-0.01em',
  },
  h2: {
    fontSize: '28px',
    lineHeight: '1.3',
    fontWeight: '600',
    letterSpacing: '-0.01em',
  },
  h3: {
    fontSize: '22px',
    lineHeight: '1.4',
    fontWeight: '600',
  },
  h4: {
    fontSize: '18px',
    lineHeight: '1.5',
    fontWeight: '600',
  },
  body: {
    fontSize: '16px',
    lineHeight: '1.5',
    fontWeight: '400',
  },
  bodySm: {
    fontSize: '14px',
    lineHeight: '1.5',
    fontWeight: '400',
  },
  caption: {
    fontSize: '12px',
    lineHeight: '1.4',
    fontWeight: '400',
  },
} as const;

export const animations = {
  fadeIn: {
    initial: { opacity: 0 },
    animate: { opacity: 1 },
    exit: { opacity: 0 },
  },
  slideUp: {
    initial: { opacity: 0, y: 20 },
    animate: { opacity: 1, y: 0 },
    exit: { opacity: 0, y: -20 },
  },
  slideRight: {
    initial: { opacity: 0, x: -20 },
    animate: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  },
  scale: {
    initial: { opacity: 0, scale: 0.95 },
    animate: { opacity: 1, scale: 1 },
    exit: { opacity: 0, scale: 0.95 },
  },
} as const;
