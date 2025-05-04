import joblib
import os
from typing import Dict, Any
import numpy as np

# Get the absolute path to the model file
MODEL_PATH = os.path.join(os.path.dirname(os.path.dirname(__file__)), "models", "random_forest_trm2.pkl")

class ModelLoader:
    _instance = None
    _model = None

    @classmethod
    def get_instance(cls):
        if cls._instance is None:
            cls._instance = cls()
        return cls._instance

    def __init__(self):
        if self._model is None:
            self._model = joblib.load(MODEL_PATH)

    def predict(self, features: Dict[str, Any]) -> float:
        # Convert the features dictionary to the format expected by the model
        # Adjust these features based on your model's requirements
        feature_array = np.array([[
            features.get('bedrooms', 0),
            features.get('bathrooms', 0),
            features.get('sqft_living', 0),
            features.get('sqft_lot', 0),
            features.get('floors', 0),
            features.get('waterfront', 0),
            features.get('view', 0),
            features.get('condition', 0),
            features.get('grade', 0),
            features.get('sqft_above', 0),
            features.get('sqft_basement', 0),
            features.get('yr_built', 0),
            features.get('yr_renovated', 0),
            features.get('zipcode', 0),
            features.get('lat', 0),
            features.get('long', 0),
            features.get('sqft_living15', 0),
            features.get('sqft_lot15', 0)
        ]])
        
        prediction = self._model.predict(feature_array)
        return float(prediction[0]) 