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
import { ArrowLeftIcon } from '../../../components/common/icons';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../theme/colors';
import { styles } from './OTPScreen.styles';

interface OTPScreenProps {
  phoneNumber: string;
  onBack: () => void;
  onEditNumber: () => void;
  onOTPVerified: () => void;
}

export const OTPScreen: React.FC<OTPScreenProps> = ({
  phoneNumber,
  onBack,
  onEditNumber,
  onOTPVerified,
}) => {
  const insets = useSafeAreaInsets();
  const [otp, setOtp] = useState(['', '', '', '']);
  const [timer, setTimer] = useState(29);
  const [isKeyboardOpen, setIsKeyboardOpen] = useState(false);
  const inputRefs = useRef<Array<any>>([]);
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

  useEffect(() => {
    let interval: any;
    if (timer > 0) {
      interval = setInterval(() => {
        setTimer((prev) => prev - 1);
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [timer]);

  const handleOtpChange = (text: string, index: number) => {
    const cleaned = text.replace(/[^0-9]/g, '');
    const newOtp = [...otp];

    if (cleaned.length > 1) {
      const pasted = cleaned.slice(0, 4).split('');
      for (let i = 0; i < 4; i++) {
        newOtp[i] = pasted[i] || '';
      }
      setOtp(newOtp);
      inputRefs.current[3]?.focus();
      return;
    }

    newOtp[index] = cleaned;
    setOtp(newOtp);

    if (cleaned !== '' && index < 3) {
      inputRefs.current[index + 1]?.focus();
    }
  };

  const handleKeyPress = (e: any, index: number) => {
    if (e.nativeEvent.key === 'Backspace' && otp[index] === '' && index > 0) {
      inputRefs.current[index - 1]?.focus();
    }
  };

  const handleResend = () => {
    if (timer === 0) {
      setTimer(30);
      setOtp(['', '', '', '']);
      inputRefs.current[0]?.focus();
    }
  };

  const isOtpComplete = otp.every((digit) => digit.length === 1);

  const handleProceed = () => {
    if (isOtpComplete) {
      onOTPVerified();
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
              <TouchableOpacity style={styles.backButton} onPress={onBack} activeOpacity={0.8}>
                <ArrowLeftIcon size={20} color={COLORS.textDark} />
              </TouchableOpacity>
            </View>
          </View>

          <View style={[styles.bottomSheet, { paddingBottom: Math.max(insets.bottom, 16) + 12 }]}>
            <AppText style={styles.sheetTitle}>Verify your number</AppText>
            <View style={styles.subtitleRow}>
              <AppText style={styles.sheetSubtitle}>
                We've sent an OTP to {phoneNumber || '9893458940'}{' '}
              </AppText>
              <TouchableOpacity onPress={onEditNumber} activeOpacity={0.7}>
                <AppText style={styles.editLink}>Edit number</AppText>
              </TouchableOpacity>
            </View>

            <View style={styles.otpRow}>
              {[0, 1, 2, 3].map((index) => (
                <TextInput
                  key={index}
                  ref={(element) => {
                    inputRefs.current[index] = element;
                  }}
                  style={[
                    styles.otpBox,
                    otp[index] ? styles.otpBoxFilled : null,
                  ]}
                  value={otp[index]}
                  onChangeText={(text) => handleOtpChange(text, index)}
                  onKeyPress={(e) => handleKeyPress(e, index)}
                  keyboardType="number-pad"
                  maxLength={1}
                  selectTextOnFocus
                />
              ))}
            </View>

            <TouchableOpacity
              style={[
                styles.proceedBtn,
                isOtpComplete ? styles.proceedBtnActive : styles.proceedBtnDisabled,
              ]}
              disabled={!isOtpComplete}
              onPress={handleProceed}
              activeOpacity={0.85}
            >
              <AppText
                style={[
                  styles.proceedBtnText,
                  isOtpComplete ? styles.proceedBtnTextActive : styles.proceedBtnTextDisabled,
                ]}
              >
                Proceed
              </AppText>
            </TouchableOpacity>

            <View style={styles.resendContainer}>
              <AppText style={styles.resendLabel}>Didn't get the code?</AppText>
              {timer > 0 ? (
                <AppText style={styles.timerText}>Resend code in {timer}s</AppText>
              ) : (
                <TouchableOpacity onPress={handleResend} activeOpacity={0.7}>
                  <AppText style={styles.resendActiveText}>Resend code</AppText>
                </TouchableOpacity>
              )}
            </View>
          </View>
        </ScrollView>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};
