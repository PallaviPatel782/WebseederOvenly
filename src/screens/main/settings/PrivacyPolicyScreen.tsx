import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/common/AppText';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import { ArrowLeftIcon } from '../../../components/common/icons';
import { COLORS } from '../../../theme/colors';
import { styles } from './PrivacyPolicyScreen.styles';

interface PrivacyPolicyScreenProps {
  onBack?: () => void;
}

export const PrivacyPolicyScreen: React.FC<PrivacyPolicyScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper backgroundColor={COLORS.white} barStyle="dark-content" unsafeBottom>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeftIcon size={20} color={COLORS.textDark} strokeWidth={2.5} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>Privacy Policy</AppText>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 20, 30) }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topCard}>
            <AppText style={styles.topCardTitle}>Privacy & Data Protection</AppText>
            <AppText style={styles.lastUpdated}>Effective Date: September 1, 2026</AppText>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionNumberTitle}>1. Information We Collect</AppText>
            <AppText style={styles.sectionBody}>
              At WebseederOvenly, we prioritize the protection of your personal information. We collect data necessary to provide a smooth food ordering experience:
            </AppText>
            <View style={styles.bulletItem}>
              <AppText style={styles.bulletDot}>•</AppText>
              <AppText style={styles.bulletText}>Personal Identifiers: Name, mobile number, and email address.</AppText>
            </View>
            <View style={styles.bulletItem}>
              <AppText style={styles.bulletDot}>•</AppText>
              <AppText style={styles.bulletText}>Location Data: Precise or approximate GPS location for order delivery address confirmation.</AppText>
            </View>
            <View style={styles.bulletItem}>
              <AppText style={styles.bulletDot}>•</AppText>
              <AppText style={styles.bulletText}>Transaction Info: Order history, items purchased, and payment method receipts.</AppText>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionNumberTitle}>2. How We Use Your Data</AppText>
            <AppText style={styles.sectionBody}>
              Your information is used strictly to fulfill food delivery services, improve app user experience, process payments securely, communicate order status updates, and provide customer support.
            </AppText>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionNumberTitle}>3. Data Sharing & Third Parties</AppText>
            <AppText style={styles.sectionBody}>
              We do NOT sell your personal data to third parties. We share limited necessary information with:
            </AppText>
            <View style={styles.bulletItem}>
              <AppText style={styles.bulletDot}>•</AppText>
              <AppText style={styles.bulletText}>Delivery Partners: Name, delivery address, and phone number to deliver your food.</AppText>
            </View>
            <View style={styles.bulletItem}>
              <AppText style={styles.bulletDot}>•</AppText>
              <AppText style={styles.bulletText}>Restaurant Partners: Order details and special instructions.</AppText>
            </View>
            <View style={styles.bulletItem}>
              <AppText style={styles.bulletDot}>•</AppText>
              <AppText style={styles.bulletText}>Payment Gateways: Encrypted details for secure online transactions.</AppText>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionNumberTitle}>4. Data Security & Storage</AppText>
            <AppText style={styles.sectionBody}>
              We implement industry-standard encryption protocols (SSL/TLS) to protect your sensitive data during transmission and storage on secure cloud servers.
            </AppText>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionNumberTitle}>5. Your Privacy Rights & Choices</AppText>
            <AppText style={styles.sectionBody}>
              You have the right to access, update, or request deletion of your personal data at any time through the Account Settings screen in the WebseederOvenly app.
            </AppText>
          </View>

          <View style={styles.contactBox}>
            <AppText style={styles.contactTitle}>Have questions about your privacy?</AppText>
            <AppText style={styles.contactSub}>privacy@webseederovenly.com | Data Protection Office</AppText>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
