import React from 'react';
import {
  View,
  Modal,
  TouchableOpacity,
  TouchableWithoutFeedback,
  Image,
  ScrollView,
  Platform,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../common/AppText';
import { XIcon, ZapIcon, ChevronRightIcon } from '../common/icons';
import { COLORS } from '../../theme/colors';
import { FoodItem } from '../../constants/homeData';
import { useCartStore } from '../../store/useCartStore';
import { styles } from './FoodShowcaseModal.styles';

interface FoodShowcaseModalProps {
  item: FoodItem | null;
  visible: boolean;
  onClose: () => void;
  onViewMenuPress?: (restaurantName: string) => void;
}

export const FoodShowcaseModal: React.FC<FoodShowcaseModalProps> = ({
  item,
  visible,
  onClose,
  onViewMenuPress,
}) => {
  const insets = useSafeAreaInsets();
  const items = useCartStore((state) => state.items);
  const addItem = useCartStore((state) => state.addItem);
  const decrementItem = useCartStore((state) => state.decrementItem);

  if (!item) return null;

  const getItemQty = (id: string) => {
    const cartItem = items.find((i) => i.id === id);
    return cartItem ? cartItem.quantity : 0;
  };

  const qty = getItemQty(item.id);

  const handleAdd = () => {
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

  const defaultDescription =
    item.description ||
    'Dive into the aromatic symphony of fresh veggies, slow-cooked with fragrant basmati rice in a blend of exotic spices. Choose between subtle or fiery flavors to suit your mood!';

  const bottomInsetPadding = Math.max(insets.bottom, Platform.OS === 'android' ? 28 : 16) + 16;

  return (
    <Modal
      visible={visible}
      transparent
      animationType="slide"
      onRequestClose={onClose}
    >
      <TouchableWithoutFeedback onPress={onClose}>
        <View style={styles.modalOverlay}>
          <TouchableWithoutFeedback>
            <View style={[styles.sheetCard, { paddingBottom: bottomInsetPadding }]}>
              <TouchableOpacity
                style={styles.closeBtnCircle}
                onPress={onClose}
                activeOpacity={0.85}
              >
                <XIcon size={18} color={COLORS.white} strokeWidth={2.5} />
              </TouchableOpacity>

              <ScrollView showsVerticalScrollIndicator={false} contentContainerStyle={{ paddingTop: 12, paddingBottom: 12 }}>
                <View style={styles.imageBox}>
                  <Image
                    source={item.image}
                    style={styles.dishImage}
                    resizeMode="cover"
                  />
                </View>

                <View style={styles.vegRow}>
                  {item.isVeg ? (
                    <View style={styles.vegSquare}>
                      <View style={styles.vegDot} />
                    </View>
                  ) : (
                    <View style={styles.nonVegSquare}>
                      <View style={styles.nonVegDot} />
                    </View>
                  )}
                </View>

                <AppText style={styles.dishTitle}>{item.name}</AppText>
                <AppText style={styles.restaurantSub}>by {item.restaurant}</AppText>

                <View style={styles.metaRow}>
                  <View style={styles.metaLeft}>
                    <ZapIcon size={14} color="#F59E0B" fill="#F59E0B" style={{ marginRight: 4 }} />
                    <AppText style={styles.metaText}>
                      {item.time} • {item.location || '3.54 km'}
                    </AppText>
                  </View>
                  <TouchableOpacity
                    style={styles.viewMenuBtn}
                    onPress={() => {
                      onClose();
                      onViewMenuPress?.(item.restaurant);
                    }}
                    activeOpacity={0.7}
                  >
                    <AppText style={styles.viewMenuText}>View Full Menu </AppText>
                    <ChevronRightIcon size={13} color={COLORS.bannerPink} strokeWidth={2.5} />
                  </TouchableOpacity>
                </View>

                <AppText style={styles.descriptionText}>{defaultDescription}</AppText>
              </ScrollView>

              <View style={styles.bottomRow}>
                <AppText style={styles.priceText}>₹{item.price}</AppText>

                {qty > 0 ? (
                  <View style={styles.qtyPill}>
                    <TouchableOpacity
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      onPress={() => decrementItem(item.id)}
                    >
                      <AppText style={styles.qtyBtnText}>-</AppText>
                    </TouchableOpacity>

                    <AppText style={styles.qtyText}>{qty}</AppText>

                    <TouchableOpacity
                      hitSlop={{ top: 8, bottom: 8, left: 8, right: 8 }}
                      onPress={handleAdd}
                    >
                      <AppText style={styles.qtyBtnText}>+</AppText>
                    </TouchableOpacity>
                  </View>
                ) : (
                  <TouchableOpacity
                    style={styles.addBtn}
                    activeOpacity={0.85}
                    onPress={handleAdd}
                  >
                    <AppText style={styles.addBtnText}>ADD</AppText>
                  </TouchableOpacity>
                )}
              </View>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};
