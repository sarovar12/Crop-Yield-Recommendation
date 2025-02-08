import pandas as pd
import joblib
import os

# Absolute path to the directory containing trained models
models_dir = r'D:\ProjectsB\CropYieldRecommendation\Crop.Backend\Services\MLService\trained_models'

# Load the trained models
rf_model = joblib.load(os.path.join(models_dir, 'random_forest_model.joblib'))
gb_model = joblib.load(os.path.join(models_dir, 'gradient_boosting_model.joblib'))

def recommend_crop(parameters):
    """
    Parameters should be a dictionary with keys: 'N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'.
    Returns:
        A dictionary with recommendations from Random Forest and Gradient Boosting models.
    """
    # Convert input parameters to DataFrame
    input_data = pd.DataFrame([parameters])

    # Predictions from both models
    rf_recommendation = rf_model.predict(input_data)[0]
    gb_recommendation = gb_model.predict(input_data)[0]

    return {
        "Random Forest Recommendation": rf_recommendation,
        "Gradient Boosting Recommendation": gb_recommendation
    }
