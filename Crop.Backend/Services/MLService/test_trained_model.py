import joblib
import numpy as np
import pandas as pd
from sklearn.metrics import classification_report

def test_models(sample_input, models_dir='trained_models'):
    # Load the trained models
    rf_model = joblib.load(f'{models_dir}/random_forest_model.joblib')
    gb_model = joblib.load(f'{models_dir}/gradient_boosting_model.joblib')
    
    # If input is a dictionary, convert to DataFrame
    if isinstance(sample_input, dict):
        sample_input = pd.DataFrame([sample_input])
    
    # Make predictions
    rf_prediction = rf_model.predict(sample_input)
    rf_prob = rf_model.predict_proba(sample_input)
    
    gb_prediction = gb_model.predict(sample_input)
    gb_prob = gb_model.predict_proba(sample_input)
    
    print("\nPrediction Results:")
    print("-" * 50)
    print("\nRandom Forest Prediction:")
    print(f"Predicted Crop: {rf_prediction[0]}")
    print("\nPrediction Probabilities for each class:")
    for idx, prob in enumerate(rf_prob[0]):
        print(f"Class {rf_model.classes_[idx]}: {prob:.4f}")
    
    print("\nGradient Boosting Prediction:")
    print(f"Predicted Crop: {gb_prediction[0]}")
    print("\nPrediction Probabilities for each class:")
    for idx, prob in enumerate(gb_prob[0]):
        print(f"Class {gb_model.classes_[idx]}: {prob:.4f}")

# Sample input (example values for N, P, K, temperature, humidity, ph, rainfall)
sample_input = {
    'N': 90,
    'P': 42,
    'K': 43,
    'temperature': 20.87,
    'humidity': 82.00,
    'ph': 6.5,
    'rainfall': 202.935
}

print("Testing models with sample input:")
print(f"Input values: {sample_input}")
test_models(sample_input)