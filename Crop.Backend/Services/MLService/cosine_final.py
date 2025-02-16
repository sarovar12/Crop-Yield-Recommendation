import pandas as pd
import numpy as np
from sklearn.preprocessing import StandardScaler
from sklearn.metrics.pairwise import cosine_similarity

def create_crop_recommender(csv_path):
    """
    Creates a crop recommendation system using content-based filtering with cosine similarity
    
    Parameters:
    csv_path (str): Path to the CSV file containing crop data
    """
    # Read the CSV file
    data = pd.read_csv(csv_path)
    
    # Select features for similarity calculation
    features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    
    # Standardize the features
    scaler = StandardScaler()
    scaled_features = scaler.fit_transform(data[features])
    
    # Calculate cosine similarity matrix
    similarity_matrix = cosine_similarity(scaled_features)
    
    return scaler, similarity_matrix, data['label'].values, data[features]

def get_crop_recommendations(conditions, scaler, similarity_matrix, crop_labels, feature_data, top_n=5):
    """
    Get top N crop recommendations for given conditions
    
    Parameters:
    conditions (dict): Dictionary containing values for N, P, K, temperature, humidity, ph, rainfall
    scaler (StandardScaler): Fitted scaler object
    similarity_matrix (numpy.ndarray): Pre-calculated similarity matrix
    crop_labels (numpy.ndarray): Array of crop labels
    feature_data (pandas.DataFrame): Original feature data
    top_n (int): Number of recommendations to return
    
    Returns:
    list: List of tuples containing (crop_name, similarity_score, conditions_comparison)
    """
    # Convert conditions to array format
    features = ['N', 'P', 'K', 'temperature', 'humidity', 'ph', 'rainfall']
    input_conditions = np.array([[conditions[f] for f in features]])
    
    # Scale the input conditions
    scaled_conditions = scaler.transform(input_conditions)
    
    # Calculate similarity with all existing records
    similarities = cosine_similarity(scaled_conditions, scaler.transform(feature_data))[0]
    
    # Get indices of top N similar records
    top_indices = np.argsort(similarities)[-top_n:][::-1]
    
    # Create recommendations list with similarity scores and conditions comparison
    recommendations = []
    for idx in top_indices:
        crop = crop_labels[idx]
        similarity = similarities[idx]
        conditions_comparison = {
            feature: {
                'input': conditions[feature],
                'similar_case': feature_data.iloc[idx][feature]
            }
            for feature in features
        }
        recommendations.append((crop, similarity, conditions_comparison))
    
    return recommendations

# Example usage
if __name__ == "__main__":
    csv_path = "crop_recommendation.csv"  
    
    # Create the recommendation system
    scaler, similarity_matrix, crop_labels, feature_data = create_crop_recommender(csv_path)
    
    # Example conditions for which we want recommendations
    sample_conditions = {
        'N': 80,
        'P': 45,
        'K': 40,
        'temperature': 22.5,
        'humidity': 82.0,
        'ph': 6.8,
        'rainfall': 240.0
    }
    
    # Get recommendations
    recommendations = get_crop_recommendations(
        sample_conditions, 
        scaler, 
        similarity_matrix, 
        crop_labels,
        feature_data
    )
    
    # Print recommendations with detailed comparison
    print("\nTop 5 recommended crops:")
    for crop, similarity, conditions in recommendations:
        print(f"\n{crop.upper()}: Similarity Score = {similarity:.4f}")
        print("Conditions Comparison:")
        for feature, values in conditions.items():
            print(f"{feature:12} Input: {values['input']:8.2f} | Similar case: {values['similar_case']:8.2f}")