import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { getRecommendation } from '../../api/MLAPI';
import { LogOut } from 'lucide-react';

function Dashboard() {
  const [location, setLocation] = useState('Kathmandu');
  const [cropType, setCropType] = useState('Sugarcane');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [ph, setPh] = useState('');
  const [temperature, setTemperature] = useState('');

  const [recommendation, setRecommendation] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear tokens, redirect)
    console.log('Logged out!');
    navigate('/login'); // Example: Redirect to login page
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);

    try {
      const data = await getRecommendation(
        nitrogen,
        potassium,
        phosphorus,
        temperature,
        50, // Assuming humidity is static or replace it with a state
        ph,
        rainfall
      );
      setRecommendation(data);
    } catch (err) {
      setError('Failed to fetch recommendation.');
    } finally {
      setLoading(false);
    }
  };

  const handleReset = () => {
    setLocation('Kathmandu');
    setCropType('Sugarcane');
    setNitrogen('');
    setPhosphorus('');
    setPotassium('');
    setRainfall('');
    setPh('');
    setTemperature('');
    setRecommendation(null);
    setError(null);
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
        <div id="home" className="p-8 bg-white rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-100 p-6 rounded-lg shadow-lg hover:bg-indigo-200 transition-all duration-300 ease-in-out">
              <h2 className="font-semibold text-lg">Data Overview</h2>
              <p className="text-gray-700">Total Recomendation Generated: 4</p>
              <p className="text-gray-700"></p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:bg-green-200 transition-all duration-300 ease-in-out">
              <h2 className="font-semibold text-lg">
                Most Recent Recommendation
              </h2>
              <p className="text-gray-700">pH Level: 6.5</p>
              <p className="text-gray-700">Potassium: 45%</p>
            </div>
          </div>
        </div>
        <div id="input" className="p-8 bg-white rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl font-bold text-gray-800 mb-6">Input Data</h1>
          <form id="inputForm" onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Nitrogen (kg/ha):
                </label>
                <input
                  type="number"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phosphorus (kg/ha):
                </label>
                <input
                  type="number"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Potassium (kg/ha):
                </label>
                <input
                  type="number"
                  value={potassium}
                  onChange={(e) => setPotassium(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rainfall (mm):
                </label>
                <input
                  type="number"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  pH Level:
                </label>
                <input
                  type="number"
                  step="0.1"
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Temperature (°C):
                </label>
                <input
                  type="number"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full focus:ring-2 focus:ring-indigo-500"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400"
              >
                Reset
              </button>
            </div>
          </form>

          {/* Show Recommendation */}
          {loading && (
            <p className="mt-4 text-blue-600">Loading recommendation...</p>
          )}
          {error && <p className="mt-4 text-red-600">{error}</p>}
          {recommendation && (
            <div className="mt-6 p-4 bg-green-100 border border-green-500 rounded-lg shadow">
              <h2 className="text-lg font-semibold text-green-700">
                Recommended Crops:
              </h2>
              <p className="text-gray-800">
                🌱 <strong>Random Forest:</strong>{' '}
                {recommendation.RandomForestRecommendation}
              </p>
              <p className="text-gray-800">
                🌿 <strong>Gradient Boosting:</strong>{' '}
                {recommendation.GradientBoostingRecommendation}
              </p>
            </div>
          )}
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
