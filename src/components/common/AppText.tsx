import React from 'react';
import { Text as RNText, TextProps as RNTextProps, StyleSheet, TextStyle, StyleProp, Platform } from 'react-native';
import { typography, getFontFamily, FONT_FAMILY } from '../../theme/typography';

export interface AppTextProps extends RNTextProps {
  variant?: keyof typeof typography;
  style?: StyleProp<TextStyle>;
}

export const AppText: React.FC<AppTextProps> = ({ variant = 'body1', style, children, ...props }) => {
  const variantStyle = typography[variant] || {};
  const flattenedStyle = StyleSheet.flatten([variantStyle, style]) as TextStyle;

  const computedFontFamily =
    flattenedStyle?.fontFamily ||
    getFontFamily(flattenedStyle?.fontWeight, flattenedStyle?.fontStyle) ||
    FONT_FAMILY.regular;

  let finalStyle: TextStyle = {
    ...flattenedStyle,
    fontFamily: computedFontFamily,
  };

  if (Platform.OS === 'android' && computedFontFamily.startsWith('OpenSans-')) {
    const { fontWeight: _, ...rest } = finalStyle;
    finalStyle = rest;
  }

  return (
    <RNText {...props} style={finalStyle}>
      {children}
    </RNText>
  );
};
