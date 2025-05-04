import React from 'react';
import HousePredictionForm from '../components/prediction/HousePredictionForm';
import { Calculator, AlertCircle } from 'lucide-react';

const PredictionPage: React.FC = () => {
  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex justify-center mb-4">
            <Calculator className="h-12 w-12 text-indigo-600 dark:text-indigo-400" />
          </div>
          <h1 className="text-3xl font-bold text-gray-900 dark:text-white sm:text-4xl">
            House Price Prediction
          </h1>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300 max-w-2xl mx-auto">
            Enter your house details below to get an accurate price prediction using our
            advanced machine learning model.
          </p>
        </div>

        {/* Main Content */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Form Section */}
          <div className="lg:col-span-2">
            <HousePredictionForm />
          </div>

          {/* Tips Section */}
          <div className="space-y-6">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4 flex items-center">
                <AlertCircle className="h-5 w-5 text-indigo-600 dark:text-indigo-400 mr-2" />
                Tips for Accurate Predictions
              </h3>
              <ul className="space-y-3 text-sm text-gray-600 dark:text-gray-300">
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  Enter accurate square footage measurements for best results
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  Use recent renovation dates if applicable
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  Grade and condition ratings should reflect current state
                </li>
                <li className="flex items-start">
                  <span className="font-medium mr-2">•</span>
                  Double-check zipcode for location accuracy
                </li>
              </ul>
            </div>

            <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-6">
              <h3 className="text-lg font-semibold text-indigo-900 dark:text-indigo-200 mb-2">
                Need Help?
              </h3>
              <p className="text-sm text-indigo-700 dark:text-indigo-300 mb-4">
                Check our FAQ section for detailed guidance on each input field and how they
                affect the prediction.
              </p>
              <a
                href="/faq"
                className="text-sm font-medium text-indigo-600 dark:text-indigo-400 hover:text-indigo-500 dark:hover:text-indigo-300"
              >
                View FAQ →
              </a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PredictionPage; 