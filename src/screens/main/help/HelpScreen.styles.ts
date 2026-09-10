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
    paddingTop: 20,
  },
  topBanner: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    marginBottom: 24,
  },
  bannerLeft: {
    flex: 1,
    paddingRight: 12,
  },
  bannerTitle: {
    fontSize: 22,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '800',
    color: COLORS.textDark,
    marginBottom: 6,
  },
  bannerSub: {
    fontSize: 13,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  mascotImage: {
    width: 90,
    height: 90,
    borderRadius: 20,
  },
  sectionTitle: {
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    color: COLORS.textSecondary,
    marginBottom: 12,
  },
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.04,
    shadowRadius: 6,
    elevation: 2,
    overflow: 'hidden',
  },
  topicItem: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 16,
    paddingHorizontal: 16,
  },
  topicItemBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  iconContainer: {
    width: 44,
    height: 44,
    borderRadius: 14,
    justifyContent: 'center',
    alignItems: 'center',
    marginRight: 14,
  },
  topicTextContainer: {
    flex: 1,
  },
  topicTitle: {
    fontSize: 15,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 3,
  },
  topicSub: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.textMuted,
  },
});
