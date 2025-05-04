export interface PropertyDetails {
  size: number;
  bedrooms: number;
  bathrooms: number;
  location: string;
  yearBuilt: number;
  propertyType: string;
  amenities: string[];
}

export interface PredictionResult {
  minPrice: number;
  maxPrice: number;
  confidenceScore: number;
  comparableProperties: ComparableProperty[];
}

export interface ComparableProperty {
  id: string;
  address: string;
  price: number;
  size: number;
  bedrooms: number;
  bathrooms: number;
  yearBuilt: number;
  distanceFromTarget: number; // in miles
  imageUrl: string;
}

export type FormStatus = 'idle' | 'submitting' | 'success' | 'error';

export interface LayoutContextType {
  isDarkMode: boolean;
  showNotification: (type: 'success' | 'error', message: string) => void;
}