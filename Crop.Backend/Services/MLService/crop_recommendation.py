import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, precision_score, recall_score, classification_report

# Load your dataset
data = pd.read_csv('Crop_recommendation.csv')

# Features and Labels
X = data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = data['label']

# Split dataset into training and testing sets (80% train, 20% test)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# ------------------------------
# Random Forest Classifier
# ------------------------------
print("Training Random Forest Classifier...")

# Hyperparameter tuning for Random Forest
rf_params = {
    'n_estimators': [50, 100, 200],        # Number of trees
    'max_depth': [None, 10, 20],           # Depth of trees
    'min_samples_split': [2, 5, 10],       # Minimum samples to split a node
    'min_samples_leaf': [1, 2, 4]          # Minimum samples in leaf
}

rf_model = GridSearchCV(RandomForestClassifier(random_state=42), rf_params, cv=3, scoring='accuracy')
rf_model.fit(X_train, y_train)

# Best Random Forest parameters
print("Best parameters for Random Forest:", rf_model.best_params_)

# Evaluate Random Forest
rf_predictions = rf_model.predict(X_test)
print("Random Forest Metrics:")
print("Accuracy:", accuracy_score(y_test, rf_predictions))
print("Precision:", precision_score(y_test, rf_predictions, average='weighted'))
print("Recall:", recall_score(y_test, rf_predictions, average='weighted'))
print("Classification Report:\n", classification_report(y_test, rf_predictions))

# ------------------------------
# Gradient Boosting Classifier
# ------------------------------
print("Training Gradient Boosting Classifier...")

# Hyperparameter tuning for Gradient Boosting
gb_params = {
    'n_estimators': [50, 100, 200],
    'learning_rate': [0.01, 0.1, 0.2],
    'max_depth': [3, 5, 10],
    'min_samples_split': [2, 5, 10]
}

gb_model = GridSearchCV(GradientBoostingClassifier(random_state=42), gb_params, cv=3, scoring='accuracy')
gb_model.fit(X_train, y_train)

# Best Gradient Boosting parameters
print("Best parameters for Gradient Boosting:", gb_model.best_params_)

# Evaluate Gradient Boosting
gb_predictions = gb_model.predict(X_test)
print("Gradient Boosting Metrics:")
print("Accuracy:", accuracy_score(y_test, gb_predictions))
print("Precision:", precision_score(y_test, gb_predictions, average='weighted'))
print("Recall:", recall_score(y_test, gb_predictions, average='weighted'))
print("Classification Report:\n", classification_report(y_test, gb_predictions))

# ------------------------------
# Crop Recommendation Function
# ------------------------------
def recommend_crop(parameters):
    """
    Parameters should be a dictionary with keys: 'N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall'.
        parameters = {
            'N': 90,
            'P': 42,
            'K': 43,
            'temperature': 20.8,
            'humidity': 82.0,
            'ph': 6.5,
            'rainfall': 200.9
        }
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
    # Example user input
    user_input = {
        'N': 90,
        'P': 42,
        'K': 43,
        'temperature': 20.8,
        'humidity': 82.0,
        'ph': 6.5,
        'rainfall': 200.9
    }

    # Get recommendations
    recommendation = recommend_crop(user_input)
    print("\nCrop Recommendation:")
    print("Random Forest:", recommendation["Random Forest Recommendation"])
    print("Gradient Boosting:", recommendation["Gradient Boosting Recommendation"])
