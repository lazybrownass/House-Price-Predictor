import React, { useEffect, useState } from 'react';
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend,
  ChartData,
} from 'chart.js';
import { Line, Bar } from 'react-chartjs-2';
import axios from 'axios';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  BarElement,
  Title,
  Tooltip,
  Legend
);

interface PriceTrend {
  zipcode: string;
  avgPrice: number;
  month: string;
}

interface FeatureImportance {
  feature: string;
  importance: number;
}

const AnalyticsPage: React.FC = () => {
  const [priceTrends, setPriceTrends] = useState<PriceTrend[]>([]);
  const [featureImportance, setFeatureImportance] = useState<FeatureImportance[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAnalytics = async () => {
      try {
        const [trendsResponse, importanceResponse] = await Promise.all([
          axios.get('http://localhost:8000/api/analytics/price-trends'),
          axios.get('http://localhost:8000/api/analytics/feature-importance')
        ]);

        setPriceTrends(trendsResponse.data);
        setFeatureImportance(importanceResponse.data);
      } catch (error) {
        console.error('Error fetching analytics:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchAnalytics();
  }, []);

  const trendData: ChartData<'line'> = {
    labels: priceTrends.map(trend => trend.month),
    datasets: [
      {
        label: 'Average House Price',
        data: priceTrends.map(trend => trend.avgPrice),
        borderColor: 'rgb(75, 192, 192)',
        tension: 0.1,
      },
    ],
  };

  const importanceData: ChartData<'bar'> = {
    labels: featureImportance.map(feature => feature.feature),
    datasets: [
      {
        label: 'Feature Importance',
        data: featureImportance.map(feature => feature.importance),
        backgroundColor: 'rgba(53, 162, 235, 0.5)',
      },
    ],
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="text-center mb-12">
          <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-4">
            Market Analytics
          </h1>
          <p className="text-xl text-gray-600 dark:text-gray-300">
            Insights and trends from our housing market data
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
          {/* Price Trends Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Price Trends by Month
            </h2>
            <div className="h-96">
              <Line 
                data={trendData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: true,
                      text: 'Average House Prices Over Time'
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Feature Importance Chart */}
          <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Feature Importance
            </h2>
            <div className="h-96">
              <Bar
                data={importanceData}
                options={{
                  responsive: true,
                  maintainAspectRatio: false,
                  indexAxis: 'y' as const,
                  plugins: {
                    legend: {
                      position: 'top' as const,
                    },
                    title: {
                      display: true,
                      text: 'Impact of Different Features on House Price'
                    }
                  }
                }}
              />
            </div>
          </div>

          {/* Heat Map Section */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6">
            <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-6">
              Price Distribution Heat Map
            </h2>
            <div className="h-96 flex items-center justify-center">
              <p className="text-gray-500 dark:text-gray-400">
                Heat map visualization coming soon...
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPage; 