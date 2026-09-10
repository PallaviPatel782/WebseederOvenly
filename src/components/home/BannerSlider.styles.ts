import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../theme/colors';

const { width } = Dimensions.get('window');
export const SLIDER_WIDTH = width - 32;
export const SLIDER_HEIGHT = 200;

export const styles = StyleSheet.create({
  container: {
    marginTop: 16,
    marginBottom: 8,
    alignItems: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
  },
  bannerCard: {
    width: SLIDER_WIDTH,
    height: SLIDER_HEIGHT,
    borderRadius: 18,
    overflow: 'hidden',
    backgroundColor: '#F1F5F9',
    elevation: 3,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 5,
    marginRight: 16,
  },
  bannerImage: {
    width: '100%',
    height: '100%',
    borderRadius: 18,
  },
  paginationContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 10,
  },
  dot: {
    height: 6,
    borderRadius: 3,
    marginHorizontal: 3,
  },
  activeDot: {
    width: 18,
    backgroundColor: COLORS.headerBlueDark,
  },
  inactiveDot: {
    width: 6,
    backgroundColor: '#CBD5E1',
  },
});
