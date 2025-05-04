import React from 'react';
import { Link } from 'react-router-dom';
import { Home, TrendingUp, Award, Clock } from 'lucide-react';

const features = [
  {
    icon: Home,
    title: 'Accurate Predictions',
    description: 'Our advanced machine learning model provides highly accurate house price predictions based on real market data.'
  },
  {
    icon: TrendingUp,
    title: 'Market Insights',
    description: 'Get valuable insights into market trends and factors affecting house prices in your area.'
  },
  {
    icon: Award,
    title: 'Trusted Results',
    description: 'Built on extensive real estate data and validated by industry experts for reliable predictions.'
  },
  {
    icon: Clock,
    title: 'Instant Estimates',
    description: 'Get immediate price estimates for any property by entering basic house details.'
  }
];

const HomePage: React.FC = () => {
  return (
    <div className="flex flex-col min-h-screen">
      {/* Hero Section */}
      <section className="relative bg-gradient-to-r from-indigo-600 to-purple-600 text-white py-20">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold leading-tight">
              Predict House Prices with
              <span className="block text-indigo-200">Machine Learning</span>
            </h1>
            <p className="mt-6 text-xl md:text-2xl text-indigo-100 max-w-3xl mx-auto">
              Get accurate house price predictions using our advanced AI model.
              Make informed decisions with data-driven insights.
            </p>
            <div className="mt-10 flex justify-center space-x-4">
              <Link
                to="/predict"
                className="px-8 py-3 bg-white text-indigo-600 rounded-lg font-semibold hover:bg-indigo-50 transition duration-200"
              >
                Try It Now
              </Link>
              <Link
                to="/about"
                className="px-8 py-3 border-2 border-white text-white rounded-lg font-semibold hover:bg-white hover:text-indigo-600 transition duration-200"
              >
                Learn More
              </Link>
            </div>
          </div>
        </div>
        
        {/* Decorative dots */}
        <div className="absolute inset-0 opacity-20">
          <div className="absolute right-0 bottom-0 transform translate-x-1/4 translate-y-1/4">
            <div className="w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          </div>
          <div className="absolute left-0 top-0 transform -translate-x-1/4 -translate-y-1/4">
            <div className="w-64 h-64 bg-white rounded-full filter blur-3xl"></div>
          </div>
        </div>
      </section>

      {/* Features Section */}
      <section className="py-20 bg-gray-50 dark:bg-gray-900">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
              Why Choose Our Price Predictor?
            </h2>
            <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
              Get reliable house price predictions with our advanced features
            </p>
          </div>

          <div className="mt-16 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {features.map((feature, index) => {
              const Icon = feature.icon;
              return (
                <div
                  key={index}
                  className="relative p-6 bg-white dark:bg-gray-800 rounded-lg shadow-md hover:shadow-lg transition-shadow duration-200"
                >
                  <div className="absolute -top-4 left-6">
                    <div className="p-3 bg-indigo-600 rounded-lg">
                      <Icon className="h-6 w-6 text-white" />
                    </div>
                  </div>
                  <h3 className="mt-8 text-xl font-semibold text-gray-900 dark:text-white">
                    {feature.title}
                  </h3>
                  <p className="mt-2 text-gray-600 dark:text-gray-300">
                    {feature.description}
                  </p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 bg-white dark:bg-gray-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white">
            Ready to Get Started?
          </h2>
          <p className="mt-4 text-lg text-gray-600 dark:text-gray-300">
            Try our house price predictor now and get instant estimates
          </p>
          <Link
            to="/predict"
            className="mt-8 inline-block px-8 py-3 bg-indigo-600 text-white rounded-lg font-semibold hover:bg-indigo-700 transition duration-200"
          >
            Make a Prediction
          </Link>
        </div>
      </section>
    </div>
  );
};

export default HomePage; 