from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database import get_db
import pandas as pd
import numpy as np
from datetime import datetime, timedelta
import joblib
import os

router = APIRouter()

# Load the model to get feature importance
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models", "random_forest_trm2.pkl")
model = joblib.load(MODEL_PATH)

@router.get("/price-trends")
async def get_price_trends(db: Session = Depends(get_db)):
    # Simulate price trends data for now
    # In production, this would come from your database
    months = pd.date_range(start='2023-01-01', end='2024-01-01', freq='M')
    trends = []
    
    base_price = 500000
    for month in months:
        # Add some random variation
        price = base_price + np.random.normal(0, 50000)
        trends.append({
            "month": month.strftime("%Y-%m"),
            "avgPrice": round(price, 2),
            "zipcode": "98101"  # Example zipcode
        })
        base_price += 5000  # Slight upward trend
    
    return trends

@router.get("/feature-importance")
async def get_feature_importance():
    # Get feature importance from the model
    feature_names = [
        'bedrooms', 'bathrooms', 'sqft_living', 'sqft_lot', 'floors',
        'waterfront', 'view', 'condition', 'grade', 'sqft_above',
        'sqft_basement', 'yr_built', 'yr_renovated', 'zipcode', 'lat'
    ]
    
    importance_scores = model.feature_importances_
    
    # Sort features by importance
    features = []
    for name, importance in zip(feature_names, importance_scores):
        features.append({
            "feature": name,
            "importance": round(float(importance), 4)
        })
    
    # Sort by importance descending
    features.sort(key=lambda x: x["importance"], reverse=True)
    
    return features

@router.get("/prediction-accuracy")
async def get_prediction_accuracy():
    # In production, this would compare predicted vs actual prices
    # For now, return simulated accuracy metrics
    return {
        "mae": 45000.0,
        "mse": 3500000.0,
        "r2_score": 0.85,
        "accuracy_trend": [
            {"date": "2023-Q1", "accuracy": 0.82},
            {"date": "2023-Q2", "accuracy": 0.84},
            {"date": "2023-Q3", "accuracy": 0.85},
            {"date": "2023-Q4", "accuracy": 0.85}
        ]
    } 