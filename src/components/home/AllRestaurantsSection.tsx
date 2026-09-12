import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { AppText } from '../common/AppText';
import { StarIcon, ZapIcon } from '../common/icons';
import { RestaurantItem } from '../../constants/homeData';
import { COLORS } from '../../theme/colors';
import { styles } from './AllRestaurantsSection.styles';

interface AllRestaurantsSectionProps {
  data: RestaurantItem[];
  onRestaurantPress?: (item: RestaurantItem) => void;
}

export const AllRestaurantsSection: React.FC<AllRestaurantsSectionProps> = ({
  data,
  onRestaurantPress,
}) => {
  return (
    <View style={styles.container}>
      {data.map((item) => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => onRestaurantPress?.(item)}
        >
          {/* Full-width Image Box on Top with Badge inside */}
          <View style={styles.imageBox}>
            <Image
              source={item.image}
              style={styles.cardImage}
              resizeMode="cover"
            />
            {item.badge ? (
              <View style={styles.badgeContainer}>
                <View style={styles.badgeIconCircle}>
                  <AppText style={styles.badgePercentSymbol}>%</AppText>
                </View>
                <AppText style={styles.badgeText}>Lowest Price</AppText>
              </View>
            ) : null}
          </View>

          {/* Info Container below Image */}
          <View style={styles.infoContainer}>
            {/* Title & Distance Row */}
            <View style={styles.titleRow}>
              <AppText style={styles.restaurantName} numberOfLines={1}>
                {item.name}
              </AppText>

              <View style={styles.distanceCol}>
                {item.distance ? (
                  <AppText style={styles.distanceText}>{item.distance}</AppText>
                ) : null}
                {item.location ? (
                  <AppText style={styles.locationText} numberOfLines={1}>
                    {item.location}
                  </AppText>
                ) : null}
              </View>
            </View>

            {/* Rating & Time Row */}
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

            {/* Price & Cuisine Row */}
            <View style={styles.priceCuisineRow}>
              <AppText style={styles.priceCuisineText} numberOfLines={1}>
                {item.priceForOne ? `${item.priceForOne} | ` : ''}
                {item.cuisines}
              </AppText>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
