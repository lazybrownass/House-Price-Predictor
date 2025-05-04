import axios from 'axios';

// Use the correct port for the backend API
const API_BASE_URL = 'http://localhost:8001';

// Create axios instance with base URL
const api = axios.create({
    baseURL: API_BASE_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

export interface PredictionResponse {
    prediction: number;
}

export interface PredictionInput {
    features: number[];
}

export const predict = async (input: PredictionInput): Promise<PredictionResponse> => {
    const response = await api.post('/predict', input);
    return response.data;
};

// Add error handling
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response) {
            // The request was made and the server responded with a status code
            // that falls out of the range of 2xx
            console.error('API Error:', error.response.data);
            throw new Error(error.response.data.detail || 'An error occurred');
        } else if (error.request) {
            // The request was made but no response was received
            console.error('Network Error:', error.request);
            throw new Error('Network error. Please check your connection.');
        } else {
            // Something happened in setting up the request that triggered an Error
            console.error('Error:', error.message);
            throw new Error('An unexpected error occurred');
        }
    }
); 