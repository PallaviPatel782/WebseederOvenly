import React, { useState, useEffect, useCallback } from 'react';
import { View, BackHandler } from 'react-native';
import {
  HomeScreen,
  ProfileScreen,
  EditProfileScreen,
  AddressesScreen,
  AddAddressScreen,
  SearchScreen,
  AddressItem,
  NewAddressData,
  AccountSettingsScreen,
  TermsScreen,
  PrivacyPolicyScreen,
  HelpScreen,
  PastOrdersScreen,
  CategoryDetailScreen,
  RestaurantDetailScreen,
  CartScreen,
} from '../screens/main';
import { CartBottomBanner } from '../components';
import { useCartStore } from '../store/useCartStore';
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
  | 'add_address'
  | 'search'
  | 'settings'
  | 'terms'
  | 'privacy'
  | 'help'
  | 'past_orders'
  | 'category_detail'
  | 'restaurant_detail'
  | 'cart';

const INITIAL_ADDRESSES_LIST: AddressItem[] = [
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

export const MainStack: React.FC<MainStackProps> = ({ userProfile, onNavigateBack }) => {
  const [navHistory, setNavHistory] = useState<ScreenName[]>(['home']);
  const [profile, setProfile] = useState<UserProfile | undefined>(userProfile);
  const [addresses, setAddresses] = useState<AddressItem[]>(INITIAL_ADDRESSES_LIST);
  const [editingAddressItem, setEditingAddressItem] = useState<AddressItem | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<any>(null);
  const [selectedRestaurant, setSelectedRestaurant] = useState<any>(null);

  const currentScreen = navHistory[navHistory.length - 1] || 'home';

  const navigateTo = (screen: ScreenName) => {
    setNavHistory((prev) => [...prev, screen]);
  };

  const handleNavigateToCategory = (categoryItem: any) => {
    setSelectedCategory(categoryItem);
    navigateTo('category_detail');
  };

  const handleNavigateToRestaurant = (restaurantItem: any) => {
    setSelectedRestaurant(restaurantItem);
    navigateTo('restaurant_detail');
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

  const handleSaveAddress = (savedData: NewAddressData) => {
    if (savedData.id) {
      setAddresses((prev) =>
        prev.map((item) =>
          item.id === savedData.id
            ? {
                ...item,
                title: savedData.title,
                address: savedData.fullAddress,
                iconType: savedData.iconType,
                houseNo: savedData.houseNo,
                roadArea: savedData.roadArea,
                landmark: savedData.landmark,
                deliveryInstructions: savedData.deliveryInstructions,
              }
            : item
        )
      );
    } else {
      const newAddressItem: AddressItem = {
        id: Date.now().toString(),
        title: savedData.title,
        isCurrentLocation: true,
        address: savedData.fullAddress,
        iconType: savedData.iconType,
        houseNo: savedData.houseNo,
        roadArea: savedData.roadArea,
        landmark: savedData.landmark,
        deliveryInstructions: savedData.deliveryInstructions,
      };

      setAddresses((prev) => [
        newAddressItem,
        ...prev.map((item) => ({ ...item, isCurrentLocation: false })),
      ]);
    }
    setEditingAddressItem(null);
  };

  const handleSelectAddress = (selectedItem: AddressItem) => {
    setAddresses((prev) =>
      prev.map((item) => ({
        ...item,
        isCurrentLocation: item.id === selectedItem.id,
      }))
    );
    goBack();
  };

  const handleDeleteAddress = (id: string) => {
    setAddresses((prev) => prev.filter((item) => item.id !== id));
  };

  const handleStartAddNewAddress = () => {
    setEditingAddressItem(null);
    navigateTo('add_address');
  };

  const handleStartEditAddress = (item: AddressItem) => {
    setEditingAddressItem(item);
    navigateTo('add_address');
  };

  const currentActiveAddress =
    addresses.find((a) => a.isCurrentLocation)?.address ||
    (addresses.length > 0 ? addresses[0].address : 'Bangalore, Karnataka, India');

  const renderActiveScreen = () => {
    if (currentScreen === 'cart') {
      return (
        <CartScreen
          onBack={goBack}
          onAddMoreItems={() => navigateTo('home')}
          onOrderSuccess={() => setNavHistory(['home'])}
          currentAddress={currentActiveAddress}
        />
      );
    }

    if (currentScreen === 'search') {
      return (
        <SearchScreen
          onBack={goBack}
          onSelectFoodItem={(rawItem: any) => {
            if ('cuisines' in rawItem) {
              handleNavigateToRestaurant(rawItem);
            } else {
              useCartStore.getState().addItem(
                {
                  id: rawItem.id,
                  name: rawItem.name,
                  price: rawItem.price,
                  originalPrice: rawItem.originalPrice,
                  isVeg: rawItem.isVeg,
                  image: rawItem.image,
                  restaurantName: rawItem.restaurant,
                },
                {
                  id: rawItem.restaurant ? rawItem.restaurant.toLowerCase().replace(/\s+/g, '_') : 'r_search',
                  name: rawItem.restaurant || 'SHREE SAGAR VEG FAST FOOD',
                  location: rawItem.location || 'Gandhinagar',
                  image: rawItem.image,
                  deliveryTime: rawItem.time || '35-40mins',
                }
              );
            }
          }}
        />
      );
    }


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
          addresses={addresses}
          onAddNewAddress={handleStartAddNewAddress}
          onEditAddress={handleStartEditAddress}
          onSelectAddress={handleSelectAddress}
          onDeleteAddress={handleDeleteAddress}
        />
      );
    }

    if (currentScreen === 'add_address') {
      const initialDataForForm: NewAddressData | null = editingAddressItem
        ? {
            id: editingAddressItem.id,
            title: editingAddressItem.title as 'Home' | 'Work' | 'Others',
            houseNo: editingAddressItem.houseNo || '',
            roadArea: editingAddressItem.roadArea || editingAddressItem.address,
            landmark: editingAddressItem.landmark || '',
            fullAddress: editingAddressItem.address,
            iconType: editingAddressItem.iconType || 'home',
            deliveryInstructions: editingAddressItem.deliveryInstructions || [],
            isCurrentLocation: editingAddressItem.isCurrentLocation,
          }
        : null;

      return (
        <AddAddressScreen
          onBack={goBack}
          onSaveAddress={handleSaveAddress}
          initialData={initialDataForForm}
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

    if (currentScreen === 'category_detail') {
      return (
        <CategoryDetailScreen
          categoryItem={selectedCategory}
          onBack={goBack}
          onRestaurantPress={handleNavigateToRestaurant}
        />
      );
    }

    if (currentScreen === 'restaurant_detail') {
      return (
        <RestaurantDetailScreen
          restaurant={selectedRestaurant}
          onBack={goBack}
          onSearchPress={() => navigateTo('search')}
        />
      );
    }

    return (
      <HomeScreen
        userProfile={profile}
        currentAddress={currentActiveAddress}
        onNavigateToProfile={() => navigateTo('profile')}
        onNavigateToAddresses={() => navigateTo('addresses')}
        onNavigateToSearch={() => navigateTo('search')}
        onNavigateToCategory={handleNavigateToCategory}
        onNavigateToRestaurant={handleNavigateToRestaurant}
        onNavigateBack={onNavigateBack}
      />
    );
  };

  return (
    <View style={{ flex: 1 }}>
      {renderActiveScreen()}
      {currentScreen !== 'cart' && (
        <CartBottomBanner
          onCheckoutPress={() => navigateTo('cart')}
          onViewMenuPress={() => navigateTo('cart')}
        />
      )}
    </View>
  );
};
