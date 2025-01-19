import pandas as pd
import joblib
import os

# Load the trained models
models_dir = 'trained_models'
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

if __name__ == "__main__":
    # Example usage
    user_input = {
        'N': 90,
        'P': 42,
        'K': 43,
        'temperature': 20.8,
        'humidity': 82.0,
        'ph': 6.5,
        'rainfall': 200.9
    }
    recommendation = recommend_crop(user_input)
    print("\nCrop Recommendation:")
    print("Random Forest:", recommendation["Random Forest Recommendation"])
    print("Gradient Boosting:", recommendation["Gradient Boosting Recommendation"])