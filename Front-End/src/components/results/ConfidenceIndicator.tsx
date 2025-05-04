import React from 'react';

interface ConfidenceIndicatorProps {
  score: number;
}

const ConfidenceIndicator: React.FC<ConfidenceIndicatorProps> = ({ score }) => {
  // Determine color based on confidence score
  const getColor = () => {
    if (score >= 90) return 'bg-green-500';
    if (score >= 75) return 'bg-blue-500';
    if (score >= 60) return 'bg-yellow-500';
    return 'bg-red-500';
  };

  // Determine the label text
  const getConfidenceLabel = () => {
    if (score >= 90) return 'Very High';
    if (score >= 75) return 'High';
    if (score >= 60) return 'Moderate';
    return 'Low';
  };

  return (
    <div className="mb-4">
      <div className="flex justify-between items-center mb-1">
        <span className="text-sm font-medium text-gray-700 dark:text-gray-300">Confidence Score</span>
        <span className="text-sm font-semibold text-gray-900 dark:text-white">{score}% - {getConfidenceLabel()}</span>
      </div>
      <div className="w-full bg-gray-200 dark:bg-gray-700 rounded-full h-2.5 overflow-hidden transition-colors duration-300">
        <div 
          className={`h-2.5 rounded-full ${getColor()} transition-all duration-500 ease-out`} 
          style={{ width: `${score}%` }}
        ></div>
      </div>
    </div>
  );
};

export default ConfidenceIndicator;