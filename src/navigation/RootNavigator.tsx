import React, { useState } from 'react';
import { SplashScreen } from '../screens/auth';
import { AuthStack } from './AuthStack';
import { MainStack } from './MainStack';

export interface UserProfile {
  name?: string;
  email?: string;
  phone?: string;
  isGuest?: boolean;
}

export const RootNavigator: React.FC = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);

  if (isLoading) {
    return <SplashScreen onFinish={() => setIsLoading(false)} />;
  }

  return userProfile ? (
    <MainStack
      userProfile={userProfile}
      onNavigateBack={() => setUserProfile(null)}
    />
  ) : (
    <AuthStack
      onLoginSuccess={(profile) => setUserProfile(profile || { isGuest: true })}
    />
  );
};
