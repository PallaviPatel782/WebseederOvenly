import React from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
} from 'react-native';
import { AppText } from '../../../components/common/AppText';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  ReceiptIcon,
  MapPinIcon,
  SettingsIcon,
  HelpCircleIcon,
  StarIcon,
  UserIcon,
} from '../../../components/common/icons';
import { COLORS } from '../../../theme/colors';
import { UserProfile } from '../../../navigation/RootNavigator';
import { styles } from './ProfileScreen.styles';

interface ProfileScreenProps {
  userProfile?: UserProfile;
  onBack?: () => void;
  onLogout?: () => void;
  onNavigateToEditProfile?: () => void;
  onNavigateToPastOrders?: () => void;
  onNavigateToAddresses?: () => void;
  onNavigateToSettings?: () => void;
  onNavigateToHelp?: () => void;
}

export const ProfileScreen: React.FC<ProfileScreenProps> = ({
  userProfile,
  onBack,
  onLogout,
  onNavigateToEditProfile,
  onNavigateToPastOrders,
  onNavigateToAddresses,
  onNavigateToSettings,
  onNavigateToHelp,
}) => {
  const name = userProfile?.name
    ? userProfile.name
    : userProfile?.isGuest
    ? 'Guest Foodie'
    : 'Foodie';

  const phone = userProfile?.phone
    ? `+91 ${userProfile.phone}`
    : userProfile?.email
    ? userProfile.email
    : 'Guest Account';

  return (
    <ScreenWrapper backgroundColor={COLORS.profileHeaderPink} barStyle="light-content" unsafeBottom>
      <View style={styles.container}>
        <View style={styles.headerBanner}>
          <View style={styles.topNavRow}>
            <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.8}>
              <ArrowLeftIcon size={20} color={COLORS.white} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.editBtn}
              onPress={onNavigateToEditProfile}
              activeOpacity={0.8}
            >
              <AppText style={styles.editText}>Edit</AppText>
            </TouchableOpacity>
          </View>

          <View style={styles.userInfoRow}>
            <View style={styles.userAvatar}>
              <UserIcon size={28} color={COLORS.profileHeaderPink} strokeWidth={2.2} />
            </View>
            <View>
              <AppText style={styles.userName}>{name}</AppText>
              <AppText style={styles.userPhone}>{phone}</AppText>
            </View>
          </View>
        </View>

      <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
        <View style={styles.menuCard}>
          <TouchableOpacity
            style={[styles.menuItem, styles.menuItemBorder]}
            activeOpacity={0.7}
            onPress={onNavigateToPastOrders}
          >
            <View style={styles.iconBox}>
              <ReceiptIcon size={20} color={COLORS.textDark} />
            </View>
            <View style={styles.menuTextContainer}>
              <AppText style={styles.menuTitle}>Past Orders</AppText>
              <AppText style={styles.menuSubtitle}>Browse and reorder from your history</AppText>
            </View>
            <ChevronRightIcon size={18} color={COLORS.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={onNavigateToAddresses}
          >
            <View style={styles.iconBox}>
              <MapPinIcon size={20} color={COLORS.textDark} />
            </View>
            <View style={styles.menuTextContainer}>
              <AppText style={styles.menuTitle}>Addresses</AppText>
              <AppText style={styles.menuSubtitle}>Your saved addresses for delivery</AppText>
            </View>
            <ChevronRightIcon size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        <View style={styles.menuCard}>
          <TouchableOpacity
            style={[styles.menuItem, styles.menuItemBorder]}
            activeOpacity={0.7}
            onPress={onNavigateToSettings}
          >
            <View style={styles.iconBox}>
              <SettingsIcon size={20} color={COLORS.textDark} />
            </View>
            <View style={styles.menuTextContainer}>
              <AppText style={styles.menuTitle}>App Settings</AppText>
              <AppText style={styles.menuSubtitle}>Control app preferences, permissions and more.</AppText>
            </View>
            <ChevronRightIcon size={18} color={COLORS.textMuted} />
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.menuItem}
            activeOpacity={0.7}
            onPress={onNavigateToHelp}
          >
            <View style={styles.iconBox}>
              <HelpCircleIcon size={20} color={COLORS.textDark} />
            </View>
            <View style={styles.menuTextContainer}>
              <AppText style={styles.menuTitle}>Help</AppText>
              <AppText style={styles.menuSubtitle}>Report a problem to get assistance</AppText>
            </View>
            <ChevronRightIcon size={18} color={COLORS.textMuted} />
          </TouchableOpacity>
        </View>

        <TouchableOpacity style={styles.feedbackCard} activeOpacity={0.85}>
          <View style={styles.feedbackLeft}>
            <AppText style={styles.feedbackTitle}>Got feedback? Let us know</AppText>
            <AppText style={styles.feedbackSub}>Rate us on Play Store</AppText>
          </View>
          <View style={styles.starGraphics}>
            <StarIcon size={16} color={COLORS.badgeGreen} />
            <AppText style={styles.starText}>5.0</AppText>
          </View>
        </TouchableOpacity>

        <TouchableOpacity style={styles.logoutBtn} onPress={onLogout} activeOpacity={0.7}>
          <AppText style={styles.logoutText}>Logout</AppText>
        </TouchableOpacity>

        <AppText style={styles.copyrightText}>
          © 2026 WebseederOvenly.food - All rights reserved{'\n'}
          Version 2.0.0 (314) (000000)
        </AppText>
      </ScrollView>
    </View>
  </ScreenWrapper>
);
};
