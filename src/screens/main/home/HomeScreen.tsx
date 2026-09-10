import React, { useState, useRef } from 'react';
import {
  View,
  TouchableOpacity,
  Animated,
  Switch,
  Platform,
  StatusBar,
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
} from '../../../components';
import {
  GREAT_FOOD_BETTER_PRICES_DATA,
  ALL_RESTAURANTS_DATA,
} from '../../../constants/homeData';
import { UserProfile } from '../../../navigation/RootNavigator';
import { styles } from './HomeScreen.styles';

interface HomeScreenProps {
  userProfile?: UserProfile;
  onNavigateToProfile?: () => void;
  onNavigateBack?: () => void;
}

export const HomeScreen: React.FC<HomeScreenProps> = ({
  userProfile,
  onNavigateToProfile,
}) => {
  const [isVegOnly, setIsVegOnly] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedFilter, setSelectedFilter] = useState('all');
  const [filterBarY, setFilterBarY] = useState(800);

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
              <TouchableOpacity style={styles.locationLeft} activeOpacity={0.8}>
                <View style={styles.locationTitleRow}>
                  <AppText style={styles.locationTitle}>Current location</AppText>
                  <ChevronDownIcon size={18} color={COLORS.white} />
                </View>
                <AppText style={styles.locationSub} numberOfLines={1}>
                  Bangalore, Karnataka, India
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

            <PickYourCravingSection />

            <BreakfastUnderSection />

            <WhatsOnYourMindSection />

            <KnownAndLovedSection title="Known & Loved" />

            <KnownAndLovedSection
              title="Great Food, Better Prices"
              data={GREAT_FOOD_BETTER_PRICES_DATA}
            />
          </View>

          <View onLayout={(e) => setFilterBarY(e.nativeEvent.layout.y)}>
            <AllRestaurantsFilterBar
              selectedFilter={selectedFilter}
              onSelectFilter={setSelectedFilter}
            />
          </View>

          <AllRestaurantsSection data={ALL_RESTAURANTS_DATA} />
        </Animated.ScrollView>
      </View>
    </ScreenWrapper>
  );
};


