import React from 'react';
import { View, ActivityIndicator, Image, StyleSheet } from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { IMAGES } from '../../assets/images';

interface LoadingSpinnerProps {
  size?: 'small' | 'large';
  showLogo?: boolean;
}

export const LoadingSpinner: React.FC<LoadingSpinnerProps> = ({
  size = 'large',
  showLogo = true,
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {showLogo && (
        <Image
          source={IMAGES.appLogo}
          style={styles.logo}
          resizeMode="contain"
        />
      )}
      <ActivityIndicator size={size} color={theme.colors.primary} />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 24,
  },
  logo: {
    width: 100,
    height: 100,
    marginBottom: 20,
    borderRadius: 20,
  },
});
