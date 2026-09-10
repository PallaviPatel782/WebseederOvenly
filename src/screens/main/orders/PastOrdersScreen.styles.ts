import { StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.screenBgLight,
  },
  header: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 16,
    paddingVertical: 14,
    backgroundColor: COLORS.white,
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  backBtn: {
    padding: 6,
    marginRight: 12,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    color: COLORS.textDark,
  },
  content: {
    flex: 1,
    paddingHorizontal: 16,
    paddingTop: 16,
  },
  searchContainer: {
    marginBottom: 24,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    paddingHorizontal: 24,
    paddingVertical: 40,
  },
  emptyImage: {
    width: 170,
    height: 170,
    borderRadius: 28,
    marginBottom: 24,
  },
  emptyTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '800',
    color: COLORS.textDark,
    textAlign: 'center',
    marginBottom: 8,
  },
  emptySub: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.textMuted,
    textAlign: 'center',
    lineHeight: 20,
    marginBottom: 28,
  },
  exploreBtn: {
    backgroundColor: COLORS.brandPink,
    paddingVertical: 14,
    paddingHorizontal: 32,
    borderRadius: 24,
    shadowColor: COLORS.brandPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  exploreBtnText: {
    fontSize: 15,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    color: COLORS.white,
  },
});
