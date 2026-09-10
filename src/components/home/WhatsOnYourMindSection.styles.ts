import { StyleSheet } from 'react-native';
import { COLORS } from '../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    marginTop: 10,
    marginBottom: 20,
  },
  sectionTitle: {
    fontSize: 17,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    color: COLORS.textDark,
    marginHorizontal: 16,
    marginBottom: 14,
  },
  horizontalScroll: {
    paddingHorizontal: 16,
  },
  itemCard: {
    alignItems: 'center',
    marginRight: 16,
    width: 78,
  },
  imageCircle: {
    width: 76,
    height: 76,
    borderRadius: 38,
    backgroundColor: '#F8F9FA',
    justifyContent: 'center',
    alignItems: 'center',
    overflow: 'hidden',
    marginBottom: 8,
    borderWidth: 1,
    borderColor: '#F1F5F9',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  foodImage: {
    width: '100%',
    height: '100%',
  },
  itemTitle: {
    fontSize: 12,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '500',
    color: COLORS.textDark,
    textAlign: 'center',
  },
});
