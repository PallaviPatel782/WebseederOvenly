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
    justifyContent: 'space-between',
    alignItems: 'center',
    paddingHorizontal: 20,
    zIndex: 10,
  },
  headerLogo: {
    width: 36,
    height: 36,
    borderRadius: 9,
  },
  skipBtn: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingVertical: 5,
    paddingHorizontal: 12,
    borderRadius: 16,
    backgroundColor: COLORS.transparentWhite,
  },
  skipText: {
    color: COLORS.white,
    fontSize: 14,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '500',
  },
  bottomSheet: {
    backgroundColor: COLORS.white,
    borderTopLeftRadius: 28,
    borderTopRightRadius: 28,
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: Platform.OS === 'android' ? 36 : 24,
    marginTop: -80,
    elevation: 10,
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: -3 },
    shadowOpacity: 0.1,
    shadowRadius: 6,
  },
  sheetTitle: {
    fontSize: 19,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    color: COLORS.textDark,
  },
  sheetSubtitle: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    color: COLORS.textMuted,
    marginTop: 2,
    marginBottom: 20,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 46,
    borderRadius: 12,
    borderWidth: 1.5,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 14,
    marginBottom: 16,
    backgroundColor: COLORS.white,
  },
  inputContainerFocused: {
    borderColor: COLORS.brandPink,
  },
  prefixText: {
    fontSize: 15,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '500',
    color: COLORS.textBody,
    marginRight: 6,
  },
  dividerText: {
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.dividerGray,
    marginRight: 10,
  },
  phoneInput: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    color: COLORS.textDark,
    paddingVertical: 0,
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
  footerContainer: {
    alignItems: 'center',
    marginBottom: 4,
  },
  footerText: {
    fontSize: 11,
    fontFamily: 'OpenSans-Regular',
    fontWeight: '400',
    color: COLORS.textMuted,
    textAlign: 'center',
  },
  footerBold: {
    fontFamily: 'OpenSans-Medium',
    fontWeight: '500',
    color: COLORS.textBody,
    fontSize: 11,
  },
});
