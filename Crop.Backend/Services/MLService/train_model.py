import pandas as pd
from sklearn.ensemble import RandomForestClassifier, GradientBoostingClassifier
from sklearn.model_selection import train_test_split, GridSearchCV
from sklearn.metrics import accuracy_score, precision_score, recall_score, classification_report
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

    # Save models
    joblib.dump(rf_model, os.path.join(models_dir, 'random_forest_model.joblib'))
    joblib.dump(gb_model, os.path.join(models_dir, 'gradient_boosting_model.joblib'))
    
    print("Models have been trained and saved successfully!")

if __name__ == "__main__":
    train_and_save_models('Crop_recommendation.csv')