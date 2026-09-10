export type AuthStackParamList = {
  Login: undefined;
  Register: undefined;
  ForgotPassword: undefined;
};

export type MainStackParamList = {
  Home: undefined;
  Profile: { userId?: string };
  Settings: undefined;
};

export type RootStackParamList = {
  Auth: undefined;
  Main: undefined;
};
