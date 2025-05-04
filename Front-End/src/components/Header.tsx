import React from 'react';
import { Home } from 'lucide-react';

const Header: React.FC = () => {
  return (
    <header className="bg-white shadow-sm dark:bg-gray-800 transition-colors duration-300">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center py-4">
          <div className="flex items-center gap-2">
            <Home className="h-6 w-6 text-blue-600 dark:text-blue-400" />
            <h1 className="text-xl font-bold text-gray-900 dark:text-white">HomeValuePro</h1>
          </div>
          <nav className="flex space-x-6">
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors duration-200">About</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors duration-200">How It Works</a>
            <a href="#" className="text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-200 dark:hover:text-blue-400 transition-colors duration-200">Contact</a>
          </nav>
        </div>
      </div>
    </header>
  );
};

export default Header;