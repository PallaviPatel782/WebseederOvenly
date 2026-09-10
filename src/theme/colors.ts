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
  ratingGreen: '#16A34A',
  priceHighlight: '#E60067',
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