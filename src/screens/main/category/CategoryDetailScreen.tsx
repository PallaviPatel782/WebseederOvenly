import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  ImageSourcePropType,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import { AppText } from '../../../components/common/AppText';
import { ArrowLeftIcon, ChevronDownIcon, StarIcon, ZapIcon, PlusIcon } from '../../../components/common/icons';
import {
  FoodItem,
  RestaurantItem,
  BREAKFAST_UNDER_DATA,
  HEALTHY_RESTAURANTS_DATA,
  TOP_BRANDS_RESTAURANTS_DATA,
  DISCOUNT_RESTAURANTS_DATA,
  LOCAL_GEM_RESTAURANTS_DATA,
  ALL_RESTAURANTS_DATA,
  filterAndSortRestaurants,
} from '../../../constants/homeData';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../theme/colors';
import { useCartStore } from '../../../store/useCartStore';
import { FoodShowcaseModal } from '../../../components/home/FoodShowcaseModal';
import { styles } from './CategoryDetailScreen.styles';

export interface CategoryDetailProps {
  categoryItem?: {
    id: string;
    label?: string;
    title?: string;
    priceTag?: string;
    image?: ImageSourcePropType;
  };
  onBack?: () => void;
  onRestaurantPress?: (item: RestaurantItem) => void;
}

interface CategoryConfig {
  isFoodListing?: boolean;
  title: string;
  subtitleYellow?: string;
  subtitleWhite?: string;
  priceTag?: string;
  isTopBrandsTheme?: boolean;
  headerBgColors: [string, string];
  headerImage: ImageSourcePropType;
  foodData?: FoodItem[];
  restaurantData?: RestaurantItem[];
}

