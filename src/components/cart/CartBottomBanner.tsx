import React, { useState } from 'react';
import { View, TouchableOpacity, Image, Platform, Modal, TouchableWithoutFeedback } from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { AppText } from '../common/AppText';
import { XIcon } from '../common/icons';
import { useCartStore } from '../../store/useCartStore';
import { IMAGES } from '../../assets/images';
import { COLORS } from '../../theme/colors';
import { styles } from './CartBottomBanner.styles';

interface CartBottomBannerProps {
  onCheckoutPress: () => void;
  onViewMenuPress?: () => void;
}

export const CartBottomBanner: React.FC<CartBottomBannerProps> = ({
  onCheckoutPress,
  onViewMenuPress,
}) => {
  const [isClearModalVisible, setIsClearModalVisible] = useState(false);
  const insets = useSafeAreaInsets();
  const items = useCartStore((state) => state.items);
  const restaurant = useCartStore((state) => state.restaurant);
  const clearCart = useCartStore((state) => state.clearCart);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const totalItems = getTotalItems();

  if (totalItems === 0) {
    return null;
  }

  const restaurantName = restaurant?.name || 'SHREE SAGAR VEG FAST FOOD';
  const displayImage = restaurant?.image || items[0]?.image || IMAGES.knownSaladDays;
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 24 : 12);

  const handleConfirmClear = () => {
    setIsClearModalVisible(false);
    clearCart();
  };

  return (
    <>
      <View style={[styles.wrapper, { paddingBottom: bottomInset + 4 }]}>
        {/* Top discount offer tag */}
        <View style={styles.discountBanner}>
          <AppText style={styles.discountText}>
            Get 25% off on this order (upto ₹40)
          </AppText>
        </View>

        {/* Main Cart Banner */}
        <View style={styles.cartContainer}>
          <TouchableOpacity
            style={styles.leftSection}
            activeOpacity={0.8}
            onPress={onViewMenuPress || onCheckoutPress}
          >
            <Image source={displayImage} style={styles.restaurantImage} />
            <View style={styles.textContainer}>
              <AppText style={styles.cartCountText} numberOfLines={1}>
                {totalItems} {totalItems === 1 ? 'Item' : 'Items'} in your cart
              </AppText>
              <AppText style={styles.fromRestaurantText} numberOfLines={1}>
                from <AppText style={styles.fromNameBold}>{restaurantName}</AppText>
              </AppText>
            </View>
          </TouchableOpacity>

          <View style={styles.rightSection}>
            <TouchableOpacity
              style={styles.checkoutBtn}
              activeOpacity={0.85}
              onPress={onCheckoutPress}
            >
              <AppText style={styles.checkoutBtnText}>Checkout</AppText>
            </TouchableOpacity>

            <TouchableOpacity
              style={styles.closeBtn}
              activeOpacity={0.7}
              onPress={() => setIsClearModalVisible(true)}
            >
              <XIcon size={13} color="#475569" strokeWidth={2.5} />
            </TouchableOpacity>
          </View>
        </View>
      </View>

      {/* Clear Cart Confirmation Modal */}
      <Modal
        visible={isClearModalVisible}
        transparent
        animationType="fade"
        onRequestClose={() => setIsClearModalVisible(false)}
      >
        <TouchableWithoutFeedback onPress={() => setIsClearModalVisible(false)}>
          <View style={styles.modalOverlay}>
            <TouchableWithoutFeedback>
              <View style={styles.clearModalCard}>
                <AppText style={styles.clearModalTitle}>Clear cart?</AppText>
                <AppText style={styles.clearModalSub}>
                  This will remove all items from your cart
                </AppText>

                <View style={styles.modalBtnRow}>
                  <TouchableOpacity
                    style={styles.cancelModalBtn}
                    onPress={() => setIsClearModalVisible(false)}
                    activeOpacity={0.8}
                  >
                    <AppText style={styles.cancelModalBtnText}>CANCEL</AppText>
                  </TouchableOpacity>

                  <TouchableOpacity
                    style={styles.clearModalBtn}
                    onPress={handleConfirmClear}
                    activeOpacity={0.85}
                  >
                    <AppText style={styles.clearModalBtnText}>CLEAR</AppText>
                  </TouchableOpacity>
                </View>
              </View>
            </TouchableWithoutFeedback>
          </View>
        </TouchableWithoutFeedback>
      </Modal>
    </>
  );
};
