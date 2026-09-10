import { lightColors, darkColors, ThemeColors } from './colors';
import { spacing, borderRadius } from './spacing';
import { typography } from './typography';

export interface AppTheme {
  colors: ThemeColors;
  spacing: typeof spacing;
  borderRadius: typeof borderRadius;
  typography: typeof typography;
  isDark: boolean;
}

export const lightTheme: AppTheme = {
  colors: lightColors,
  spacing,
  borderRadius,
  typography,
  isDark: false,
};

export const darkTheme: AppTheme = {
  colors: darkColors,
  spacing,
  borderRadius,
  typography,
  isDark: true,
};
