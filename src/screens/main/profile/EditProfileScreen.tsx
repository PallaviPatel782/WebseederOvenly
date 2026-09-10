import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Alert,
  KeyboardAvoidingView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/common/AppText';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import { ArrowLeftIcon, LockIcon } from '../../../components/common/icons';
import { COLORS } from '../../../theme/colors';
import { UserProfile } from '../../../navigation/RootNavigator';
import { styles } from './EditProfileScreen.styles';

interface EditProfileScreenProps {
  userProfile?: UserProfile;
  onBack?: () => void;
  onSave?: (updatedProfile: Partial<UserProfile>) => void;
}

export const EditProfileScreen: React.FC<EditProfileScreenProps> = ({
  userProfile,
  onBack,
  onSave,
}) => {
  const insets = useSafeAreaInsets();

  const [name, setName] = useState(
    userProfile?.name ? userProfile.name : 'Hello'
  );
  const [phone] = useState(
    userProfile?.phone ? userProfile.phone : '9893458940'
  );
  const [email, setEmail] = useState(
    userProfile?.email ? userProfile.email : 'hello@gmail.com'
  );

  const isFormValid = name.trim().length > 0;

  const handleSave = () => {
    if (!isFormValid) {
      Alert.alert('Validation Error', 'Please enter a valid name.');
      return;
    }

    if (onSave) {
      onSave({
        name: name.trim(),
        email: email.trim(),
        phone,
      });
    }

    Alert.alert('Success', 'Profile updated successfully!', [
      { text: 'OK', onPress: onBack },
    ]);
  };

  return (
    <ScreenWrapper backgroundColor={COLORS.white} barStyle="dark-content" unsafeBottom>
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeftIcon size={20} color={COLORS.textDark} strokeWidth={2.5} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>Edit Profile</AppText>
        </View>

        <ScrollView
          style={styles.content}
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
          showsVerticalScrollIndicator={false}
        >
          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldLabel}>NAME</AppText>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={name}
                onChangeText={setName}
                placeholder="Enter your name"
                placeholderTextColor={COLORS.textPlaceholder}
                autoCapitalize="words"
              />
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldLabel}>PHONE</AppText>
            <View style={[styles.inputWrapper, styles.disabledWrapper]}>
              <TextInput
                style={[styles.input, styles.disabledInput]}
                value={phone}
                editable={false}
                placeholder="Phone number"
                placeholderTextColor={COLORS.textPlaceholder}
              />
              <View style={styles.lockIconBox}>
                <LockIcon size={18} color="#A1A1AA" strokeWidth={2} />
              </View>
            </View>
          </View>

          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldLabel}>EMAIL</AppText>
            <View style={styles.inputWrapper}>
              <TextInput
                style={styles.input}
                value={email}
                onChangeText={setEmail}
                placeholder="Enter your email"
                placeholderTextColor={COLORS.textPlaceholder}
                keyboardType="email-address"
                autoCapitalize="none"
              />
            </View>
          </View>
        </ScrollView>

        <View
          style={[
            styles.bottomContainer,
            { paddingBottom: Math.max(insets.bottom + 12, 20) },
          ]}
        >
          <TouchableOpacity
            style={[
              styles.saveBtn,
              isFormValid ? styles.saveBtnActive : styles.saveBtnDisabled,
            ]}
            activeOpacity={isFormValid ? 0.85 : 1}
            onPress={handleSave}
            disabled={!isFormValid}
          >
            <AppText
              style={[
                styles.saveBtnText,
                isFormValid ? styles.saveBtnTextActive : styles.saveBtnTextDisabled,
              ]}
            >
              SAVE
            </AppText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};
