import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MapLeaflet from './MapLeaflet';
import { getRecommendationByLocatoin } from '../../api/MLAPI'; // Import the API function
import { LogOut } from 'lucide-react';

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

    const handleLogout = () => {
      // Implement your logout logic here (e.g., clear tokens, redirect)
      console.log('Logged out!');
      navigate('/login'); // Example: Redirect to login page
    };

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

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear tokens, redirect)
    console.log('Logged out!');
    navigate('/login'); // Example: Redirect to login page
  };

  return (
    <div className="flex min-h-screen bg-gray-50">
      {/* Sidebar */}
      <aside className="w-64 fixed h-full bg-[#e3e3e3] shadow-lg">
        {' '}
        {/* Added bg-[#202124] */}
        <div className="p-6 border-b border-white">
          {' '}
          {/* Keep border white or use a lighter shade */}
          <h2 className="text-2xl font-bold text-center text-[#575b5f] flex items-center justify-center">
            🌾 Agri Dashboard
          </h2>
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="flex items-center px-4 py-2 rounded-lg text-[#575b5f] hover:bg-[#3c3c3c] hover:text-white transition-all duration-300" // Updated link styles
              >
                🏠 <span className="ml-2">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/"
                className="flex items-center px-4 py-2 rounded-lg text-[#575b5f] hover:bg-[#3c3c3c] hover:text-white transition-all duration-300" // Updated link styles
              >
                📋 <span className="ml-2">Input Data</span>
              </Link>
            </li>
            <li>
              <Link
                to="/crop-recommendation"
                className="flex items-center px-4 py-2 rounded-lg text-[#575b5f] hover:bg-[#3c3c3c] hover:text-white transition-all duration-300" // Updated link styles
              >
                🌍{' '}
                <span className="ml-2">
                  Location-based Crop Yield Prediction
                </span>
              </Link>
            </li>
            <li>
              <Link
                to="/crop-recommendations"
                className="flex items-center px-4 py-2 rounded-lg text-[#575b5f] hover:bg-[#3c3c3c] hover:text-white transition-all duration-300"
              >
                🌾 <span className="ml-2">Crop Recommendations</span>
              </Link>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 w-full p-8">
        <header className="flex justify-end items-center mb-6">
          {' '}
          {/* Flex for alignment */}
          <div className="flex items-center space-x-4">
            {' '}
            {/* Space between items */}
            <div className="rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center">
              <span className="text-gray-800 text-2xl">👨‍🌾</span>
              {'      '}
              {/* Farmer emoji */}
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              <LogOut />
              {/* Simple text logout */}
            </button>
          </div>
        </header>

        {/* Title Section */}

        <div className="p-6 bg-white rounded-lg shadow-sm mb-3 text-center">
          <h1 className="text-4xl font-bold text-gray-800">
            🌾 Location-based Crop Yield Prediction
          </h1>
        </div>

        {/* Map Section */}
        <MapLeaflet onMarkerPositionChange={setMarkerPosition} />

        {/* Generate Crop Recommendation Section */}
        <div className="p-8 bg-white rounded-lg shadow-lg mt-6">
          <div className="text-center mb-6">
            {' '}
            {/* Added margin bottom */}
            <button
              onClick={handleGenerateRecommendation}
              className="text-white bg-gradient-to-r from-green-400 via-green-500 to-green-600 hover:bg-gradient-to-br focus:ring-4 focus:outline-none focus:ring-green-300 dark:focus:ring-green-800 font-medium rounded-lg text-sm px-5 py-2.5 text-center me-2 mb-2"
              disabled={loading}
            >
              {loading ? 'Generating...' : ' Generate Crop Recommendation'}{' '}
              {/* Farmer emoji */}
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
