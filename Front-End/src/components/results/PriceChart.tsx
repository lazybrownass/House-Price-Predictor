import React, { useEffect, useRef } from 'react';

interface PriceChartProps {
  minPrice: number;
  maxPrice: number;
}

const PriceChart: React.FC<PriceChartProps> = ({ minPrice, maxPrice }) => {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  
  // Format price to currency
  const formatPrice = (price: number): string => {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
      maximumFractionDigits: 0
    }).format(price);
  };

  // Average price
  const avgPrice = (minPrice + maxPrice) / 2;

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    // Drawing constants
    const width = canvas.width;
    const height = canvas.height;
    const padding = 20;
    const graphWidth = width - (padding * 2);
    const graphHeight = height - (padding * 2);
    
    // Bell curve parameters
    const bellCurveWidth = graphWidth * 0.8;
    const bellCurveHeight = graphHeight * 0.8;
    const centerX = width / 2;
    const baseY = padding + graphHeight;
    
    // Drawing bell curve
    ctx.beginPath();
    ctx.moveTo(centerX - bellCurveWidth / 2, baseY);
    
    // Create a bell curve shape
    for (let x = -bellCurveWidth / 2; x <= bellCurveWidth / 2; x += 1) {
      const normalizedX = x / (bellCurveWidth / 2);
      const y = Math.exp(-(normalizedX * normalizedX) / 0.2) * bellCurveHeight;
      ctx.lineTo(centerX + x, baseY - y);
    }
    
    ctx.lineTo(centerX + bellCurveWidth / 2, baseY);
    ctx.closePath();
    
    // Fill with gradient
    const gradient = ctx.createLinearGradient(centerX - bellCurveWidth / 2, 0, centerX + bellCurveWidth / 2, 0);
    gradient.addColorStop(0, 'rgba(96, 165, 250, 0.7)');
    gradient.addColorStop(0.5, 'rgba(59, 130, 246, 0.8)');
    gradient.addColorStop(1, 'rgba(96, 165, 250, 0.7)');
    
    ctx.fillStyle = gradient;
    ctx.fill();
    
    // Add stroke
    ctx.strokeStyle = 'rgba(30, 64, 175, 0.6)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw price lines
    const minX = centerX - bellCurveWidth / 2 + (bellCurveWidth * 0.1);
    const maxX = centerX + bellCurveWidth / 2 - (bellCurveWidth * 0.1);
    const avgX = centerX;
    
    // Min price line
    ctx.beginPath();
    ctx.moveTo(minX, baseY);
    ctx.lineTo(minX, baseY - bellCurveHeight * 0.4);
    ctx.strokeStyle = 'rgba(30, 64, 175, 0.8)';
    ctx.stroke();
    
    // Max price line
    ctx.beginPath();
    ctx.moveTo(maxX, baseY);
    ctx.lineTo(maxX, baseY - bellCurveHeight * 0.4);
    ctx.strokeStyle = 'rgba(30, 64, 175, 0.8)';
    ctx.stroke();
    
    // Avg price line
    ctx.beginPath();
    ctx.moveTo(avgX, baseY);
    ctx.lineTo(avgX, baseY - bellCurveHeight);
    ctx.strokeStyle = 'rgba(220, 38, 38, 0.8)';
    ctx.lineWidth = 2;
    ctx.stroke();
    
    // Draw price labels
    ctx.textAlign = 'center';
    ctx.textBaseline = 'top';
    
    // Min price label
    ctx.fillStyle = '#1E40AF';
    ctx.font = '12px Arial';
    ctx.fillText('Min', minX, baseY + 5);
    
    // Max price label
    ctx.fillText('Max', maxX, baseY + 5);
    
    // Avg price label
    ctx.fillStyle = '#DC2626';
    ctx.font = 'bold 12px Arial';
    ctx.fillText('Avg', avgX, baseY + 5);
    
  }, [minPrice, maxPrice]);

  return (
    <div className="mt-4">
      <h3 className="text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">Price Distribution</h3>
      <div className="bg-white dark:bg-gray-800 p-4 rounded-lg shadow-sm border border-gray-200 dark:border-gray-700 transition-colors duration-300">
        <div className="flex justify-between mb-1 text-xs text-gray-500 dark:text-gray-400">
          <span>{formatPrice(minPrice)}</span>
          <span>{formatPrice(avgPrice)}</span>
          <span>{formatPrice(maxPrice)}</span>
        </div>
        <canvas 
          ref={canvasRef} 
          width={300} 
          height={150} 
          className="w-full h-auto"
        ></canvas>
      </div>
    </div>
  );
};

export default PriceChart;