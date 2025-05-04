import React, { useState } from 'react';
import axios from 'axios';

interface PredictionFormData {
  bedrooms: number;
  bathrooms: number;
  sqft_living: number;
  sqft_lot: number;
  floors: number;
  waterfront: number;
  view: number;
  condition: number;
  grade: number;
  sqft_above: number;
  sqft_basement: number;
  yr_built: number;
  yr_renovated: number;
  zipcode: number;
  lat: number;
}

const initialFormData: PredictionFormData = {
  bedrooms: 3,
  bathrooms: 2,
  sqft_living: 2000,
  sqft_lot: 5000,
  floors: 1,
  waterfront: 0,
  view: 0,
  condition: 3,
  grade: 7,
  sqft_above: 1500,
  sqft_basement: 500,
  yr_built: 1990,
  yr_renovated: 0,
  zipcode: 98000,
  lat: 47.5
};

const HousePredictionForm: React.FC = () => {
  const [formData, setFormData] = useState<PredictionFormData>(initialFormData);
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: parseFloat(value) || 0
    }));
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      console.log('Sending prediction request with data:', formData);
      const response = await axios.post('http://localhost:8000/predict', formData);
      console.log('Received response:', response.data);
      setPrediction(response.data.predicted_price);
    } catch (err: any) {
      console.error('Prediction error:', err);
      const errorMessage = err.response?.data?.detail || err.message || 'Failed to get prediction. Please try again.';
      setError(`Error: ${errorMessage}`);
    } finally {
      setLoading(false);
    }
  };

  const renderInput = (name: keyof PredictionFormData, label: string, step: number = 1, min?: number, max?: number, tooltip?: string) => (
    <div className="relative">
      <label className="block text-sm font-medium text-gray-700" title={tooltip}>
        {label}
        {tooltip && <span className="ml-1 text-gray-400 text-xs">ⓘ</span>}
      </label>
      <input
        type="number"
        name={name}
        value={formData[name]}
        onChange={handleInputChange}
        step={step}
        min={min}
        max={max}
        className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-indigo-500 focus:ring-indigo-500"
      />
    </div>
  );

  return (
    <div className="max-w-4xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-6">House Price Predictor</h2>
      
      <form onSubmit={handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
          {renderInput('bedrooms', 'Bedrooms', 1, 0, 10, 'Number of bedrooms')}
          {renderInput('bathrooms', 'Bathrooms', 0.5, 0, 10, 'Number of bathrooms')}
          {renderInput('sqft_living', 'Living Area (sq ft)', 1, 0, undefined, 'Total living area in square feet')}
          {renderInput('sqft_lot', 'Lot Size (sq ft)', 1, 0, undefined, 'Total lot size in square feet')}
          {renderInput('floors', 'Floors', 0.5, 1, 4, 'Number of floors')}
          {renderInput('waterfront', 'Waterfront', 1, 0, 1, '0 = No waterfront, 1 = Waterfront property')}
          {renderInput('view', 'View', 1, 0, 4, 'View rating from 0 (none) to 4 (excellent)')}
          {renderInput('condition', 'Condition', 1, 1, 5, 'Property condition from 1 (poor) to 5 (excellent)')}
          {renderInput('grade', 'Grade', 1, 1, 13, 'Building grade from 1 to 13')}
          {renderInput('sqft_above', 'Above Ground sq ft', 1, 0, undefined, 'Square footage above ground')}
          {renderInput('sqft_basement', 'Basement sq ft', 1, 0, undefined, 'Square footage of basement')}
          {renderInput('yr_built', 'Year Built', 1, 1900, new Date().getFullYear(), 'Year the property was built')}
          {renderInput('yr_renovated', 'Year Renovated', 1, 0, new Date().getFullYear(), '0 if never renovated')}
          {renderInput('zipcode', 'Zipcode', 1, undefined, undefined, 'Property zipcode')}
          {renderInput('lat', 'Latitude', 0.000001, 47.0, 48.0, 'Property latitude (around 47.5 for Seattle area)')}
        </div>

        <button
          type="submit"
          disabled={loading}
          className="w-full bg-indigo-600 text-white py-3 px-4 rounded-md hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loading ? 'Calculating Price...' : 'Predict Price'}
        </button>
      </form>

      {prediction !== null && (
        <div className="mt-6 p-4 bg-green-50 rounded-md">
          <h3 className="text-lg font-semibold text-green-800">Predicted Price:</h3>
          <p className="text-3xl font-bold text-green-900">
            ${prediction.toLocaleString(undefined, { 
              minimumFractionDigits: 0,
              maximumFractionDigits: 0,
              style: 'decimal'
            })}
          </p>
          <p className="text-sm text-green-600 mt-2">
            This prediction is based on the provided house features and historical data.
          </p>
        </div>
      )}

      {error && (
        <div className="mt-6 p-4 bg-red-50 rounded-md">
          <p className="text-red-800">{error}</p>
        </div>
      )}
    </div>
  );
};

export default HousePredictionForm; 