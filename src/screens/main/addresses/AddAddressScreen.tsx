import React, { useState, useEffect } from 'react';
import {
  View,
  TouchableOpacity,
  ScrollView,
  TextInput,
  Alert,
  ActivityIndicator,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/common/AppText';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import {
  ArrowLeftIcon,
  MapPinIcon,
  HomeIcon,
  BriefcaseIcon,
  DoorIcon,
  PhoneOffIcon,
  ShieldUserIcon,
} from '../../../components/common/icons';
import { COLORS } from '../../../theme/colors';
import {
  getCurrentCoordinates,
  fetchAddressFromOpenStreetMap,
} from '../../../services/locationService';
import { styles } from './AddAddressScreen.styles';

export interface NewAddressData {
  id?: string;
  title: 'Home' | 'Work' | 'Others';
  houseNo: string;
  roadArea: string;
  landmark?: string;
  fullAddress: string;
  iconType: 'home' | 'work' | 'other';
  deliveryInstructions?: string[];
  isCurrentLocation?: boolean;
}

interface AddAddressScreenProps {
  onBack?: () => void;
  onSaveAddress?: (address: NewAddressData) => void;
  initialData?: NewAddressData | null;
}

export const AddAddressScreen: React.FC<AddAddressScreenProps> = ({
  onBack,
  onSaveAddress,
  initialData,
}) => {
  const insets = useSafeAreaInsets();
  const [loadingLocation, setLoadingLocation] = useState(false);
  const [fetchedLocationString, setFetchedLocationString] = useState(
    initialData?.fullAddress || ''
  );

  const [houseNo, setHouseNo] = useState(initialData?.houseNo || '');
  const [roadArea, setRoadArea] = useState(initialData?.roadArea || '');
  const [landmark, setLandmark] = useState(initialData?.landmark || '');

  const [selectedSaveAs, setSelectedSaveAs] = useState<'Home' | 'Work' | 'Others'>(
    initialData?.title || 'Home'
  );
  const [selectedInstructions, setSelectedInstructions] = useState<string[]>(
    initialData?.deliveryInstructions || []
  );

  const handleFetchCurrentLocation = async () => {
    setLoadingLocation(true);
    try {
      const coords = await getCurrentCoordinates();
      const result = await fetchAddressFromOpenStreetMap(coords.lat, coords.lon);

      setFetchedLocationString(result.displayName);
      if (result.houseNo) {
        setHouseNo(result.houseNo);
      }
      if (result.roadArea) {
        setRoadArea(result.roadArea);
      }
      if (result.landmark) {
        setLandmark(result.landmark);
      }
    } catch (error) {
      console.warn('Failed to fetch location:', error);
      Alert.alert('Location Error', 'Unable to fetch current location details.');
    } finally {
      setLoadingLocation(false);
    }
  };

  useEffect(() => {
    // If not editing, fetch current location automatically on screen mount
    if (!initialData) {
      handleFetchCurrentLocation();
    }
  }, [initialData]);

  const toggleInstruction = (inst: string) => {
    setSelectedInstructions((prev) =>
      prev.includes(inst) ? prev.filter((i) => i !== inst) : [...prev, inst]
    );
  };

  const handleSave = () => {
    if (!houseNo.trim()) {
      Alert.alert('Required Field', 'Please enter House / Flat / Floor No.');
      return;
    }
    if (!roadArea.trim()) {
      Alert.alert('Required Field', 'Please enter Apartment / Road / Area.');
      return;
    }

    const constructedAddress = `${houseNo.trim()}, ${roadArea.trim()}${
      landmark.trim() ? `, Near ${landmark.trim()}` : ''
    }`;

    const iconType: 'home' | 'work' | 'other' =
      selectedSaveAs === 'Home'
        ? 'home'
        : selectedSaveAs === 'Work'
        ? 'work'
        : 'other';

    const savedAddressData: NewAddressData = {
      id: initialData?.id,
      title: selectedSaveAs,
      houseNo: houseNo.trim(),
      roadArea: roadArea.trim(),
      landmark: landmark.trim(),
      fullAddress: constructedAddress || fetchedLocationString,
      iconType,
      deliveryInstructions: selectedInstructions,
      isCurrentLocation: initialData?.isCurrentLocation ?? true,
    };

    if (onSaveAddress) {
      onSaveAddress(savedAddressData);
    }
    if (onBack) {
      onBack();
    }
  };

  const isDoorSelected = selectedInstructions.includes('Leave at the door');
  const isAvoidCallsSelected = selectedInstructions.includes('Avoid calls');
  const isSecuritySelected = selectedInstructions.includes('Leave with security');

  return (
    <ScreenWrapper backgroundColor={COLORS.white} barStyle="dark-content" unsafeBottom>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeftIcon size={20} color={COLORS.textDark} strokeWidth={2.5} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>
            {initialData ? 'Edit Address' : 'Select delivery Location'}
          </AppText>
        </View>

        <ScrollView contentContainerStyle={styles.scrollContent} showsVerticalScrollIndicator={false}>
          {/* Location info card */}
          <View style={styles.locationCard}>
            <View style={styles.pinBox}>
              <MapPinIcon size={20} color={COLORS.textDark} />
            </View>
            <View style={styles.locationCardTextContainer}>
              {fetchedLocationString ? (
                <AppText style={styles.locationAddressText}>
                  {fetchedLocationString}
                </AppText>
              ) : null}
              <TouchableOpacity
                style={styles.useLocationBtn}
                activeOpacity={0.7}
                onPress={handleFetchCurrentLocation}
                disabled={loadingLocation}
              >
                {loadingLocation ? (
                  <ActivityIndicator size="small" color={COLORS.brandPink} style={{ marginRight: 6 }} />
                ) : null}
                <AppText style={styles.useLocationBtnText}>
                  {loadingLocation ? 'Fetching location...' : 'Use current location'}
                </AppText>
              </TouchableOpacity>
            </View>
          </View>

          {/* Form fields */}
          <View style={styles.inputGroup}>
            <AppText style={styles.inputLabel}>House / Flat / Floor No. *</AppText>
            <TextInput
              style={styles.textInput}
              placeholder="Enter House / Flat / Floor No."
              placeholderTextColor={COLORS.textPlaceholder}
              value={houseNo}
              onChangeText={setHouseNo}
            />
          </View>

          <View style={styles.inputGroup}>
            <AppText style={styles.inputLabel}>Apartment / Road / Area *</AppText>
            <TextInput
              style={styles.textInput}
              placeholder="Enter Apartment / Road / Area"
              placeholderTextColor={COLORS.textPlaceholder}
              value={roadArea}
              onChangeText={setRoadArea}
            />
          </View>

          <View style={styles.inputGroup}>
            <AppText style={styles.inputLabel}>Landmark (optional)</AppText>
            <TextInput
              style={styles.textInput}
              placeholder="Enter landmark"
              placeholderTextColor={COLORS.textPlaceholder}
              value={landmark}
              onChangeText={setLandmark}
            />
          </View>

          {/* Delivery instructions */}
          <AppText style={styles.sectionTitle}>Delivery instructions</AppText>
          <View style={styles.chipsRow}>
            <TouchableOpacity
              style={[
                styles.instructionChip,
                isDoorSelected ? styles.chipSelected : {},
              ]}
              activeOpacity={0.7}
              onPress={() => toggleInstruction('Leave at the door')}
            >
              <DoorIcon
                size={16}
                color={isDoorSelected ? COLORS.brandPink : COLORS.textDark}
              />
              <AppText
                style={[
                  styles.chipText,
                  isDoorSelected ? styles.chipTextSelected : {},
                ]}
              >
                Leave at the door
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.instructionChip,
                isAvoidCallsSelected ? styles.chipSelected : {},
              ]}
              activeOpacity={0.7}
              onPress={() => toggleInstruction('Avoid calls')}
            >
              <PhoneOffIcon
                size={16}
                color={isAvoidCallsSelected ? COLORS.brandPink : COLORS.textDark}
              />
              <AppText
                style={[
                  styles.chipText,
                  isAvoidCallsSelected ? styles.chipTextSelected : {},
                ]}
              >
                Avoid calls
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.instructionChip,
                isSecuritySelected ? styles.chipSelected : {},
              ]}
              activeOpacity={0.7}
              onPress={() => toggleInstruction('Leave with security')}
            >
              <ShieldUserIcon
                size={16}
                color={isSecuritySelected ? COLORS.brandPink : COLORS.textDark}
              />
              <AppText
                style={[
                  styles.chipText,
                  isSecuritySelected ? styles.chipTextSelected : {},
                ]}
              >
                Leave with security
              </AppText>
            </TouchableOpacity>
          </View>

          {/* Save as */}
          <AppText style={styles.sectionTitle}>Save as</AppText>
          <View style={styles.chipsRow}>
            <TouchableOpacity
              style={[
                styles.saveAsChip,
                selectedSaveAs === 'Home' ? styles.chipSelected : {},
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedSaveAs('Home')}
            >
              <HomeIcon
                size={16}
                color={selectedSaveAs === 'Home' ? COLORS.brandPink : COLORS.textDark}
              />
              <AppText
                style={[
                  styles.chipText,
                  selectedSaveAs === 'Home' ? styles.chipTextSelected : {},
                ]}
              >
                Home
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveAsChip,
                selectedSaveAs === 'Work' ? styles.chipSelected : {},
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedSaveAs('Work')}
            >
              <BriefcaseIcon
                size={16}
                color={selectedSaveAs === 'Work' ? COLORS.brandPink : COLORS.textDark}
              />
              <AppText
                style={[
                  styles.chipText,
                  selectedSaveAs === 'Work' ? styles.chipTextSelected : {},
                ]}
              >
                Work
              </AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={[
                styles.saveAsChip,
                selectedSaveAs === 'Others' ? styles.chipSelected : {},
              ]}
              activeOpacity={0.7}
              onPress={() => setSelectedSaveAs('Others')}
            >
              <MapPinIcon
                size={16}
                color={selectedSaveAs === 'Others' ? COLORS.brandPink : COLORS.textDark}
              />
              <AppText
                style={[
                  styles.chipText,
                  selectedSaveAs === 'Others' ? styles.chipTextSelected : {},
                ]}
              >
                Others
              </AppText>
            </TouchableOpacity>
          </View>
        </ScrollView>

        <View
          style={[
            styles.bottomContainer,
            { paddingBottom: Math.max(insets.bottom + 12, 20) },
          ]}
        >
          <TouchableOpacity style={styles.saveBtn} activeOpacity={0.85} onPress={handleSave}>
            <AppText style={styles.saveBtnText}>Save Address</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};
