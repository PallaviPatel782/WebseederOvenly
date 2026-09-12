import React, { useState } from 'react';
import {
  View,
  TouchableOpacity,
  TextInput,
  ScrollView,
  Image,
} from 'react-native';
import { AppText } from '../../../components/common/AppText';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import {
  ArrowLeftIcon,
  SearchIcon,
  XIcon,
  ClockIcon,
  TrendingUpIcon,
  StarIcon,
} from '../../../components/common/icons';
import { COLORS } from '../../../theme/colors';
import { IMAGES } from '../../../assets/images';
import {
  BREAKFAST_UNDER_DATA,
  KNOWN_AND_LOVED_DATA,
  GREAT_FOOD_BETTER_PRICES_DATA,
  ALL_RESTAURANTS_DATA,
  FoodItem,
  RestaurantItem,
} from '../../../constants/homeData';
import { styles } from './SearchScreen.styles';

const RECENT_SEARCHES = ['Chicken biryani'];

const POPULAR_SEARCHES = [
  'biryani',
  'pizza',
  'burger',
  'shawarma',
  'chicken',
  'momos',
  'thali',
];

const SEARCH_CATEGORIES = [
  { id: 'c1', title: 'chicken\nbiryani', query: 'biryani', image: IMAGES.mindBiryani },
  { id: 'c2', title: 'north\nindian', query: 'north indian', image: IMAGES.mindNorthIndian },
  { id: 'c3', title: 'south\nindian', query: 'south indian', image: IMAGES.mindSouthIndian },
  { id: 'c4', title: 'italian', query: 'italian', image: IMAGES.mindChinese },
  { id: 'c5', title: 'healthy', query: 'healthy', image: IMAGES.knownSaladDays },
];

interface SearchScreenProps {
  onBack?: () => void;
  onSelectFoodItem?: (item: FoodItem | RestaurantItem) => void;
}

