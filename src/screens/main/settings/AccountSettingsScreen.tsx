import React from 'react';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/common/AppText';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import { ArrowLeftIcon, ChevronRightIcon } from '../../../components/common/icons';
import { COLORS } from '../../../theme/colors';
import { styles } from './AccountSettingsScreen.styles';

interface AccountSettingsScreenProps {
  onBack?: () => void;
  onLogout?: () => void;
  onNavigateToTerms?: () => void;
  onNavigateToPrivacy?: () => void;
}

export const AccountSettingsScreen: React.FC<AccountSettingsScreenProps> = ({
  onBack,
  onLogout,
  onNavigateToTerms,
  onNavigateToPrivacy,
}) => {
  const insets = useSafeAreaInsets();
  const handleCheckUpdates = () => {
    Alert.alert('App Update', 'You are currently on the latest version of WebseederOvenly (v2.0.0).');
  };

  const handleTerms = () => {
    Alert.alert('Terms and Conditions', 'Redirecting to Terms and Conditions page...');
  };

  const handlePrivacy = () => {
    Alert.alert('Privacy Policy', 'Redirecting to Privacy Policy page...');
  };

  const handleDeleteAccount = () => {
    Alert.alert(
      'Delete Account',
      'Are you sure you want to permanently delete your account? This action cannot be undone.',
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            Alert.alert('Account Deleted', 'Your account has been successfully deleted.');
            if (onLogout) onLogout();
          },
        },
      ]
    );
  };

  return (
    <ScreenWrapper backgroundColor={COLORS.white} barStyle="dark-content" unsafeBottom>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeftIcon size={20} color={COLORS.textDark} strokeWidth={2.5} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>Account & Settings</AppText>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 20, 30) }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.settingsCard}>
            <TouchableOpacity
              style={[styles.settingRow, styles.settingRowBorder]}
              activeOpacity={0.7}
              onPress={handleCheckUpdates}
            >
              <AppText style={styles.settingLabel}>Check for Updates</AppText>
              <ChevronRightIcon size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.settingRow, styles.settingRowBorder]}
              activeOpacity={0.7}
              onPress={onNavigateToTerms}
            >
              <AppText style={styles.settingLabel}>Terms and Conditions</AppText>
              <ChevronRightIcon size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.settingRow, styles.settingRowBorder]}
              activeOpacity={0.7}
              onPress={onNavigateToPrivacy}
            >
              <AppText style={styles.settingLabel}>Privacy Policy</AppText>
              <ChevronRightIcon size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.settingRow}
              activeOpacity={0.7}
              onPress={handleDeleteAccount}
            >
              <AppText style={[styles.settingLabel, styles.deleteLabel]}>
                Delete Account
              </AppText>
              <ChevronRightIcon size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
