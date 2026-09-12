import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Switch,
  Platform,
  StatusBar,
  TouchableWithoutFeedback,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../../../components/common/AppText';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import { ChevronDownIcon, UserIcon } from '../../../components/common/icons';
import { COLORS } from '../../../theme/colors';
import {
  PickYourCravingSection,
  BreakfastUnderSection,
  WhatsOnYourMindSection,
  KnownAndLovedSection,
  BannerSlider,
  SearchBar,
  AllRestaurantsFilterBar,
  AllRestaurantsSection,
  FoodShowcaseModal,
} from '../../../components';
import {
  BREAKFAST_UNDER_DATA,
  KNOWN_AND_LOVED_DATA,
  GREAT_FOOD_BETTER_PRICES_DATA,
  ALL_RESTAURANTS_DATA,
  filterAndSortRestaurants,
  FoodItem,
} from '../../../constants/homeData';
import { UserProfile } from '../../../navigation/RootNavigator';
import { styles } from './HomeScreen.styles';

interface HomeScreenProps {
  userProfile?: UserProfile;
  onNavigateToProfile?: () => void;
  onNavigateToAddresses?: () => void;
  onNavigateToSearch?: () => void;
  onNavigateToCategory?: (categoryItem: any) => void;
  onNavigateToRestaurant?: (restaurantItem: any) => void;
  currentAddress?: string;
  onNavigateBack?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userProfile,
  onNavigateToProfile,
  onNavigateToAddresses,
  onNavigateToSearch,
  onNavigateToCategory,
  onNavigateToRestaurant,
  currentAddress,
}) => {
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [sortOption, setSortOption] = useState<'relevancy' | 'rating' | 'distance' | 'price_low'>('relevancy');
  const [isSortModalOpen, setIsSortModalOpen] = useState(false);
  const [filterBarY, setFilterBarY] = useState(800);
  const [selectedShowcaseFood, setSelectedShowcaseFood] = useState<FoodItem | null>(null);

  const insets = useSafeAreaInsets();
  const scrollY = useRef(new Animated.Value(0)).current;

  const defaultTopInset = Platform.OS === 'ios' ? 44 : (StatusBar.currentHeight || 24);
  const topInset = insets.top > 0 ? insets.top : defaultTopInset;

  const locationHeight = 60;
  const searchHeight = 58;
  const headerTotalHeight = topInset + locationHeight + searchHeight;

  const headerTranslateY = scrollY.interpolate({
    inputRange: [0, locationHeight],
    outputRange: [0, -locationHeight],
    extrapolate: 'clamp',
  });

  const stickyTrigger = Math.max(1, filterBarY - (topInset + searchHeight));

  const stickyFilterOpacity = scrollY.interpolate({
    inputRange: [Math.max(0, stickyTrigger - 5), stickyTrigger],
    outputRange: [0, 1],
    extrapolate: 'clamp',
  });

  // Filter food items based on VEG toggle state
  const filteredBreakfastData = BREAKFAST_UNDER_DATA.filter(
    (item) => !isVegOnly || item.isVeg
  );

  const filteredKnownData = KNOWN_AND_LOVED_DATA.filter(
    (item) => !isVegOnly || item.isVeg
  );

  const filteredGreatData = GREAT_FOOD_BETTER_PRICES_DATA.filter(
    (item) => !isVegOnly || item.isVeg
  );

  // Filter and sort ALL_RESTAURANTS_DATA using active filter and sort options
  const filteredAllRestaurantsData = filterAndSortRestaurants(
    ALL_RESTAURANTS_DATA,
    isVegOnly,
    selectedFilter,
    sortOption
  );

  const getSortLabel = () => {
    switch (sortOption) {
      case 'rating':
        return 'Rating';
      case 'distance':
        return 'Distance';
      case 'price_low':
        return 'Price';
      default:
        return 'Sort by';
    }
  };

  return (
    <ScreenWrapper backgroundColor={COLORS.headerBlue} barStyle="light-content" unsafeTop unsafeBottom>
      <View style={styles.container}>
        {/* Solid background covering the top status bar safe area */}
        <View
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: topInset,
            backgroundColor: COLORS.headerBlue,
            zIndex: 110,
          }}
        />
        <Animated.View
          style={{
            position: 'absolute',
            top: topInset,
            left: 0,
            right: 0,
            zIndex: 100,
            backgroundColor: COLORS.headerBlue,
            transform: [{ translateY: headerTranslateY }],
          }}
        >
          <View style={[styles.locationSection, { height: locationHeight }]}>
            <View style={styles.topRow}>
              <TouchableOpacity
                style={styles.locationLeft}
                activeOpacity={0.8}
                onPress={onNavigateToAddresses}
              >
                <View style={styles.locationTitleRow}>
                  <AppText style={styles.locationTitle}>Current location</AppText>
                  <ChevronDownIcon size={18} color={COLORS.white} />
                </View>
                <AppText style={styles.locationSub} numberOfLines={1}>
                  {currentAddress || 'Bangalore, Karnataka, India'}
                </AppText>
              </TouchableOpacity>

              <View style={styles.headerRight}>
                <View style={styles.vegToggleRow}>
                  <AppText style={styles.vegLabel}>VEG</AppText>
                  <Switch
                    value={isVegOnly}
                    onValueChange={setIsVegOnly}
                    trackColor={{ false: '#265CB5', true: COLORS.badgeGreen }}
                    thumbColor={COLORS.white}
                    style={{ transform: [{ scaleX: 0.7 }, { scaleY: 0.7 }] }}
                  />
                </View>

                <TouchableOpacity
                  style={styles.profileAvatarBtn}
                  onPress={onNavigateToProfile}
                  activeOpacity={0.8}
                >
                  <UserIcon size={20} color={COLORS.headerBlue} strokeWidth={2.2} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          <View style={[styles.stickySearchSection, { height: searchHeight }]}>
            <SearchBar
              placeholder="Search"
              value={searchQuery}
              onChangeText={setSearchQuery}
              onPress={onNavigateToSearch}
            />
          </View>
        </Animated.View>

        <Animated.View
          style={{
            position: 'absolute',
            top: topInset + searchHeight,
            left: 0,
            right: 0,
            zIndex: 95,
            opacity: stickyFilterOpacity,
          }}
        >
          <AllRestaurantsFilterBar
            selectedFilter={selectedFilter}
            onSelectFilter={setSelectedFilter}
            onOpenSortModal={() => setIsSortModalOpen(!isSortModalOpen)}
            sortLabel={getSortLabel()}
          />
        </Animated.View>

        <Animated.ScrollView
          style={{ flex: 1 }}
          contentContainerStyle={{ paddingTop: headerTotalHeight, paddingBottom: 60 }}
          onScroll={Animated.event(
            [{ nativeEvent: { contentOffset: { y: scrollY } } }],
            { useNativeDriver: true }
          )}
          scrollEventThrottle={16}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          <View>
            <BannerSlider />

            <PickYourCravingSection
              onSelectCraving={(item) => onNavigateToCategory?.(item)}
            />

            <BreakfastUnderSection
              data={filteredBreakfastData}
              onCardPress={(item) => setSelectedShowcaseFood(item)}
              onSeeAll={() =>
                onNavigateToCategory?.({
                  id: 'breakfast_under_99',
                  title: 'Bestseller',
                  priceTag: 'under ₹99',
                })
              }
            />

            <WhatsOnYourMindSection
              onSelectCategory={(item) => onNavigateToCategory?.(item)}
            />

            <KnownAndLovedSection
              title="Known & Loved"
              data={filteredKnownData}
              onRestaurantPress={onNavigateToRestaurant}
            />

            <KnownAndLovedSection
              title="Great Food, Better Prices"
              data={filteredGreatData}
              onRestaurantPress={onNavigateToRestaurant}
            />
          </View>

          <View onLayout={(e) => setFilterBarY(e.nativeEvent.layout.y)}>
            <AllRestaurantsFilterBar
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
              onOpenSortModal={() => setIsSortModalOpen(!isSortModalOpen)}
              sortLabel={getSortLabel()}
            />
          </View>

          <AllRestaurantsSection
            data={filteredAllRestaurantsData}
            onRestaurantPress={onNavigateToRestaurant}
          />
        </Animated.ScrollView>

        {/* Sort Modal Dropdown */}
        {isSortModalOpen ? (
          <>
            <TouchableWithoutFeedback onPress={() => setIsSortModalOpen(false)}>
              <View
                style={{
                  position: 'absolute',
                  top: 0,
                  left: 0,
                  right: 0,
                  bottom: 0,
                  backgroundColor: COLORS.modalBackdrop,
                  zIndex: 200,
                }}
              />
            </TouchableWithoutFeedback>

            <View
              style={{
                position: 'absolute',
                top: topInset + searchHeight + 50,
                left: 16,
                width: 220,
                backgroundColor: COLORS.white,
                borderRadius: 16,
                paddingVertical: 10,
                paddingHorizontal: 14,
                elevation: 8,
                shadowColor: COLORS.black,
                shadowOffset: { width: 0, height: 4 },
                shadowOpacity: 0.15,
                shadowRadius: 10,
                zIndex: 210,
                borderWidth: 1,
                borderColor: COLORS.borderFilter,
              }}
            >
              {[
                { key: 'relevancy', label: 'Relevancy' },
                { key: 'rating', label: 'Rating (High to Low)' },
                { key: 'distance', label: 'Distance' },
                { key: 'price_low', label: 'Price (Low to High)' },
              ].map((opt) => (
                <TouchableOpacity
                  key={opt.key}
                  style={{
                    flexDirection: 'row',
                    alignItems: 'center',
                    paddingVertical: 10,
                  }}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSortOption(opt.key as any);
                    setIsSortModalOpen(false);
                  }}
                >
                  <View
                    style={{
                      width: 18,
                      height: 18,
                      borderRadius: 9,
                      borderWidth: 2,
                      borderColor: sortOption === opt.key ? COLORS.brandPink : COLORS.radioUnselectedBorder,
                      justifyContent: 'center',
                      alignItems: 'center',
                      marginRight: 10,
                    }}
                  >
                    {sortOption === opt.key ? (
                      <View
                        style={{
                          width: 10,
                          height: 10,
                          borderRadius: 5,
                          backgroundColor: COLORS.brandPink,
                        }}
                      />
                    ) : null}
                  </View>
                  <AppText
                    style={{
                      fontSize: 13,
                      fontFamily: 'OpenSans-Bold',
                      fontWeight: sortOption === opt.key ? '800' : '600',
                      color: sortOption === opt.key ? COLORS.textSlateDark : COLORS.textSlateSub,
                    }}
                  >
                    {opt.label}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : null}

        <FoodShowcaseModal
          item={selectedShowcaseFood}
          visible={!!selectedShowcaseFood}
          onClose={() => setSelectedShowcaseFood(null)}
          onViewMenuPress={(restaurantName) => {
            setSelectedShowcaseFood(null);
            onNavigateToRestaurant?.({ name: restaurantName });
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
