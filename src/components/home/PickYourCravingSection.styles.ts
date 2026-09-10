import { StyleSheet, Dimensions } from 'react-native';
import { COLORS } from '../../theme/colors';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    marginTop: 20,
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
  cravingsRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingHorizontal: 16,
  },
  cravingCard: {
    width: (width - 64) / 4,
    alignItems: 'center',
  },
  cravingIconBox: {
    width: 68,
    height: 68,
    borderRadius: 20,
    backgroundColor: '#FFF0F4',
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 6,
    overflow: 'hidden',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  cravingImage: {
    width: '100%',
    height: '100%',
    borderRadius: 20,
  },
  cravingLabel: {
    fontSize: 12,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '500',
    color: COLORS.textDark,
    textAlign: 'center',
  },
});
