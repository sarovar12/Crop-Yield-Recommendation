import React, { useEffect, useState } from 'react';
import { fetchRecommendations } from '../../api/MLAPI';
import { Link } from 'react-router-dom';
import { LogOut } from 'lucide-react';

function CropRecommendations() {
  const [recommendations, setRecommendations] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function loadData() {
      try {
        const data = await fetchRecommendations();
        setRecommendations(data);
      } catch (err) {
        setError('Failed to fetch recommendations.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, []);

  const handleLogout = () => {
    // Implement your logout logic here (e.g., clear tokens, redirect)
    console.log('Logged out!');
    navigate('/login'); // Example: Redirect to login page
  };

  if (loading) return <p className="text-center">Loading...</p>;
  if (error) return <p className="text-center text-red-500">{error}</p>;

  return (
    <div className="flex h-screen bg-gray-50 overflow-hidden">
      {/* Sidebar */}
      <aside className="w-64 fixed h-full bg-[#e3e3e3] shadow-lg">
        <div className="p-6 border-b border-white">
          <h2 className="text-2xl font-bold text-center text-[#575b5f] flex items-center justify-center">
            🌾 Agri Dashboard
          </h2>
        </div>
        <nav className="mt-8">
          <ul className="space-y-4">
            <li>
              <Link
                to="/"
                className="flex items-center px-4 py-2 rounded-lg text-[#575b5f] hover:bg-[#3c3c3c] hover:text-white transition-all duration-300"
              >
                🏠 <span className="ml-2">Home</span>
              </Link>
            </li>
            <li>
              <Link
                to="/input-data"
                className="flex items-center px-4 py-2 rounded-lg text-[#575b5f] hover:bg-[#3c3c3c] hover:text-white transition-all duration-300"
              >
                📋 <span className="ml-2">Input Data</span>
              </Link>
            </li>
            <li>
              <Link
                to="/crop-recommendation"
                className="flex items-center px-4 py-2 rounded-lg text-[#575b5f] hover:bg-[#3c3c3c] hover:text-white transition-all duration-300"
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
      <main className="ml-64 flex-1 flex flex-col h-screen overflow-hidden">
        <header className="flex justify-end items-center p-8 pb-0">
          <div className="flex items-center space-x-4">
            <div className="rounded-full bg-gray-300 w-10 h-10 flex items-center justify-center">
              <span className="text-gray-800 text-2xl">👨‍🌾</span>
            </div>
            <button
              onClick={handleLogout}
              className="text-gray-600 hover:text-gray-800"
            >
              <LogOut />
            </button>
          </div>
        </header>

        <div className="p-8 flex flex-col flex-1 overflow-hidden">
          <h1 className="text-2xl font-bold text-gray-800 mb-4">
            🌾 Crop Recommendations
          </h1>

          <div className="flex-1 overflow-hidden bg-white shadow-md rounded-lg">
            <div className="overflow-x-auto overflow-y-auto max-h-full">
              <table className="w-full border-collapse min-w-max">
                <thead className="sticky top-0 bg-gray-200 z-10">
                  <tr className="text-gray-700">
                    <th className="px-4 py-2">ID</th>
                    <th className="px-4 py-2">Random Forest</th>
                    <th className="px-4 py-2">Gradient Boosting</th>
                    <th className="px-4 py-2">Rainfall</th>
                    <th className="px-4 py-2">Humidity</th>
                    <th className="px-4 py-2">Temperature</th>
                    <th className="px-4 py-2">Nitrogen</th>
                    <th className="px-4 py-2">Phosphorus</th>
                    <th className="px-4 py-2">Potassium</th>
                    <th className="px-4 py-2">pH Value</th>
                  </tr>
                </thead>
                <tbody>
                  {recommendations.map((rec) => (
                    <tr key={rec.Id} className="border-b hover:bg-gray-100">
                      <td className="px-4 py-2 text-center">{rec.Id}</td>
                      <td className="px-4 py-2 text-center">
                        {rec.RandomForestRecommendation.charAt(
                          0
                        ).toUpperCase() +
                          rec.RandomForestRecommendation.slice(1)}
                      </td>
                      <td className="px-4 py-2 text-center">
                        {rec.GradientBoostingRecommendation.charAt(
                          0
                        ).toUpperCase() +
                          rec.GradientBoostingRecommendation.slice(1)}
                      </td>
                      <td className="px-4 py-2 text-center">{rec.Rainfall}</td>
                      <td className="px-4 py-2 text-center">{rec.Humidity}</td>
                      <td className="px-4 py-2 text-center">
                        {rec.Temperature}
                      </td>
                      <td className="px-4 py-2 text-center">{rec.Nitrogen}</td>
                      <td className="px-4 py-2 text-center">
                        {rec.Phosphorus}
                      </td>
                      <td className="px-4 py-2 text-center">{rec.Potassium}</td>
                      <td className="px-4 py-2 text-center">{rec.PhValue}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

export default CropRecommendations;
