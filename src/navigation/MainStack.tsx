import React, { useState, useEffect, useCallback } from 'react';
import { BackHandler } from 'react-native';
import {
  HomeScreen,
  ProfileScreen,
  EditProfileScreen,
  AddressesScreen,
  AccountSettingsScreen,
  TermsScreen,
  PrivacyPolicyScreen,
  HelpScreen,
  PastOrdersScreen,
} from '../screens/main';
import { UserProfile } from './RootNavigator';

interface MainStackProps {
  userProfile?: UserProfile;
  onNavigateBack?: () => void;
}

type ScreenName =
  | 'home'
  | 'profile'
  | 'edit_profile'
  | 'addresses'
  | 'settings'
  | 'terms'
  | 'privacy'
  | 'help'
  | 'past_orders';

export const MainStack: React.FC<MainStackProps> = ({ userProfile, onNavigateBack }) => {
  const [navHistory, setNavHistory] = useState<ScreenName[]>(['home']);
  const [profile, setProfile] = useState<UserProfile | undefined>(userProfile);

  const currentScreen = navHistory[navHistory.length - 1] || 'home';

  const navigateTo = (screen: ScreenName) => {
    setNavHistory((prev) => [...prev, screen]);
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

  const handleSaveProfile = (updatedData: Partial<UserProfile>) => {
    setProfile((prev) => ({
      ...prev,
      ...updatedData,
    }));
  };

  if (currentScreen === 'edit_profile') {
    return (
      <EditProfileScreen
        userProfile={profile}
        onBack={goBack}
        onSave={handleSaveProfile}
      />
    );
  }

  if (currentScreen === 'addresses') {
    return (
      <AddressesScreen
        onBack={goBack}
        onAddNewAddress={() => {}}
      />
    );
  }

  if (currentScreen === 'terms') {
    return <TermsScreen onBack={goBack} />;
  }

  if (currentScreen === 'privacy') {
    return <PrivacyPolicyScreen onBack={goBack} />;
  }

  if (currentScreen === 'settings') {
    return (
      <AccountSettingsScreen
        onBack={goBack}
        onLogout={onNavigateBack}
        onNavigateToTerms={() => navigateTo('terms')}
        onNavigateToPrivacy={() => navigateTo('privacy')}
      />
    );
  }

  if (currentScreen === 'help') {
    return (
      <HelpScreen
        onBack={goBack}
        onNavigateToPastOrders={() => navigateTo('past_orders')}
      />
    );
  }

  if (currentScreen === 'past_orders') {
    return (
      <PastOrdersScreen
        onBack={goBack}
        onExploreFood={() => setNavHistory(['home'])}
      />
    );
  }

  if (currentScreen === 'profile') {
    return (
      <ProfileScreen
        userProfile={profile}
        onBack={goBack}
        onLogout={onNavigateBack}
        onNavigateToEditProfile={() => navigateTo('edit_profile')}
        onNavigateToPastOrders={() => navigateTo('past_orders')}
        onNavigateToAddresses={() => navigateTo('addresses')}
        onNavigateToSettings={() => navigateTo('settings')}
        onNavigateToHelp={() => navigateTo('help')}
      />
    );
  }

  return (
    <HomeScreen
      userProfile={profile}
      onNavigateToProfile={() => navigateTo('profile')}
      onNavigateBack={onNavigateBack}
    />
  );
};


