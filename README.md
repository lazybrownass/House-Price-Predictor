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
   git clone https://github.com/lazybrownass/House-Price-Predictor.git
   cd House-Price-Predictor
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

## 📚 Documentation

Detailed documentation is available in the `docs` directory:

- [API Documentation](docs/API.md) - Detailed API endpoints and usage
- [Contributing Guide](docs/CONTRIBUTING.md) - Guidelines for contributing to the project
- [Model Documentation](docs/MODEL.md) - Technical details about the machine learning model

## 🎯 Project Status

This project is actively maintained and open for contributions. Current development focus:

- [ ] Adding user authentication
- [ ] Implementing more advanced prediction features
- [ ] Improving model accuracy
- [ ] Adding data visualization components
- [ ] Enhancing UI/UX

## 🔍 Model Performance

The current model achieves:
- R² Score: 0.85-0.90
- Mean Absolute Error: ~$25,000
- Root Mean Square Error: ~$35,000

For more details about the model, see [Model Documentation](docs/MODEL.md).

## 🤝 Contributing

We welcome contributions! Please see our [Contributing Guide](docs/CONTRIBUTING.md) for details.

## 🔒 Security

- All API endpoints are CORS-enabled
- Database queries are protected against SQL injection
- Input validation on all endpoints
- Regular security updates

## 📈 Future Roadmap

1. **Q2 2025**
   - Implement user authentication
   - Add more data visualization features

2. **Q3 2025**
   - Integrate additional prediction models
   - Add support for more property features

3. **Q4 2025**
   - Launch mobile-responsive UI
   - Add real-time market data integration

## 💡 Support

Need help? Check out:
- [API Documentation](docs/API.md)
- [GitHub Issues](https://github.com/lazybrownass/House-Price-Predictor/issues)
- [Contributing Guide](docs/CONTRIBUTING.md)

## 📝 License

This project is licensed under the MIT License - see the [LICENSE](LICENSE) file for details.

## 👥 Authors

- Awab Ul Mujtaba - Initial work

## 🙏 Acknowledgments

- Thanks to all contributors who have helped shape this project
- Special thanks to the open-source community for the tools and libraries used

## 🐳 Docker Setup

### Prerequisites
- Docker
- Docker Compose

### Quick Start with Docker

1. **Clone the repository**
   ```bash
   git clone https://github.com/lazybrownass/House-Price-Predictor.git
   cd House-Price-Predictor
   ```

2. **Build and run with Docker Compose**
   ```bash
   docker-compose up --build
   ```

   This will:
   - Build the backend and frontend containers
   - Start the services
   - Make the application available at:
     - Frontend: http://localhost:5173
     - Backend API: http://localhost:8001

3. **Stop the application**
   ```bash
   docker-compose down
   ```

### Docker Development

- Frontend code changes will automatically reload due to volume mounting
- Backend changes require container restart:
  ```bash
  docker-compose restart backend
  ```

### Docker Production Deployment

For production deployment, modify the environment variables in `docker-compose.yml`:
```yaml
environment:
  - NODE_ENV=production
  - API_URL=https://your-api-domain.com
``` 