export const CategoryDetailScreen: React.FC<CategoryDetailProps> = ({
  categoryItem,
  onBack,
  onRestaurantPress,
}) => {
  const insets = useSafeAreaInsets();
  const topInset = insets.top > 0 ? insets.top : Platform.OS === 'ios' ? 44 : (StatusBar.currentHeight || 24);

  const [selectedFilter, setSelectedFilter] = useState<string>('all');
  const [sortOption, setSortOption] = useState<'relevancy' | 'rating' | 'distance' | 'price_low'>('relevancy');
  const [isSortModalOpen, setIsSortModalOpen] = useState<boolean>(false);
  const [selectedShowcaseFood, setSelectedShowcaseFood] = useState<FoodItem | null>(null);

  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decrementItem = useCartStore((state) => state.decrementItem);

  const getItemQty = (id: string) => {
    const item = items.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const handleAddFood = (item: FoodItem) => {
    addItem(
      {
        id: item.id,
        name: item.name,
        price: item.price,
        originalPrice: item.originalPrice,
        isVeg: item.isVeg,
        image: item.image,
        restaurantName: item.restaurant,
      },
      {
        id: item.restaurant.toLowerCase().replace(/\s+/g, '_'),
        name: item.restaurant,
        location: item.location || 'Gandhinagar',
        image: item.image,
        deliveryTime: item.time,
      }
    );
  };

  const catId = categoryItem?.id?.toLowerCase() || 'healthy';
  const catTitleLower = (categoryItem?.title || categoryItem?.label || '').toLowerCase();

  const isBestseller =
    catId.includes('breakfast') ||
    catId.includes('bestseller') ||
    catId.includes('under') ||
    catTitleLower.includes('breakfast') ||
    catTitleLower.includes('bestseller');

  const getCategoryConfig = (): CategoryConfig => {
    if (isBestseller) {
      return {
        isFoodListing: true,
        title: 'Bestseller',
        priceTag: categoryItem?.priceTag || 'under ₹149',
        headerBgColors: [COLORS.bannerPink, COLORS.brandPinkLight],
        headerImage: IMAGES.knownWendysBurger,
        foodData: BREAKFAST_UNDER_DATA,
      };
    }

    if (catId === 'healthy' || catTitleLower.includes('healthy')) {
      return {
        title: 'Healthy\nChoices',
        subtitleYellow: 'Options without guilt',
        headerBgColors: [COLORS.bannerGreen, COLORS.bannerGreenLight],
        headerImage: IMAGES.knownSaladDays,
        restaurantData: HEALTHY_RESTAURANTS_DATA,
      };
    }
    if (catId === 'top_brands' || catTitleLower.includes('top')) {
      return {
        title: 'Top\nBrands',
        isTopBrandsTheme: true,
        subtitleWhite: 'Most-loved restaurants near you',
        headerBgColors: [COLORS.bannerMagenta, COLORS.bannerMagentaLight],
        headerImage: IMAGES.knownWendysBurger,
        restaurantData: TOP_BRANDS_RESTAURANTS_DATA,
      };
    }
    if (catId === 'discount_20' || catTitleLower.includes('lower')) {
      return {
        title: '20% Lower\nPrices',
        subtitleYellow: 'Massive savings on top places',
        headerBgColors: [COLORS.bannerOrange, COLORS.bannerOrangeLight],
        headerImage: IMAGES.beijingBites,
        restaurantData: DISCOUNT_RESTAURANTS_DATA,
      };
    }
    if (catId === 'local_gem' || catTitleLower.includes('gem')) {
      return {
        title: 'Local\nGems',
        subtitleYellow: 'Hidden neighborhood favorites',
        headerBgColors: [COLORS.bannerTeal, COLORS.bannerTealLight],
        headerImage: IMAGES.foodMasalaDosa,
        restaurantData: LOCAL_GEM_RESTAURANTS_DATA,
      };
    }

    const titleText = categoryItem?.title || categoryItem?.label || 'All Restaurants';
    return {
      title: titleText.includes('\n') ? titleText : titleText.replace(' ', '\n'),
      subtitleWhite: 'Best food spots near you',
      headerBgColors: [COLORS.bannerBlue, COLORS.bannerBlueLight],
      headerImage: categoryItem?.image || IMAGES.knownSaladDays,
      restaurantData: ALL_RESTAURANTS_DATA,
    };
  };

  const config = getCategoryConfig();

  // Filter Food Data for Bestseller Listing
  const filteredFoodData = (config.foodData || []).filter((item) => {
    if (selectedFilter === 'veg' && !item.isVeg) return false;
    if (selectedFilter === 'rating' && item.rating < 4.0) return false;
    return true;
  });

  // Filter Restaurant Data for Restaurant Listing
  const filteredRestaurantData = filterAndSortRestaurants(
    config.restaurantData || [],
    false,
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

  const isSortActive = sortOption !== 'relevancy';

  return (
    <ScreenWrapper backgroundColor={config.headerBgColors[0]} barStyle="light-content" unsafeTop unsafeBottom>
      <View style={styles.container}>
        <ScrollView style={{ flex: 1 }} bounces={false} showsVerticalScrollIndicator={false}>
          {/* Header Banner */}
          <View
            style={[
              styles.headerBanner,
              {
                backgroundColor: config.headerBgColors[0],
                paddingTop: topInset + 12,
              },
            ]}
          >
            <TouchableOpacity
              style={styles.backButton}
              activeOpacity={0.8}
              onPress={onBack}
            >
              <ArrowLeftIcon size={20} color={COLORS.white} />
            </TouchableOpacity>

            <View style={styles.bannerContentRow}>
              {config.isFoodListing ? (
                /* Bestseller Under ₹149 Banner matching user screenshot */
                <View style={styles.bannerTextCol}>
                  <AppText style={styles.bestsellerTitle}>Bestseller</AppText>
                  <AppText style={styles.bestsellerUnder}>under</AppText>
                  <AppText style={styles.bestsellerPrice}>
                    {config.priceTag ? config.priceTag.replace('under ', '') : '₹149'}
                  </AppText>
                </View>
              ) : (
                /* Standard Category Banner */
                <View style={styles.bannerTextCol}>
                  {config.isTopBrandsTheme ? (
                    <View style={styles.crownBadge}>
                      <AppText style={styles.crownEmoji}>👑</AppText>
                    </View>
                  ) : null}

                  <AppText style={styles.bannerTitle}>{config.title}</AppText>

                  {config.subtitleYellow ? (
                    <View style={styles.subtitlePillYellow}>
                      <AppText style={styles.subtitlePillYellowText}>
                        {config.subtitleYellow}
                      </AppText>
                    </View>
                  ) : null}

                  {config.subtitleWhite ? (
                    <AppText style={styles.subtitleTextWhite}>
                      {config.subtitleWhite}
                    </AppText>
                  ) : null}
                </View>
              )}

              <View style={styles.bannerRightImageBox}>
                <Image
                  source={config.headerImage}
                  style={styles.bannerRightImage}
                  resizeMode="cover"
                />
              </View>
            </View>
          </View>

          {/* Category Tabs / Filters Bar */}
          {config.isFoodListing ? (
            <View style={styles.tabBarContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.tabScroll}
              >
                <TouchableOpacity
                  style={[
                    styles.tabItem,
                    selectedFilter === 'all' && styles.tabItemActive,
                  ]}
                  onPress={() => setSelectedFilter('all')}
                  activeOpacity={0.8}
                >
                  <AppText
                    style={[
                      styles.tabText,
                      selectedFilter === 'all' && styles.tabTextActive,
                    ]}
                  >
                    All
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.tabItem,
                    selectedFilter === 'veg' && styles.tabItemActive,
                  ]}
                  onPress={() => setSelectedFilter(selectedFilter === 'veg' ? 'all' : 'veg')}
                  activeOpacity={0.8}
                >
                  <AppText
                    style={[
                      styles.tabText,
                      selectedFilter === 'veg' && styles.tabTextActive,
                    ]}
                  >
                    Pure Veg
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.tabItem,
                    selectedFilter === 'rating' && styles.tabItemActive,
                  ]}
                  onPress={() => setSelectedFilter(selectedFilter === 'rating' ? 'all' : 'rating')}
                  activeOpacity={0.8}
                >
                  <AppText
                    style={[
                      styles.tabText,
                      selectedFilter === 'rating' && styles.tabTextActive,
                    ]}
                  >
                    Rating 4+
                  </AppText>
                </TouchableOpacity>
              </ScrollView>
            </View>
          ) : (
            <View style={styles.filterBarContainer}>
              <ScrollView
                horizontal
                showsHorizontalScrollIndicator={false}
                contentContainerStyle={styles.filterScroll}
              >
                <TouchableOpacity
                  style={[
                    styles.filterPill,
                    isSortActive ? styles.filterPillActive : undefined,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setIsSortModalOpen(!isSortModalOpen)}
                >
                  <AppText
                    style={[
                      styles.filterPillText,
                      isSortActive ? styles.filterPillTextActive : undefined,
                    ]}
                  >
                    {getSortLabel()}{' '}
                  </AppText>
                  <ChevronDownIcon size={14} color={isSortActive ? COLORS.brandPink : COLORS.textSlateSub} />
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.filterPill,
                    selectedFilter === 'veg' ? styles.filterPillActive : undefined,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setSelectedFilter(selectedFilter === 'veg' ? 'all' : 'veg')}
                >
                  <View style={[styles.vegDotCircle, selectedFilter === 'veg' ? { borderColor: COLORS.brandPink } : undefined]}>
                    <View style={[styles.vegDotInside, selectedFilter === 'veg' ? { backgroundColor: COLORS.brandPink } : undefined]} />
                  </View>
                  <AppText
                    style={[
                      styles.filterPillText,
                      selectedFilter === 'veg' ? styles.filterPillTextActive : undefined,
                    ]}
                  >
                    Pure Veg
                  </AppText>
                </TouchableOpacity>

                <TouchableOpacity
                  style={[
                    styles.filterPill,
                    selectedFilter === 'rating' ? styles.filterPillActive : undefined,
                  ]}
                  activeOpacity={0.7}
                  onPress={() => setSelectedFilter(selectedFilter === 'rating' ? 'all' : 'rating')}
                >
                  <StarIcon size={13} color={selectedFilter === 'rating' ? COLORS.brandPink : COLORS.badgeGreen} />
                  <AppText
                    style={[
                      styles.filterPillText,
                      { marginLeft: 3 },
                      selectedFilter === 'rating' ? styles.filterPillTextActive : undefined,
                    ]}
                  >
                    Rating 4+
                  </AppText>
                </TouchableOpacity>
              </ScrollView>
            </View>
          )}

          {/* Bestseller Food Items List (Matching Screenshot 100%) */}
          {config.isFoodListing ? (
            <View style={styles.foodListContainer}>
              {filteredFoodData.map((item) => {
                const qty = getItemQty(item.id);

                return (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.foodCard}
                    activeOpacity={0.9}
                    onPress={() => setSelectedShowcaseFood(item)}
                  >
                    <View style={styles.foodLeftCol}>
                      {item.isVeg ? (
                        <View style={styles.vegSquare}>
                          <View style={styles.vegDot} />
                        </View>
                      ) : (
                        <View style={styles.nonVegSquare}>
                          <View style={styles.nonVegDot} />
                        </View>
                      )}

                      <AppText style={styles.foodName} numberOfLines={2}>
                        {item.name}
                      </AppText>

                      <AppText style={styles.foodPrice}>₹ {item.price}</AppText>

                      <View style={styles.metaRow}>
                        <View style={styles.ratingBadgeGreen}>
                          <StarIcon size={11} color="#16A34A" />
                          <AppText style={styles.ratingGreenText}>{item.rating.toFixed(1)}</AppText>
                          <AppText style={styles.ratingCountText}>(485)</AppText>
                        </View>

                        <AppText style={styles.bulletDot}>•</AppText>

                        <ZapIcon size={12} color="#475569" fill="#475569" />
                        <AppText style={styles.timeText}>{item.time}</AppText>
                      </View>

                      <AppText style={styles.restaurantSub} numberOfLines={1}>
                        {item.restaurant}
                      </AppText>
                    </View>

                    <View style={styles.foodRightCol}>
                      <View style={styles.foodImageBox}>
                        <Image source={item.image} style={styles.foodCardImage} resizeMode="cover" />
                      </View>

                      {qty > 0 ? (
                        <View style={styles.qtyPillOverlay}>
                          <TouchableOpacity
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            onPress={() => decrementItem(item.id)}
                          >
                            <AppText style={styles.qtyBtnText}>-</AppText>
                          </TouchableOpacity>

                          <AppText style={styles.qtyText}>{qty}</AppText>

                          <TouchableOpacity
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            onPress={() => handleAddFood(item)}
                          >
                            <AppText style={styles.qtyBtnText}>+</AppText>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={styles.plusBtnCircle}
                          activeOpacity={0.85}
                          onPress={() => handleAddFood(item)}
                        >
                          <PlusIcon size={18} color={COLORS.white} strokeWidth={3} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </TouchableOpacity>
                );
              })}
            </View>
          ) : (
            /* Restaurant List Section */
            <View style={styles.restaurantListContainer}>
              {filteredRestaurantData.map((item) => (
                <TouchableOpacity
                  key={item.id}
                  style={styles.horizontalCard}
                  activeOpacity={0.9}
                  onPress={() => onRestaurantPress?.(item)}
                >
                  <View style={styles.horizontalImageBox}>
                    <Image
                      source={item.image}
                      style={styles.horizontalCardImage}
                      resizeMode="cover"
                    />
                  </View>

                  <View style={styles.infoContainer}>
                    {item.badge ? (
                      <View style={styles.badgeContainer}>
                        <View style={styles.badgeIconCircle}>
                          <AppText style={styles.badgePercentSymbol}>%</AppText>
                        </View>
                        <AppText style={styles.badgeText}>Lowest Price</AppText>
                      </View>
                    ) : null}

                    <AppText style={styles.restaurantName} numberOfLines={1}>
                      {item.name}
                    </AppText>

                    <View style={styles.metaRow}>
                      <View style={styles.ratingBadge}>
                        <StarIcon size={13} color={COLORS.badgeGreen} />
                        <AppText style={styles.ratingText}>{item.rating.toFixed(1)}</AppText>
                        <AppText style={styles.ratingCountText}>
                          {item.ratingCount ? ` ${item.ratingCount}` : ''}
                        </AppText>

                        <AppText style={styles.bulletDot}>•</AppText>

                        <ZapIcon size={12} color={COLORS.textSlateIcon} />
                        <AppText style={styles.timeText}> {item.time}</AppText>
                      </View>
                    </View>

                    {(item.location || item.distance) ? (
                      <AppText style={styles.locationText} numberOfLines={1}>
                        {item.location ? `${item.location} • ` : ''}
                        {item.distance || ''}
                      </AppText>
                    ) : null}

                    <AppText style={styles.cuisineText} numberOfLines={1}>
                      {item.cuisines}
                    </AppText>
                  </View>
                </TouchableOpacity>
              ))}
            </View>
          )}
        </ScrollView>

        {/* Sort Modal Dropdown */}
        {isSortModalOpen ? (
          <>
            <TouchableWithoutFeedback onPress={() => setIsSortModalOpen(false)}>
              <View style={styles.modalBackdrop} />
            </TouchableWithoutFeedback>

            <View style={styles.sortDropdownCard}>
              <TouchableOpacity
                style={styles.sortOptionRow}
                activeOpacity={0.7}
                onPress={() => {
                  setSortOption('relevancy');
                  setIsSortModalOpen(false);
                }}
              >
                <View
                  style={[
                    styles.radioOuter,
                    sortOption === 'relevancy' ? styles.radioOuterSelected : undefined,
                  ]}
                >
                  {sortOption === 'relevancy' ? <View style={styles.radioInnerDot} /> : null}
                </View>
                <AppText
                  style={[
                    styles.sortOptionText,
                    sortOption === 'relevancy' ? styles.sortOptionTextSelected : undefined,
                  ]}
                >
                  Relevancy
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={styles.sortOptionRow}
                activeOpacity={0.7}
                onPress={() => {
                  setSortOption('rating');
                  setIsSortModalOpen(false);
                }}
              >
                <View
                  style={[
                    styles.radioOuter,
                    sortOption === 'rating' ? styles.radioOuterSelected : undefined,
                  ]}
                >
                  {sortOption === 'rating' ? <View style={styles.radioInnerDot} /> : null}
                </View>
                <AppText
                  style={[
                    styles.sortOptionText,
                    sortOption === 'rating' ? styles.sortOptionTextSelected : undefined,
                  ]}
                >
                  Rating (High to Low)
                </AppText>
              </TouchableOpacity>
            </View>
          </>
        ) : null}

        {/* Food Showcase Modal */}
        <FoodShowcaseModal
          item={selectedShowcaseFood}
          visible={!!selectedShowcaseFood}
          onClose={() => setSelectedShowcaseFood(null)}
          onViewMenuPress={(restaurantName) => {
            setSelectedShowcaseFood(null);
            onRestaurantPress?.({ name: restaurantName } as any);
          }}
        />
      </View>
    </ScreenWrapper>
  );
};
