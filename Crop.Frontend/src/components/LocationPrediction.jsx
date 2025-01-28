import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import MapLeaflet from './MapLeaflet';

function LocationPrediction() {
  const [markerPosition, setMarkerPosition] = useState([0, 0]);

  useEffect(() => {
    console.log('Marker position updated:', markerPosition);
    console.log(typeof markerPosition);

    // Ensure markerPosition is in array format [lat, lng]
    const latLng = Array.isArray(markerPosition) // If it's an array, use it directly
      ? markerPosition
      : [markerPosition.lat, markerPosition.lng]; // If it's an object, extract lat and lng

    console.log('Using coordinates:', latLng); // Use latLng for further logic (e.g., crop recommendations)
  }, [markerPosition]);

  const handleGenerateRecommendation = () => {
    // Ensure markerPosition is in array format [lat, lng] before generating recommendation
    const latLng = Array.isArray(markerPosition)
      ? markerPosition
      : [markerPosition.lat, markerPosition.lng];

    const [lat, lon] = latLng;

    if (lat && lon) {
      alert(
        `Generating crop recommendation for:\nLatitude: ${lat}, Longitude: ${lon}`
      );
    } else {
      alert('Invalid location. Please select a valid location on the map.');
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
            >
              Generate Crop Recommendation for This Location
            </button>
          </div>
        </div>
      </main>
    </div>
  );
}

export default LocationPrediction;
