import { StyleSheet, Dimensions, Platform } from 'react-native';
import { COLORS } from '../../../theme/colors';

const { width } = Dimensions.get('window');

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  scrollContent: {
    flexGrow: 1,
    justifyContent: 'space-between',
  },
  topBanner: {
    width: width,
    height: width * 1.5,
    position: 'relative',
    backgroundColor: COLORS.bannerPink,
  },
  bannerImg: {
    width: '100%',
    height: '100%',
  },
  topBar: {
    position: 'absolute',
    top: Platform.OS === 'ios' ? 60 : 42,
    left: 0,
    right: 0,
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  backButton: {
    width: 38,
    height: 38,
    borderRadius: 19,
    backgroundColor: COLORS.white,
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 2,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.15,
    shadowRadius: 2,
  },
  backArrow: {
    fontSize: 20,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '500',
    color: COLORS.textDark,
    marginTop: -2,
  },
  logoContainer: {
    marginLeft: 12,
  },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 9,
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'android' ? 36 : 24,
    marginTop: -80,
    elevation: 8,
  },
  sheetTitle: {
    fontSize: 20,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    color: COLORS.textDark,
  },
  subtitleRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    alignItems: 'center',
    marginTop: 4,
    marginBottom: 20,
  },
  sheetSubtitle: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    color: COLORS.textMuted,
  },
  editLink: {
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '500',
    color: COLORS.brandPink,
  },
  otpRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 20,
  },
  otpBox: {
    width: 62,
    height: 52,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    textAlign: 'center',
    fontSize: 22,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '500',
    color: COLORS.textDark,
    backgroundColor: COLORS.white,
  },
  otpBoxFilled: {
    borderColor: COLORS.brandPink,
    backgroundColor: COLORS.otpFilledBg,
  },
  proceedBtn: {
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
    marginBottom: 16,
  },
  proceedBtnActive: {
    backgroundColor: COLORS.brandPink,
  },
  proceedBtnDisabled: {
    backgroundColor: COLORS.btnDisabledBg,
  },
  proceedBtnText: {
    fontSize: 15,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '500',
  },
  proceedBtnTextActive: {
    color: COLORS.white,
  },
  proceedBtnTextDisabled: {
    color: COLORS.textPlaceholder,
  },
  resendContainer: {
    alignItems: 'flex-start',
  },
  resendLabel: {
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '500',
    color: COLORS.textSub,
    marginBottom: 2,
  },
  timerText: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.textPlaceholder,
  },
  resendActiveText: {
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '500',
    color: COLORS.brandPink,
  },
});
