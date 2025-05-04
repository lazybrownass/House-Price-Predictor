import React, { useState } from 'react';
import { Outlet } from 'react-router-dom';
import Navbar from './Navbar';
import Footer from './Footer';
import Notification from './Notification';

interface LayoutProps {
  defaultDarkMode?: boolean;
}

const Layout: React.FC<LayoutProps> = ({ defaultDarkMode = false }) => {
  const [isDarkMode, setIsDarkMode] = useState(defaultDarkMode);
  const [notification, setNotification] = useState({
    type: 'success' as 'success' | 'error',
    message: '',
    visible: false
  });

  // Toggle dark mode
  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  // Show notification
  const showNotification = (type: 'success' | 'error', message: string) => {
    setNotification({
      type,
      message,
      visible: true
    });
  };

  // Close notification
  const closeNotification = () => {
    setNotification(prev => ({
      ...prev,
      visible: false
    }));
  };

  return (
    <div className={`min-h-screen flex flex-col transition-colors duration-300 ${isDarkMode ? 'dark' : ''}`}>
      <div className="flex-grow bg-gray-50 dark:bg-gray-900 transition-colors duration-300">
        <Navbar isDarkMode={isDarkMode} toggleDarkMode={toggleDarkMode} />
        
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Outlet context={{ isDarkMode, showNotification }} />
        </main>
        
        <Notification
          type={notification.type}
          message={notification.message}
          visible={notification.visible}
          onClose={closeNotification}
        />
      </div>
      
      <Footer />
    </div>
  );
};

export default Layout; 