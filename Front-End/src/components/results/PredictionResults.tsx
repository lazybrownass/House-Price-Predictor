import React from 'react';
import { PredictionResult } from '../../types';
import ConfidenceIndicator from './ConfidenceIndicator';
import PriceChart from './PriceChart';
import ComparableProperties from './ComparableProperties';

interface PredictionResultsProps {
  result: PredictionResult;
}

const PredictionResults: React.FC<PredictionResultsProps> = ({ result }) => {
  // Format price to currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-md p-6 animate-fadeIn transition-colors duration-300">
      <h2 className="text-2xl font-bold mb-4 text-gray-900 dark:text-white">Your Property Valuation</h2>
      
      <div className="border-b border-gray-200 dark:border-gray-700 pb-4 mb-4">
        <div className="text-center">
          <p className="text-sm text-gray-600 dark:text-gray-400 mb-1">Estimated Value Range</p>
          <div className="flex items-center justify-center">
            <span className="text-lg text-gray-700 dark:text-gray-300">{formatPrice(result.minPrice)}</span>
            <span className="mx-2 text-gray-500 dark:text-gray-400">-</span>
            <span className="text-lg text-gray-700 dark:text-gray-300">{formatPrice(result.maxPrice)}</span>
          </div>
          <p className="text-3xl font-bold text-blue-600 dark:text-blue-400 mt-2">
            {formatPrice((result.minPrice + result.maxPrice) / 2)}
          </p>
          <p className="text-xs text-gray-500 dark:text-gray-400 mt-1">Average Estimated Value</p>
        </div>
      </div>
      
      <div>
        <ConfidenceIndicator score={result.confidenceScore} />
        <PriceChart minPrice={result.minPrice} maxPrice={result.maxPrice} />
      </div>
      
      <ComparableProperties properties={result.comparableProperties} />
    </div>
  );
};

export default PredictionResults;