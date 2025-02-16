from flask import Flask, request, jsonify
import numpy as np
import pandas as pd
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity
import pickle

# Load dataset
df = pd.read_csv("crop_recommendation.csv")

# Features to be used for content-based filtering (N, P, K, pH, temperature, humidity, rainfall)
features = ['N', 'P', 'K', 'ph', 'temperature', 'humidity', 'rainfall']

# Standardize the data
scaler = StandardScaler()
scaled_features = scaler.fit_transform(df[features])

# Create Flask app
app = Flask(__name__)

@app.route("/")
def home():
    return jsonify({"message": "Crop Recommendation API is running!"})

@app.route("/predict", methods=['POST'])
def predict():
    try:
        # Get JSON data from request
        data = request.get_json()

        # Extract features from the input data
        input_features = np.array([
            data.get("Nitrogen"),
            data.get("Phosphorus"),
            data.get("Potassium"),
            data.get("Ph"),
            data.get("Temperature"),
            data.get("Humidity"),
            data.get("Rainfall")
        ]).reshape(1, -1)

        # Scale the input features
        input_scaled = scaler.transform(input_features)

        # Compute cosine similarity between input and all crops in the dataset
        similarities = cosine_similarity(input_scaled, scaled_features)

        # Add the similarity scores to the dataframe
        df['similarity'] = similarities[0]

        # Sort by similarity and get top 5 crops (with distinct crops)
        top_crops = df[['label', 'similarity']].sort_values(by='similarity', ascending=False).drop_duplicates('label').head(5)

        # Prepare the response
        recommended_crops = []
        for _, row in top_crops.iterrows():
            crop_name = row['label']
            similarity_score = round(row['similarity'] * 100, 2)
            recommended_crops.append({
                "crop": crop_name,
                "confidence": f"{similarity_score}%"
            })

        return jsonify({
            "success": True,
            "top_5_crops": recommended_crops
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
