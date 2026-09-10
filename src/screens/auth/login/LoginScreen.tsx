import React, { useState, useEffect, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  Image,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  Keyboard,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/common/AppText';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import { ChevronRightIcon } from '../../../components/common/icons';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../theme/colors';
import { styles } from './LoginScreen.styles';

interface LoginScreenProps {
  onSkip: () => void;
  onProceed: (phoneNumber: string) => void;
}

export const LoginScreen: React.FC<LoginScreenProps> = ({
  onSkip,
  onProceed,
}) => {
  const insets = useSafeAreaInsets();
  const [phoneNumber, setPhoneNumber] = useState('');
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const scrollViewRef = useRef<any>(null);

  useEffect(() => {
    const showSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillShow' : 'keyboardDidShow',
      () => {
        setIsKeyboardOpen(true);
        setTimeout(() => {
          scrollViewRef.current?.scrollToEnd({ animated: true });
        }, 50);
      }
    );

    const hideSub = Keyboard.addListener(
      Platform.OS === 'ios' ? 'keyboardWillHide' : 'keyboardDidHide',
      () => {
        setIsKeyboardOpen(false);
        setTimeout(() => {
          scrollViewRef.current?.scrollTo({ y: 0, animated: true });
        }, 50);
      }
    );

    return () => {
      showSub.remove();
      hideSub.remove();
    };
  }, []);

  const handlePhoneChange = (text: string) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    if (cleaned.length <= 10) {
      setPhoneNumber(cleaned);
    }
  };

  const isPhoneValid = phoneNumber.length === 10;

  const handleProceedPress = () => {
    if (isPhoneValid) {
      onProceed(phoneNumber);
    }
  };

  return (
    <ScreenWrapper backgroundColor={COLORS.white} barStyle="light-content" unsafeTop>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : undefined}
      >
        <ScrollView
          ref={scrollViewRef}
          contentContainerStyle={[
            styles.scrollContent,
            isKeyboardOpen ? { paddingBottom: 280 } : null,
          ]}
          keyboardShouldPersistTaps="handled"
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.topBanner}>
            <Image
              source={IMAGES.loginBanner}
              style={styles.bannerImg}
              resizeMode="cover"
            />

            <View style={[styles.topBar, { top: Math.max(insets.top, 16) + 8 }]}>
              <Image
                source={IMAGES.appLogo}
                style={styles.headerLogo}
                resizeMode="contain"
              />
              <TouchableOpacity onPress={onSkip} style={styles.skipBtn} activeOpacity={0.8}>
                <AppText style={styles.skipText}>Skip</AppText>
                <ChevronRightIcon size={15} color={COLORS.white} style={{ marginLeft: 2 }} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.bottomSheet, { paddingBottom: Math.max(insets.bottom, 16) + 12 }]}>
            <AppText style={styles.sheetTitle}>Start ordering now</AppText>
            <AppText style={styles.sheetSubtitle}>Just one quick step</AppText>

            <View
              style={[
                styles.inputContainer,
                phoneNumber.length > 0 ? styles.inputContainerFocused : null,
              ]}
            >
              <AppText style={styles.prefixText}>+91 </AppText>
              <AppText style={styles.dividerText}>|</AppText>
              <TextInput
                style={styles.phoneInput}
                placeholder="Enter Mobile Number"
                placeholderTextColor={COLORS.textPlaceholder}
                value={phoneNumber}
                onChangeText={handlePhoneChange}
                keyboardType="number-pad"
                maxLength={10}
              />
            </View>

            <TouchableOpacity
              style={[
                styles.proceedBtn,
                isPhoneValid ? styles.proceedBtnActive : styles.proceedBtnDisabled,
              ]}
              disabled={!isPhoneValid}
              onPress={handleProceedPress}
              activeOpacity={0.85}
            >
              <AppText
                style={[
                  styles.proceedBtnText,
                  isPhoneValid ? styles.proceedBtnTextActive : styles.proceedBtnTextDisabled,
                ]}
              >
                Proceed
              </AppText>
            </TouchableOpacity>

            <View style={styles.footerContainer}>
              <AppText style={styles.footerText}>
                By Clicking, I accept the{' '}
                <AppText style={styles.footerBold}>Terms & Conditions</AppText> &{' '}
                <AppText style={styles.footerBold}>Privacy Policy</AppText>
              </AppText>
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};
