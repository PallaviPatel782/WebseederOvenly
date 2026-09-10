import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../../theme/colors';

const { width, height } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.splashBg,
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
  },
  topLightGlow: {
    position: 'absolute',
    top: -height * 0.15,
    left: -width * 0.2,
    width: width * 1.2,
    height: width * 1.2,
    borderRadius: (width * 1.2) / 2,
    backgroundColor: COLORS.splashGlowTop,
    opacity: 0.55,
  },
  centerBrightGlow: {
    position: 'absolute',
    top: height * 0.18,
    left: width * 0.05,
    width: width * 1.1,
    height: width * 1.1,
    borderRadius: (width * 1.1) / 2,
    backgroundColor: COLORS.brandPink,
    opacity: 0.8,
  },
  bottomDarkShadow: {
    position: 'absolute',
    bottom: -height * 0.15,
    right: -width * 0.25,
    width: width * 1.4,
    height: width * 1.4,
    borderRadius: (width * 1.4) / 2,
    backgroundColor: COLORS.splashShadowBottom,
    opacity: 0.65,
  },
  logoContainer: {
    alignItems: 'center',
    justifyContent: 'center',
    zIndex: 10,
  },
  logoImage: {
    width: 110,
    height: 110,
    borderRadius: 24,
  },
});
