import { Location, CulturalTip } from '../types';

export const mockLocations: Location[] = [
  {
    id: '1',
    name: 'loc_registan_name',
    description: 'loc_registan_desc',
    category: 'historical_site',
    region: 'Samarkand',
    address: 'Registan St, Samarkand',
    lat: 39.6548,
    lng: 66.9757,
    rating: 4.9,
    reviewCount: 1250,
    images: ['https://picsum.photos/seed/registan/800/600']
  },
  {
    id: '2',
    name: 'loc_plov_center_name',
    description: 'loc_plov_center_desc',
    category: 'plov_center',
    region: 'Tashkent',
    address: '1 Iftikhor St, Tashkent',
    lat: 41.3464,
    lng: 69.2828,
    rating: 4.8,
    reviewCount: 3500,
    images: ['https://picsum.photos/seed/plov/800/600'],
    plovStyle: 'Tashkent Wedding Plov',
    bestPlovTime: 'lunch'
  },
  {
    id: '3',
    name: 'loc_bukhara_name',
    description: 'loc_bukhara_desc',
    category: 'historical_site',
    region: 'Bukhara',
    address: 'Old City, Bukhara',
    lat: 39.7747,
    lng: 64.4131,
    rating: 4.7,
    reviewCount: 850,
    images: ['https://picsum.photos/seed/bukhara/800/600']
  }
];

export const mockTips: CulturalTip[] = [
  {
    id: '1',
    title: 'tip_dress_title',
    content: 'tip_dress_content',
    category: 'dos_and_donts'
  },
  {
    id: '2',
    title: 'tip_bargain_title',
    content: 'tip_bargain_content',
    category: 'bargaining'
  },
  {
    id: '3',
    title: 'tip_drone_title',
    content: 'tip_drone_content',
    category: 'legal'
  }
];
