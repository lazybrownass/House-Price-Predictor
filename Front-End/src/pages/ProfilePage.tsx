import React, { useEffect, useState } from 'react';
import { User, History, Star, Download } from 'lucide-react';
import axios from 'axios';
import { saveAs } from 'file-saver';
import * as XLSX from 'xlsx';

interface Prediction {
  id: number;
  prediction_data: any;
  predicted_price: number;
  created_at: string;
  notes?: string;
}

interface FavoritePrediction {
  id: number;
  prediction: Prediction;
  notes?: string;
  created_at: string;
}

interface UserProfile {
  username: string;
  email: string;
  created_at: string;
}

const ProfilePage: React.FC = () => {
  const [profile, setProfile] = useState<UserProfile | null>(null);
  const [predictions, setPredictions] = useState<Prediction[]>([]);
  const [favorites, setFavorites] = useState<FavoritePrediction[]>([]);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'predictions' | 'favorites'>('predictions');

  useEffect(() => {
    const fetchUserData = async () => {
      try {
        const token = localStorage.getItem('token');
        if (!token) {
          window.location.href = '/login';
          return;
        }

        const headers = { Authorization: `Bearer ${token}` };
        const [profileRes, predictionsRes, favoritesRes] = await Promise.all([
          axios.get('http://localhost:8000/api/auth/me', { headers }),
          axios.get('http://localhost:8000/api/auth/predictions', { headers }),
          axios.get('http://localhost:8000/api/auth/favorites', { headers })
        ]);

        setProfile(profileRes.data);
        setPredictions(predictionsRes.data);
        setFavorites(favoritesRes.data);
      } catch (error) {
        console.error('Error fetching user data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleExportPredictions = () => {
    const data = predictions.map(p => ({
      'Date': new Date(p.created_at).toLocaleDateString(),
      'Predicted Price': p.predicted_price.toLocaleString('en-US', {
        style: 'currency',
        currency: 'USD'
      }),
      'Bedrooms': p.prediction_data.bedrooms,
      'Bathrooms': p.prediction_data.bathrooms,
      'Square Feet': p.prediction_data.sqft_living,
      'Location': p.prediction_data.zipcode,
      'Notes': p.notes || ''
    }));

    const ws = XLSX.utils.json_to_sheet(data);
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, 'Predictions');
    const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
    const dataBlob = new Blob([excelBuffer], { type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' });
    saveAs(dataBlob, 'house-predictions.xlsx');
  };

  const handleAddToFavorites = async (predictionId: number) => {
    try {
      const token = localStorage.getItem('token');
      const headers = { Authorization: `Bearer ${token}` };
      await axios.post(`http://localhost:8000/api/auth/favorites/${predictionId}`, {}, { headers });
      
      // Refresh favorites
      const favoritesRes = await axios.get('http://localhost:8000/api/auth/favorites', { headers });
      setFavorites(favoritesRes.data);
    } catch (error) {
      console.error('Error adding to favorites:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-32 w-32 border-b-2 border-indigo-500"></div>
      </div>
    );
  }

  return (
    <div className="py-12 bg-gray-50 dark:bg-gray-900 min-h-screen">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Profile Header */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg p-6 mb-8">
          <div className="flex items-center">
            <div className="h-20 w-20 rounded-full bg-indigo-500 flex items-center justify-center">
              <User className="h-12 w-12 text-white" />
            </div>
            <div className="ml-6">
              <h1 className="text-2xl font-bold text-gray-900 dark:text-white">
                {profile?.username}
              </h1>
              <p className="text-gray-600 dark:text-gray-300">{profile?.email}</p>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Member since {new Date(profile?.created_at || '').toLocaleDateString()}
              </p>
            </div>
          </div>
        </div>

        {/* Tabs */}
        <div className="flex space-x-4 mb-6">
          <button
            onClick={() => setActiveTab('predictions')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2
              ${activeTab === 'predictions'
                ? 'bg-indigo-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
          >
            <History className="h-5 w-5" />
            <span>Prediction History</span>
          </button>
          <button
            onClick={() => setActiveTab('favorites')}
            className={`px-4 py-2 rounded-lg flex items-center space-x-2
              ${activeTab === 'favorites'
                ? 'bg-indigo-500 text-white'
                : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300'
              }`}
          >
            <Star className="h-5 w-5" />
            <span>Favorites</span>
          </button>
        </div>

        {/* Export Button */}
        <button
          onClick={handleExportPredictions}
          className="mb-6 px-4 py-2 bg-green-500 text-white rounded-lg flex items-center space-x-2 hover:bg-green-600 transition-colors duration-200"
        >
          <Download className="h-5 w-5" />
          <span>Export to Excel</span>
        </button>

        {/* Predictions/Favorites List */}
        <div className="bg-white dark:bg-gray-800 rounded-lg shadow-lg overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200 dark:divide-gray-700">
            <thead>
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Date
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Price
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Details
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
              {(activeTab === 'predictions' ? predictions : favorites).map((item) => {
                const prediction = activeTab === 'predictions' ? item : item.prediction;
                return (
                  <tr key={item.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {new Date(prediction.created_at).toLocaleDateString()}
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">
                      {prediction.predicted_price.toLocaleString('en-US', {
                        style: 'currency',
                        currency: 'USD'
                      })}
                    </td>
                    <td className="px-6 py-4 text-sm text-gray-900 dark:text-white">
                      <div>
                        <p>Bedrooms: {prediction.prediction_data.bedrooms}</p>
                        <p>Bathrooms: {prediction.prediction_data.bathrooms}</p>
                        <p>Square Feet: {prediction.prediction_data.sqft_living}</p>
                        <p>Location: {prediction.prediction_data.zipcode}</p>
                      </div>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm">
                      {activeTab === 'predictions' && (
                        <button
                          onClick={() => handleAddToFavorites(prediction.id)}
                          className="text-yellow-500 hover:text-yellow-600"
                        >
                          <Star className="h-5 w-5" />
                        </button>
                      )}
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default ProfilePage; 