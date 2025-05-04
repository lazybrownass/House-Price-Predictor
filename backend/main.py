from fastapi import FastAPI, HTTPException, Depends
from fastapi.middleware.cors import CORSMiddleware
from dotenv import load_dotenv
import logging
import os
from typing import Dict, Any, Optional
import joblib
import numpy as np
from .routers import contact, analytics, auth
from sqlalchemy.orm import Session
from .database import get_db, create_tables
from .models.user import PredictionHistory
from .routers.auth import get_current_user, User

load_dotenv()

# Configure logging
logging.basicConfig(level=logging.INFO)
logger = logging.getLogger(__name__)

app = FastAPI(title="House Predictor API")

# Configure CORS
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Include routers
app.include_router(contact.router, prefix="/api/contact", tags=["contact"])
app.include_router(analytics.router, prefix="/api/analytics", tags=["analytics"])
app.include_router(auth.router, prefix="/api/auth", tags=["auth"])

# Load the model at startup
MODEL_PATH = os.path.join(os.path.dirname(__file__), "models", "random_forest_trm2.pkl")
try:
    model = joblib.load(MODEL_PATH)
    logger.info(f"Model loaded successfully. Number of features: {model.n_features_in_}")
except Exception as e:
    logger.error(f"Failed to load model: {str(e)}")
    raise

@app.get("/")
async def root():
    return {"message": "Welcome to House Predictor API"}

@app.post("/predict")
async def predict_house_price(
    features: Dict[str, Any],
    current_user: Optional[User] = Depends(get_current_user),
    db: Session = Depends(get_db)
):
    try:
        # Log the incoming request
        logger.info(f"Received prediction request with features: {features}")
        
        # Convert the features dictionary to the format expected by the model
        feature_array = np.array([[
            float(features.get('bedrooms', 0)),
            float(features.get('bathrooms', 0)),
            float(features.get('sqft_living', 0)),
            float(features.get('sqft_lot', 0)),
            float(features.get('floors', 0)),
            float(features.get('waterfront', 0)),
            float(features.get('view', 0)),
            float(features.get('condition', 0)),
            float(features.get('grade', 0)),
            float(features.get('sqft_above', 0)),
            float(features.get('sqft_basement', 0)),
            float(features.get('yr_built', 0)),
            float(features.get('yr_renovated', 0)),
            float(features.get('zipcode', 0)),
            float(features.get('lat', 0))
        ]])
        
        # Get prediction (in log scale)
        log_prediction = model.predict(feature_array)
        
        # Transform prediction back to original scale
        prediction = np.expm1(log_prediction[0])
        
        # Log the predictions
        logger.info(f"Log-scale prediction: {log_prediction[0]}")
        logger.info(f"Original-scale prediction: {prediction}")

        # Save prediction if user is authenticated
        if current_user:
            prediction_record = PredictionHistory(
                user_id=current_user.id,
                prediction_data=features,
                predicted_price=float(prediction)
            )
            db.add(prediction_record)
            db.commit()
            db.refresh(prediction_record)
            
            return {
                "predicted_price": float(prediction),
                "prediction_id": prediction_record.id
            }
        
        return {"predicted_price": float(prediction)}
    except Exception as e:
        logger.error(f"Prediction error: {str(e)}")
        raise HTTPException(status_code=500, detail=str(e))

@app.get("/health")
async def health_check():
    try:
        # Verify model is loaded
        if model is not None:
            return {"status": "healthy", "message": "Model is loaded and ready"}
        else:
            raise HTTPException(status_code=500, detail="Model not loaded")
    except Exception as e:
        logger.error(f"Health check failed: {str(e)}")
        raise HTTPException(status_code=500, detail="Model health check failed") 