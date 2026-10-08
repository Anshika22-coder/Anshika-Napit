export type MenuCategory = 'all' | 'starters' | 'main-course' | 'breads-rice' | 'desserts' | 'beverages';

export interface MenuItem {
  id: string;
  name: string;
  category: 'starters' | 'main-course' | 'breads-rice' | 'desserts' | 'beverages';
  description: string;
  price: number; // in INR (₹)
  image: string;
  isVegetarian: boolean;
  isChefSpecial?: boolean;
  spiceLevel?: 0 | 1 | 2 | 3; // 0=none/mild, 1=mild, 2=medium, 3=spicy
  calories?: string;
  allergens?: string[];
  pairing?: string;
}

export interface CartItem {
  dish: MenuItem;
  quantity: number;
  specialInstructions?: string;
}

export interface ReservationData {
  id: string;
  name: string;
  phone: string;
  email: string;
  date: string;
  time: string;
  guests: number;
  seatingArea: 'main-dining' | 'candlelight-terrace' | 'private-salon' | 'chefs-counter';
  occasion?: string;
  specialRequests?: string;
  createdAt: string;
}

export interface Review {
  id: string;
  author: string;
  rating: number;
  date: string;
  occasion: string;
  comment: string;
  avatar?: string;
  dishRecommended?: string;
  verified: boolean;
}

export interface GalleryItem {
  id: string;
  title: string;
  category: 'dishes' | 'interior' | 'kitchen' | 'moments';
  image: string;
  description: string;
}

export interface RestaurantInfo {
  name: string;
  tagline: string;
  address: string;
  city: string;
  phone: string;
  email: string;
  openingHours: {
    weekdays: string;
    weekends: string;
    kitchenCloses: string;
  };
  socials: {
    instagram: string;
    facebook: string;
    twitter: string;
    tripadvisor: string;
  };
}
