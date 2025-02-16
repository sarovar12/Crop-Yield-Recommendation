import pandas as pd
import numpy as np
import pickle
from sklearn.preprocessing import StandardScaler, MinMaxScaler, LabelEncoder
from sklearn.neighbors import KNeighborsClassifier

# Load dataset (Make sure data.csv exists)
df = pd.read_csv("crop_recommendation.csv")

# Define features and labels
X = df[['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']]
y = df['label']  # Crop label (categorical: 'rice', 'maize', etc.)

# Encode the labels (crop names)
label_encoder = LabelEncoder()
y_encoded = label_encoder.fit_transform(y)

# Scale the data
minmax_scaler = MinMaxScaler()
stand_scaler = StandardScaler()

X_minmax = minmax_scaler.fit_transform(X)
X_scaled = stand_scaler.fit_transform(X_minmax)

# Train KNN Model (K=5 for top 5 recommendations)
knn_model = KNeighborsClassifier(n_neighbors=5, metric='euclidean')
knn_model.fit(X_scaled, y_encoded)

# Save models
pickle.dump(knn_model, open("model.pkl", "wb"))
pickle.dump(minmax_scaler, open("minmaxscaler.pkl", "wb"))
pickle.dump(stand_scaler, open("standscaler.pkl", "wb"))
pickle.dump(label_encoder, open("label_encoder.pkl", "wb"))

print("Model trained and saved successfully!")
