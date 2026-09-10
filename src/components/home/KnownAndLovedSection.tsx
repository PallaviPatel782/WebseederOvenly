import React from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { AppText } from '../common/AppText';
import { StarIcon } from '../common/icons';
import { KNOWN_AND_LOVED_DATA, RestaurantItem } from '../../constants/homeData';
import { styles } from './KnownAndLovedSection.styles';

interface KnownAndLovedSectionProps {
  title?: string;
  data?: RestaurantItem[];
  onSelectRestaurant?: (item: RestaurantItem) => void;
  onSeeAll?: () => void;
}

export const KnownAndLovedSection: React.FC<KnownAndLovedSectionProps> = ({
  title = 'Known & Loved',
  data = KNOWN_AND_LOVED_DATA,
  onSelectRestaurant,
  onSeeAll,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <AppText style={styles.sectionTitle}>{title}</AppText>
        <TouchableOpacity activeOpacity={0.7} onPress={onSeeAll}>
          <AppText style={styles.seeAllText}>See All {'>'}</AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.horizontalScroll}
      >
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.restaurantCard}
            activeOpacity={0.85}
            onPress={() => onSelectRestaurant?.(item)}
          >
            <View style={styles.imageBox}>
              <Image source={item.image} style={styles.restaurantImage} resizeMode="cover" />
              {item.badge ? (
                <View style={styles.badgeContainer}>
                  <View style={styles.badgeIconCircle}>
                    <AppText style={styles.badgePercentSymbol}>%</AppText>
                  </View>
                  <AppText style={styles.badgeText}>{item.badge}</AppText>
                </View>
              ) : null}
            </View>

            <AppText style={styles.restaurantName} numberOfLines={1}>
              {item.name}
            </AppText>

            <View style={styles.metaRow}>
              <View style={styles.ratingBadge}>
                <StarIcon size={12} color="#16A34A" />
                <AppText style={styles.ratingText}>{item.rating}</AppText>
                {item.ratingCount ? (
                  <AppText style={styles.ratingCountText}>{item.ratingCount}</AppText>
                ) : null}
              </View>

              <AppText style={styles.bulletDot}>•</AppText>
              <AppText style={styles.timeText}>⚡ {item.time}</AppText>
            </View>

            {item.cuisines ? (
              <AppText style={styles.cuisinesText} numberOfLines={1}>
                {item.cuisines}
              </AppText>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};

