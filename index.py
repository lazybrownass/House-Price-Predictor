import joblib
from fastapi import FastAPI, HTTPException
from pydantic import BaseModel
from typing import List
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
import sqlite3
import pandas as pd
from datetime import datetime
import os

# Load model
model = joblib.load("models/random_forest_trm2.pkl")

# Initialize database
def init_db():
    conn = sqlite3.connect('house_predictions.db')
    c = conn.cursor()
    
    # Create predictions table
    c.execute('''
        CREATE TABLE IF NOT EXISTS predictions (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            size REAL,
            bedrooms INTEGER,
            bathrooms REAL,
            year_built INTEGER,
            prediction REAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    # Create dataset table
    c.execute('''
        CREATE TABLE IF NOT EXISTS dataset (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            size REAL,
            bedrooms INTEGER,
            bathrooms REAL,
            year_built INTEGER,
            price REAL,
            created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )
    ''')
    
    conn.commit()
    conn.close()

# Initialize the database
init_db()

app = FastAPI()

# Add CORS middleware
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # Allows all origins
    allow_credentials=True,
    allow_methods=["*"],  # Allows all methods
    allow_headers=["*"],  # Allows all headers
)

class PredictionInput(BaseModel):
    features: List[float]

@app.get("/")
async def root():
    return {"message": "House Price Prediction API"}

@app.post("/predict")
async def predict(input_data: PredictionInput):
    try:
        print(f"Received features: {input_data.features}")
        features = np.array(input_data.features).reshape(1, -1)
        print(f"Reshaped features shape: {features.shape}")
        
        prediction = model.predict(features)
        print(f"Prediction result: {prediction[0]}")
        
        # Store prediction in database
        conn = sqlite3.connect('house_predictions.db')
        c = conn.cursor()
        c.execute('''
            INSERT INTO predictions (size, bedrooms, bathrooms, year_built, prediction)
            VALUES (?, ?, ?, ?, ?)
        ''', (
            features[0][0],  # size
            int(features[0][1]),  # bedrooms
            features[0][2],  # bathrooms
            int(features[0][3]),  # year_built
            float(prediction[0])  # prediction
        ))
        conn.commit()
        conn.close()
        
        return {"prediction": float(prediction[0])}
    except Exception as e:
        print(f"Error during prediction: {str(e)}")
        raise HTTPException(status_code=400, detail=str(e))

@app.post("/upload-dataset")
async def upload_dataset(file_path: str):
    try:
        # Read CSV file
        df = pd.read_csv(file_path)
        
        # Connect to database
        conn = sqlite3.connect('house_predictions.db')
        
        # Store data in database
        df.to_sql('dataset', conn, if_exists='replace', index=False)
        
        conn.close()
        
        return {"message": "Dataset uploaded successfully"}
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/predictions")
async def get_predictions():
    try:
        conn = sqlite3.connect('house_predictions.db')
        df = pd.read_sql_query("SELECT * FROM predictions ORDER BY created_at DESC", conn)
        conn.close()
        return df.to_dict('records')
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

@app.get("/dataset")
async def get_dataset():
    try:
        conn = sqlite3.connect('house_predictions.db')
        df = pd.read_sql_query("SELECT * FROM dataset", conn)
        conn.close()
        return df.to_dict('records')
    except Exception as e:
        raise HTTPException(status_code=400, detail=str(e))

if __name__ == "__main__":
    import uvicorn
    print("\n=== House Price Prediction API ===")
    print("Server starting...")
    print("Access the API at: http://localhost:8001")
    print("Press Ctrl+C to stop the server\n")
    uvicorn.run(app, host="127.0.0.1", port=8001)



