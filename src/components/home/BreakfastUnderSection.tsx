import React from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { AppText } from '../common/AppText';
import { PlusIcon, StarIcon } from '../common/icons';
import { COLORS } from '../../theme/colors';
import { BREAKFAST_UNDER_DATA, FoodItem } from '../../constants/homeData';
import { styles } from './BreakfastUnderSection.styles';

interface BreakfastUnderSectionProps {
  titlePrefix?: string;
  priceTag?: string;
  data?: FoodItem[];
  onSelectFoodItem?: (item: FoodItem) => void;
  onSeeAll?: () => void;
}

export const BreakfastUnderSection: React.FC<BreakfastUnderSectionProps> = ({
  titlePrefix = 'Breakfast',
  priceTag = 'under ₹99',
  data = BREAKFAST_UNDER_DATA,
  onSelectFoodItem,
  onSeeAll,
}) => {
  return (
    <View style={styles.container}>
      <View style={styles.header}>
        <View style={styles.titleContainer}>
          <View style={styles.titlePinkRow}>
            <AppText style={styles.titlePink}>{titlePrefix}</AppText>
            <AppText style={styles.titleYellow}>{priceTag}</AppText>
          </View>
        </View>

        <TouchableOpacity style={styles.seeAllPill} activeOpacity={0.8} onPress={onSeeAll}>
          <AppText style={styles.seeAllText}>See All {'>'}</AppText>
        </TouchableOpacity>
      </View>

      <ScrollView
        horizontal
        showsHorizontalScrollIndicator={false}
        contentContainerStyle={styles.foodScroll}
      >
        {data.map((item) => (
          <TouchableOpacity
            key={item.id}
            style={styles.foodCard}
            activeOpacity={0.85}
            onPress={() => onSelectFoodItem?.(item)}
          >
            <View style={styles.foodImgBox}>
              <Image source={item.image} style={styles.foodImage} resizeMode="cover" />
              <TouchableOpacity
                style={styles.addBtn}
                activeOpacity={0.8}
                onPress={() => onSelectFoodItem?.(item)}
              >
                <PlusIcon size={16} color={COLORS.white} strokeWidth={3} />
              </TouchableOpacity>
            </View>

            <View style={styles.vegTitleRow}>
              {item.isVeg ? (
                <View style={styles.vegSquare}>
                  <View style={styles.vegDot} />
                </View>
              ) : null}
              <AppText style={styles.foodTitle} numberOfLines={2}>
                {item.name}
              </AppText>
            </View>

            <View style={styles.priceRow}>
              <View style={styles.priceTag}>
                <AppText style={styles.priceText}>₹{item.price}</AppText>
              </View>
              {item.originalPrice ? (
                <AppText style={styles.strikePrice}>₹{item.originalPrice}</AppText>
              ) : null}
            </View>

            <View style={styles.metaRow}>
              <View style={styles.ratingBadge}>
                <StarIcon size={11} color="#16A34A" />
                <AppText style={styles.ratingText}>{item.rating}</AppText>
              </View>
              <AppText style={styles.timeText}>⚡ {item.time}</AppText>
            </View>

            {item.restaurant ? (
              <AppText style={styles.restaurantName} numberOfLines={1}>
                {item.restaurant}
              </AppText>
            ) : null}
          </TouchableOpacity>
        ))}
      </ScrollView>
    </View>
  );
};
