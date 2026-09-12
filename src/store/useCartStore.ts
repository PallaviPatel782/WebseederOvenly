import { create } from 'zustand';
import { ImageSourcePropType } from 'react-native';
import { IMAGES } from '../assets/images';

export interface CartItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  isVeg: boolean;
  image: ImageSourcePropType;
  restaurantId?: string;
  restaurantName?: string;
  quantity: number;
}

export interface CartRestaurant {
  id: string;
  name: string;
  location: string;
  image?: ImageSourcePropType;
  deliveryTime?: string;
}

export interface DeliveryInstructionOption {
  id: string;
  label: string;
  icon: string;
}

export interface CartState {
  items: CartItem[];
  restaurant: CartRestaurant;
  needCutlery: boolean;
  cookingRequest: boolean;
  selectedDeliveryInstructions: string[];
  contactNumber: string;

  // Actions
  addItem: (item: {
    id: string;
    name: string;
    price: number;
    originalPrice?: number;
    isVeg: boolean;
    image: ImageSourcePropType;
    restaurantId?: string;
    restaurantName?: string;
  }, restaurantInfo?: Partial<CartRestaurant>) => void;

  removeItem: (id: string) => void;
  decrementItem: (id: string) => void;
  updateQuantity: (id: string, quantity: number) => void;
  clearCart: () => void;
  toggleNeedCutlery: () => void;
  toggleCookingRequest: () => void;
  toggleDeliveryInstruction: (instructionId: string) => void;
  setContactNumber: (number: string) => void;

  // Calculated values / Getters
  getTotalItems: () => number;
  getCartTotal: () => number;
  getGST: () => number;
  getDiscount: () => number;
  getDeliveryFee: () => number;
  getTotalPayable: () => number;
  getItemQuantity: (id: string) => number;
}

const DEFAULT_RESTAURANT: CartRestaurant = {
  id: 'r1',
  name: 'SHREE SAGAR VEG FAST FOOD',
  location: 'Gandhinagar',
  image: IMAGES.knownSaladDays,
  deliveryTime: '45-50mins',
};

export const useCartStore = create<CartState>((set, get) => ({
  items: [],
  restaurant: DEFAULT_RESTAURANT,
  needCutlery: false,
  cookingRequest: false,
  selectedDeliveryInstructions: ['door'],
  contactNumber: '9123456789',



  addItem: (newItem, restaurantInfo) => {
    set((state) => {
      const existingIndex = state.items.findIndex((i) => i.id === newItem.id);
      let updatedItems: CartItem[];

      if (existingIndex > -1) {
        updatedItems = [...state.items];
        updatedItems[existingIndex] = {
          ...updatedItems[existingIndex],
          quantity: updatedItems[existingIndex].quantity + 1,
        };
      } else {
        updatedItems = [
          ...state.items,
          {
            ...newItem,
            quantity: 1,
          },
        ];
      }

      let updatedRestaurant: CartRestaurant = state.restaurant;
      if (restaurantInfo && restaurantInfo.name) {
        updatedRestaurant = {
          id: restaurantInfo.id || state.restaurant.id || 'r_active',
          name: restaurantInfo.name,
          location: restaurantInfo.location || 'Gandhinagar',
          image: restaurantInfo.image || newItem.image,
          deliveryTime: restaurantInfo.deliveryTime || '35-40mins',
        };
      } else if (newItem.restaurantName) {
        updatedRestaurant = {
          id: 'r_active',
          name: newItem.restaurantName,
          location: 'Gandhinagar',
          image: newItem.image,
          deliveryTime: '35-40mins',
        };
      }

      return {
        items: updatedItems,
        restaurant: updatedRestaurant,
      };
    });
  },


  removeItem: (id) => {
    set((state) => ({
      items: state.items.filter((item) => item.id !== id),
    }));
  },

  decrementItem: (id) => {
    set((state) => {
      const existing = state.items.find((i) => i.id === id);
      if (!existing) return state;

      if (existing.quantity <= 1) {
        return {
          items: state.items.filter((item) => item.id !== id),
        };
      }

      return {
        items: state.items.map((item) =>
          item.id === id ? { ...item, quantity: item.quantity - 1 } : item
        ),
      };
    });
  },

  updateQuantity: (id, quantity) => {
    if (quantity <= 0) {
      get().removeItem(id);
      return;
    }

    set((state) => ({
      items: state.items.map((item) =>
        item.id === id ? { ...item, quantity } : item
      ),
    }));
  },

  clearCart: () => {
    set({ items: [] });
  },

  toggleNeedCutlery: () => {
    set((state) => ({ needCutlery: !state.needCutlery }));
  },

  toggleCookingRequest: () => {
    set((state) => ({ cookingRequest: !state.cookingRequest }));
  },

  toggleDeliveryInstruction: (instructionId) => {
    set((state) => {
      const isSelected = state.selectedDeliveryInstructions.includes(instructionId);
      if (isSelected) {
        return {
          selectedDeliveryInstructions: state.selectedDeliveryInstructions.filter(
            (id) => id !== instructionId
          ),
        };
      } else {
        return {
          selectedDeliveryInstructions: [...state.selectedDeliveryInstructions, instructionId],
        };
      }
    });
  },

  setContactNumber: (number) => {
    set({ contactNumber: number });
  },

  getTotalItems: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.quantity, 0);
  },

  getCartTotal: () => {
    const { items } = get();
    return items.reduce((sum, item) => sum + item.price * item.quantity, 0);
  },

  getGST: () => {
    const total = get().getCartTotal();
    if (total === 0) return 0;
    return Math.round((total * 0.05) * 100) / 100;
  },

  getDiscount: () => {
    const total = get().getCartTotal();
    if (total === 0) return 0;
    // 25% discount up to ₹40
    return Math.min(23.71, Math.round((total * 0.25) * 100) / 100);
  },

  getDeliveryFee: () => {
    const total = get().getCartTotal();
    return total > 0 ? 25.0 : 0;
  },

  getTotalPayable: () => {
    const cartTotal = get().getCartTotal();
    if (cartTotal === 0) return 0;
    const gst = get().getGST();
    const discount = get().getDiscount();
    const delivery = get().getDeliveryFee();
    const total = cartTotal + gst - discount + delivery;
    return Math.max(0, Math.round(total * 100) / 100);
  },

  getItemQuantity: (id) => {
    const item = get().items.find((i) => i.id === id);
    return item ? item.quantity : 0;
  },
}));
