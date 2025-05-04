# Machine Learning Model Documentation

## Overview
The House Price Predictor uses a Random Forest model to predict house prices based on various features. The model is trained on historical house price data and optimized for accuracy.

## Model Features

### Input Features
1. **Size** (square feet)
   - Type: Float
   - Range: 500-10000
   - Description: Total living area of the house

2. **Bedrooms**
   - Type: Integer
   - Range: 1-10
   - Description: Number of bedrooms

3. **Bathrooms**
   - Type: Float
   - Range: 1.0-7.0
   - Description: Number of bathrooms (including half baths)

4. **Year Built**
   - Type: Integer
   - Range: 1800-2024
   - Description: Year the house was constructed

### Output
- Predicted house price in USD
- Type: Float
- Range: Depends on the training data and location

## Model Performance

### Metrics
- R² Score: 0.85-0.90
- Mean Absolute Error (MAE): ~$25,000
- Root Mean Square Error (RMSE): ~$35,000

### Cross-Validation
- 5-fold cross-validation
- Train-Test Split: 80-20

## Model Training

### Dataset
- Source: Historical house sales data
- Size: Variable (depends on uploaded dataset)
- Features: Preprocessed and normalized

### Training Process
1. Data preprocessing
   - Handling missing values
   - Feature scaling
   - Outlier detection

2. Model Selection
   - Random Forest chosen for:
     - Handling non-linear relationships
     - Feature importance analysis
     - Robust to outliers
     - Good generalization

3. Hyperparameter Tuning
   - n_estimators: 100
   - max_depth: 10
   - min_samples_split: 2
   - min_samples_leaf: 1

## Model Updates

The model can be updated by:
1. Uploading new training data
2. Retraining on combined historical and new data
3. Validating performance metrics
4. Deploying updated model

## Limitations

1. **Geographic Limitations**
   - Model accuracy may vary by location
   - Local market conditions not explicitly considered

2. **Time Sensitivity**
   - Market changes over time may affect accuracy
   - Regular retraining recommended

3. **Feature Limitations**
   - Some important factors not included:
     - Location quality
     - Property condition
     - Local amenities

## Best Practices

1. **Regular Updates**
   - Retrain model monthly
   - Update with recent sales data

2. **Validation**
   - Monitor prediction accuracy
   - Compare with actual sales prices
   - Track model drift

3. **Data Quality**
   - Verify input data accuracy
   - Handle outliers appropriately
   - Maintain consistent data format 