import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, classification_report, mean_squared_error
import numpy as np
import joblib
import os

def train_and_save_models(data_path, models_dir='trained_models'):
    # Create directory for saving models if it doesn't exist
    if not os.path.exists(models_dir):
        os.makedirs(models_dir)

    # Load your dataset
    data = pd.read_csv(data_path)
    
    # Features and Labels
    X = data[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
    y = data['label']
    
    # Split dataset
    X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)
    
    # Random Forest training
    print("Training Random Forest Classifier...")
    rf_params = {
        'n_estimators': [50, 100, 200],
        'max_depth': [None, 10, 20],
        'min_samples_split': [2, 5, 10],
        'min_samples_leaf': [1, 2, 4]
    }
    rf_model = GridSearchCV(RandomForestClassifier(random_state=42), rf_params, cv=3, scoring='accuracy')
    rf_model.fit(X_train, y_train)
    
    # Gradient Boosting training
    print("Training Gradient Boosting Classifier...")
    gb_params = {
        'n_estimators': [50, 100, 200],
        'learning_rate': [0.01, 0.1, 0.2],
        'max_depth': [3, 5, 10],
        'min_samples_split': [2, 5, 10]
    }
    gb_model = GridSearchCV(GradientBoostingClassifier(random_state=42), gb_params, cv=3, scoring='accuracy')
    gb_model.fit(X_train, y_train)
    
    # Model Evaluation on Test Data
    rf_predictions = rf_model.best_estimator_.predict(X_test)
    gb_predictions = gb_model.best_estimator_.predict(X_test)
    
    # Calculate Accuracy
    rf_accuracy = accuracy_score(y_test, rf_predictions)
    gb_accuracy = accuracy_score(y_test, gb_predictions)
    
    # Calculate MSE and RMSE
    # For MSE and RMSE, we'll need to convert labels to numerical values
    label_mapping = {label: idx for idx, label in enumerate(np.unique(y))}
    y_test_numeric = np.array([label_mapping[label] for label in y_test])
    rf_predictions_numeric = np.array([label_mapping[label] for label in rf_predictions])
    gb_predictions_numeric = np.array([label_mapping[label] for label in gb_predictions])
    
    # Calculate metrics for Random Forest
    rf_mse = mean_squared_error(y_test_numeric, rf_predictions_numeric)
    rf_rmse = np.sqrt(rf_mse)
    
    # Calculate metrics for Gradient Boosting
    gb_mse = mean_squared_error(y_test_numeric, gb_predictions_numeric)
    gb_rmse = np.sqrt(gb_mse)
    
    # Print all metrics
    print("\nRandom Forest Metrics:")
    print(f"Best n_estimators: {rf_model.best_params_['n_estimators']}")
    print(f"Accuracy: {rf_accuracy:.4f}")
    print(f"Mean Squared Error: {rf_mse:.4f}")
    print(f"Root Mean Squared Error: {rf_rmse:.4f}")
    
    print("\nGradient Boosting Metrics:")
    print(f"Best n_estimators: {gb_model.best_params_['n_estimators']}")
    print(f"Accuracy: {gb_accuracy:.4f}")
    print(f"Mean Squared Error: {gb_mse:.4f}")
    print(f"Root Mean Squared Error: {gb_rmse:.4f}")
    
    # Save models 
    joblib.dump(rf_model.best_estimator_, os.path.join(models_dir, 'random_forest_model.joblib'))
    joblib.dump(gb_model.best_estimator_, os.path.join(models_dir, 'gradient_boosting_model.joblib'))
    print("\nModels have been trained and saved successfully!")

if __name__ == "__main__":
    train_and_save_models('D:/ProjectsB/CropYieldRecommendation/Crop.Backend/Services/MLService/Crop_recommendation.csv')