import React from 'react';
import { Link } from 'react-router-dom';
import { Building, Users, Brain, BarChart2, Database, Code } from 'lucide-react';

const features = [
  {
    icon: Brain,
    title: 'Machine Learning Model',
    description: 'Our Random Forest model is trained on extensive real estate data from the Seattle area, capturing complex relationships between house features and prices.'
  },
  {
    icon: Database,
    title: 'Data Quality',
    description: 'The model is trained on a carefully curated dataset of house sales, ensuring accurate and reliable predictions based on real market data.'
  },
  {
    icon: Code,
    title: 'Modern Technology',
    description: 'Built with modern tech stack including FastAPI, React, and SQLAlchemy, providing a fast and responsive user experience.'
  },
  {
    icon: Users,
    title: 'Expert Team',
    description: 'Developed by a team of data scientists and software engineers with extensive experience in real estate analytics.'
  }
];

const teamMembers = [
  {
    name: 'Awab ul Mujtaba',
    role: 'Lead Data Scientist',
    bio: 'Leading the data science initiatives and machine learning model development for accurate house price predictions.'
  },
  {
    name: 'Mauzzam Anwar',
    role: 'Sr Data Scientist',
    bio: 'Specializing in advanced analytics and model optimization for real estate predictions.'
  },
  {
    name: 'Jarar Virk',
    role: 'Senior Software Engineer',
    bio: 'Expert in full-stack development and system architecture, ensuring robust and scalable solutions.'
  },
  {
    name: 'Khuzema Asim',
    role: 'Real Estate Analyst',
    bio: 'Providing deep insights into market trends and property valuations in the Seattle area.'
  },
  {
    name: 'Maarib Sheikh',
    role: 'Software Engineer',
    bio: 'Developing and maintaining core application features and user interfaces.'
  }
];

const AboutPage: React.FC = () => {
  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Hero Section */}
        <div className="text-center mb-16">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            About Our House Price Predictor
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Learn about our advanced machine learning model and the team behind this
            innovative house price prediction tool.
          </p>
        </div>

        {/* Features Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-16">
          {features.map((feature, index) => {
            const Icon = feature.icon;
            return (
              <div
                key={index}
                className="bg-white dark:bg-gray-800 rounded-lg p-6 shadow-lg"
              >
                <div className="flex items-center justify-center h-12 w-12 rounded-md bg-indigo-500 text-white mb-4">
                  <Icon className="h-6 w-6" />
                </div>
                <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                  {feature.title}
                </h3>
                <p className="text-gray-600 dark:text-gray-300">
                  {feature.description}
                </p>
              </div>
            );
          })}
        </div>

        {/* Model Description */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-8 mb-16">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-6">
            Our Prediction Model
          </h2>
          <div className="prose dark:prose-invert max-w-none">
            <p className="mb-4">
              Our house price prediction model uses Random Forest Regression, a powerful
              machine learning algorithm that excels at capturing complex relationships
              in real estate data.
            </p>
            <p className="mb-4">
              The model considers multiple features including:
            </p>
            <ul className="list-disc pl-6 mb-4">
              <li>Physical characteristics (square footage, bedrooms, bathrooms)</li>
              <li>Location factors (zipcode, latitude, waterfront status)</li>
              <li>Property condition and grade</li>
              <li>Historical data (year built, renovations)</li>
            </ul>
            <p>
              By analyzing these features together, our model provides accurate price
              predictions that help you make informed real estate decisions.
            </p>
          </div>
        </div>

        {/* Team Section */}
        <div className="text-center mb-12">
          <h2 className="text-3xl font-bold text-gray-900 dark:text-white mb-4">
            Contact Us
          </h2>
          <p className="text-xl text-gray-600 dark:text-gray-300 max-w-3xl mx-auto">
            Our expert team is dedicated to bringing you accurate house price predictions
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
          {teamMembers.map((member, index) => (
            <div
              key={index}
              className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6"
            >
              <div className="h-20 w-20 rounded-full bg-indigo-100 dark:bg-indigo-900 mx-auto mb-4 flex items-center justify-center">
                <Users className="h-10 w-10 text-indigo-600 dark:text-indigo-400" />
              </div>
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white mb-2">
                {member.name}
              </h3>
              <p className="text-indigo-600 dark:text-indigo-400 mb-2">
                {member.role}
              </p>
              <p className="text-gray-600 dark:text-gray-300">
                {member.bio}
              </p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default AboutPage; 