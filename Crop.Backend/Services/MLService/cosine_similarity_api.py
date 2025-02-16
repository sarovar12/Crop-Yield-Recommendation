from flask import Flask, request, jsonify
import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity

# Load and preprocess data
def create_crop_recommender(csv_path):
    """Loads crop dataset and computes cosine similarity matrix."""
    data = pd.read_csv(csv_path)
    
    # Features used for recommendation
    features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    
    # Standardize the feature data
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(data[features])
    
    # Compute similarity matrix
    similarity_matrix = cosine_similarity(scaled_features)
    
    return scaler, similarity_matrix, data['label'].values, data[features]

# Function to get distinct crop recommendations
def get_distinct_crop_recommendations(conditions, scaler, similarity_matrix, crop_labels, feature_data, top_n=5):
    """Finds top N distinct crop recommendations using cosine similarity."""
    features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    
    # Convert input conditions to numpy array
    input_conditions = np.array([[conditions[f] for f in features]])
    
    # Scale input conditions
    scaled_conditions = scaler.transform(input_conditions)
    
    # Compute similarity with all dataset entries
    similarities = cosine_similarity(scaled_conditions, scaler.transform(feature_data))[0]
    
    # Create DataFrame with crop labels and similarity scores
    similarity_df = pd.DataFrame({'crop': crop_labels, 'similarity': similarities, 'index': range(len(similarities))})
    
    # Get distinct top crops based on highest similarity
    top_distinct_crops = (similarity_df.sort_values('similarity', ascending=False)
                         .groupby('crop')
                         .first()
                         .sort_values('similarity', ascending=False)
                         .head(top_n))
    
    # Format recommendations
    recommendations = [{"crop": crop, "similarity": f"{row['similarity'] * 100:.2f}%"} for crop, row in top_distinct_crops.iterrows()]
    
    # Create a comma-separated string of recommended crops
    recommended_crops_string = ", ".join([crop["crop"].capitalize() for crop in recommendations])

    return recommendations, recommended_crops_string

# Initialize Flask app
app = Flask(__name__)

# Load crop data
CSV_PATH = "crop_recommendation.csv"  # Replace with your dataset path
scaler, similarity_matrix, crop_labels, feature_data = create_crop_recommender(CSV_PATH)

@app.route("/")
def home():
    return jsonify({"message": "Crop Recommendation API is running!"})

@app.route("/predict", methods=['POST'])
def predict():
    """API endpoint to get crop recommendations."""
    try:
        # Parse JSON request
        data = request.get_json()

        # Required features
        required_features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
        
        # Validate request data
        if not all(f in data for f in required_features):
            return jsonify({
                "success": False,
                "message": f"Missing one or more required features: {required_features}"
            })

        # Get crop recommendations
        recommendations, recommended_crops_string = get_distinct_crop_recommendations(
            data, scaler, similarity_matrix, crop_labels, feature_data
        )

        return jsonify({
            "success": True,
            "top_5_crops": recommendations,
            "recommended_crops_string": recommended_crops_string
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

# Run Flask app
if __name__ == "__main__":
    app.run(debug=True)
