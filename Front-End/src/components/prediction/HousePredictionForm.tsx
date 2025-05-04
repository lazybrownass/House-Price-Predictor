import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useFormik } from 'formik';
import * as Yup from 'yup';
import { Loader2 } from 'lucide-react';
import { useTheme } from '../../contexts/ThemeContext';
import FormField from './FormField';
import { useNavigate } from 'react-router-dom';

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

const validationSchema = Yup.object({
  bedrooms: Yup.number()
    .min(0, 'Must be at least 0')
    .max(10, 'Must be less than 10')
    .required('Required'),
  bathrooms: Yup.number()
    .min(0, 'Must be at least 0')
    .max(10, 'Must be less than 10')
    .required('Required'),
  sqft_living: Yup.number()
    .min(200, 'Must be at least 200 sqft')
    .max(15000, 'Must be less than 15000 sqft')
    .required('Required'),
  sqft_lot: Yup.number()
    .min(200, 'Must be at least 200 sqft')
    .required('Required'),
  floors: Yup.number()
    .min(1, 'Must be at least 1')
    .max(4, 'Must be less than 4')
    .required('Required'),
  waterfront: Yup.number()
    .oneOf([0, 1], 'Must be 0 or 1')
    .required('Required'),
  view: Yup.number()
    .min(0, 'Must be between 0 and 4')
    .max(4, 'Must be between 0 and 4')
    .required('Required'),
  condition: Yup.number()
    .min(1, 'Must be between 1 and 5')
    .max(5, 'Must be between 1 and 5')
    .required('Required'),
  grade: Yup.number()
    .min(1, 'Must be between 1 and 13')
    .max(13, 'Must be between 1 and 13')
    .required('Required'),
  sqft_above: Yup.number()
    .min(200, 'Must be at least 200 sqft')
    .required('Required'),
  sqft_basement: Yup.number()
    .min(0, 'Must be at least 0')
    .required('Required'),
  yr_built: Yup.number()
    .min(1800, 'Must be after 1800')
    .max(new Date().getFullYear(), 'Cannot be in the future')
    .required('Required'),
  yr_renovated: Yup.number()
    .min(0, 'Must be 0 if never renovated')
    .max(new Date().getFullYear(), 'Cannot be in the future')
    .required('Required'),
  zipcode: Yup.number()
    .min(10000, 'Must be a valid 5-digit zipcode')
    .max(99999, 'Must be a valid 5-digit zipcode')
    .required('Required'),
  lat: Yup.number()
    .min(47.0, 'Must be in valid range')
    .max(48.0, 'Must be in valid range')
    .required('Required'),
});

const initialValues: PredictionFormData = {
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
  lat: 47.5,
};

