import React from 'react';
import { View, TouchableOpacity, ScrollView } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/common/AppText';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import { ArrowLeftIcon } from '../../../components/common/icons';
import { COLORS } from '../../../theme/colors';
import { styles } from './TermsScreen.styles';

interface TermsScreenProps {
  onBack?: () => void;
}

export const TermsScreen: React.FC<TermsScreenProps> = ({ onBack }) => {
  const insets = useSafeAreaInsets();

  return (
    <ScreenWrapper backgroundColor={COLORS.white} barStyle="dark-content" unsafeBottom>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeftIcon size={20} color={COLORS.textDark} strokeWidth={2.5} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>Terms & Conditions</AppText>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={{ paddingBottom: Math.max(insets.bottom + 20, 30) }}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topCard}>
            <AppText style={styles.topCardTitle}>WebseederOvenly Terms of Service</AppText>
            <AppText style={styles.lastUpdated}>Effective Date: September 1, 2026</AppText>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionNumberTitle}>1. Acceptance of Terms</AppText>
            <AppText style={styles.sectionBody}>
              By accessing, browsing, or using the WebseederOvenly mobile application ("Service"), you agree to be bound by these Terms and Conditions. If you do not agree to these terms, please do not use our services.
            </AppText>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionNumberTitle}>2. User Accounts & Registration</AppText>
            <AppText style={styles.sectionBody}>
              To place food orders through WebseederOvenly, you must register for an account or proceed as a guest with valid details. You agree to:
            </AppText>
            <View style={styles.bulletItem}>
              <AppText style={styles.bulletDot}>•</AppText>
              <AppText style={styles.bulletText}>Provide accurate, current, and complete phone numbers and delivery details.</AppText>
            </View>
            <View style={styles.bulletItem}>
              <AppText style={styles.bulletDot}>•</AppText>
              <AppText style={styles.bulletText}>Maintain the confidentiality of your account credentials.</AppText>
            </View>
            <View style={styles.bulletItem}>
              <AppText style={styles.bulletDot}>•</AppText>
              <AppText style={styles.bulletText}>Notify us immediately of any unauthorized access to your account.</AppText>
            </View>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionNumberTitle}>3. Ordering & Delivery Policy</AppText>
            <AppText style={styles.sectionBody}>
              WebseederOvenly acts as an intermediary between customers and restaurant partners. All food orders placed are subject to restaurant availability, preparation time, and delivery location feasibility. Delivery times provided are estimates and may vary due to weather or traffic conditions.
            </AppText>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionNumberTitle}>4. Pricing, Payments & Refunds</AppText>
            <AppText style={styles.sectionBody}>
              All prices listed on WebseederOvenly are inclusive of applicable taxes unless stated otherwise. Payments can be made online via UPI, Credit/Debit cards, Net Banking, or Cash on Delivery. Refunds for cancelled or unfulfilled orders will be processed back to your original payment method within 3–5 business days.
            </AppText>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionNumberTitle}>5. Cancellations & Modifications</AppText>
            <AppText style={styles.sectionBody}>
              Orders can only be cancelled before the restaurant accepts the order for preparation. Once preparation begins, cancellation requests may not be eligible for a full refund.
            </AppText>
          </View>

          <View style={styles.sectionCard}>
            <AppText style={styles.sectionNumberTitle}>6. Code of Conduct</AppText>
            <AppText style={styles.sectionBody}>
              Users agree not to misuse the WebseederOvenly platform, submit fraudulent orders, engage in abusive behavior toward delivery partners or customer support agents, or attempt reverse engineering of our app.
            </AppText>
          </View>

          <View style={styles.contactBox}>
            <AppText style={styles.contactTitle}>Questions regarding our Terms?</AppText>
            <AppText style={styles.contactSub}>legal@webseederovenly.com | +91 1800-WEBSEEDER</AppText>
          </View>
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
