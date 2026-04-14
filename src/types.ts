export type Category = 'hotel' | 'restaurant' | 'historical_site' | 'plov_center';

export interface Location {
  id: string;
  name: string;
  description: string;
  category: Category;
  region: string;
  address: string;
  lat: number;
  lng: number;
  rating: number;
  reviewCount: number;
  images: string[];
  plovStyle?: string;
  bestPlovTime?: 'morning' | 'lunch' | 'all_day';
}

export interface Review {
  id: string;
  locationId: string;
  userId: string;
  userName: string;
  rating: number;
  comment: string;
  createdAt: string;
}

export interface Booking {
  id: string;
  locationId: string;
  userId: string;
  type: 'hotel' | 'table';
  date: string;
  status: 'pending' | 'confirmed' | 'cancelled';
  guests: number;
}

export interface CulturalTip {
  id: string;
  title: string;
  content: string;
  category: 'dos_and_donts' | 'bargaining' | 'ethics' | 'legal';
}
