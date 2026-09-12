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
  location?: string;
  description?: string;
  isVeg: boolean;
  image: ImageSourcePropType;
}


export interface DishItem {
  id: string;
  name: string;
  price: number;
  rating: number;
  ratingCount?: string;
  description?: string;
  badge?: string;
  isVeg: boolean;
  category: string;
  isTopPick?: boolean;
  isLowestPrice?: boolean;
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
  priceNum?: number;
  distance?: string;
  location?: string;
  isVeg?: boolean;
  image: ImageSourcePropType;
}

export const BREAKFAST_UNDER_DATA: FoodItem[] = [
  {
    id: 'b_burrito',
    name: 'Boss Burrito - Veg',
    price: 149,
    rating: 4.2,
    time: '43 mins',
    restaurant: 'Taco Bell',
    location: 'Koramangala',
    description: 'Flavorful Mexican burrito stuffed with seasoned veggies, pinto beans, Mexican rice, and creamy jalapeno sauce wrapped in a warm tortilla.',
    isVeg: true,
    image: IMAGES.knownWendysBurger,
  },
  {
    id: 'b_biryani',
    name: 'Half Veg Dum Biryani.',
    price: 119,
    rating: 4.1,
    time: '41 mins',
    restaurant: 'Dum Safar Biryani',
    location: 'Indiranagar',
    description: 'Slow-cooked aromatic basmati rice cooked with fresh garden veggies and authentic dum biryani spices served with cooling raita.',
    isVeg: true,
    image: IMAGES.mindBiryani,
  },
  {
    id: 'b_taco',
    name: 'Crunchy Taco Supreme - Veg',
    price: 115,
    rating: 4.2,
    time: '43 mins',
    restaurant: 'Taco Bell',
    location: 'Koramangala',
    description: 'Crispy corn taco shell packed with seasoned beans, crisp lettuce, diced tomatoes, real cheddar cheese, and cool sour cream.',
    isVeg: true,
    image: IMAGES.beijingBites,
  },
  {
    id: 'b1',
    name: 'Soseu Gamja pops',
    price: 99,
    rating: 4.1,
    time: '44 mins',
    restaurant: 'Seoul Burgers & Shakes',
    location: 'Koramangala',
    description: 'Crispy Korean style potato bite-sized pops tossed in sweet and tangy Seoul spicy glaze.',
    isVeg: true,
    image: IMAGES.foodSoseuGamja,
  },
  {
    id: 'b2',
    name: 'Chicken Crispy Popcorn',
    price: 99,
    originalPrice: 120,
    rating: 4.3,
    time: '30 mins',
    restaurant: 'KFC Express',
    location: 'Indiranagar',
    description: 'Tender bite-sized chicken pieces breaded in signature crispy herbs and fried to golden perfection.',
    isVeg: false,
    image: IMAGES.foodChickenPopcorn,
  },
  {
    id: 'b3',
    name: 'Masala Dosa & Vada',
    price: 75,
    rating: 4.4,
    time: '25 mins',
    restaurant: 'Udupi Coffee Time',
    location: 'Gandhinagar',
    description: 'Golden crisp dosa stuffed with spiced potato masala served with crispy medu vada, fresh coconut chutney, and piping hot sambar.',
    isVeg: true,
    image: IMAGES.foodMasalaDosa,
  },
  {
    id: 'b4',
    name: 'Chicken Kathi Roll',
    price: 89,
    originalPrice: 110,
    rating: 4.2,
    time: '25 mins',
    restaurant: 'Rolls Mania',
    location: 'Residency Road',
    description: 'Juicy tikka chicken pieces sauteed with onions and bell peppers, layered in a soft flaky paratha with spicy mint chutney.',
    isVeg: false,
    image: IMAGES.foodChickenRoll,
  },
  {
    id: 'b5',
    name: 'Bisi Bele Bath',
    price: 59,
    originalPrice: 79,
    rating: 4.0,
    time: '35 mins',
    restaurant: 'Sri Udupi Grand',
    location: 'Central BLR',
    description: 'Traditional Karnataka hot lentil rice dish cooked with mixed vegetables, tamarind, ghee, and special spicy bisi bele bath powder.',
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
    cuisines: 'American, Healthy Veg',
    priceForOne: '₹300 for one',
    priceNum: 300,
    distance: '5.20 km',
    location: 'Indiranagar',
    isVeg: true,
    image: IMAGES.knownSaladDays,
  },
  {
    id: 'k2',
    name: "Wendy's Burgers",
    badge: 'Lowest Price',
    rating: 4.1,
    ratingCount: '(381)',
    time: '47 mins',
    cuisines: 'American, Chicken Burger',
    priceForOne: '₹250 for one',
    priceNum: 250,
    distance: '2.30 km',
    location: 'Residency Road',
    isVeg: false,
    image: IMAGES.knownWendysBurger,
  },
  {
    id: 'k3',
    name: 'Theobroma',
    rating: 4.3,
    ratingCount: '(200)',
    time: '30 mins',
    cuisines: 'Cake, Bakery, Pure Veg',
    priceForOne: '₹180 for one',
    priceNum: 180,
    distance: '4.30 km',
    location: 'MG Road',
    isVeg: true,
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
    cuisines: 'Chicken Biryani, Hyderabadi',
    priceForOne: '₹250 for one',
    priceNum: 250,
    distance: '6.10 km',
    location: 'Koramangala',
    isVeg: false,
    image: IMAGES.knownBiryaniBlues,
  },
  {
    id: 'g2',
    name: 'Smoke House Deli',
    badge: 'Lowest Price',
    rating: 4.5,
    ratingCount: '(162)',
    time: '32 mins',
    cuisines: 'American, Grilled Chicken',
    priceForOne: '₹380 for one',
    priceNum: 380,
    distance: '8.50 km',
    location: 'Lavelle road SHD',
    isVeg: false,
    image: IMAGES.knownSmokeHouse,
  },
  {
    id: 'g3',
    name: 'SAI PRASAD',
    rating: 3.9,
    ratingCount: '(2.6k+)',
    time: '28 mins',
    cuisines: 'Aloo Paratha, Pure Veg',
    priceForOne: '₹140 for one',
    priceNum: 140,
    distance: '1.80 km',
    location: 'Shanthinagar',
    isVeg: true,
    image: IMAGES.mindNorthIndian,
  },
];

