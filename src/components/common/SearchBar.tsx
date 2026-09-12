import React from 'react';
import {
  View,
  TextInput,
  TouchableOpacity,
  StyleSheet,
  ViewStyle,
  TextStyle,
} from 'react-native';
import { SearchIcon, XIcon } from './icons';
import { COLORS } from '../../theme/colors';

interface SearchBarProps {
  placeholder?: string;
  value?: string;
  onChangeText?: (text: string) => void;
  onClear?: () => void;
  onPress?: () => void;
  editable?: boolean;
  containerStyle?: ViewStyle;
  inputStyle?: TextStyle;
  autoFocus?: boolean;
}

export const SearchBar: React.FC<SearchBarProps> = ({
  placeholder = 'Search...',
  value = '',
  onChangeText,
  onClear,
  onPress,
  editable = true,
  containerStyle,
  inputStyle,
  autoFocus = false,
}) => {
  const handleClear = () => {
    if (onClear) {
      onClear();
    } else if (onChangeText) {
      onChangeText('');
    }
  };

  return (
    <TouchableOpacity
      activeOpacity={onPress ? 0.9 : 1}
      onPress={onPress}
      style={[styles.container, containerStyle]}
      disabled={!onPress}
    >
      <SearchIcon size={18} color={COLORS.textPlaceholder} />
      <TextInput
        style={[styles.input, inputStyle]}
        placeholder={placeholder}
        placeholderTextColor={COLORS.textPlaceholder}
        value={value}
        onChangeText={onChangeText}
        autoFocus={autoFocus}
        autoCapitalize="none"
        autoCorrect={false}
        editable={editable && !onPress}
        pointerEvents={onPress ? 'none' : 'auto'}
      />
      {value ? (
        <TouchableOpacity onPress={handleClear} activeOpacity={0.7} style={styles.clearBtn}>
          <XIcon size={16} color={COLORS.textMuted} />
        </TouchableOpacity>
      ) : null}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    alignItems: 'center',
    height: 48,
    borderRadius: 24,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    borderWidth: 1,
    borderColor: '#EFEFEF',
    shadowColor: COLORS.black,
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 4,
    elevation: 2,
  },
  input: {
    flex: 1,
    fontSize: 14,
    fontFamily: 'OpenSans-Regular',
    color: COLORS.textDark,
    marginLeft: 10,
    paddingVertical: 0,
  },
  clearBtn: {
    padding: 4,
  },
});
