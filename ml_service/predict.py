"""
ML Prediction Service for Medication Adherence
Loads the trained model and makes predictions
"""

import sys
import json
import joblib
import pandas as pd
import numpy as np
from pathlib import Path

def load_model():
    """Load the trained model artifacts"""
    model_path = Path(__file__).parent.parent / 'models' / 'best_adherence_model.pkl'
    return joblib.load(model_path)

def preprocess_input(data, artifacts):
    """Preprocess input data for prediction"""
    # Convert input to DataFrame
    df = pd.DataFrame([data])
    
    # Extract artifacts
    numeric_features = artifacts['numeric_features']
    categorical_features = artifacts['categorical_features']
    binary_features = artifacts['binary_features']
    label_encoders = artifacts['label_encoders']
    tfidf = artifacts['tfidf']
    scaler = artifacts['scaler']
    
    # Handle missing values
    for col in numeric_features:
        if col not in df.columns:
            df[col] = 0
    
    for col in categorical_features:
        if col not in df.columns:
            df[col] = 'Unknown'
    
    for col in binary_features:
        if col not in df.columns:
            df[col] = False
    
    # Encode categorical features
    for col in categorical_features:
        le = label_encoders[col]
        try:
            df[f'{col}_encoded'] = le.transform(df[col].astype(str))
        except ValueError:
            # Handle unseen categories
            df[f'{col}_encoded'] = 0
    
    # Create feature matrix
    encoded_features = [f'{col}_encoded' for col in categorical_features]
    feature_columns = numeric_features + encoded_features + binary_features
    X_numeric = df[feature_columns].copy()
    
    # Add text features if patient_notes provided
    if 'patient_notes' in data and data['patient_notes']:
        X_text = tfidf.transform([data['patient_notes']])
        tfidf_df = pd.DataFrame(
            X_text.toarray(),
            columns=[f'tfidf_{i}' for i in range(X_text.shape[1])]
        )
        X = pd.concat([X_numeric.reset_index(drop=True), tfidf_df], axis=1)
    else:
        # Add zero TF-IDF features if no notes
        for i in range(50):  # Assuming 50 TF-IDF features
            X_numeric[f'tfidf_{i}'] = 0
        X = X_numeric
    
    # Scale features
    X_scaled = scaler.transform(X)
    
    return X_scaled

def predict(data):
    """Make prediction for a single patient"""
    try:
        # Load model artifacts
        artifacts = load_model()
        model = artifacts['model']
        
        # Preprocess input
        X = preprocess_input(data, artifacts)
        
        # Make prediction
        prediction = model.predict(X)[0]
        probability = model.predict_proba(X)[0]
        
        # Prepare response
        result = {
            'prediction': int(prediction),
            'is_non_adherent': bool(prediction == 1),
            'risk_probability': float(probability[1]),
            'adherence_probability': float(probability[0]),
            'risk_level': get_risk_level(probability[1]),
            'confidence': float(max(probability))
        }
        
        return result
    
    except Exception as e:
        return {
            'error': str(e),
            'message': 'Prediction failed'
        }

def get_risk_level(probability):
    """Determine risk level based on probability"""
    if probability < 0.3:
        return 'Low'
    elif probability < 0.6:
        return 'Medium'
    elif probability < 0.8:
        return 'High'
    else:
        return 'Critical'

def main():
    """Main function for command-line usage"""
    if len(sys.argv) < 2:
        print(json.dumps({'error': 'No input data provided'}))
        sys.exit(1)
    
    try:
        # Parse input JSON
        input_data = json.loads(sys.argv[1])
        
        # Make prediction
        result = predict(input_data)
        
        # Output result as JSON
        print(json.dumps(result))
    
    except json.JSONDecodeError as e:
        print(json.dumps({'error': f'Invalid JSON input: {str(e)}'}))
        sys.exit(1)
    except Exception as e:
        print(json.dumps({'error': str(e)}))
        sys.exit(1)

if __name__ == '__main__':
    main()
