import React from 'react';
import { View, Image, TouchableOpacity } from 'react-native';
import { AppText } from '../common/AppText';
import { StarIcon, ZapIcon } from '../common/icons';
import { RestaurantItem } from '../../constants/homeData';
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
      {data.map(item => (
        <TouchableOpacity
          key={item.id}
          style={styles.card}
          activeOpacity={0.9}
          onPress={() => onRestaurantPress?.(item)}
        >
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
                <AppText style={styles.badgeText}>{item.badge}</AppText>
              </View>
            ) : null}
          </View>

          <View style={styles.infoContainer}>
            <View style={styles.titleRow}>
              <AppText style={styles.restaurantName} numberOfLines={1}>
                {item.name}
              </AppText>
              {item.distance ? (
                <AppText style={styles.distanceText}>{item.distance}</AppText>
              ) : null}
            </View>

            <View style={styles.metaRow}>
              <View style={styles.ratingBadge}>
                <StarIcon size={14} color="#16A34A" />
                <AppText style={styles.ratingText}>{item.rating}</AppText>
                <AppText style={styles.ratingCountText}>
                  {item.ratingCount}
                </AppText>

                <AppText style={styles.bulletDot}>•</AppText>

                <ZapIcon size={13} color="#475569" />
                <AppText style={styles.timeText}> {item.time}</AppText>
              </View>

              {item.location ? (
                <AppText style={styles.locationText} numberOfLines={1}>
                  {item.location}
                </AppText>
              ) : null}
            </View>

            <View style={styles.priceCuisineRow}>
              <AppText style={styles.priceText}>
                {item.priceForOne ? `${item.priceForOne} | ` : ''}
                <AppText style={styles.cuisineText}>{item.cuisines}</AppText>
              </AppText>
            </View>
          </View>
        </TouchableOpacity>
      ))}
    </View>
  );
};
