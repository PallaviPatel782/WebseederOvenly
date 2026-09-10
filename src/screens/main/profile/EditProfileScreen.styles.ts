import { StyleSheet } from 'react-native';
import { COLORS } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: COLORS.white,
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
    paddingHorizontal: 20,
    paddingTop: 10,
  },
  fieldContainer: {
    marginTop: 22,
  },
  fieldLabel: {
    fontSize: 12,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    color: '#71717A',
    letterSpacing: 0.8,
    textTransform: 'uppercase',
    marginBottom: 8,
  },
  inputWrapper: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#F7F7F8',
    borderRadius: 14,
    height: 52,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
  },
  disabledWrapper: {
    backgroundColor: '#F4F4F5',
    borderColor: '#E4E4E7',
  },
  input: {
    flex: 1,
    fontSize: 15,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.textDark,
    paddingVertical: 0,
  },
  disabledInput: {
    color: '#A1A1AA',
  },
  lockIconBox: {
    marginLeft: 8,
  },
  bottomContainer: {
    paddingHorizontal: 20,
    paddingTop: 14,
    backgroundColor: COLORS.white,
  },
  saveBtn: {
    height: 52,
    borderRadius: 26,
    justifyContent: 'center',
    alignItems: 'center',
  },
  saveBtnActive: {
    backgroundColor: COLORS.brandPink,
    shadowColor: COLORS.brandPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.25,
    shadowRadius: 8,
    elevation: 4,
  },
  saveBtnDisabled: {
    backgroundColor: '#E4E4E7',
  },
  saveBtnText: {
    fontSize: 15,
    fontFamily: 'OpenSans-Bold',
    fontWeight: '700',
    letterSpacing: 1,
    textTransform: 'uppercase',
  },
  saveBtnTextActive: {
    color: COLORS.white,
  },
  saveBtnTextDisabled: {
    color: '#A1A1AA',
  },
});
