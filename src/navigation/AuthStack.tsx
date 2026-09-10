import React, { useState, useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';
import { LoginScreen, OTPScreen, WelcomeScreen } from '../screens/auth';

interface AuthStackProps {
  onLoginSuccess: (userData?: { name?: string; email?: string; phone?: string; isGuest?: boolean }) => void;
}

export type AuthStep = 'login' | 'otp' | 'welcome';

export const AuthStack: React.FC<AuthStackProps> = ({ onLoginSuccess }) => {
  const [navHistory, setNavHistory] = useState<AuthStep[]>(['login']);
  const [phoneNumber, setPhoneNumber] = useState('');
  const [userData, setUserData] = useState<{ name?: string; email?: string }>({});

  const currentStep = navHistory[navHistory.length - 1] || 'login';

  const navigateTo = (step: AuthStep) => {
    setNavHistory((prev) => [...prev, step]);
  };

  const goBack = useCallback(() => {
    if (navHistory.length > 1) {
      setNavHistory((prev) => prev.slice(0, prev.length - 1));
      return true;
    }
    return false;
  }, [navHistory]);

  useEffect(() => {
    const onBackPress = () => {
      return goBack();
    };

    const subscription = BackHandler.addEventListener('hardwareBackPress', onBackPress);
    return () => subscription.remove();
  }, [goBack]);

  const handleSkip = () => {
    onLoginSuccess({ isGuest: true });
  };

  const handleLoginProceed = (phone: string) => {
    setPhoneNumber(phone);
    navigateTo('otp');
  };

  const handleOTPVerified = () => {
    navigateTo('welcome');
  };

  const handleStartOrdering = (name: string, email: string) => {
    setUserData({ name, email });
    onLoginSuccess({ name, email, phone: phoneNumber, isGuest: false });
  };

  switch (currentStep) {
    case 'otp':
      return (
        <OTPScreen
          phoneNumber={phoneNumber}
          onBack={goBack}
          onEditNumber={goBack}
          onOTPVerified={handleOTPVerified}
        />
      );
    case 'welcome':
      return (
        <WelcomeScreen
          onBack={goBack}
          onStartOrdering={handleStartOrdering}
        />
      );
    case 'login':
    default:
      return (
        <LoginScreen
          onSkip={handleSkip}
          onProceed={handleLoginProceed}
        />
      );
  }
};

