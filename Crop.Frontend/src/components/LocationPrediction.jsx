import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MapLeaflet from './MapLeaflet';
import { getRecommendationByLocatoin } from '../../api/MLAPI'; // Import the API function

function LocationPrediction() {
  const [markerPosition, setMarkerPosition] = useState([0, 0]);
  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    console.log('Marker position updated:', markerPosition);
  }, [markerPosition]);

  const handleGenerateRecommendation = async () => {
    const latLng = Array.isArray(markerPosition)
      ? markerPosition
      : [markerPosition.lat, markerPosition.lng];

    const [latitude, longitude] = latLng;

    if (!latitude || !longitude) {
      alert('Invalid location. Please select a valid location on the map.');
      return;
    }

    try {
      setLoading(true);
      setError(null);
      const data = await getRecommendationByLocatoin(latitude, longitude);
      setRecommendation(data);
    } catch (err) {
      setError('Failed to fetch recommendation. Please try again.');
      console.error(err);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 bg-indigo-700 text-white fixed h-full shadow-lg">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center">Agri Dashboard</h2>
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="block px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300"
              >
                Home
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="block px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300"
              >
                Input Data
              </Link>
            </li>
            <li>
              <Link
                to="/crop-recommendation"
                className="block px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300"
              >
                Location-based Crop Yield Prediction
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 w-full p-8">
        {/* Map Section */}
        <MapLeaflet onMarkerPositionChange={setMarkerPosition} />

        {/* Generate Crop Recommendation Section */}
        <div className="p-8 bg-white rounded-lg shadow-lg mt-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">
            Location-based Crop Yield Prediction
          </h1>

          <div className="text-center">
            <button
              onClick={handleGenerateRecommendation}
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
              disabled={loading}
            >
              {loading
                ? 'Generating...'
                : 'Generate Crop Recommendation for This Location'}
            </button>
          </div>

          {/* Display Recommendation */}
          {recommendation && (
            <div className="mt-6 p-6 bg-green-100 rounded-lg shadow-md">
              <h2 className="text-xl font-semibold text-center mb-4">
                🌱 Recommended Crops
              </h2>
              <p className="text-lg">
                <strong>🌾 Random Forest:</strong>{' '}
                {recommendation.RandomForest || 'N/A'}
              </p>
              <p className="text-lg">
                <strong>🌿 Gradient Boosting:</strong>{' '}
                {recommendation.GradientBoosting || 'N/A'}
              </p>

              <h2 className="text-xl font-semibold text-center mt-6 mb-4">
                🧪 Soil Nutrient Levels
              </h2>
              <div className="grid grid-cols-2 gap-4 text-lg">
                <p>
                  <strong>🟡 Nitrogen:</strong>{' '}
                  {recommendation.Nitrogen || 'N/A'}
                </p>
                <p>
                  <strong>🟠 Phosphorus:</strong>{' '}
                  {recommendation.Phosphorus || 'N/A'}
                </p>
                <p>
                  <strong>🟢 Potassium:</strong>{' '}
                  {recommendation.Potassium || 'N/A'}
                </p>
                <p>
                  <strong>🧪 pH Value:</strong>{' '}
                  {recommendation.PhValue || 'N/A'}
                </p>
              </div>
            </div>
          )}

          {/* Error Message */}
          {error && <p className="mt-4 text-red-500 text-center">{error}</p>}
        </div>
      </main>
    </div>
  );
}

export default LocationPrediction;
