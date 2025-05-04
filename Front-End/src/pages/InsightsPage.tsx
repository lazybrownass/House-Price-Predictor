import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';
import { TrendingUp, DollarSign, Home, MapPin } from 'lucide-react';

// Mock data for feature importance
const featureImportance = [
  { feature: 'Square Footage', importance: 0.25 },
  { feature: 'Location', importance: 0.20 },
  { feature: 'Condition', importance: 0.15 },
  { feature: 'Age', importance: 0.12 },
  { feature: 'Bedrooms', importance: 0.10 },
  { feature: 'Bathrooms', importance: 0.08 },
  { feature: 'View', importance: 0.06 },
  { feature: 'Waterfront', importance: 0.04 },
].map(item => ({
  ...item,
  importance: item.importance * 100 // Convert to percentage
}));

const marketInsights = [
  {
    icon: TrendingUp,
    title: 'Price Trends',
    description: 'Average house prices have increased by 8.5% in the last year, with particularly strong growth in urban areas.'
  },
  {
    icon: Home,
    title: 'Property Features',
    description: 'Houses with modern amenities and energy-efficient features command a 15-20% premium in the current market.'
  },
  {
    icon: MapPin,
    title: 'Location Impact',
    description: 'Properties near public transportation and shopping centers show 10-12% higher valuations.'
  },
  {
    icon: DollarSign,
    title: 'Value Drivers',
    description: 'Recent renovations and updated kitchens/bathrooms can increase property values by up to 25%.'
  }
];

const InsightsPage: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Market Insights & Model Analysis
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Understand the factors that influence house prices and how our model makes predictions
          </p>
        </div>

        {/* Feature Importance Chart */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-12">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
            Feature Importance
          </h2>
          <p className="text-gray-600 dark:text-gray-300 mb-8">
            See how different factors influence house prices in our prediction model
          </p>
          <div className="h-96">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart
                data={featureImportance}
                layout="vertical"
                margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis type="number" domain={[0, 100]} />
                <YAxis dataKey="feature" type="category" width={100} />
                <Tooltip
                  formatter={(value) => [`${value.toFixed(1)}%`, 'Importance']}
                />
                <Bar
                  dataKey="importance"
                  fill="#6366f1"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        {/* Market Insights Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-12">
          {marketInsights.map((insight, index) => {
            const Icon = insight.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
              >
                <div className="flex items-center mb-4">
                  <div className="p-3 bg-indigo-100 dark:bg-indigo-900 rounded-lg">
                    <Icon className="h-6 w-6 text-indigo-600 dark:text-indigo-400" />
                  </div>
                  <h3 className="ml-4 text-xl font-semibold text-gray-900 dark:text-white">
                    {insight.title}
                  </h3>
                </div>
                <p className="text-gray-600 dark:text-gray-300">
                  {insight.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Additional Information */}
        <div className="bg-indigo-50 dark:bg-indigo-900/30 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
            Understanding Our Predictions
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              Our machine learning model analyzes multiple features to generate accurate
              price predictions. The feature importance chart above shows the relative
              impact of each factor on the final price prediction.
            </p>
            <p className="mb-4">
              Key insights from our model:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Square footage is consistently the strongest predictor of house prices</li>
              <li>Location factors (including zip code and waterfront status) collectively
                have a significant impact</li>
              <li>Property condition and grade provide important quality signals</li>
              <li>Recent renovations can significantly boost property values</li>
            </ul>
            <p>
              Use these insights to better understand your property's value drivers and
              make informed decisions about property improvements or purchases.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default InsightsPage; 