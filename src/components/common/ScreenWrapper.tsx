import React from 'react';
import { View, StatusBar, StyleSheet, ViewStyle, StatusBarStyle, Platform } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { COLORS } from '../../theme/colors';

export interface ScreenWrapperProps {
  children: React.ReactNode;
  style?: ViewStyle;
  backgroundColor?: string;
  barStyle?: StatusBarStyle;
  unsafeTop?: boolean;
  unsafeBottom?: boolean;
}

export const ScreenWrapper: React.FC<ScreenWrapperProps> = ({
  children,
  style,
  backgroundColor = COLORS.white,
  barStyle = 'dark-content',
  unsafeTop = false,
  unsafeBottom = false,
}) => {
  const insets = useSafeAreaInsets();
  const defaultTopInset = Platform.OS === 'ios' ? 44 : (StatusBar.currentHeight || 24);
  const topInset = unsafeTop ? 0 : (insets.top > 0 ? insets.top : defaultTopInset);

  return (
    <View
      style={[
        styles.container,
        {
          backgroundColor,
          paddingTop: topInset,
          paddingBottom: unsafeBottom ? 0 : insets.bottom,
          paddingLeft: insets.left,
          paddingRight: insets.right,
        },
        style,
      ]}
    >
      <StatusBar barStyle={barStyle} />
      {children}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
  },
});