const HousePredictionForm: React.FC = () => {
  const [prediction, setPrediction] = useState<number | null>(null);
  const [error, setError] = useState<string | null>(null);
  const { theme } = useTheme();
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      navigate('/login');
    }
  }, [navigate]);

  const formik = useFormik({
    initialValues,
    validationSchema,
    onSubmit: async (values, { setSubmitting }) => {
      try {
        setError(null);
        const token = localStorage.getItem('token');
        const response = await axios.post('http://localhost:8000/predict', values, {
          headers: {
            'Authorization': `Bearer ${token}`
          }
        });
        setPrediction(response.data.predicted_price);
      } catch (err: any) {
        console.error('Prediction error:', err);
        setError(err.response?.data?.detail || 'Failed to get prediction. Please try again.');
      } finally {
        setSubmitting(false);
      }
    },
  });

  return (
    <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
      <form onSubmit={formik.handleSubmit} className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          <FormField
            label="Bedrooms"
            name="bedrooms"
            type="number"
            step="1"
            formik={formik}
            tooltip="Number of bedrooms in the house"
          />
          
          <FormField
            label="Bathrooms"
            name="bathrooms"
            type="number"
            step="0.5"
            formik={formik}
            tooltip="Number of bathrooms (0.5 for half bath)"
          />

          <FormField
            label="Living Area (sq ft)"
            name="sqft_living"
            type="number"
            step="1"
            formik={formik}
            tooltip="Total living area in square feet"
          />

          <FormField
            label="Lot Size (sq ft)"
            name="sqft_lot"
            type="number"
            step="1"
            formik={formik}
            tooltip="Total lot size in square feet"
          />

          <FormField
            label="Floors"
            name="floors"
            type="number"
            step="0.5"
            formik={formik}
            tooltip="Number of floors (0.5 for half floors)"
          />

          <FormField
            label="Waterfront"
            name="waterfront"
            type="number"
            step="1"
            min="0"
            max="1"
            formik={formik}
            tooltip="0 = No waterfront, 1 = Waterfront property"
          />

          <FormField
            label="View"
            name="view"
            type="number"
            step="1"
            min="0"
            max="4"
            formik={formik}
            tooltip="View rating from 0 (none) to 4 (excellent)"
          />

          <FormField
            label="Condition"
            name="condition"
            type="number"
            step="1"
            min="1"
            max="5"
            formik={formik}
            tooltip="House condition from 1 (poor) to 5 (excellent)"
          />

          <FormField
            label="Grade"
            name="grade"
            type="number"
            step="1"
            min="1"
            max="13"
            formik={formik}
            tooltip="Building grade from 1 to 13"
          />

          <FormField
            label="Above Ground (sq ft)"
            name="sqft_above"
            type="number"
            step="1"
            formik={formik}
            tooltip="Square footage of house above ground"
          />

          <FormField
            label="Basement (sq ft)"
            name="sqft_basement"
            type="number"
            step="1"
            formik={formik}
            tooltip="Square footage of basement"
          />

          <FormField
            label="Year Built"
            name="yr_built"
            type="number"
            step="1"
            formik={formik}
            tooltip="Year the house was built"
          />

          <FormField
            label="Year Renovated"
            name="yr_renovated"
            type="number"
            step="1"
            formik={formik}
            tooltip="Year of last renovation (0 if never renovated)"
          />

          <FormField
            label="Zipcode"
            name="zipcode"
            type="number"
            step="1"
            formik={formik}
            tooltip="Property zipcode"
          />

          <FormField
            label="Latitude"
            name="lat"
            type="number"
            step="0.000001"
            formik={formik}
            tooltip="Property latitude (around 47.5 for Seattle area)"
          />
        </div>

        <div className="flex flex-col items-center space-y-4">
          <button
            type="submit"
            disabled={formik.isSubmitting || !formik.isValid}
            className={`w-full max-w-md px-6 py-3 text-white font-semibold rounded-lg shadow-md
              ${formik.isSubmitting || !formik.isValid
                ? 'bg-gray-400 cursor-not-allowed'
                : 'bg-indigo-600 hover:bg-indigo-700'} 
              transition-colors duration-200`}
          >
            {formik.isSubmitting ? (
              <span className="flex items-center justify-center">
                <Loader2 className="w-5 h-5 animate-spin mr-2" />
                Calculating...
              </span>
            ) : (
              'Predict Price'
            )}
          </button>

          {prediction !== null && (
            <div className="w-full max-w-md p-4 bg-green-50 dark:bg-green-900/30 rounded-lg">
              <h3 className="text-lg font-semibold text-green-800 dark:text-green-200">
                Predicted Price:
              </h3>
              <p className="text-2xl font-bold text-green-900 dark:text-green-100">
                ${prediction.toLocaleString(undefined, { 
                  minimumFractionDigits: 0,
                  maximumFractionDigits: 0 
                })}
              </p>
            </div>
          )}

          {error && (
            <div className="w-full max-w-md p-4 bg-red-50 dark:bg-red-900/30 rounded-lg">
              <p className="text-red-800 dark:text-red-200">{error}</p>
            </div>
          )}
        </div>
      </form>
    </div>
  );
};

export default HousePredictionForm; 