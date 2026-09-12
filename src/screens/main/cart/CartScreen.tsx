import React, { useState } from 'react';
import {
  View,
  ScrollView,
  TouchableOpacity,
  Image,
  Alert,
  Platform,
  StatusBar,
  TextInput,
} from 'react-native';
import { useSafeAreaInsets } from 'react-native-safe-area-context';
import { ScreenWrapper } from '../../../components/common/ScreenWrapper';
import { AppText } from '../../../components/common/AppText';
import {
  ArrowLeftIcon,
  ContactBookIcon,
  PhoneOffIcon,
  ShieldUserIcon,
  BellOffIcon,
  DoorIcon,
  XIcon,
} from '../../../components/common/icons';


import { useCartStore } from '../../../store/useCartStore';
import { IMAGES } from '../../../assets/images';
import { COLORS } from '../../../theme/colors';
import { styles } from './CartScreen.styles';

export interface CartScreenProps {
  onBack?: () => void;
  onAddMoreItems?: () => void;
  onOrderSuccess?: () => void;
  currentAddress?: string;
}

export const CartScreen: React.FC<CartScreenProps> = ({
  onBack,
  onAddMoreItems,
  onOrderSuccess,
  currentAddress = '1 Abc - Bangalore, Karnataka, India',
}) => {
  const insets = useSafeAreaInsets();
  const topInset = insets.top > 0 ? insets.top : Platform.OS === 'ios' ? 44 : (StatusBar.currentHeight || 24);
  const bottomInset = Math.max(insets.bottom, Platform.OS === 'android' ? 24 : 14);

  const items = useCartStore((state) => state.items);
  const restaurant = useCartStore((state) => state.restaurant);
  const needCutlery = useCartStore((state) => state.needCutlery);
  const cookingRequest = useCartStore((state) => state.cookingRequest);
  const selectedDeliveryInstructions = useCartStore(
    (state) => state.selectedDeliveryInstructions
  );
  const contactNumber = useCartStore((state) => state.contactNumber);
  const setContactNumber = useCartStore((state) => state.setContactNumber);

  const [isEditingReceiver, setIsEditingReceiver] = useState(true);
  const [phoneInput, setPhoneInput] = useState(contactNumber || '9123456789');

  const addItem = useCartStore((state) => state.addItem);
  const decrementItem = useCartStore((state) => state.decrementItem);
  const toggleNeedCutlery = useCartStore((state) => state.toggleNeedCutlery);
  const toggleCookingRequest = useCartStore((state) => state.toggleCookingRequest);
  const toggleDeliveryInstruction = useCartStore(
    (state) => state.toggleDeliveryInstruction
  );
  const clearCart = useCartStore((state) => state.clearCart);

  const getCartTotal = useCartStore((state) => state.getCartTotal);
  const getGST = useCartStore((state) => state.getGST);
  const getDiscount = useCartStore((state) => state.getDiscount);
  const getDeliveryFee = useCartStore((state) => state.getDeliveryFee);
  const getTotalPayable = useCartStore((state) => state.getTotalPayable);
  const getTotalItems = useCartStore((state) => state.getTotalItems);

  const totalItems = getTotalItems();
  const cartTotal = getCartTotal();
  const gst = getGST();
  const discount = getDiscount();
  const deliveryFee = getDeliveryFee();
  const totalPayable = getTotalPayable();

  const handleProceedToPay = () => {
    Alert.alert(
      '🎉 Order Placed!',
      `Thank you for ordering! Total paid: ₹${totalPayable.toFixed(2)}. Your food is on its way!`,
      [
        {
          text: 'Awesome!',
          onPress: () => {
            clearCart();
            onOrderSuccess ? onOrderSuccess() : onBack?.();
          },
        },
      ]
    );
  };

  if (items.length === 0) {
    return (
      <ScreenWrapper backgroundColor={COLORS.white} barStyle="dark-content">
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <ArrowLeftIcon size={24} color={COLORS.textDark} />
          </TouchableOpacity>
          <AppText style={styles.headerTitle}>Cart</AppText>
        </View>
        <View style={styles.emptyContainer}>
          <Image
            source={IMAGES.knownSaladDays}
            style={{ width: 100, height: 100, borderRadius: 50, opacity: 0.8 }}
          />
          <AppText style={styles.emptyTitle}>Your Cart is Empty</AppText>
          <AppText style={styles.emptySub}>
            Looks like you haven't added anything to your cart yet.
          </AppText>
          <TouchableOpacity style={styles.exploreBtn} onPress={onAddMoreItems || onBack}>
            <AppText style={styles.exploreBtnText}>Explore Menu</AppText>
          </TouchableOpacity>
        </View>
      </ScreenWrapper>
    );
  }

  const deliveryInstructionsList = [
    { id: 'avoid_calls', label: 'Avoid calls', IconComponent: PhoneOffIcon },
    { id: 'security', label: 'Leave with security', IconComponent: ShieldUserIcon },
    { id: 'bell', label: "Don't ring the bell", IconComponent: BellOffIcon },
    { id: 'door', label: 'Leave at the door', IconComponent: DoorIcon },
  ];


  return (
    <ScreenWrapper backgroundColor="#F5F5F7" barStyle="dark-content" unsafeBottom>
      <View style={styles.container}>
        {/* Top Header */}
        <View style={styles.header}>
          <TouchableOpacity style={styles.backBtn} onPress={onBack}>
            <ArrowLeftIcon size={24} color={COLORS.textDark} />
          </TouchableOpacity>


        <View style={styles.headerTextContainer}>
          <View style={styles.headerTitleRow}>
            <AppText style={styles.headerTitle}>Home</AppText>
            <AppText style={styles.homeArrow}>▼</AppText>
            <AppText style={styles.headerTime}>
              {restaurant.deliveryTime || '45-50mins'}
            </AppText>
          </View>
          <AppText style={styles.headerSubtitle} numberOfLines={1}>
            {currentAddress}
          </AppText>
        </View>
      </View>

      {/* Top Notification Strip */}
      <View style={styles.topNoticeStrip}>
        <AppText style={styles.topNoticeText}>
          No confusing fees. No hidden charges.
        </AppText>
      </View>

      <ScrollView
        showsVerticalScrollIndicator={false}
        contentContainerStyle={[styles.scrollContent, { paddingBottom: bottomInset + 90 }]}
      >
        {/* Restaurant & Cart Items Card */}
        <View style={styles.card}>
          <View style={styles.restaurantHeader}>
            <Image
              source={restaurant.image || items[0]?.image || IMAGES.knownSaladDays}
              style={styles.restaurantImage}
            />
            <View style={styles.restaurantInfo}>
              <AppText style={styles.restaurantName} numberOfLines={1}>
                {restaurant.name}
              </AppText>
              <AppText style={styles.restaurantMeta}>
                {restaurant.location || 'Gandhinagar'} • {totalItems} {totalItems === 1 ? 'item' : 'items'}
              </AppText>
            </View>
          </View>

          {/* Cart Items List */}
          {items.map((item) => (
            <View key={item.id} style={styles.itemRow}>
              <View style={styles.itemLeft}>
                {item.isVeg ? (
                  <View style={styles.vegSquare}>
                    <View style={styles.vegDot} />
                  </View>
                ) : (
                  <View style={styles.nonVegSquare}>
                    <View style={styles.nonVegDot} />
                  </View>
                )}
                <AppText style={styles.itemName}>{item.name}</AppText>
              </View>

              <View style={styles.itemRight}>
                <View style={styles.qtyPill}>
                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => decrementItem(item.id)}
                  >
                    <AppText style={styles.qtyBtnText}>-</AppText>
                  </TouchableOpacity>

                  <AppText style={styles.qtyText}>{item.quantity}</AppText>

                  <TouchableOpacity
                    style={styles.qtyBtn}
                    onPress={() => addItem(item)}
                  >
                    <AppText style={styles.qtyBtnText}>+</AppText>
                  </TouchableOpacity>
                </View>

                <AppText style={styles.itemPrice}>
                  ₹{(item.price * item.quantity).toFixed(1)}
                </AppText>
              </View>
            </View>
          ))}

          <TouchableOpacity
            style={styles.addMoreBtn}
            onPress={onAddMoreItems || onBack}
            activeOpacity={0.8}
          >
            <AppText style={styles.addMoreText}>+ Add more items</AppText>
          </TouchableOpacity>

          {/* Bill Calculation Box */}
          <View style={styles.billBox}>
            <View style={styles.billRow}>
              <AppText style={styles.billLabel}>Cart Total</AppText>
              <AppText style={styles.billValue}>₹{cartTotal.toFixed(2)}</AppText>
            </View>

            <View style={styles.billRow}>
              <AppText style={styles.billLabel}>GST</AppText>
              <AppText style={styles.billValue}>₹{gst.toFixed(2)}</AppText>
            </View>

            {discount > 0 ? (
              <View style={styles.billRow}>
                <AppText style={styles.billLabel}>Discount</AppText>
                <AppText style={styles.discountValue}>
                  - ₹{discount.toFixed(2)}
                </AppText>
              </View>
            ) : null}

            <View style={styles.billRow}>
              <AppText style={styles.billLabel}>
                Delivery Fees <AppText style={styles.billLabelSub}>(Why this?)</AppText>
              </AppText>
              <AppText style={styles.billValue}>₹{deliveryFee.toFixed(2)}</AppText>
            </View>

            <View style={styles.billRow}>
              <AppText style={styles.billLabel}>Platform fees</AppText>
              <AppText style={styles.billValueFun}>We're not those guys</AppText>
            </View>

            <View style={styles.billRow}>
              <AppText style={styles.billLabel}>Packaging Fees</AppText>
              <AppText style={styles.billValueFun}>Seriously? Nope</AppText>
            </View>

            <View style={styles.dividerDotted} />

            <View style={styles.totalRow}>
              <AppText style={styles.totalLabel}>Total Payable</AppText>
              <AppText style={styles.totalValue}>
                ₹{totalPayable.toFixed(2)}
              </AppText>
            </View>

            {/* Certified Badge */}
            <View style={styles.stampContainer}>
              <View style={styles.stampBadge}>
                <AppText style={styles.stampBadgeText}>✓</AppText>
              </View>
              <View style={styles.stampTextContainer}>
                <AppText style={styles.stampTitle}>CERTIFIED NO NONSENSE</AppText>
                <AppText style={styles.stampDesc}>
                  No surprises. No fine print. Just good food.
                </AppText>
              </View>
            </View>
          </View>
        </View>

        {/* Checkbox Preferences Card */}
        <View style={styles.card}>
          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={toggleNeedCutlery}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.checkbox,
                needCutlery && styles.checkboxChecked,
              ]}
            >
              {needCutlery ? (
                <AppText style={styles.checkmarkText}>✓</AppText>
              ) : null}
            </View>
            <AppText style={styles.checkboxLabel}>Need cutlery</AppText>
          </TouchableOpacity>

          <TouchableOpacity
            style={styles.checkboxRow}
            onPress={toggleCookingRequest}
            activeOpacity={0.8}
          >
            <View
              style={[
                styles.checkbox,
                cookingRequest && styles.checkboxChecked,
              ]}
            >
              {cookingRequest ? (
                <AppText style={styles.checkmarkText}>✓</AppText>
              ) : null}
            </View>
            <AppText style={styles.checkboxLabel}>Cooking request</AppText>
          </TouchableOpacity>
        </View>

        {/* Receiver Details Card */}
        <View style={styles.card}>
          <View style={styles.receiverHeaderRow}>
            <AppText style={styles.receiverTitleText}>Add receiver's details</AppText>
            <TouchableOpacity onPress={() => setIsEditingReceiver(!isEditingReceiver)}>
              <AppText style={styles.editBtnText}>
                Edit {isEditingReceiver ? '∧' : '∨'}
              </AppText>
            </TouchableOpacity>
          </View>

          {isEditingReceiver ? (
            <View style={styles.receiverGreyBox}>
              <View style={styles.receiverInputRow}>
                <AppText style={styles.receiverLabelText}>Hello</AppText>
                <ContactBookIcon size={20} color="#6B7280" />
              </View>


              <View style={styles.numberInputRow}>
                <TextInput
                  style={styles.numberInputText}
                  value={phoneInput}
                  onChangeText={(text) => {
                    setPhoneInput(text);
                    setContactNumber(text);
                  }}
                  keyboardType="phone-pad"
                  placeholder="9123456789"
                  placeholderTextColor="#9CA3AF"
                />
              </View>

              <AppText style={styles.receiverHintText}>
                You will be called on your default number in case this number is not reachable
              </AppText>

              <TouchableOpacity
                style={styles.saveReceiverBtn}
                onPress={() => {
                  setContactNumber(phoneInput);
                  setIsEditingReceiver(false);
                }}
                activeOpacity={0.8}
              >
                <AppText style={styles.saveReceiverBtnText}>Save</AppText>
              </TouchableOpacity>
            </View>
          ) : (
            <View style={{ marginTop: 8 }}>
              <AppText style={{ fontSize: 14, fontWeight: '700', color: COLORS.textDark }}>
                Hello, {contactNumber}
              </AppText>
            </View>
          )}
        </View>

        {/* Delivery Request Pills Card */}
        <View style={styles.card}>
          <View style={styles.deliveryReqHeader}>
            <View
              style={[
                styles.checkbox,
                styles.checkboxChecked,
                { width: 18, height: 18, marginRight: 4 },
              ]}
            >
              <AppText style={[styles.checkmarkText, { fontSize: 10 }]}>✓</AppText>
            </View>
            <AppText style={styles.deliveryReqTitle}>Delivery request</AppText>
          </View>

          <View style={styles.pillsRow}>
            {deliveryInstructionsList.map((item) => {
              const isSelected = selectedDeliveryInstructions.includes(
                item.id
              );
              return (
                <TouchableOpacity
                  key={item.id}
                  style={[
                    styles.instructionPill,
                    isSelected && styles.instructionPillSelected,
                  ]}
                  onPress={() => toggleDeliveryInstruction(item.id)}
                  activeOpacity={0.8}
                >
                  <item.IconComponent
                    size={16}
                    color={isSelected ? COLORS.bannerPink : '#4B5563'}
                    style={{ marginRight: 6 }}
                  />
                  <AppText
                    style={[
                      styles.instructionText,
                      isSelected && styles.instructionTextSelected,
                    ]}
                  >
                    {item.label}
                  </AppText>
                  {isSelected ? (
                    <XIcon size={10} color={COLORS.bannerPink} strokeWidth={2.5} style={{ marginLeft: 4 }} />
                  ) : null}
                </TouchableOpacity>
              );
            })}
          </View>

        </View>

        {/* Brand Mark */}
        <View style={styles.brandWatermark}>
          <AppText style={styles.brandHeartText}>Made with ♥</AppText>
          <AppText style={styles.brandName}>Delivered by Ownly</AppText>
        </View>
      </ScrollView>

      {/* Sticky Bottom Action Button */}
      <View style={[styles.stickyFooter, { paddingBottom: bottomInset }]}>
        <TouchableOpacity
          style={styles.proceedBtn}
          onPress={handleProceedToPay}
          activeOpacity={0.9}
        >
          <AppText style={styles.proceedBtnText}>
            Proceed to Pay • ₹{totalPayable.toFixed(2)}
          </AppText>
        </TouchableOpacity>
      </View>
      </View>
    </ScreenWrapper>
  );
};
