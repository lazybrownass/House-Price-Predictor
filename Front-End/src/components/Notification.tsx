import React, { useEffect, useState } from 'react';
import { AlertCircle, CheckCircle, X } from 'lucide-react';

interface NotificationProps {
  type: 'success' | 'error';
  message: string;
  visible: boolean;
  onClose: () => void;
}

const Notification: React.FC<NotificationProps> = ({ 
  type, 
  message, 
  visible, 
  onClose 
}) => {
  const [isVisible, setIsVisible] = useState(false);
  
  useEffect(() => {
    if (visible) {
      setIsVisible(true);
      
      // Auto hide after 5 seconds
      const timer = setTimeout(() => {
        setIsVisible(false);
        setTimeout(onClose, 300); // Wait for the exit animation to complete
      }, 5000);
      
      return () => clearTimeout(timer);
    } else {
      setIsVisible(false);
    }
  }, [visible, onClose]);
  
  const bgColor = type === 'success' 
    ? 'bg-green-50 dark:bg-green-900/20' 
    : 'bg-red-50 dark:bg-red-900/20';
    
  const borderColor = type === 'success' 
    ? 'border-green-400 dark:border-green-600' 
    : 'border-red-400 dark:border-red-600';
    
  const textColor = type === 'success' 
    ? 'text-green-800 dark:text-green-300' 
    : 'text-red-800 dark:text-red-300';
    
  const iconColor = type === 'success' 
    ? 'text-green-500 dark:text-green-400' 
    : 'text-red-500 dark:text-red-400';

  return (
    <div 
      className={`fixed top-4 right-4 z-50 max-w-sm w-full transition-all duration-300 transform ${
        isVisible ? 'opacity-100 translate-y-0' : 'opacity-0 -translate-y-4 pointer-events-none'
      }`}
    >
      <div className={`p-4 rounded-lg shadow-md border ${bgColor} ${borderColor} flex items-start`}>
        <div className={`flex-shrink-0 ${iconColor}`}>
          {type === 'success' ? (
            <CheckCircle className="h-5 w-5" />
          ) : (
            <AlertCircle className="h-5 w-5" />
          )}
        </div>
        <div className="ml-3 flex-1">
          <p className={`text-sm font-medium ${textColor}`}>{message}</p>
        </div>
        <button 
          onClick={() => {
            setIsVisible(false);
            setTimeout(onClose, 300);
          }}
          className={`ml-4 flex-shrink-0 ${textColor} hover:${textColor} focus:outline-none`}
        >
          <X className="h-5 w-5" />
        </button>
      </div>
    </div>
  );
};

export default Notification;