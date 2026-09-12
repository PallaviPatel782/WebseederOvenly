import React from 'react';
import { View, TouchableOpacity, ScrollView, Image } from 'react-native';
import { AppText } from '../common/AppText';
import { PlusIcon, StarIcon, ZapIcon } from '../common/icons';
import { COLORS } from '../../theme/colors';
import { BREAKFAST_UNDER_DATA, FoodItem } from '../../constants/homeData';
import { useCartStore } from '../../store/useCartStore';
import { styles } from './BreakfastUnderSection.styles';

interface BreakfastUnderSectionProps {
  titlePrefix?: string;
  priceTag?: string;
  data?: FoodItem[];
  onSelectFoodItem?: (item: FoodItem) => void;
  onCardPress?: (item: FoodItem) => void;
  onSeeAll?: () => void;
}

export const BreakfastUnderSection: React.FC<BreakfastUnderSectionProps> = ({
  titlePrefix = 'Breakfast',
  priceTag = 'under ₹99',
  data = BREAKFAST_UNDER_DATA,
  onSelectFoodItem,
  onCardPress,
  onSeeAll,
}) => {
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decrementItem = useCartStore((state) => state.decrementItem);

  const getItemQty = (id: string) => {
    const item = items.find((i) => i.id === id);
    return item ? item.quantity : 0;
  };

  const handleAdd = (item: FoodItem) => {
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
        {data.map((item) => {
          const qty = getItemQty(item.id);

          return (
            <TouchableOpacity
              key={item.id}
              style={styles.foodCard}
              activeOpacity={0.88}
              onPress={() => {
                if (onCardPress) {
                  onCardPress(item);
                } else if (onSelectFoodItem) {
                  onSelectFoodItem(item);
                }
              }}
            >
              <View style={styles.foodImgBox}>
                <Image source={item.image} style={styles.foodImage} resizeMode="cover" />

                {qty > 0 ? (
                  <View style={styles.qtyPillBox}>
                    <TouchableOpacity
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      onPress={() => decrementItem(item.id)}
                    >
                      <AppText style={styles.qtyBtnPillText}>-</AppText>
                    </TouchableOpacity>

                    <AppText style={styles.qtyTextPill}>{qty}</AppText>

                    <TouchableOpacity
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      onPress={() => handleAdd(item)}
                    >
                      <AppText style={styles.qtyBtnPillText}>+</AppText>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addBtn}
                    activeOpacity={0.8}
                    onPress={() => handleAdd(item)}
                  >
                    <PlusIcon size={16} color={COLORS.white} strokeWidth={3} />
                  </TouchableOpacity>
                )}
              </View>

              <View style={styles.vegTitleRow}>
                {item.isVeg ? (
                  <View style={styles.vegSquare}>
                    <View style={styles.vegDot} />
                  </View>
                ) : (
                  <View style={styles.nonVegSquare}>
                    <View style={styles.nonVegDot} />
                  </View>
                )}
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
                <View style={{ flexDirection: 'row', alignItems: 'center' }}>
                  <ZapIcon size={11} color="#F59E0B" fill="#F59E0B" style={{ marginRight: 2 }} />
                  <AppText style={styles.timeText}>{item.time}</AppText>
                </View>
              </View>

              {item.restaurant ? (
                <AppText style={styles.restaurantName} numberOfLines={1}>
                  {item.restaurant}
                </AppText>
              ) : null}
            </TouchableOpacity>
          );
        })}
      </ScrollView>
    </View>
  );
};
