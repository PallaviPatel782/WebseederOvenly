import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
} from 'react-native';
import { AppText } from '../../../components/common/AppText';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import { ArrowLeftIcon, CheckIcon } from '../../../components/common/icons';
import { COLORS } from '../../../theme/colors';
import { styles } from './WelcomeScreen.styles';

interface WelcomeScreenProps {
  onBack: () => void;
  onStartOrdering: (name: string, email: string) => void;
}

export const WelcomeScreen: React.FC<WelcomeScreenProps> = ({
  onBack,
  onStartOrdering,
}) => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [keepUpdated, setKeepUpdated] = useState(true);

  const isNameFilled = name.trim().length > 0;

  const handleStartOrdering = () => {
    if (isNameFilled) {
      onStartOrdering(name.trim(), email.trim());
    }
  };

  return (
    <ScreenWrapper backgroundColor={COLORS.white} barStyle="dark-content">
      <KeyboardAvoidingView
        style={styles.container}
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
      >
        <View style={styles.headerBar}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeftIcon size={22} color={COLORS.textDark} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>Welcome to WebseederOvenly</AppText>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} keyboardShouldPersistTaps="handled">
          <View style={styles.fieldContainer}>
            <AppText style={styles.fieldLabel}>What should we call you? :)</AppText>
            <TextInput
              style={styles.input}
              placeholder="Enter your name"
              placeholderTextColor={COLORS.textPlaceholder}
              value={name}
              onChangeText={setName}
              autoCapitalize="words"
              autoFocus
            />
          </View>

          <View style={styles.fieldContainer}>
            <View style={styles.labelRow}>
              <AppText style={styles.fieldLabel}>Email</AppText>
              <AppText style={styles.optionalLabel}> (optional)</AppText>
            </View>
            <TextInput
              style={styles.input}
              placeholder="Enter your email address"
              placeholderTextColor={COLORS.textPlaceholder}
              value={email}
              onChangeText={setEmail}
              keyboardType="email-address"
              autoCapitalize="none"
            />
          </View>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={() => setKeepUpdated(!keepUpdated)}
            activeOpacity={0.8}
          >
            <View style={[styles.checkbox, keepUpdated ? styles.checkboxActive : styles.checkboxInactive]}>
              {keepUpdated && <CheckIcon size={14} color={COLORS.white} strokeWidth={3} />}
            </View>
            <View style={styles.checkboxTextContainer}>
              <AppText style={styles.checkboxTitle}>Keep my WebseederOvenly experience updated</AppText>
              <AppText style={styles.checkboxSubtext}>
                By continuing, I agree to the{' '}
                <AppText style={styles.linkText}>T&Cs</AppText> and{' '}
                <AppText style={styles.linkText}>Privacy Policy</AppText>, and to receive WhatsApp updates and recommendations.
              </AppText>
            </View>
          </TouchableOpacity>
        </ScrollView>

        <View style={styles.bottomContainer}>
          <TouchableOpacity
            style={[
              styles.startBtn,
              isNameFilled ? styles.startBtnActive : styles.startBtnDisabled,
            ]}
            disabled={!isNameFilled}
            onPress={handleStartOrdering}
            activeOpacity={0.85}
          >
            <AppText
              style={[
                styles.startBtnText,
                isNameFilled ? styles.startBtnTextActive : styles.startBtnTextDisabled,
              ]}
            >
              Start ordering
            </AppText>
          </TouchableOpacity>
        </View>
      </KeyboardAvoidingView>
    </ScreenWrapper>
  );
};
