import React, { useEffect, useRef } from 'react';
import { View, Animated, Image } from 'react-native';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../theme/colors';
import { styles } from './SplashScreen.styles';

interface SplashScreenProps {
  onFinish: () => void;
}

export const SplashScreen: React.FC<SplashScreenProps> = ({ onFinish }) => {
  const fadeAnim = useRef(new Animated.Value(0)).current;
  const scaleAnim = useRef(new Animated.Value(0.85)).current;

  useEffect(() => {
    Animated.parallel([
      Animated.timing(fadeAnim, {
        toValue: 1,
        duration: 800,
        useNativeDriver: true,
      }),
      Animated.spring(scaleAnim, {
        toValue: 1,
        friction: 6,
        tension: 40,
        useNativeDriver: true,
      }),
    ]).start();

    const timer = setTimeout(() => {
      onFinish();
    }, 2200);

    return () => clearTimeout(timer);
  }, [fadeAnim, scaleAnim, onFinish]);

  return (
    <ScreenWrapper backgroundColor={COLORS.splashBg} barStyle="light-content">
      <View style={styles.container}>
        <View style={styles.topLightGlow} />
        <View style={styles.centerBrightGlow} />
        <View style={styles.bottomDarkShadow} />

        <Animated.View
          style={[
            styles.logoContainer,
            {
              opacity: fadeAnim,
              transform: [{ scale: scaleAnim }],
            },
          ]}
        >
          <Image
            source={IMAGES.appLogo}
            style={styles.logoImage}
            resizeMode="contain"
          />
        </Animated.View>
      </View>
    </ScreenWrapper>
  );
};
