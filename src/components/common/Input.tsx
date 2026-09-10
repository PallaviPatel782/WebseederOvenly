import React from 'react';
import {
  View,
  TextInput,
  StyleSheet,
  TextInputProps,
} from 'react-native';
import { useTheme } from '../../hooks/useTheme';
import { AppText } from './AppText';
import { FONT_FAMILY } from '../../theme/typography';

interface InputProps extends TextInputProps {
  label?: string;
  error?: string;
}

export const Input: React.FC<InputProps> = ({
  label,
  error,
  style,
  ...props
}) => {
  const { theme } = useTheme();

  return (
    <View style={styles.container}>
      {label && (
        <AppText variant="body2" style={[styles.label, { color: theme.colors.text }]}>
          {label}
        </AppText>
      )}
      <TextInput
        style={[
          styles.input,
          {
            backgroundColor: theme.colors.surface,
            color: theme.colors.text,
            borderColor: error ? theme.colors.error : theme.colors.border,
            borderRadius: theme.borderRadius.md,
            fontFamily: FONT_FAMILY.regular,
          },
          theme.typography.body1,
          style,
        ]}
        placeholderTextColor={theme.colors.textSecondary}
        {...props}
      />
      {error && (
        <AppText variant="caption" style={[styles.error, { color: theme.colors.error }]}>
          {error}
        </AppText>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    marginBottom: 16,
    width: '100%',
  },
  label: {
    marginBottom: 6,
    fontWeight: '600',
  },
  input: {
    height: 48,
    borderWidth: 1,
    paddingHorizontal: 16,
  },
  error: {
    marginTop: 4,
  },
});
