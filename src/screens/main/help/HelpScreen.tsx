import React from 'react';
import { View, TouchableOpacity, ScrollView, Image, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/common/AppText';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import {
  ArrowLeftIcon,
  ChevronRightIcon,
  ReceiptIcon,
  SmartphoneIcon,
  UserIcon,
  HelpCircleIcon,
} from '../../../components/common/icons';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../theme/colors';
import { styles } from './HelpScreen.styles';

interface HelpScreenProps {
  onBack?: () => void;
  onNavigateToPastOrders?: () => void;
}

export const HelpScreen: React.FC<HelpScreenProps> = ({
  onBack,
  onNavigateToPastOrders,
}) => {
  const insets = useSafeAreaInsets();
  const handleAppIssues = () => {
    Alert.alert('App Related Issues', 'If you are facing crashes or bugs, please email support@webseederovenly.com or call 1800-WEBSEEDER.');
  };

  const handleAccountIssues = () => {
    Alert.alert('Account Related Issues', 'To update profile data or report unauthorized access, contact help@webseederovenly.com.');
  };

  const handleOtherIssues = () => {
    Alert.alert('Other Issues', 'Our support team is available 24/7. Call us at +91 98765 43210.');
  };

  return (
    <ScreenWrapper backgroundColor={COLORS.white} barStyle="dark-content" unsafeBottom>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeftIcon size={20} color={COLORS.textDark} strokeWidth={2.5} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>Help</AppText>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 20, 30) }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBanner}>
            <View style={styles.bannerLeft}>
              <AppText style={styles.bannerTitle}>We're here for you</AppText>
              <AppText style={styles.bannerSub}>What do you need help with today?</AppText>
            </View>
            <Image source={IMAGES.helpMascot} style={styles.mascotImage} resizeMode="contain" />
          </View>

          <AppText style={styles.sectionTitle}>Other help topics</AppText>

          <View style={styles.card}>
            <TouchableOpacity
              style={[styles.topicItem, styles.topicItemBorder]}
              activeOpacity={0.7}
              onPress={onNavigateToPastOrders}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#FFF0F5' }]}>
                <ReceiptIcon size={20} color={COLORS.brandPink} />
              </View>
              <View style={styles.topicTextContainer}>
                <AppText style={styles.topicTitle}>Past Orders</AppText>
                <AppText style={styles.topicSub}>Missing items and other issues</AppText>
              </View>
              <ChevronRightIcon size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.topicItem, styles.topicItemBorder]}
              activeOpacity={0.7}
              onPress={handleAppIssues}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#EFF6FF' }]}>
                <SmartphoneIcon size={20} color={COLORS.headerBlue} />
              </View>
              <View style={styles.topicTextContainer}>
                <AppText style={styles.topicTitle}>App Related Issues</AppText>
                <AppText style={styles.topicSub}>Bugs, crashes and other problems</AppText>
              </View>
              <ChevronRightIcon size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={[styles.topicItem, styles.topicItemBorder]}
              activeOpacity={0.7}
              onPress={handleAccountIssues}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#FFF7ED' }]}>
                <UserIcon size={20} color="#EA580C" />
              </View>
              <View style={styles.topicTextContainer}>
                <AppText style={styles.topicTitle}>Account Related Issues</AppText>
                <AppText style={styles.topicSub}>Report problems with your account</AppText>
              </View>
              <ChevronRightIcon size={18} color={COLORS.textMuted} />
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.topicItem}
              activeOpacity={0.7}
              onPress={handleOtherIssues}
            >
              <View style={[styles.iconContainer, { backgroundColor: '#F0FDF4' }]}>
                <HelpCircleIcon size={20} color={COLORS.success} />
              </View>
              <View style={styles.topicTextContainer}>
                <AppText style={styles.topicTitle}>Other Issues</AppText>
                <AppText style={styles.topicSub}>Support for any other issue</AppText>
              </View>
              <ChevronRightIcon size={18} color={COLORS.textMuted} />
            </TouchableOpacity>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
