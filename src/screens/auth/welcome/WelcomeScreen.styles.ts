import { StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
  },
  headerBar: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    borderBottomWidth: 1,
    borderBottomColor: COLORS.inputBorder,
    backgroundColor: COLORS.white,
  },
  backBtn: {
    paddingRight: 16,
    paddingVertical: 4,
  },
  backIcon: {
    fontSize: 22,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  headerTitle: {
    fontSize: 18,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    color: COLORS.textDark,
  },
  scrollContent: {
    paddingHorizontal: 24,
    paddingTop: 24,
    paddingBottom: 24,
  },
  fieldContainer: {
    marginBottom: 20,
  },
  labelRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  fieldLabel: {
    fontSize: 15,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    color: COLORS.textDark,
    marginBottom: 8,
  },
  optionalLabel: {
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.textMuted,
    marginBottom: 8,
  },
  input: {
    height: 46,
    borderRadius: 12,
    borderWidth: 1,
    borderColor: COLORS.inputBorder,
    paddingHorizontal: 16,
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.textDark,
    backgroundColor: COLORS.white,
  },
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'flex-start',
    marginTop: 8,
  },
  checkbox: {
    width: 22,
    height: 22,
    borderRadius: 11,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 2,
    marginRight: 12,
  },
  checkboxActive: {
    backgroundColor: COLORS.brandPink,
  },
  checkboxInactive: {
    borderWidth: 1.5,
    borderColor: COLORS.dividerGray,
    backgroundColor: COLORS.white,
  },
  checkmark: {
    color: COLORS.white,
    fontSize: 13,
    fontWeight: '800',
    marginTop: -1,
  },
  checkboxTextContainer: {
    flex: 1,
  },
  checkboxTitle: {
    fontSize: 14,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '600',
    color: COLORS.textDark,
    marginBottom: 4,
  },
  checkboxSubtext: {
    fontSize: 12,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.textMuted,
    lineHeight: 18,
  },
  linkText: {
    fontSize: 12,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    color: COLORS.textDark,
    textDecorationLine: 'underline',
  },
  bottomContainer: {
    paddingHorizontal: 24,
    paddingTop: 12,
    backgroundColor: COLORS.white,
  },
  startBtn: {
    height: 46,
    borderRadius: 23,
    justifyContent: 'center',
    alignItems: 'center',
  },
  startBtnActive: {
    backgroundColor: COLORS.brandPink,
  },
  startBtnDisabled: {
    backgroundColor: COLORS.btnDisabledBg,
  },
  startBtnText: {
    fontSize: 16,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
  },
  startBtnTextActive: {
    color: COLORS.white,
  },
  startBtnTextDisabled: {
    color: COLORS.textPlaceholder,
  },
});
