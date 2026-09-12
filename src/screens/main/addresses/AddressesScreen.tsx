import React, { useState } from 'react';
import { View, TouchableOpacity, ScrollView, Alert } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/common/AppText';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import { SearchBar } from '../../../components/common/SearchBar';
import {
  ArrowLeftIcon,
  HomeIcon,
  BriefcaseIcon,
  EditIcon,
  TrashIcon,
  MapPinIcon,
} from '../../../components/common/icons';
import { COLORS } from '../../../theme/colors';
import { styles } from './AddressesScreen.styles';

export interface AddressItem {
  id: string;
  title: string;
  isCurrentLocation?: boolean;
  address: string;
  iconType?: 'home' | 'work' | 'other';
  houseNo?: string;
  roadArea?: string;
  landmark?: string;
  deliveryInstructions?: string[];
}

const INITIAL_ADDRESSES: AddressItem[] = [
  {
    id: '1',
    title: 'Home',
    isCurrentLocation: true,
    address: 'Abc1 - Bangalore, Karnataka, India',
    iconType: 'home',
    houseNo: 'Abc1',
    roadArea: 'Bangalore, Karnataka, India',
  },
];

interface AddressesScreenProps {
  onBack?: () => void;
  onAddNewAddress?: () => void;
  onEditAddress?: (item: AddressItem) => void;
  addresses?: AddressItem[];
  onSelectAddress?: (item: AddressItem) => void;
  onDeleteAddress?: (id: string) => void;
}

export const AddressesScreen: React.FC<AddressesScreenProps> = ({
  onBack,
  onAddNewAddress,
  onEditAddress,
  addresses: propAddresses,
  onSelectAddress,
  onDeleteAddress,
}) => {
  const insets = useSafeAreaInsets();
  const [searchQuery, setSearchQuery] = useState('');
  const [localAddresses, setLocalAddresses] = useState<AddressItem[]>(INITIAL_ADDRESSES);

  const addresses = propAddresses || localAddresses;

  const filteredAddresses = addresses.filter(
    (item) =>
      item.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      item.address.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDeleteAddress = (id: string, title: string) => {
    Alert.alert(
      'Delete Address',
      `Are you sure you want to delete "${title}"?`,
      [
        { text: 'Cancel', style: 'cancel' },
        {
          text: 'Delete',
          style: 'destructive',
          onPress: () => {
            if (onDeleteAddress) {
              onDeleteAddress(id);
            } else {
              setLocalAddresses((prev) => prev.filter((a) => a.id !== id));
            }
          },
        },
      ]
    );
  };

  const handleEditAddress = (item: AddressItem) => {
    if (onEditAddress) {
      onEditAddress(item);
    } else {
      Alert.alert('Edit Address', `Editing address for ${item.title}`);
    }
  };

  return (
    <ScreenWrapper backgroundColor={COLORS.white} barStyle="dark-content" unsafeBottom>
      <View style={styles.container}>
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeftIcon size={20} color={COLORS.textDark} strokeWidth={2.5} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>Addresses</AppText>
        </View>

        <View style={styles.content}>
          <View style={styles.searchContainer}>
            <SearchBar
              placeholder="Search for addresses"
              value={searchQuery}
              onChangeText={setSearchQuery}
            />
          </View>

          <ScrollView showsVerticalScrollIndicator={false}>
            {filteredAddresses.length > 0 ? (
              filteredAddresses.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.addressCard}
                  activeOpacity={0.9}
                  onPress={() => onSelectAddress && onSelectAddress(item)}
                >
                  <View style={styles.cardHeader}>
                    <View style={styles.cardHeaderLeft}>
                      <View style={styles.homeIconBox}>
                        {item.iconType === 'home' ? (
                          <HomeIcon size={18} color={COLORS.textDark} />
                        ) : item.iconType === 'work' ? (
                          <BriefcaseIcon size={18} color={COLORS.textDark} />
                        ) : (
                          <MapPinIcon size={18} color={COLORS.textDark} />
                        )}
                      </View>
                      <AppText style={styles.addressTitle}>{item.title}</AppText>
                      {item.isCurrentLocation ? (
                        <View style={styles.badge}>
                          <AppText style={styles.badgeText}>Current Location</AppText>
                        </View>
                      ) : null}
                    </View>

                    <View style={styles.actionRow}>
                      <TouchableOpacity
                        style={styles.actionBtn}
                        activeOpacity={0.7}
                        onPress={() => handleEditAddress(item)}
                      >
                        <EditIcon size={14} color={COLORS.brandPink} strokeWidth={2} />
                      </TouchableOpacity>
                      <TouchableOpacity
                        style={styles.actionBtn}
                        activeOpacity={0.7}
                        onPress={() => handleDeleteAddress(item.id, item.title)}
                      >
                        <TrashIcon size={14} color={COLORS.brandPink} strokeWidth={2} />
                      </TouchableOpacity>
                    </View>
                  </View>

                  <View style={styles.divider} />
                  <AppText style={styles.addressBody}>{item.address}</AppText>
                </TouchableOpacity>
              ))
            ) : (
              <View style={styles.emptyContainer}>
                <AppText style={styles.emptyText}>No saved addresses found</AppText>
              </View>
            )}
          </ScrollView>
        </View>

        <View
          style={[
            styles.bottomContainer,
            { paddingBottom: Math.max(insets.bottom + 12, 20) },
          ]}
        >
          <TouchableOpacity
            style={styles.addAddressBtn}
            activeOpacity={0.85}
            onPress={onAddNewAddress}
          >
            <AppText style={styles.addAddressText}>Add New Address</AppText>
          </TouchableOpacity>
        </View>
      </View>
    </ScreenWrapper>
  );
};
