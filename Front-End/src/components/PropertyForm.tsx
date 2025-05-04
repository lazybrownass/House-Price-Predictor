import React, { useState } from 'react';
import { predict } from '../utils/api';
import { HomeIcon, BedDouble, Bath, Calendar, BuildingIcon, Car, Pool, Star, Building2, Parking, Flame, Fan, Trees, Home } from 'lucide-react';

const PropertyForm: React.FC = () => {
  const currentYear = new Date().getFullYear();
  
  const [formData, setFormData] = useState({
    size: 2000,
    bedrooms: 3,
    bathrooms: 2,
    yearBuilt: 2010,
    hasBasement: false,
    hasGarage: false,
    hasPool: false,
    condition: 3,
    stories: 1,
    parkingSpaces: 1,
    hasFireplace: false,
    hasAirConditioning: false,
    lotSize: 5000,
    rooms: 6,
    hasView: false
  });

  const [prediction, setPrediction] = useState<number | null>(null);
  const [isPredicting, setIsPredicting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value, type } = e.target as HTMLInputElement;
    
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? (e.target as HTMLInputElement).checked : 
              type === 'number' ? Number(value) : 
              value
    }));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsPredicting(true);
    setError(null);
    
    try {
      // Convert form data to feature array in the exact order expected by the model
      const features = [
        formData.size,
        formData.bedrooms,
        formData.bathrooms,
        formData.yearBuilt,
        formData.hasBasement ? 1 : 0,
        formData.hasGarage ? 1 : 0,
        formData.hasPool ? 1 : 0,
        formData.condition,
        formData.stories,
        formData.parkingSpaces,
        formData.hasFireplace ? 1 : 0,
        formData.hasAirConditioning ? 1 : 0,
        formData.lotSize,
        formData.rooms,
        formData.hasView ? 1 : 0
      ];

      const result = await predict({ features });
      setPrediction(result.prediction);
    } catch (error) {
      console.error('Prediction error:', error);
      setError('Failed to get prediction. Please try again.');
    } finally {
      setIsPredicting(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md">
      <h2 className="text-2xl font-bold mb-6 text-gray-900 dark:text-white">House Price Prediction</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {/* Basic Information */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Size (sq ft)
              </label>
              <div className="mt-1 relative">
                <HomeIcon className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="size"
                  value={formData.size}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bedrooms
              </label>
              <div className="mt-1 relative">
                <BedDouble className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="bedrooms"
                  value={formData.bedrooms}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Bathrooms
              </label>
              <div className="mt-1 relative">
                <Bath className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="bathrooms"
                  value={formData.bathrooms}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                  step="0.5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Year Built
              </label>
              <div className="mt-1 relative">
                <Calendar className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="yearBuilt"
                  value={formData.yearBuilt}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="1800"
                  max={currentYear}
                />
              </div>
            </div>
          </div>

          {/* Additional Features */}
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Condition (1-5)
              </label>
              <div className="mt-1 relative">
                <Star className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="condition"
                  value={formData.condition}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="1"
                  max="5"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Stories
              </label>
              <div className="mt-1 relative">
                <Building2 className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="stories"
                  value={formData.stories}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="1"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Parking Spaces
              </label>
              <div className="mt-1 relative">
                <Parking className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="parkingSpaces"
                  value={formData.parkingSpaces}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Lot Size (sq ft)
              </label>
              <div className="mt-1 relative">
                <Trees className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="lotSize"
                  value={formData.lotSize}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Total Rooms
              </label>
              <div className="mt-1 relative">
                <Home className="absolute left-3 top-1/2 transform -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="number"
                  name="rooms"
                  value={formData.rooms}
                  onChange={handleChange}
                  className="pl-10 block w-full rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500"
                  min="0"
                />
              </div>
            </div>
          </div>
        </div>

        {/* Checkboxes for boolean features */}
        <div className="grid grid-cols-2 md:grid-cols-3 gap-4 mt-6">
          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasBasement"
              checked={formData.hasBasement}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Basement</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasGarage"
              checked={formData.hasGarage}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Garage</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasPool"
              checked={formData.hasPool}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Pool</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasFireplace"
              checked={formData.hasFireplace}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Fireplace</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasAirConditioning"
              checked={formData.hasAirConditioning}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">Air Conditioning</span>
          </label>

          <label className="flex items-center space-x-2">
            <input
              type="checkbox"
              name="hasView"
              checked={formData.hasView}
              onChange={handleChange}
              className="rounded border-gray-300 text-blue-600 shadow-sm focus:border-blue-300 focus:ring focus:ring-blue-200 focus:ring-opacity-50"
            />
            <span className="text-sm text-gray-700 dark:text-gray-300">View</span>
          </label>
        </div>

        {/* Submit Button and Prediction Result */}
        <div className="mt-6 space-y-4">
          <button
            type="submit"
            disabled={isPredicting}
            className="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500 disabled:opacity-50"
          >
            {isPredicting ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Predicting...
              </>
            ) : (
              'Get Price Prediction'
            )}
          </button>

          {error && (
            <div className="p-4 rounded-md bg-red-50 border border-red-200">
              <p className="text-sm text-red-600">{error}</p>
            </div>
          )}

          {prediction !== null && !error && (
            <div className="p-4 rounded-md bg-green-50 border border-green-200">
              <p className="text-lg font-semibold text-green-800">
                Predicted Price: ${prediction.toLocaleString()}
              </p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default PropertyForm;