import { ImageSourcePropType } from 'react-native';
import { IMAGES } from '../assets/images';

export interface FoodItem {
  id: string;
  name: string;
  price: number;
  originalPrice?: number;
  rating: number;
  time: string;
  restaurant: string;
  isVeg: boolean;
  image: ImageSourcePropType;
}

export interface MindCategoryItem {
  id: string;
  title: string;
  image: ImageSourcePropType;
}

export interface RestaurantItem {
  id: string;
  name: string;
  badge?: string;
  rating: number;
  ratingCount?: string;
  time: string;
  cuisines: string;
  priceForOne?: string;
  distance?: string;
  location?: string;
  image: ImageSourcePropType;
}

export const BREAKFAST_UNDER_DATA: FoodItem[] = [
  {
    id: 'b1',
    name: 'Soseu Gamja pops',
    price: 99,
    rating: 4.1,
    time: '44 mins',
    restaurant: 'Seoul Burgers & Shakes',
    isVeg: true,
    image: IMAGES.foodSoseuGamja,
  },
  {
    id: 'b2',
    name: 'Masala Dosa',
    price: 75,
    rating: 3.7,
    time: '35 mins',
    restaurant: 'Udupi Coffee Time',
    isVeg: true,
    image: IMAGES.foodMasalaDosa,
  },
  {
    id: 'b3',
    name: 'Bisi Bele Bath',
    price: 59.4,
    originalPrice: 79,
    rating: 3.6,
    time: '35 mins',
    restaurant: 'Sri Udupi Grand',
    isVeg: true,
    image: IMAGES.foodBisiBele,
  },
];

export const WHATS_ON_YOUR_MIND_DATA: MindCategoryItem[] = [
  {
    id: 'm1',
    title: 'North Indian',
    image: IMAGES.mindNorthIndian,
  },
  {
    id: 'm2',
    title: 'South Indian',
    image: IMAGES.mindSouthIndian,
  },
  {
    id: 'm3',
    title: 'Biryani',
    image: IMAGES.mindBiryani,
  },
  {
    id: 'm4',
    title: 'Chinese',
    image: IMAGES.mindChinese,
  },
  {
    id: 'm5',
    title: 'Desserts',
    image: IMAGES.knownTheobromaCake,
  },
];

export const KNOWN_AND_LOVED_DATA: RestaurantItem[] = [
  {
    id: 'k1',
    name: 'Salad Days',
    badge: 'Lowest Price',
    rating: 4.5,
    ratingCount: '(275)',
    time: '36 mins',
    cuisines: 'American, Mediterranean',
    image: IMAGES.knownSaladDays,
  },
  {
    id: 'k2',
    name: "Wendy's Burgers",
    badge: 'Lowest Price',
    rating: 4.1,
    ratingCount: '(381)',
    time: '47 mins',
    cuisines: 'American, Burger',
    image: IMAGES.knownWendysBurger,
  },
  {
    id: 'k3',
    name: 'Theobroma',
    rating: 4.3,
    ratingCount: '(200)',
    time: '30 mins',
    cuisines: 'Cake, American',
    image: IMAGES.knownTheobromaCake,
  },
];

export const GREAT_FOOD_BETTER_PRICES_DATA: RestaurantItem[] = [
  {
    id: 'g1',
    name: 'Biryani Blues',
    badge: 'Lowest Price',
    rating: 3.8,
    ratingCount: '(997)',
    time: '49 mins',
    cuisines: 'Biryani, Hyderabadi',
    image: IMAGES.knownBiryaniBlues,
  },
  {
    id: 'g2',
    name: 'Smoke House Deli',
    badge: 'Lowest Price',
    rating: 4.5,
    ratingCount: '(162)',
    time: '32 mins',
    cuisines: 'American, Healthy',
    image: IMAGES.knownSmokeHouse,
  },
  {
    id: 'g3',
    name: 'SAI PRASAD',
    rating: 3.9,
    ratingCount: '(2.6k+)',
    time: '28 mins',
    cuisines: 'Aloo Paratha, North Indian',
    image: IMAGES.mindNorthIndian,
  },
];

export const ALL_RESTAURANTS_DATA: RestaurantItem[] = [
  {
    id: 'a1',
    name: 'Beijing Bites',
    badge: 'Lowest Price',
    rating: 4.2,
    ratingCount: '(781)',
    time: '36 mins',
    priceForOne: '₹220 for one',
    cuisines: 'Chinese, Seafood',
    distance: '9.60 km',
    location: 'Hayes Road',
    image: IMAGES.beijingBites,
  },
  {
    id: 'a2',
    name: 'Smoke House Deli',
    badge: 'Lowest Price',
    rating: 4.5,
    ratingCount: '(162)',
    time: '32 mins',
    priceForOne: '₹380 for one',
    cuisines: 'American, Healthy',
    distance: '8.50 km',
    location: 'Lavelle road S...',
    image: IMAGES.knownSmokeHouse,
  },
  {
    id: 'a3',
    name: 'Salad Days',
    badge: 'Lowest Price',
    rating: 4.5,
    ratingCount: '(275)',
    time: '36 mins',
    priceForOne: '₹300 for one',
    cuisines: 'American, Mediterranean',
    distance: '5.20 km',
    location: 'Indiranagar',
    image: IMAGES.knownSaladDays,
  },
  {
    id: 'a4',
    name: 'Biryani Blues',
    badge: 'Lowest Price',
    rating: 3.8,
    ratingCount: '(997)',
    time: '49 mins',
    priceForOne: '₹250 for one',
    cuisines: 'Biryani, Hyderabadi',
    distance: '6.10 km',
    location: 'Koramangala',
    image: IMAGES.knownBiryaniBlues,
  },
  {
    id: 'a5',
    name: 'Theobroma',
    rating: 4.3,
    ratingCount: '(200)',
    time: '30 mins',
    priceForOne: '₹180 for one',
    cuisines: 'Cake, Bakery, Desserts',
    distance: '4.30 km',
    location: 'MG Road',
    image: IMAGES.knownTheobromaCake,
  },
];


