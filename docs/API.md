# API Documentation

## Base URL
By default, the API runs on `http://localhost:8001`

## Authentication
Currently, the API does not require authentication. However, it's recommended to implement authentication in production.

## Endpoints

### 1. Health Check
```http
GET /
```
Returns the API status.

**Response**
```json
{
    "message": "House Price Prediction API"
}
```

### 2. Predict House Price
```http
POST /predict
```

Make a house price prediction based on input features.

**Request Body**
```json
{
    "features": [
        2500,    // size in square feet
        4,       // number of bedrooms
        2.5,     // number of bathrooms
        2020     // year built
    ]
}
```

**Response**
```json
{
    "prediction": 450000.00  // predicted price in USD
}
```

### 3. Upload Dataset
```http
POST /upload-dataset
```

Upload a new dataset for predictions.

**Request Body**
```json
{
    "file_path": "path/to/dataset.csv"
}
```

**Response**
```json
{
    "message": "Dataset uploaded successfully"
}
```

### 4. Get Prediction History
```http
GET /predictions
```

Retrieve history of all predictions made.

**Response**
```json
[
    {
        "id": 1,
        "size": 2500,
        "bedrooms": 4,
        "bathrooms": 2.5,
        "year_built": 2020,
        "prediction": 450000.00,
        "created_at": "2024-05-05T10:30:00Z"
    }
]
```

### 5. Get Dataset
```http
GET /dataset
```

Retrieve the current dataset used for predictions.

**Response**
```json
[
    {
        "id": 1,
        "size": 2500,
        "bedrooms": 4,
        "bathrooms": 2.5,
        "year_built": 2020,
        "price": 450000.00
    }
]
```

## Error Handling

The API uses standard HTTP response codes:
- 200: Success
- 400: Bad Request
- 404: Not Found
- 500: Internal Server Error

Error responses include a message:
```json
{
    "detail": "Error message description"
}
``` 