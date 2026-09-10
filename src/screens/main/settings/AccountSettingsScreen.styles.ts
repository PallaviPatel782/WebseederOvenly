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
    paddingTop: 16,
  },
  settingsCard: {
    backgroundColor: COLORS.white,
    borderTopWidth: 1,
    borderBottomWidth: 1,
    borderColor: '#F1F5F9',
  },
  settingRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 16,
    paddingHorizontal: 20,
    backgroundColor: COLORS.white,
  },
  settingRowBorder: {
    borderBottomWidth: 1,
    borderBottomColor: '#F1F5F9',
  },
  settingLabel: {
    fontSize: 15,
    fontFamily: 'OpenSans-Medium',
    fontWeight: '500',
    color: COLORS.textDark,
  },
  deleteLabel: {
    color: COLORS.textDark,
  },
});