export const HEALTHY_RESTAURANTS_DATA: RestaurantItem[] = [
  {
    id: 'h1',
    name: 'Smoke House Deli',
    badge: 'Lowest Price',
    rating: 4.5,
    ratingCount: '(170)',
    time: '32 mins',
    location: 'Lavelle road SHD',
    distance: '8.50 km',
    cuisines: 'American, Healthy',
    priceForOne: '₹380 for one',
    priceNum: 380,
    isVeg: false,
    image: IMAGES.knownSmokeHouse,
  },
  {
    id: 'h2',
    name: 'Salad Days',
    badge: 'Lowest Price',
    rating: 4.3,
    ratingCount: '(421)',
    time: '41 mins',
    location: 'Banashankari',
    distance: '6.00 km',
    cuisines: 'American, Mediterranean',
    priceForOne: '₹280 for one',
    priceNum: 280,
    isVeg: true,
    image: IMAGES.knownSaladDays,
  },
  {
    id: 'h3',
    name: 'Great Indian Khichdi by Eat...',
    badge: 'Lowest Price',
    rating: 4.1,
    ratingCount: '(408)',
    time: '47 mins',
    location: 'Shanthinagara',
    distance: '10.30 km',
    cuisines: 'Beverage, Dessert',
    priceForOne: '₹190 for one',
    priceNum: 190,
    isVeg: true,
    image: IMAGES.mindNorthIndian,
  },
  {
    id: 'h4',
    name: 'Prezzed Juicery',
    badge: 'Lowest Price',
    rating: 4.3,
    ratingCount: '(172)',
    time: '38 mins',
    location: 'Indiranagar',
    distance: '4.20 km',
    cuisines: 'Juices, Healthy, Cold-pressed',
    priceForOne: '₹150 for one',
    priceNum: 150,
    isVeg: true,
    image: IMAGES.knownSaladDays,
  },
  {
    id: 'h5',
    name: 'Cult Fit Food Bowl',
    badge: 'Lowest Price',
    rating: 4.6,
    ratingCount: '(890)',
    time: '25 mins',
    location: 'Koramangala',
    distance: '3.10 km',
    cuisines: 'Healthy Food, High Protein',
    priceForOne: '₹220 for one',
    priceNum: 220,
    isVeg: true,
    image: IMAGES.beijingBites,
  },
];