export const SearchScreen: React.FC<SearchScreenProps> = ({
  onBack,
  onSelectFoodItem,
}) => {
  const [searchQuery, setSearchQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState<string[]>(RECENT_SEARCHES);

  const handleSelectSearch = (term: string) => {
    setSearchQuery(term);
    if (!recentSearches.includes(term)) {
      setRecentSearches((prev) => [term, ...prev]);
    }
  };

  const clearSearch = () => {
    setSearchQuery('');
  };

  // Combine dummy data for filtering
  const allSearchableItems: Array<{
    id: string;
    name: string;
    subText: string;
    rating: number;
    priceOrTime: string;
    isVeg?: boolean;
    image: any;
    rawItem: FoodItem | RestaurantItem;
  }> = [
    ...BREAKFAST_UNDER_DATA.map((food) => ({
      id: food.id,
      name: food.name,
      subText: food.restaurant,
      rating: food.rating,
      priceOrTime: `₹${food.price} • ${food.time}`,
      isVeg: food.isVeg,
      image: food.image,
      rawItem: food,
    })),
    ...KNOWN_AND_LOVED_DATA.map((rest) => ({
      id: rest.id,
      name: rest.name,
      subText: rest.cuisines,
      rating: rest.rating,
      priceOrTime: rest.time,
      isVeg: rest.isVeg,
      image: rest.image,
      rawItem: rest,
    })),
    ...GREAT_FOOD_BETTER_PRICES_DATA.map((rest) => ({
      id: rest.id,
      name: rest.name,
      subText: rest.cuisines,
      rating: rest.rating,
      priceOrTime: rest.time,
      isVeg: rest.isVeg,
      image: rest.image,
      rawItem: rest,
    })),
    ...ALL_RESTAURANTS_DATA.map((rest) => ({
      id: rest.id,
      name: rest.name,
      subText: `${rest.cuisines} • ${rest.location || ''}`,
      rating: rest.rating,
      priceOrTime: rest.priceForOne || rest.time,
      isVeg: rest.isVeg,
      image: rest.image,
      rawItem: rest,
    })),
  ];

  const filteredResults = searchQuery.trim()
    ? allSearchableItems.filter(
        (item) =>
          item.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
          item.subText.toLowerCase().includes(searchQuery.toLowerCase())
      )
    : [];

  return (
    <ScreenWrapper backgroundColor={COLORS.white} barStyle="dark-content" unsafeBottom>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack} activeOpacity={0.7}>
            <ArrowLeftIcon size={20} color={COLORS.textDark} strokeWidth={2.5} />
          </TouchableOpacity>

          <View style={styles.searchBarContainer}>
            <SearchIcon size={18} color={COLORS.textMuted} style={styles.searchIcon} />
            <TextInput
              style={styles.searchInput}
              placeholder="Search for dishes"
              placeholderTextColor={COLORS.textPlaceholder}
              value={searchQuery}
              onChangeText={setSearchQuery}
              autoFocus
            />
            {searchQuery ? (
              <TouchableOpacity style={styles.clearBtn} onPress={clearSearch}>
                <XIcon size={16} color={COLORS.textMuted} />
              </TouchableOpacity>
            ) : null}
          </View>
        </View>

        <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={styles.content}>
          {searchQuery.trim() === '' ? (
            <>
              {/* Recent Searches */}
              {recentSearches.length > 0 ? (
                <View style={styles.section}>
                  <View style={styles.sectionTitleRow}>
                    <ClockIcon size={18} color={COLORS.textDark} style={styles.sectionIcon} />
                    <AppText style={styles.sectionTitle}>Recent Searches</AppText>
                  </View>
                  <View style={styles.chipsRow}>
                    {recentSearches.map((item, idx) => (
                      <TouchableOpacity
                        key={idx}
                        style={styles.chip}
                        activeOpacity={0.7}
                        onPress={() => handleSelectSearch(item)}
                      >
                        <AppText style={styles.chipText}>{item}</AppText>
                      </TouchableOpacity>
                    ))}
                  </View>
                </View>
              ) : null}

              {/* Popular in your area */}
              <View style={styles.section}>
                <View style={styles.sectionTitleRow}>
                  <TrendingUpIcon size={18} color={COLORS.textDark} style={styles.sectionIcon} />
                  <AppText style={styles.sectionTitle}>Popular in your area</AppText>
                </View>
                <View style={styles.chipsRow}>
                  {POPULAR_SEARCHES.map((term, idx) => (
                    <TouchableOpacity
                      key={idx}
                      style={styles.chip}
                      activeOpacity={0.7}
                      onPress={() => handleSelectSearch(term)}
                    >
                      <AppText style={styles.chipText}>{term}</AppText>
                    </TouchableOpacity>
                  ))}
                </View>
              </View>

              {/* Categories */}
              <View style={styles.section}>
                <AppText style={[styles.sectionTitle, { marginBottom: 14 }]}>Categories</AppText>
                <ScrollView
                  horizontal
                  showsHorizontalScrollIndicator={false}
                  contentContainerStyle={styles.categoriesScroll}
                >
                  {SEARCH_CATEGORIES.map((cat) => (
                    <TouchableOpacity
                      key={cat.id}
                      style={styles.categoryCard}
                      activeOpacity={0.8}
                      onPress={() => handleSelectSearch(cat.query)}
                    >
                      <View style={styles.categoryImgBox}>
                        <Image source={cat.image} style={styles.categoryImg} resizeMode="cover" />
                      </View>
                      <AppText style={styles.categoryTitle}>{cat.title}</AppText>
                    </TouchableOpacity>
                  ))}
                </ScrollView>
              </View>
            </>
          ) : (
            /* Search Results View */
            <View>
              <AppText style={styles.searchResultsTitle}>
                Search Results ({filteredResults.length})
              </AppText>
              {filteredResults.length > 0 ? (
                filteredResults.map((item) => (
                  <TouchableOpacity
                    key={item.id}
                    style={styles.resultCard}
                    activeOpacity={0.85}
                    onPress={() => onSelectFoodItem?.(item.rawItem)}
                  >
                    <Image source={item.image} style={styles.resultImg} resizeMode="cover" />
                    <View style={styles.resultContent}>
                      <View style={styles.resultTitleRow}>
                        {item.isVeg !== undefined ? (
                          item.isVeg ? (
                            <View style={styles.vegSquare}>
                              <View style={styles.vegDot} />
                            </View>
                          ) : (
                            <View style={styles.nonVegSquare}>
                              <View style={styles.nonVegDot} />
                            </View>
                          )
                        ) : null}
                        <AppText style={styles.resultTitle}>{item.name}</AppText>
                      </View>
                      <AppText style={styles.resultSub} numberOfLines={1}>
                        {item.subText}
                      </AppText>
                      <View style={styles.resultMetaRow}>
                        <View style={styles.ratingBadge}>
                          <StarIcon size={11} color="#16A34A" />
                          <AppText style={styles.ratingText}>{item.rating}</AppText>
                        </View>
                        <AppText style={styles.resultPrice}>{item.priceOrTime}</AppText>
                      </View>
                    </View>
                  </TouchableOpacity>
                ))
              ) : (
                <View style={styles.emptyContainer}>
                  <AppText style={styles.emptyText}>No dishes or restaurants found</AppText>
                </View>
              )}
            </View>
          )}
        </ScrollView>
      </View>
    </ScreenWrapper>
  );
};
