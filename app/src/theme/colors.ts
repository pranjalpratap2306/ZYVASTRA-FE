export const colors = {
  // Core brand palette inspired by the provided ZYVASTRA logo
  brandNavy: '#0B1D2A',      // deep navy background (header)
  brandNavyDim: '#12283A',   // slightly lighter navy for surfaces
  brandNavySoft: '#1C3550',  // soft navy for header elements/cards
  brandNavyHeader: '#2A4E6A', // lighter header blue for better logo contrast
  brandGold: '#E6C89D',      // warm beige/gold accent
  brandGoldStrong: '#DDBA83',

  // Light theme surfaces
  surface: '#FFFFFF',
  surfaceAlt: '#F7FAFC',
  border: '#E2E8F0',
  textPrimary: '#0F172A',
  textSecondary: '#475569',

  // Dark text palette (used on navy)
  textOnDark: '#F7F3EC',
  textMutedOnDark: '#C7CDD6',

  // Borders on dark surfaces
  borderOnDark: '#2A3A4A',

  // Inputs
  inputBgOnDark: '#0F2234',
  inputBgOnLight: '#FFFFFF',

  // Overlay
  overlay: 'rgba(0,0,0,0.45)'
} as const;

export type BrandColors = typeof colors; 