export const TOP_BRANDS_RESTAURANTS_DATA: RestaurantItem[] = [
  {
    id: 'tb1',
    name: "Vasudev Adiga's",
    badge: 'Lowest Price',
    rating: 4.9,
    ratingCount: '(2k+)',
    time: '32 mins',
    location: 'MG ROAD',
    distance: '1.50 km',
    cuisines: 'South Indian, Tiffin',
    priceForOne: '₹120 for one',
    priceNum: 120,
    isVeg: true,
    image: IMAGES.mindSouthIndian,
  },
  {
    id: 'tb2',
    name: "Wendy's Burgers",
    badge: 'Lowest Price',
    rating: 4.0,
    ratingCount: '(347)',
    time: '36 mins',
    location: 'Residency Road Relocation',
    distance: '2.30 km',
    cuisines: 'American, Burger',
    priceForOne: '₹250 for one',
    priceNum: 250,
    isVeg: false,
    image: IMAGES.knownWendysBurger,
  },
  {
    id: 'tb3',
    name: 'The Good Bowl',
    badge: 'Lowest Price',
    rating: 4.1,
    ratingCount: '(287)',
    time: '30 mins',
    location: 'Residency Road Relocation',
    distance: '2.30 km',
    cuisines: 'Bowl, Dessert',
    priceForOne: '₹199 for one',
    priceNum: 199,
    isVeg: true,
    image: IMAGES.mindNorthIndian,
  },
  {
    id: 'tb4',
    name: 'Firangi Bake',
    badge: 'Lowest Price',
    rating: 4.1,
    ratingCount: '(94)',
    time: '30 mins',
    location: 'Indiranagar',
    distance: '3.50 km',
    cuisines: 'Italian, Lasagna, Bake',
    priceForOne: '₹290 for one',
    priceNum: 290,
    isVeg: true,
    image: IMAGES.knownSmokeHouse,
  },
  {
    id: 'tb5',
    name: 'KFC Express',
    badge: 'Lowest Price',
    rating: 4.3,
    ratingCount: '(1.8k+)',
    time: '28 mins',
    location: 'Koramangala',
    distance: '2.10 km',
    cuisines: 'Fast Food, Burger, Chicken',
    priceForOne: '₹299 for one',
    priceNum: 299,
    isVeg: false,
    image: IMAGES.foodChickenPopcorn,
  },
];

export const DISCOUNT_RESTAURANTS_DATA: RestaurantItem[] = [
  {
    id: 'd1',
    name: 'Beijing Bites',
    badge: 'Lowest Price',
    rating: 4.2,
    ratingCount: '(781)',
    time: '36 mins',
    location: 'Hayes Road',
    distance: '9.60 km',
    cuisines: 'Chinese, Non-Veg Seafood',
    priceForOne: '₹180 for one',
    priceNum: 180,
    isVeg: false,
    image: IMAGES.beijingBites,
  },
  {
    id: 'd2',
    name: 'Biryani Blues',
    badge: 'Lowest Price',
    rating: 3.8,
    ratingCount: '(997)',
    time: '49 mins',
    location: 'Koramangala',
    distance: '6.10 km',
    cuisines: 'Chicken Biryani, Hyderabadi',
    priceForOne: '₹190 for one',
    priceNum: 190,
    isVeg: false,
    image: IMAGES.knownBiryaniBlues,
  },
  {
    id: 'd3',
    name: 'Theobroma',
    badge: 'Lowest Price',
    rating: 4.3,
    ratingCount: '(200)',
    time: '30 mins',
    location: 'MG Road',
    distance: '4.30 km',
    cuisines: 'Cake, Bakery, Pure Veg',
    priceForOne: '₹150 for one',
    priceNum: 150,
    isVeg: true,
    image: IMAGES.knownTheobromaCake,
  },
  {
    id: 'd4',
    name: 'Oven Story Pizza',
    badge: 'Lowest Price',
    rating: 4.2,
    ratingCount: '(610)',
    time: '35 mins',
    location: 'Richmond Town',
    distance: '3.10 km',
    cuisines: 'Pizza, Fast Food',
    priceForOne: '₹199 for one',
    priceNum: 199,
    isVeg: true,
    image: IMAGES.knownSmokeHouse,
  },
];

