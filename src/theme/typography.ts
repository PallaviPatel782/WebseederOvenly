import { TextStyle } from 'react-native';

export const FONT_FAMILY = {
  light: 'OpenSans-Light',
  regular: 'OpenSans-Regular',
  medium: 'OpenSans-Medium',
  semiBold: 'OpenSans-SemiBold',
  bold: 'OpenSans-Bold',
  extraBold: 'OpenSans-Bold',
  italic: 'OpenSans-Italic',
  boldItalic: 'OpenSans-BoldItalic',
};

/**
 * Returns the appropriate OpenSans font family variant based on weight and style.
 */
export const getFontFamily = (
  fontWeight?: TextStyle['fontWeight'],
  fontStyle?: TextStyle['fontStyle'],
): string => {
  const isItalic = fontStyle === 'italic';
  switch (fontWeight) {
    case '300':
    case 'light':
      return isItalic ? FONT_FAMILY.italic : FONT_FAMILY.light;
    case '500':
    case 'medium':
      return isItalic ? FONT_FAMILY.italic : FONT_FAMILY.medium;
    case '600':
    case 'semibold':
      return isItalic ? FONT_FAMILY.boldItalic : FONT_FAMILY.semiBold;
    case '700':
    case 'bold':
    case '800':
    case '900':
    case 'heavy':
      return isItalic ? FONT_FAMILY.boldItalic : FONT_FAMILY.bold;
    case '400':
    case 'normal':
    default:
      return isItalic ? FONT_FAMILY.italic : FONT_FAMILY.regular;
  }
};

export const typography: Record<string, TextStyle> = {
  h1: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 32,
    fontWeight: '700',
    lineHeight: 40,
  },
  h2: {
    fontFamily: FONT_FAMILY.bold,
    fontSize: 24,
    fontWeight: '700',
    lineHeight: 32,
  },
  h3: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 20,
    fontWeight: '600',
    lineHeight: 28,
  },
  body1: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 16,
    fontWeight: '400',
    lineHeight: 24,
  },
  body2: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 14,
    fontWeight: '400',
    lineHeight: 20,
  },
  button: {
    fontFamily: FONT_FAMILY.semiBold,
    fontSize: 16,
    fontWeight: '600',
    lineHeight: 24,
  },
  caption: {
    fontFamily: FONT_FAMILY.regular,
    fontSize: 12,
    fontWeight: '400',
    lineHeight: 16,
  },
};
