export const COLORS = {
  bannerPink: '#F52781',
  brandPink: '#E60067',
  brandPinkDark: '#D91B65',
  brandPinkLight: '#FE74A7',

  headerBlue: '#003499',
  headerBlueDark: '#002B80',
  profileHeaderPink: '#FD3D88',
  screenBgLight: '#F8F9FA',
  cardBorderLight: '#F1F5F9',

  splashBg: '#AD004C',
  splashGlowTop: '#FF2A85',
  splashShadowBottom: '#4A0020',

  white: '#FFFFFF',
  black: '#000000',
  transparent: 'transparent',
  transparentWhite: 'rgba(255, 255, 255, 0.2)',

  textDark: '#18181B',
  textBody: '#27272A',
  textSub: '#3F3F46',
  textMuted: '#71717A',
  textSecondary: '#64748B',
  textPlaceholder: '#A1A1AA',

  inputBorder: '#E4E4E7',
  dividerGray: '#D4D4D8',
  borderLight: '#E5E5E5',

  btnDisabledBg: '#F4F4F5',
  otpFilledBg: '#FFF0F5',
  cardBg: '#FFFFFF',
  cravingBg: '#FFF0F5',

  success: '#16A34A',
  error: '#DC2626',
  warning: '#F59E0B',
  badgeGreen: '#16A34A',
  badgeGreenBg: '#DCFCE7',
  badgeGreenText: '#14532D',
  badgeGreenDark: '#166534',
  ratingGreen: '#16A34A',
  priceHighlight: '#E60067',

  // Semantic UI tokens:
  filterPillActiveBg: '#FFF0F5',
  borderFilter: '#E2E8F0',
  textSlateDark: '#0F172A',
  textSlateSub: '#334155',
  textSlateMuted: '#64748B',
  textSlateLight: '#94A3B8',
  textSlateIcon: '#475569',

  yellowBadgeBg: '#FEF08A',
  badgeGreenSoftBg: '#F0FDF4',
  badgeGreenSoftBorder: '#DCFCE7',
  knownLovedGreen: '#9EE438',
  knownLovedDarkGreen: '#1C3A27',
  knownLovedOrange: '#FF9500',
  breakfastSoftBg: '#FFF8F6',
  breakfastSoftBorder: '#FFEFEA',
  dividerLight: '#F1F5F9',
  darkMenuBg: '#0F172A',

  // Category Banner Themes:
  bannerGreen: '#166534',
  bannerGreenLight: '#15803D',
  bannerMagenta: '#9D174D',
  bannerMagentaLight: '#BE185D',
  bannerOrange: '#C2410C',
  bannerOrangeLight: '#EA580C',
  bannerTeal: '#0F766E',
  bannerTealLight: '#0D9488',
  bannerBlue: '#1E3A8A',
  bannerBlueLight: '#2563EB',

  modalBackdrop: 'rgba(0, 0, 0, 0.25)',
  overlayWhite: 'rgba(255, 255, 255, 0.88)',
  radioUnselectedBorder: '#CBD5E1',
};

export const palette = {
  primary: COLORS.bannerPink,
  primaryDark: COLORS.brandPinkDark,
  primaryLight: COLORS.brandPinkLight,
  secondary: COLORS.brandPink,
  backgroundLight: COLORS.white,
  textPrimaryLight: COLORS.textBody,
  textSecondaryLight: COLORS.textMuted,
  borderLight: COLORS.borderLight,
  error: COLORS.error,
  success: COLORS.success,
  warning: COLORS.warning,
};

export const lightColors = {
  primary: COLORS.bannerPink,
  primaryLight: COLORS.brandPinkLight,
  secondary: COLORS.brandPink,
  background: COLORS.white,
  surface: COLORS.white,
  text: COLORS.textDark,
  textSecondary: COLORS.textMuted,
  border: COLORS.borderLight,
  error: COLORS.error,
  success: COLORS.success,
  warning: COLORS.warning,
};

export const darkColors = lightColors;

export type ThemeColors = typeof lightColors;