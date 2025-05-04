import React, { useState } from 'react';
import { Book, TrendingUp, HelpCircle, Home, Brain } from 'lucide-react';

interface GuideSection {
  id: string;
  title: string;
  icon: React.ReactNode;
  content: React.ReactNode;
}

const EducationPage: React.FC = () => {
  const [activeSection, setActiveSection] = useState<string>('investment');

  const guides: GuideSection[] = [
    {
      id: 'investment',
      title: 'Real Estate Investment Guide',
      icon: <TrendingUp className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Getting Started with Real Estate Investment</h3>
          <p>Real estate investment can be a powerful way to build wealth. Here are key considerations:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Location analysis and market research</li>
            <li>Understanding property valuation methods</li>
            <li>Financing options and mortgage types</li>
            <li>Risk assessment and management</li>
            <li>Long-term vs. short-term investment strategies</li>
          </ul>
          <p className="mt-4">
            Remember to always conduct thorough due diligence before making any investment decisions.
          </p>
        </div>
      )
    },
    {
      id: 'market',
      title: 'Market Analysis',
      icon: <Book className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Understanding the Housing Market</h3>
          <p>Key factors that influence house prices:</p>
          <ul className="list-disc pl-5 space-y-2">
            <li>Economic indicators and interest rates</li>
            <li>Local development and infrastructure</li>
            <li>Population growth and demographics</li>
            <li>Supply and demand dynamics</li>
            <li>Seasonal market trends</li>
          </ul>
          <div className="mt-4 p-4 bg-blue-50 dark:bg-blue-900/30 rounded-lg">
            <p className="font-semibold">Pro Tip:</p>
            <p>Monitor local economic news and development plans to anticipate market changes.</p>
          </div>
        </div>
      )
    },
    {
      id: 'tips',
      title: 'Buying/Selling Tips',
      icon: <Home className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">Essential Tips for Buyers and Sellers</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <h4 className="font-semibold mb-2">For Buyers:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Get pre-approved for a mortgage</li>
                <li>Research the neighborhood thoroughly</li>
                <li>Consider future development plans</li>
                <li>Inspect the property carefully</li>
                <li>Negotiate based on market data</li>
              </ul>
            </div>
            <div>
              <h4 className="font-semibold mb-2">For Sellers:</h4>
              <ul className="list-disc pl-5 space-y-2">
                <li>Price your home competitively</li>
                <li>Enhance curb appeal</li>
                <li>Make essential repairs</li>
                <li>Stage your home effectively</li>
                <li>Time your sale strategically</li>
              </ul>
            </div>
          </div>
        </div>
      )
    },
    {
      id: 'ml',
      title: 'Machine Learning Explained',
      icon: <Brain className="h-6 w-6" />,
      content: (
        <div className="space-y-4">
          <h3 className="text-xl font-semibold">How Our Price Predictor Works</h3>
          <p>
            Our house price prediction model uses Random Forest, a powerful machine learning algorithm
            that combines multiple decision trees to make accurate predictions.
          </p>
          <div className="space-y-2">
            <h4 className="font-semibold">Key Features Used:</h4>
            <ul className="list-disc pl-5 space-y-2">
              <li>Physical characteristics (size, rooms, condition)</li>
              <li>Location data (zipcode, latitude)</li>
              <li>Historical information (year built, renovations)</li>
              <li>Special features (waterfront, view)</li>
            </ul>
          </div>
          <div className="mt-4 p-4 bg-gray-50 dark:bg-gray-800 rounded-lg">
            <h4 className="font-semibold mb-2">Model Accuracy</h4>
            <p>
              Our model achieves 85% accuracy in predicting house prices, with continuous
              improvements through regular training on new data.
            </p>
          </div>
        </div>
      )
    }
  ];

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Educational Resources
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Learn about real estate investment, market analysis, and our prediction technology
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-4 gap-8">
          {/* Navigation Sidebar */}
          <div className="lg:col-span-1">
            <nav className="space-y-2">
              {guides.map((guide) => (
                <button
                  key={guide.id}
                  onClick={() => setActiveSection(guide.id)}
                  className={`w-full flex items-center space-x-3 px-4 py-3 rounded-lg transition-colors duration-200
                    ${activeSection === guide.id
                      ? 'bg-indigo-500 text-white'
                      : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-800'
                    }`}
                >
                  {guide.icon}
                  <span className="text-left">{guide.title}</span>
                </button>
              ))}
            </nav>
          </div>

          {/* Content Area */}
          <div className="lg:col-span-3">
            <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
              {guides.find(g => g.id === activeSection)?.content}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EducationPage; 