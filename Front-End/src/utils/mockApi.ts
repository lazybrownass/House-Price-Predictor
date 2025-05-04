import { PropertyDetails, PredictionResult } from '../types';

// Mock data for comparable properties
const MOCK_PROPERTIES = [
  {
    id: '1',
    address: '123 Maple Street, Austin, TX 78701',
    price: 450000,
    size: 1850,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2010,
    distanceFromTarget: 0.5,
    imageUrl: 'https://images.pexels.com/photos/106399/pexels-photo-106399.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    id: '2',
    address: '456 Oak Avenue, Austin, TX 78701',
    price: 520000,
    size: 2100,
    bedrooms: 4,
    bathrooms: 2.5,
    yearBuilt: 2015,
    distanceFromTarget: 0.8,
    imageUrl: 'https://images.pexels.com/photos/1396122/pexels-photo-1396122.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    id: '3',
    address: '789 Pine Boulevard, Austin, TX 78702',
    price: 380000,
    size: 1600,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2005,
    distanceFromTarget: 1.2,
    imageUrl: 'https://images.pexels.com/photos/323780/pexels-photo-323780.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
  {
    id: '4',
    address: '101 Cedar Lane, Austin, TX 78702',
    price: 495000,
    size: 1950,
    bedrooms: 3,
    bathrooms: 2.5,
    yearBuilt: 2012,
    distanceFromTarget: 1.5,
    imageUrl: 'https://images.pexels.com/photos/277667/pexels-photo-277667.jpeg?auto=compress&cs=tinysrgb&h=350'
  },
];

// Simulates an API call to predict house price
export const predictHousePrice = (propertyDetails: PropertyDetails): Promise<PredictionResult> => {
  return new Promise((resolve, reject) => {
    // Simulate API delay
    setTimeout(() => {
      try {
        // Simple mock algorithm to calculate price based on inputs
        const basePrice = 200000;
        const sizeMultiplier = propertyDetails.size * 150;
        const bedroomValue = propertyDetails.bedrooms * 25000;
        const bathroomValue = propertyDetails.bathrooms * 15000;
        
        // Age factor - newer houses are worth more
        const currentYear = new Date().getFullYear();
        const ageDiscount = (currentYear - propertyDetails.yearBuilt) * 1000;
        
        // Property type adjustment
        let propertyTypeMultiplier = 1.0;
        switch(propertyDetails.propertyType) {
          case 'single-family':
            propertyTypeMultiplier = 1.2;
            break;
          case 'condo':
            propertyTypeMultiplier = 0.9;
            break;
          case 'townhouse':
            propertyTypeMultiplier = 1.0;
            break;
          case 'multi-family':
            propertyTypeMultiplier = 1.3;
            break;
          default:
            propertyTypeMultiplier = 1.0;
        }
        
        // Amenities bonus
        const amenitiesBonus = propertyDetails.amenities.length * 10000;
        
        // Calculate predicted price
        const predictedPrice = (basePrice + sizeMultiplier + bedroomValue + bathroomValue - ageDiscount + amenitiesBonus) * propertyTypeMultiplier;
        
        // Add some randomness to create a range
        const minPrice = Math.max(predictedPrice * 0.9, 0);
        const maxPrice = predictedPrice * 1.1;
        
        // Random confidence score between 70-95%
        const confidenceScore = Math.floor(Math.random() * 25) + 70;
        
        // Return the prediction result
        resolve({
          minPrice: Math.round(minPrice),
          maxPrice: Math.round(maxPrice),
          confidenceScore,
          comparableProperties: MOCK_PROPERTIES
        });
      } catch (error) {
        reject(new Error('Failed to predict house price'));
      }
    }, 1500); // 1.5 second delay to simulate API call
  });
};

// Simulate location autocomplete API
export const fetchLocationSuggestions = (query: string): Promise<string[]> => {
  return new Promise((resolve) => {
    setTimeout(() => {
      if (!query || query.length < 2) {
        resolve([]);
        return;
      }
      
      const mockLocations = [
        'Austin, TX 78701',
        'Austin, TX 78702',
        'Austin, TX 78703',
        'Austin, TX 78704',
        'Dallas, TX 75201',
        'Dallas, TX 75202',
        'Houston, TX 77001',
        'Houston, TX 77002',
        'San Antonio, TX 78201',
        'San Antonio, TX 78202',
      ];
      
      const filteredLocations = mockLocations.filter(
        location => location.toLowerCase().includes(query.toLowerCase())
      );
      
      resolve(filteredLocations);
    }, 300); // 300ms delay to simulate API call
  });
};