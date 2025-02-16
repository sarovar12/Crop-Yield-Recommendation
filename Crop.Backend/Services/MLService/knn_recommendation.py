from flask import Flask, request, jsonify
import numpy as np
import pickle
from sklearn.preprocessing import LabelEncoder

# Load trained models
model = pickle.load(open('model.pkl', 'rb'))
sc = pickle.load(open('standscaler.pkl', 'rb'))
ms = pickle.load(open('minmaxscaler.pkl', 'rb'))
label_encoder = pickle.load(open('label_encoder.pkl', 'rb'))  # Load label encoder

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

        # Extract features
        N = data.get("Nitrogen")
        P = data.get("Phosphorus")
        K = data.get("Potassium")
        temp = data.get("Temperature")
        humidity = data.get("Humidity")
        ph = data.get("Ph")
        rainfall = data.get("Rainfall")

        # Convert to numpy array & reshape
        feature_list = [N, P, K, temp, humidity, ph, rainfall]
        single_pred = np.array(feature_list).reshape(1, -1)

        # Apply scaling
        scaled_features = ms.transform(single_pred)
        final_features = sc.transform(scaled_features)

        # Predict top 5 crop recommendations using KNN
        distances, indices = model.kneighbors(final_features, n_neighbors=10)  # Fetch top 10 closest crops

        recommended_crops = []
        crops_seen = set()  # To ensure crops are unique in the top 5

        # Iterate over the predictions and ensure unique crops
        for index, distance in zip(indices[0], distances[0]):
            crop_id = model._y[index]  # Get crop ID from KNN model
            crop_name = label_encoder.inverse_transform([crop_id])[0]  # Decode back to crop name
            confidence = max(0, round((1 - distance) * 100, 2))  # Confidence score

            # Add unique crops to the result, only if not already added
            if crop_name not in crops_seen:
                recommended_crops.append({"crop": crop_name, "confidence": f"{confidence}%"})
                crops_seen.add(crop_name)

            # Stop once we have 5 unique crops
            if len(recommended_crops) >= 5:
                break

        # If fewer than 5 unique crops are found, pad with "Unknown Crop" entries (in case of duplicates)
        while len(recommended_crops) < 5:
            recommended_crops.append({"crop": "Unknown Crop", "confidence": "0%"})

        return jsonify({
            "success": True,
            "top_5_crops": recommended_crops
        })

    except Exception as e:
        return jsonify({"success": False, "error": str(e)})

# Run the Flask app
if __name__ == "__main__":
    app.run(debug=True)
