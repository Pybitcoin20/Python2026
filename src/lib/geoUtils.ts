import { Location } from '../types';

/**
 * Smart Proximity Algorithm
 * Filters locations within a given radius and prioritizes high ratings.
 */
export const getNearbyHighRated = (
  userLat: number,
  userLng: number,
  locations: Location[],
  radiusKm: number = 1,
  minRating: number = 4.5
): Location[] => {
  return locations
    .filter(loc => {
      const distance = calculateDistance(userLat, userLng, loc.lat, loc.lng);
      return distance <= radiusKm && loc.rating >= minRating;
    })
    .sort((a, b) => b.rating - a.rating);
};

/**
 * Haversine formula to calculate distance between two points in km
 */
const calculateDistance = (lat1: number, lon1: number, lat2: number, lon2: number): number => {
  const R = 6371; // Earth's radius in km
  const dLat = (lat2 - lat1) * (Math.PI / 180);
  const dLon = (lon2 - lon1) * (Math.PI / 180);
  const a =
    Math.sin(dLat / 2) * Math.sin(dLat / 2) +
    Math.cos(lat1 * (Math.PI / 180)) *
      Math.cos(lat2 * (Math.PI / 180)) *
      Math.sin(dLon / 2) *
      Math.sin(dLon / 2);
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return R * c;
};