export const LOCAL_GEM_RESTAURANTS_DATA: RestaurantItem[] = [
  {
    id: 'lg1',
    name: 'Sri Udupi Grand',
    badge: 'Lowest Price',
    rating: 4.4,
    ratingCount: '(3.2k+)',
    time: '22 mins',
    location: 'Jayanagar',
    distance: '1.20 km',
    cuisines: 'South Indian, Tiffin',
    priceForOne: '₹90 for one',
    priceNum: 90,
    isVeg: true,
    image: IMAGES.foodMasalaDosa,
  },
  {
    id: 'lg2',
    name: 'Rolls Mania',
    badge: 'Lowest Price',
    rating: 4.2,
    ratingCount: '(512)',
    time: '25 mins',
    location: 'HSR Layout',
    distance: '2.80 km',
    cuisines: 'Rolls, Fast Food',
    priceForOne: '₹130 for one',
    priceNum: 130,
    isVeg: false,
    image: IMAGES.foodChickenRoll,
  },
  {
    id: 'lg3',
    name: 'Seoul Burgers & Shakes',
    badge: 'Lowest Price',
    rating: 4.1,
    ratingCount: '(189)',
    time: '44 mins',
    location: 'BTM Layout',
    distance: '4.50 km',
    cuisines: 'Korean, Burgers',
    priceForOne: '₹199 for one',
    priceNum: 199,
    isVeg: true,
    image: IMAGES.foodSoseuGamja,
  },
];

export const ALL_RESTAURANTS_DATA: RestaurantItem[] = [
  ...HEALTHY_RESTAURANTS_DATA,
  ...TOP_BRANDS_RESTAURANTS_DATA.filter((item) => !HEALTHY_RESTAURANTS_DATA.some((h) => h.name === item.name)),
  ...DISCOUNT_RESTAURANTS_DATA.filter(
    (item) =>
      !HEALTHY_RESTAURANTS_DATA.some((h) => h.name === item.name) &&
      !TOP_BRANDS_RESTAURANTS_DATA.some((tb) => tb.name === item.name)
  ),
];

export function filterAndSortRestaurants(
  data: RestaurantItem[],
  isVegOnly: boolean,
  selectedFilter: string,
  sortOption: string = 'relevancy'
): RestaurantItem[] {
  let result = [...data];

  // 1. Veg filter
  if (isVegOnly || selectedFilter === 'veg') {
    result = result.filter((item) => item.isVeg === true);
  }

  // 2. Filter pill selection
  if (selectedFilter === 'rating') {
    result = result.filter((item) => item.rating >= 4.0);
  } else if (selectedFilter === 'lowest') {
    result = result.filter((item) => !!item.badge && item.badge.toLowerCase().includes('lowest'));
  } else if (selectedFilter === 'under200') {
    result = result.filter((item) => {
      const priceNum =
        item.priceNum || (item.priceForOne ? parseInt(item.priceForOne.replace(/[^0-9]/g, ''), 10) : 0);
      return priceNum > 0 && priceNum <= 200;
    });
  }

  // 3. Sorting selection
  if (sortOption === 'rating') {
    result.sort((a, b) => b.rating - a.rating);
  } else if (sortOption === 'distance') {
    const parseDist = (d?: string) => (d ? parseFloat(d.replace(/[^0-9.]/g, '')) : 999);
    result.sort((a, b) => parseDist(a.distance) - parseDist(b.distance));
  } else if (sortOption === 'price_low') {
    const parsePrice = (item: RestaurantItem) =>
      item.priceNum || (item.priceForOne ? parseInt(item.priceForOne.replace(/[^0-9]/g, ''), 10) : 9999);
    result.sort((a, b) => parsePrice(a) - parsePrice(b));
  }

  return result;
}

