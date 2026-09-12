import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  TouchableWithoutFeedback,
  Platform,
  StatusBar,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import { AppText } from '../../../components/common/AppText';
import {
  ArrowLeftIcon,
  SearchIcon,
  StarIcon,
  ZapIcon,
  ChevronDownIcon,
  PlusIcon,
  BookIcon,
  ShareIcon,
} from '../../../components/common/icons';
import {
  RestaurantItem,
  RESTAURANT_DISHES_DATA,
  DishItem,
} from '../../../constants/homeData';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../theme/colors';
import { useCartStore } from '../../../store/useCartStore';
import { styles } from './RestaurantDetailScreen.styles';

export interface RestaurantDetailProps {
  restaurant?: RestaurantItem;
  onBack?: () => void;
  onSearchPress?: () => void;
}

export const RestaurantDetailScreen: React.FC<RestaurantDetailProps> = ({
  restaurant,
  onBack,
  onSearchPress,
}) => {
  const insets = useSafeAreaInsets();
  const topInset = insets.top > 0 ? insets.top : Platform.OS === 'ios' ? 44 : (StatusBar.currentHeight || 24);

  const cartItems = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decrementItem = useCartStore((state) => state.decrementItem);

  const getItemQty = (id: string) => {
    const item = cartItems.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const handleAddDish = (dish: DishItem) => {
    addItem(
      {
        id: dish.id,
        name: dish.name,
        price: dish.price,
        isVeg: dish.isVeg,
        image: dish.image,
      },
      {
        id: restaurant?.id || 'r1',
        name: restaurant?.name || 'SHREE SAGAR VEG FAST FOOD',
        location: restaurant?.location || 'Gandhinagar',
        image: restaurant?.image || IMAGES.knownSaladDays,
        deliveryTime: restaurant?.time || '45-50mins',
      }
    );
  };


  const scrollViewRef = React.useRef<any>(null);
  const accordionSectionTop = React.useRef<number>(0);
  const categoryPositions = React.useRef<{ [key: string]: number }>({});

  const [selectedSort, setSelectedSort] = useState<string>('default');
  const [isSortOpen, setIsSortOpen] = useState<boolean>(false);
  const [isMenuSheetOpen, setIsMenuSheetOpen] = useState<boolean>(false);
  const [activeCategoryFilter, setActiveCategoryFilter] = useState<string>('all');
  const [isUnder199Filter, setIsUnder199Filter] = useState<boolean>(false);
  const [isLowestPriceFilter, setIsLowestPriceFilter] = useState<boolean>(false);

  const [expandedCategories, setExpandedCategories] = useState<{ [key: string]: boolean }>({
    Breakfast: true,
    Juice: true,
    Milkshake: true,
    Meals: true,
    Rice: true,
  });

  const name = restaurant?.name || 'SHREE SAGAR VEG FAST FOOD';
  const rating = restaurant?.rating || 3.6;
  const ratingCount = restaurant?.ratingCount || '1k+ ratings';
  const time = restaurant?.time || '38 mins';
  const distance = restaurant?.distance || '1.39 km';
  const location = restaurant?.location || 'Gandhinagar';
  const heroImage = restaurant?.image || IMAGES.knownSaladDays;

  let topPicks = RESTAURANT_DISHES_DATA.filter((d) => d.isTopPick);
  if (isUnder199Filter) {
    topPicks = topPicks.filter((d) => d.price < 199);
  }
  if (isLowestPriceFilter) {
    topPicks = topPicks.filter((d) => d.isLowestPrice);
  }
  if (selectedSort === 'price_low') {
    topPicks = [...topPicks].sort((a, b) => a.price - b.price);
  } else if (selectedSort === 'price_high') {
    topPicks = [...topPicks].sort((a, b) => b.price - a.price);
  }

  const getFilteredDishes = (catName: string) => {
    let dishes = RESTAURANT_DISHES_DATA.filter((d) => d.category === catName);
    if (isUnder199Filter) {
      dishes = dishes.filter((d) => d.price < 199);
    }
    if (isLowestPriceFilter) {
      dishes = dishes.filter((d) => d.isLowestPrice);
    }
    if (selectedSort === 'price_low') {
      dishes = [...dishes].sort((a, b) => a.price - b.price);
    } else if (selectedSort === 'price_high') {
      dishes = [...dishes].sort((a, b) => b.price - a.price);
    }
    return dishes;
  };

  const categories = React.useMemo(() => {
    const list = [
      { name: 'Top Picks', count: topPicks.length },
      { name: 'Breakfast', count: getFilteredDishes('Breakfast').length },
      { name: 'Juice', count: getFilteredDishes('Juice').length },
      { name: 'Milkshake', count: getFilteredDishes('Milkshake').length },
      { name: 'Meals', count: getFilteredDishes('Meals').length },
      { name: 'Rice', count: getFilteredDishes('Rice').length },
    ];
    return list.filter((cat) => cat.count > 0);
  }, [topPicks, isUnder199Filter, isLowestPriceFilter, selectedSort]);

  const toggleCategory = (catName: string) => {
    setExpandedCategories((prev) => ({
      ...prev,
      [catName]: !prev[catName],
    }));
  };

  const scrollToCategory = (catName: string) => {
    setActiveCategoryFilter(catName);
    setIsMenuSheetOpen(false);
    if (catName !== 'Top Picks') {
      setExpandedCategories((prev) => ({ ...prev, [catName]: true }));
    }
    const yPos = categoryPositions.current[catName];
    if (yPos !== undefined && scrollViewRef.current) {
      scrollViewRef.current.scrollTo({ y: Math.max(0, yPos - 12), animated: true });
    }
  };

  return (
    <ScreenWrapper backgroundColor={COLORS.headerBlue} barStyle="light-content" unsafeTop unsafeBottom>
      <View style={styles.container}>
        <ScrollView
          ref={scrollViewRef}
          style={{ flex: 1 }}
          bounces={false}
          showsVerticalScrollIndicator={false}
        >
          {/* Hero Image Section */}
          <View style={styles.heroContainer}>
            <Image source={heroImage} style={styles.heroImage} resizeMode="cover" />

            {/* Top Action Buttons */}
            <View style={[styles.topButtonsRow, { top: topInset + 8 }]}>
              <TouchableOpacity
                style={styles.backBtnCircle}
                activeOpacity={0.8}
                onPress={onBack}
              >
                <ArrowLeftIcon size={20} color={COLORS.textSlateDark} />
              </TouchableOpacity>

              <View style={styles.topRightRow}>
                <TouchableOpacity
                  style={styles.searchPillBtn}
                  activeOpacity={0.8}
                  onPress={onSearchPress}
                >
                  <SearchIcon size={16} color={COLORS.textSlateDark} strokeWidth={2.2} />
                  <AppText style={styles.searchPlaceholderText}>Search</AppText>
                </TouchableOpacity>

                <TouchableOpacity style={styles.shareBtnCircle} activeOpacity={0.8}>
                  <ShareIcon size={18} color={COLORS.textSlateDark} strokeWidth={2.2} />
                </TouchableOpacity>
              </View>
            </View>
          </View>

          {/* Restaurant Info Card */}
          <View style={styles.restaurantInfoCard}>
            <View style={styles.infoTopRow}>
              <View style={styles.cardHeaderLeft}>
                <AppText style={styles.restaurantTitle}>{name}</AppText>
                <View style={styles.timeLocRow}>
                  <ZapIcon size={13} color={COLORS.textSlateIcon} />
                  <AppText style={styles.timeLocText}>
                    {' '}{time} • {distance}
                  </AppText>
                </View>
                <AppText style={styles.subLocText}>{location}</AppText>
              </View>

              <View style={styles.ratingBox}>
                <View style={styles.ratingPill}>
                  <StarIcon size={12} color={COLORS.badgeGreen} />
                  <AppText style={styles.ratingScoreText}>{rating.toFixed(1)}</AppText>
                </View>
                <AppText style={styles.ratingCountSub}>{ratingCount}</AppText>
              </View>
            </View>

            <View style={styles.cardDividerLine} />

            <View style={styles.lowestPriceTagPill}>
              <View style={styles.badgeIconCircle}>
                <AppText style={styles.badgePercentSymbol}>%</AppText>
              </View>
              <AppText style={styles.badgeText}>Lowest Price</AppText>
            </View>
          </View>

          {/* Filter Bar */}
          <View style={styles.filterSection}>
            <ScrollView
              horizontal
              showsHorizontalScrollIndicator={false}
              contentContainerStyle={styles.filterScroll}
            >
              <TouchableOpacity
                style={[
                  styles.filterPill,
                  selectedSort !== 'default' ? styles.filterPillActive : undefined,
                ]}
                activeOpacity={0.7}
                onPress={() => setIsSortOpen(!isSortOpen)}
              >
                <AppText
                  style={[
                    styles.filterPillText,
                    selectedSort !== 'default' ? styles.filterPillTextActive : undefined,
                  ]}
                >
                  Sort by{' '}
                </AppText>
                <ChevronDownIcon size={14} color={selectedSort !== 'default' ? COLORS.brandPink : COLORS.textSlateSub} />
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterPill,
                  isUnder199Filter ? styles.filterPillActive : undefined,
                ]}
                activeOpacity={0.7}
                onPress={() => setIsUnder199Filter(!isUnder199Filter)}
              >
                <AppText
                  style={[
                    styles.filterPillText,
                    isUnder199Filter ? styles.filterPillTextActive : undefined,
                  ]}
                >
                  Under ₹199
                </AppText>
              </TouchableOpacity>

              <TouchableOpacity
                style={[
                  styles.filterPill,
                  isLowestPriceFilter ? styles.filterPillActive : undefined,
                ]}
                activeOpacity={0.7}
                onPress={() => setIsLowestPriceFilter(!isLowestPriceFilter)}
              >
                <AppText
                  style={[
                    styles.filterPillText,
                    isLowestPriceFilter ? styles.filterPillTextActive : undefined,
                  ]}
                >
                  Lowest Price
                </AppText>
              </TouchableOpacity>
            </ScrollView>
          </View>

          {/* TOP PICKS Section (2-Column Grid) */}
          <View
            style={styles.sectionHeader}
            onLayout={(e) => {
              categoryPositions.current['Top Picks'] = e.nativeEvent.layout.y;
            }}
          >
            <View style={styles.dividerLine} />
            <AppText style={styles.sectionHeaderTitleText}>TOP PICKS</AppText>
            <View style={styles.dividerLine} />
          </View>

          <View style={styles.topPicksGrid}>
            {topPicks.map((dish) => {
              const qty = getItemQty(dish.id);
              return (
                <View key={dish.id} style={styles.topPickCardOuter}>
                  <View style={styles.topPickCardInner}>
                    <View style={styles.topPickImageContainer}>
                      <Image source={dish.image} style={styles.topPickImage} resizeMode="cover" />

                      <View style={styles.topPickGradientOverlay}>
                        <View style={styles.vegBadgeOverlay}>
                          <View style={styles.vegSquare}>
                            <View style={styles.vegDot} />
                          </View>
                          <View style={styles.badgeIconCircle}>
                            <AppText style={styles.badgePercentSymbol}>%</AppText>
                          </View>
                          <AppText style={[styles.badgeText, { color: COLORS.white, fontSize: 9.5 }]}>
                            Lowest Price
                          </AppText>
                        </View>

                        <AppText style={styles.topPickTitle} numberOfLines={1}>
                          {dish.name}
                        </AppText>
                        <AppText style={styles.topPickPrice}>₹{dish.price}</AppText>

                        <View style={styles.topPickRatingRow}>
                          <View style={styles.greenStarCircle}>
                            <StarIcon size={8} color={COLORS.white} />
                          </View>
                          <AppText style={styles.topPickRatingText}>
                            {dish.rating} ({dish.ratingCount})
                          </AppText>
                        </View>

                        <AppText style={styles.moreDetailsText}>More Details ›</AppText>
                      </View>

                      {qty > 0 ? (
                        <View style={styles.topPickQtyPill}>
                          <TouchableOpacity
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            onPress={() => decrementItem(dish.id)}
                          >
                            <AppText style={styles.qtyPillBtnText}>-</AppText>
                          </TouchableOpacity>
                          <AppText style={styles.qtyPillNumText}>{qty}</AppText>
                          <TouchableOpacity
                            hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                            onPress={() => handleAddDish(dish)}
                          >
                            <AppText style={styles.qtyPillBtnText}>+</AppText>
                          </TouchableOpacity>
                        </View>
                      ) : (
                        <TouchableOpacity
                          style={styles.addPlusCircleBtn}
                          activeOpacity={0.8}
                          onPress={() => handleAddDish(dish)}
                        >
                          <PlusIcon size={20} color={COLORS.white} strokeWidth={2.5} />
                        </TouchableOpacity>
                      )}
                    </View>
                  </View>
                </View>
              );
            })}
          </View>

          {/* Accordion Categories Section */}
          <View
            style={styles.accordionSection}
            onLayout={(e) => {
              accordionSectionTop.current = e.nativeEvent.layout.y;
            }}
          >
            {['Breakfast', 'Juice', 'Milkshake', 'Meals', 'Rice'].map((catName) => {
              const isExpanded = expandedCategories[catName] ?? true;
              const dishes = getFilteredDishes(catName);
              if (dishes.length === 0) return null;

              return (
                <View
                  key={catName}
                  style={{ marginBottom: 12 }}
                  onLayout={(e) => {
                    categoryPositions.current[catName] = accordionSectionTop.current + e.nativeEvent.layout.y;
                  }}
                >
                  <TouchableOpacity
                    style={styles.accordionHeaderRow}
                    activeOpacity={0.7}
                    onPress={() => toggleCategory(catName)}
                  >
                    <AppText style={styles.accordionTitleText}>{catName}</AppText>
                    <AppText style={{ fontSize: 16, color: COLORS.textSlateDark }}>
                      {isExpanded ? '▲' : '▼'}
                    </AppText>
                  </TouchableOpacity>

                  {isExpanded
                    ? dishes.map((dish) => {
                        const qty = getItemQty(dish.id);
                        return (
                          <View key={dish.id} style={styles.dishHorizontalRow}>
                            <View style={styles.dishLeftCol}>
                              <View style={{ flexDirection: 'row', alignItems: 'center', marginBottom: 4 }}>
                                <View style={styles.vegSquare}>
                                  <View style={styles.vegDot} />
                                </View>
                                <View style={styles.badgeIconCircle}>
                                  <AppText style={styles.badgePercentSymbol}>%</AppText>
                                </View>
                                <AppText style={styles.badgeText}>Lowest Price</AppText>
                              </View>

                              <AppText style={styles.dishNameText}>{dish.name}</AppText>

                              <View style={{ flexDirection: 'row', alignItems: 'center', marginTop: 3 }}>
                                <StarIcon size={12} color={COLORS.badgeGreen} />
                                <AppText style={styles.ratingScoreText}>{dish.rating}</AppText>
                                <AppText style={styles.ratingCountSub}> ({dish.ratingCount})</AppText>
                              </View>

                              <AppText style={styles.dishPriceText}>₹ {dish.price}</AppText>

                              {dish.description ? (
                                <AppText style={styles.dishDescText} numberOfLines={2}>
                                  {dish.description}
                                </AppText>
                              ) : null}
                            </View>

                            <View style={styles.dishRightImageCol}>
                              <Image
                                source={dish.image}
                                style={styles.dishSquareImage}
                                resizeMode="cover"
                              />

                              {qty > 0 ? (
                                <View style={styles.dishQtyPill}>
                                  <TouchableOpacity
                                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    onPress={() => decrementItem(dish.id)}
                                  >
                                    <AppText style={styles.qtyPillBtnText}>-</AppText>
                                  </TouchableOpacity>
                                  <AppText style={styles.qtyPillNumText}>{qty}</AppText>
                                  <TouchableOpacity
                                    hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                                    onPress={() => handleAddDish(dish)}
                                  >
                                    <AppText style={styles.qtyPillBtnText}>+</AppText>
                                  </TouchableOpacity>
                                </View>
                              ) : (
                                <TouchableOpacity
                                  style={styles.dishPlusBtnFloating}
                                  activeOpacity={0.8}
                                  onPress={() => handleAddDish(dish)}
                                >
                                  <PlusIcon size={18} color={COLORS.white} strokeWidth={2.5} />
                                </TouchableOpacity>
                              )}
                            </View>
                          </View>
                        );
                      })
                    : null}
                </View>
              );
            })}
          </View>

        </ScrollView>

        {/* Floating MENU Button */}
        <TouchableOpacity
          style={[
            styles.floatingMenuBtn,
            { bottom: Math.max(insets.bottom + 16, 24) },
          ]}
          activeOpacity={0.85}
          onPress={() => setIsMenuSheetOpen(!isMenuSheetOpen)}
        >
          <BookIcon size={18} color={COLORS.white} strokeWidth={2} />
          <AppText style={styles.menuBtnText}>MENU</AppText>
        </TouchableOpacity>

        {/* Menu Category Sheet Modal */}
        {isMenuSheetOpen ? (
          <>
            <TouchableWithoutFeedback onPress={() => setIsMenuSheetOpen(false)}>
              <View style={styles.modalBackdrop} />
            </TouchableWithoutFeedback>

            <View style={[styles.categorySheetCard, { bottom: Math.max(insets.bottom + 88, 96) }]}>
              {categories.map((cat) => (
                <TouchableOpacity
                  key={cat.name}
                  style={styles.categorySheetRow}
                  activeOpacity={0.7}
                  onPress={() => scrollToCategory(cat.name)}
                >
                  <AppText
                    style={[
                      styles.categorySheetText,
                      activeCategoryFilter === cat.name ? { color: COLORS.brandPink } : undefined,
                    ]}
                  >
                    {cat.name}
                  </AppText>
                  <AppText style={styles.categorySheetCount}>{cat.count}</AppText>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : null}

        {/* Sort Modal Dropdown (Screenshot 3) */}
        {isSortOpen ? (
          <>
            <TouchableWithoutFeedback onPress={() => setIsSortOpen(false)}>
              <View style={styles.modalBackdrop} />
            </TouchableWithoutFeedback>

            <View style={styles.sortDropdownCard}>
              {[
                { key: 'default', label: 'Default' },
                { key: 'price_low', label: 'Price(low to high)' },
                { key: 'price_high', label: 'Price(high to low)' },
              ].map((opt) => (
                <TouchableOpacity
                  key={opt.key}
                  style={styles.sortOptionRow}
                  activeOpacity={0.7}
                  onPress={() => {
                    setSelectedSort(opt.key);
                    setIsSortOpen(false);
                  }}
                >
                  <View
                    style={[
                      styles.radioOuter,
                      selectedSort === opt.key ? styles.radioOuterSelected : undefined,
                    ]}
                  >
                    {selectedSort === opt.key ? <View style={styles.radioInnerDot} /> : null}
                  </View>
                  <AppText
                    style={[
                      styles.sortOptionText,
                      selectedSort === opt.key ? styles.sortOptionTextSelected : undefined,
                    ]}
                  >
                    {opt.label}
                  </AppText>
                </TouchableOpacity>
              ))}
            </View>
          </>
        ) : null}
      </View>
    </ScreenWrapper>
  );
};
