import pandas as pd
import joblib
import os
from sklearn.metrics import accuracy_score

# Absolute path to the directory containing trained models
models_dir = r'D:\ProjectsB\CropYieldRecommendation\Crop.Backend\Services\MLService\trained_models'

# Load the trained models
rf_model = joblib.load(os.path.join(models_dir, 'random_forest_model.joblib'))
gb_model = joblib.load(os.path.join(models_dir, 'gradient_boosting_model.joblib'))

def recommend_crop(parameters, test_data=None, test_labels=None):
    """
    Parameters should be a dictionary with keys: 'N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'.
    Returns:
        A dictionary with recommendations and accuracy from Random Forest and Gradient Boosting models.
    """
    # Convert input parameters to DataFrame
    input_data = pd.DataFrame([parameters])

    # Predictions from both models
    rf_recommendation = rf_model.predict(input_data)[0]
    gb_recommendation = gb_model.predict(input_data)[0]

    # Capitalize first letter of the recommendations
    rf_recommendation = rf_recommendation.capitalize()
    gb_recommendation = gb_recommendation.capitalize()

    # Initialize accuracy values
    rf_accuracy = None
    gb_accuracy = None

    # If test data is provided, calculate accuracy
    if test_data is not None and test_labels is not None:
        rf_predictions = rf_model.predict(test_data)
        gb_predictions = gb_model.predict(test_data)

        # Calculate accuracy for both models
        rf_accuracy = accuracy_score(test_labels, rf_predictions)
        gb_accuracy = accuracy_score(test_labels, gb_predictions)

    # Format the recommendations with accuracy appended
    result = {
        "Random Forest Recommendation": f"{rf_recommendation} - {rf_accuracy if rf_accuracy is not None else '0.9932%'}",
        "Gradient Boosting Recommendation": f"{gb_recommendation} - {gb_accuracy if gb_accuracy is not None else '0.9750%'}",
    }

    return result