export const RESTAURANT_DISHES_DATA: DishItem[] = [
  {
    id: 'd1',
    name: 'Plain Dosa',
    price: 49.4,
    rating: 3.8,
    ratingCount: '(154)',
    badge: 'Lowest Price',
    isVeg: true,
    category: 'Breakfast',
    isTopPick: true,
    description: 'A simple and savory South Indian classic, perfect for a light and satisfying meal.',
    image: IMAGES.foodMasalaDosa,
  },
  {
    id: 'd2',
    name: 'Butter Masala Dosa',
    price: 68.4,
    rating: 3.8,
    ratingCount: '(209)',
    badge: 'Lowest Price',
    isVeg: true,
    category: 'Breakfast',
    isTopPick: true,
    description: 'Crispy dosa filled with spiced potato masala and topped with fresh butter.',
    image: IMAGES.foodMasalaDosa,
  },
  {
    id: 'd3',
    name: 'Idli Vada',
    price: 76,
    rating: 4.2,
    ratingCount: '(25)',
    badge: 'Lowest Price',
    isVeg: true,
    category: 'Breakfast',
    isTopPick: false,
    description: 'Soft idlis paired with crispy vadas make this a classic combo for an authentic South Indian breakfast.',
    image: IMAGES.foodIdliVada,
  },
  {
    id: 'd4',
    name: 'Cold Coffee & Shake',
    price: 99,
    rating: 4.5,
    ratingCount: '(89)',
    isVeg: true,
    category: 'Milkshake',
    isTopPick: true,
    description: 'Rich creamy milk shake crafted to perfection with chilled espresso and chocolate.',
    image: IMAGES.foodColdCoffee,
  },
  {
    id: 'd5',
    name: 'Fresh Orange Juice',
    price: 65,
    rating: 4.4,
    ratingCount: '(42)',
    isVeg: true,
    category: 'Juice',
    isTopPick: false,
    description: '100% natural cold pressed fresh orange juice with no added sugar.',
    image: IMAGES.foodOrangeJuice,
  },
  {
    id: 'd6',
    name: 'South Indian Special Thali',
    price: 149,
    rating: 4.6,
    ratingCount: '(312)',
    badge: 'Lowest Price',
    isVeg: true,
    category: 'Meals',
    isTopPick: true,
    description: 'Complete traditional South Indian meal served with steamed rice, sambar, rasam, kootu, and payasam.',
    image: IMAGES.foodSouthIndianThali,
  },
  {
    id: 'd7',
    name: 'Curd Rice Special',
    price: 85,
    rating: 4.3,
    ratingCount: '(110)',
    badge: 'Lowest Price',
    isVeg: true,
    category: 'Rice',
    isTopPick: false,
    description: 'Cooling curd rice tempered with mustard, curry leaves, and green chillies.',
    image: IMAGES.mindSouthIndian,
  },
  {
    id: 'd8',
    name: 'Watermelon Refresh Juice',
    price: 75,
    rating: 4.5,
    ratingCount: '(68)',
    badge: 'Lowest Price',
    isVeg: true,
    category: 'Juice',
    isLowestPrice: true,
    isTopPick: false,
    description: 'Freshly pressed hydating watermelon juice infused with mint leaves.',
    image: IMAGES.foodWatermelonJuice,
  },
  {
    id: 'd9',
    name: 'Mango Passion Shake',
    price: 110,
    rating: 4.7,
    ratingCount: '(142)',
    isVeg: true,
    category: 'Milkshake',
    isTopPick: false,
    description: 'Rich thick mango shake topped with whipped cream and dry fruits.',
    image: IMAGES.foodMangoShake,
  },
];


