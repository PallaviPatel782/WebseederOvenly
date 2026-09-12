import { StyleSheet, Platform } from 'react-native';
import { COLORS } from '../../../theme/colors';

export const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F7',
  },
  header: {
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingVertical: 12,
    flexDirection: 'row',
    alignItems: 'center',
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  backBtn: {
    padding: 6,
    marginRight: 10,
  },
  headerTextContainer: {
    flex: 1,
  },
  headerTitleRow: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  headerTitle: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  homeArrow: {
    fontSize: 12,
    color: COLORS.bannerPink,
    marginLeft: 4,
    marginRight: 8,
  },
  headerTime: {
    fontSize: 13,
    color: '#6B7280',
    fontWeight: '500',
  },
  headerSubtitle: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },
  topNoticeStrip: {
    backgroundColor: COLORS.bannerPink,
    paddingVertical: 10,
    paddingHorizontal: 16,
    alignItems: 'center',
    justifyContent: 'center',
    borderBottomLeftRadius: 16,
    borderBottomRightRadius: 16,
  },
  topNoticeText: {
    color: COLORS.white,
    fontSize: 14,
    fontWeight: '700',
    textAlign: 'center',
  },
  scrollContent: {
    paddingHorizontal: 16,
    paddingTop: 16,
    paddingBottom: 120,
  },

  // Main Card Wrapper
  card: {
    backgroundColor: COLORS.white,
    borderRadius: 20,
    padding: 16,
    marginBottom: 16,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.05,
    shadowRadius: 8,
    elevation: 3,
  },

  // Restaurant Section
  restaurantHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 16,
    paddingBottom: 12,
    borderBottomWidth: 1,
    borderBottomColor: '#F3F4F6',
  },
  restaurantImage: {
    width: 44,
    height: 44,
    borderRadius: 22,
    marginRight: 12,
  },
  restaurantInfo: {
    flex: 1,
  },
  restaurantName: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
    letterSpacing: -0.2,
  },
  restaurantMeta: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 2,
  },

  // Cart Item Row
  itemRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 12,
  },
  itemLeft: {
    flexDirection: 'row',
    alignItems: 'center',
    flex: 1,
  },
  vegSquare: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderColor: '#16A34A',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 3,
  },
  vegDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#16A34A',
  },
  nonVegSquare: {
    width: 16,
    height: 16,
    borderWidth: 1.5,
    borderColor: '#DC2626',
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
    borderRadius: 3,
  },
  nonVegDot: {
    width: 7,
    height: 7,
    borderRadius: 3.5,
    backgroundColor: '#DC2626',
  },
  itemName: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    flex: 1,
  },
  itemRight: {
    flexDirection: 'row',
    alignItems: 'center',
  },

  // Quantity Selector Pill
  qtyPill: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    borderRadius: 20,
    borderWidth: 1,
    borderColor: '#FCE7F3',
    paddingHorizontal: 6,
    paddingVertical: 4,
    marginRight: 16,
  },
  qtyBtn: {
    width: 24,
    height: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  qtyBtnText: {
    fontSize: 16,
    fontWeight: '700',
    color: COLORS.bannerPink,
  },
  qtyText: {
    fontSize: 14,
    fontWeight: '800',
    color: COLORS.textDark,
    marginHorizontal: 8,
  },
  itemPrice: {
    fontSize: 15,
    fontWeight: '800',
    color: COLORS.textDark,
  },

  // Add More Items
  addMoreBtn: {
    alignSelf: 'flex-start',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 20,
    paddingHorizontal: 16,
    paddingVertical: 8,
    marginTop: 12,
    marginBottom: 8,
  },
  addMoreText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
  },

  // Bill Container
  billBox: {
    backgroundColor: '#FAF9FB',
    borderRadius: 16,
    padding: 16,
    marginTop: 8,
  },
  billRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginVertical: 6,
  },
  billLabel: {
    fontSize: 13,
    color: '#4B5563',
    fontWeight: '500',
  },
  billLabelSub: {
    fontSize: 12,
    color: COLORS.bannerPink,
    fontWeight: '600',
  },
  billValue: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  discountValue: {
    fontSize: 13,
    fontWeight: '700',
    color: '#16A34A',
  },
  billValueFun: {
    fontSize: 12,
    color: '#6B7280',
    fontWeight: '500',
    fontStyle: 'italic',
  },
  dividerDotted: {
    borderStyle: 'dashed',
    borderWidth: 0.8,
    borderColor: '#E5E7EB',
    marginVertical: 12,
  },
  totalRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginTop: 4,
  },
  totalLabel: {
    fontSize: 16,
    fontWeight: '800',
    color: COLORS.textDark,
  },
  totalValue: {
    fontSize: 17,
    fontWeight: '900',
    color: COLORS.textDark,
  },

  // Stamp Badge
  stampContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF0F5',
    borderRadius: 14,
    padding: 12,
    marginTop: 16,
    borderWidth: 1,
    borderColor: '#FBCFE8',
  },
  stampBadge: {
    width: 44,
    height: 44,
    borderRadius: 22,
    backgroundColor: COLORS.bannerPink,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 12,
  },
  stampBadgeText: {
    color: COLORS.white,
    fontSize: 20,
    fontWeight: '900',
  },
  stampTextContainer: {
    flex: 1,
  },
  stampTitle: {
    fontSize: 11,
    fontWeight: '900',
    color: COLORS.bannerPink,
    letterSpacing: 0.5,
  },
  stampDesc: {
    fontSize: 12,
    color: '#4B5563',
    fontWeight: '600',
    marginTop: 2,
  },

  // Checkbox Section
  checkboxRow: {
    flexDirection: 'row',
    alignItems: 'center',
    marginVertical: 8,
  },
  checkbox: {
    width: 20,
    height: 20,
    borderWidth: 1.5,
    borderColor: '#D1D5DB',
    borderRadius: 4,
    alignItems: 'center',
    justifyContent: 'center',
    marginRight: 10,
  },
  checkboxChecked: {
    backgroundColor: COLORS.bannerPink,
    borderColor: COLORS.bannerPink,
  },
  checkmarkText: {
    color: COLORS.white,
    fontSize: 12,
    fontWeight: '900',
  },
  checkboxLabel: {
    fontSize: 14,
    fontWeight: '600',
    color: COLORS.textDark,
  },

  // Contact / Receiver Details Section
  receiverHeaderRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingVertical: 4,
  },
  receiverTitleText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
  },
  editBtnText: {
    fontSize: 13,
    fontWeight: '700',
    color: COLORS.bannerPink,
  },
  receiverGreyBox: {
    backgroundColor: '#F9FAFB',
    borderRadius: 16,
    padding: 16,
    marginTop: 12,
    borderWidth: 1,
    borderColor: '#F3F4F6',
  },
  receiverInputRow: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 8,
    marginBottom: 12,
  },
  receiverLabelText: {
    fontSize: 14,
    color: '#374151',
    fontWeight: '500',
  },
  contactBookIcon: {
    fontSize: 16,
    color: '#6B7280',
  },
  numberInputRow: {
    borderBottomWidth: 1,
    borderBottomColor: '#E5E7EB',
    paddingBottom: 8,
    marginBottom: 8,
  },
  numberInputText: {
    fontSize: 15,
    fontWeight: '700',
    color: COLORS.textDark,
    padding: 0,
  },
  receiverHintText: {
    fontSize: 12,
    color: '#6B7280',
    marginTop: 4,
    lineHeight: 16,
  },
  saveReceiverBtn: {
    backgroundColor: COLORS.white,
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 22,
    paddingVertical: 10,
    alignItems: 'center',
    justifyContent: 'center',
    marginTop: 14,
    shadowColor: '#000',
    shadowOffset: { width: 0, height: 1 },
    shadowOpacity: 0.05,
    shadowRadius: 2,
    elevation: 1,
  },
  saveReceiverBtnText: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.bannerPink,
  },


  // Delivery Requests
  deliveryReqHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 12,
  },
  deliveryReqTitle: {
    fontSize: 14,
    fontWeight: '700',
    color: COLORS.textDark,
    marginLeft: 8,
  },
  pillsRow: {
    flexDirection: 'row',
    flexWrap: 'wrap',
    gap: 8,
  },
  instructionPill: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: '#E5E7EB',
    borderRadius: 12,
    paddingHorizontal: 12,
    paddingVertical: 8,
    backgroundColor: COLORS.white,
  },
  instructionPillSelected: {
    backgroundColor: '#FFF0F5',
    borderColor: COLORS.bannerPink,
  },
  instructionIcon: {
    fontSize: 14,
    marginRight: 6,
  },
  instructionText: {
    fontSize: 13,
    fontWeight: '600',
    color: COLORS.textDark,
  },
  instructionTextSelected: {
    color: COLORS.bannerPink,
    fontWeight: '700',
  },
  pillCloseText: {
    fontSize: 12,
    color: COLORS.bannerPink,
    fontWeight: '900',
    marginLeft: 6,
  },

  // Brand Watermark
  brandWatermark: {
    alignItems: 'center',
    marginVertical: 24,
  },
  brandHeartText: {
    fontSize: 13,
    color: '#9CA3AF',
    fontWeight: '500',
  },
  brandName: {
    fontSize: 18,
    fontWeight: '900',
    color: '#374151',
    marginTop: 4,
  },

  // Bottom Sticky Container
  stickyFooter: {
    position: 'absolute',
    bottom: 0,
    left: 0,
    right: 0,
    backgroundColor: COLORS.white,
    paddingHorizontal: 16,
    paddingTop: 12,
    paddingBottom: Platform.OS === 'ios' ? 24 : 14,
    borderTopWidth: 1,
    borderTopColor: '#F3F4F6',
    shadowColor: '#000',
    shadowOffset: { width: 0, height: -4 },
    shadowOpacity: 0.1,
    shadowRadius: 8,
    elevation: 8,
  },
  proceedBtn: {
    backgroundColor: COLORS.bannerPink,
    borderRadius: 25,
    paddingVertical: 14,
    alignItems: 'center',
    justifyContent: 'center',
    shadowColor: COLORS.bannerPink,
    shadowOffset: { width: 0, height: 4 },
    shadowOpacity: 0.35,
    shadowRadius: 8,
    elevation: 6,
  },
  proceedBtnText: {
    color: COLORS.white,
    fontSize: 16,
    fontWeight: '800',
    letterSpacing: 0.2,
  },
  emptyContainer: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    padding: 32,
  },
  emptyTitle: {
    fontSize: 20,
    fontWeight: '800',
    color: COLORS.textDark,
    marginTop: 16,
  },
  emptySub: {
    fontSize: 14,
    color: '#6B7280',
    textAlign: 'center',
    marginTop: 8,
    marginBottom: 24,
  },
  exploreBtn: {
    backgroundColor: COLORS.bannerPink,
    paddingHorizontal: 24,
    paddingVertical: 12,
    borderRadius: 24,
  },
  exploreBtnText: {
    color: COLORS.white,
    fontSize: 15,
    fontWeight: '700',
  },
});
