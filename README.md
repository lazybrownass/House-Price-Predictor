# House Price Predictor

A full-stack web application that predicts house prices using machine learning. This project combines a FastAPI backend with a React frontend to provide accurate house price predictions based on various features like size, number of bedrooms, bathrooms, and year built.

## 🌟 Features

- **Real-time Price Predictions**: Get instant house price predictions using our trained machine learning model
- **Interactive UI**: Modern, responsive interface built with React and Tailwind CSS
- **Data Persistence**: All predictions are stored in a SQLite database for historical tracking
- **User Authentication**: Secure login and registration system
- **Admin Dashboard**: Special access for administrators to monitor system usage
- **Educational Resources**: Learn about the factors affecting house prices
- **Analytics Dashboard**: Visualize prediction trends and patterns
- **RESTful API**: Well-documented API endpoints for easy integration

## 🛠️ Tech Stack

### Backend
- Python 3.x
- FastAPI
- SQLite
- scikit-learn
- pandas
- numpy
- joblib

### Frontend
- React
- TypeScript
- Tailwind CSS
- Vite
- React Router
- Axios

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 14.x or higher
- npm or yarn
- Git

## 🚀 Installation

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/house-price-predictor.git
   cd house-price-predictor
   ```

2. **Set up the backend**
   ```bash
   # Create and activate virtual environment
   python -m venv .venv
   source .venv/bin/activate  # On Windows: .venv\Scripts\activate
   
   # Install dependencies
   pip install -r requirements.txt
   ```

3. **Set up the frontend**
   ```bash
   cd Front-End
   npm install
   ```

## 🏃‍♂️ Running the Application

1. **Start the backend server**
   ```bash
   python index.py
   ```
   The API will be available at `http://localhost:8001`

2. **Start the frontend development server**
   ```bash
   cd Front-End
   npm run dev
   ```
   The application will be available at `http://localhost:5173`

## 📚 API Documentation

### Endpoints

- `GET /`: Welcome message
- `POST /predict`: Get house price prediction
  - Required features: [size, bedrooms, bathrooms, year_built]
- `POST /upload-dataset`: Upload new dataset
- `GET /predictions`: Retrieve prediction history
- `GET /dataset`: Get the current dataset

## 🔒 Environment Variables

Create a `.env` file in the root directory:

```env
DATABASE_URL=sqlite:///house_predictions.db
JWT_SECRET=your_jwt_secret
```

## 📊 Machine Learning Model

The project uses a Random Forest model trained on historical house price data. The model takes into account:
- House size (square feet)
- Number of bedrooms
- Number of bathrooms
- Year built

## 🤝 Contributing

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/AmazingFeature`)
3. Commit your changes (`git commit -m 'Add some AmazingFeature'`)
4. Push to the branch (`git push origin feature/AmazingFeature`)
5. Open a Pull Request

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Your Name - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the tools and libraries used 