import React from 'react';
import { ComparableProperty } from '../../types';
import { Home, BedDouble, Bath, Calendar, MapPin } from 'lucide-react';

interface ComparablePropertiesProps {
  properties: ComparableProperty[];
}

const ComparableProperties: React.FC<ComparablePropertiesProps> = ({ properties }) => {
  // Format price to currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="mt-6">
      <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Comparable Properties</h3>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4">
        {properties.map((property) => (
          <div 
            key={property.id} 
            className="bg-white dark:bg-gray-800 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-md transition-all duration-300"
          >
            <div className="relative h-48 overflow-hidden">
              <img 
                src={property.imageUrl} 
                alt={property.address} 
                className="w-full h-full object-cover"
              />
              <div className="absolute top-0 left-0 bg-blue-600 text-white text-sm font-semibold px-2 py-1 rounded-br-md">
                {formatPrice(property.price)}
              </div>
            </div>
            <div className="p-4">
              <div className="flex items-start mb-2">
                <MapPin className="h-4 w-4 text-gray-500 dark:text-gray-400 mt-1 mr-1 flex-shrink-0" />
                <p className="text-sm text-gray-700 dark:text-gray-300 truncate">
                  {property.address}
                </p>
              </div>
              <div className="grid grid-cols-2 gap-2 mt-3">
                <div className="flex items-center">
                  <Home className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">{property.size} sq ft</span>
                </div>
                <div className="flex items-center">
                  <BedDouble className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">{property.bedrooms} beds</span>
                </div>
                <div className="flex items-center">
                  <Bath className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">{property.bathrooms} baths</span>
                </div>
                <div className="flex items-center">
                  <Calendar className="h-4 w-4 text-gray-500 dark:text-gray-400 mr-1" />
                  <span className="text-xs text-gray-700 dark:text-gray-300">Built {property.yearBuilt}</span>
                </div>
              </div>
              <div className="mt-3 pt-3 border-t border-gray-200 dark:border-gray-700">
                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500 dark:text-gray-400">Distance</span>
                  <span className="text-xs font-medium text-gray-700 dark:text-gray-300">
                    {property.distanceFromTarget} miles away
                  </span>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ComparableProperties;