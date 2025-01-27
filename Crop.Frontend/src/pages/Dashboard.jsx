import React, { useState } from 'react';
import { Link } from 'react-router-dom';

function Dashboard() {
  const [location, setLocation] = useState('Kathmandu');
  const [cropType, setCropType] = useState('Sugarcane');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [ph, setPh] = useState('');
  const [temperature, setTemperature] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log({
      location,
      cropType,
      nitrogen,
      phosphorus,
      potassium,
      rainfall,
      ph,
      temperature,
    });
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
              <a
                href="#home"
                className="block px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300"
              >
                Home
              </a>
            </li>
            <li>
              <a
                href="#input"
                className="block px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300"
              >
                Input Data
              </a>
            </li>
            <li>
              <a className="block px-4 py-2 rounded-lg hover:bg-indigo-600 transition-all duration-300">
                <Link to="/crop-recommendation">
                  Location-based Crop Recommendation
                </Link>
              </a>
            </li>
          </ul>
        </nav>
      </aside>

      {/* Main Content */}
      <main className="ml-64 w-full p-8">
        {/* Home Section */}
        <div id="home" className="p-8 bg-white rounded-lg shadow-lg mb-6">
          <h1 className="text-3xl font-bold text-center text-gray-800 mb-6">
            Dashboard
          </h1>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <div className="bg-indigo-100 p-6 rounded-lg shadow-lg hover:bg-indigo-200 transition-all duration-300 ease-in-out">
              <h2 className="font-semibold text-lg">Weather Overview</h2>
              <p className="text-gray-700">Current weather: Sunny, 25°C</p>
              <p className="text-gray-700">Forecast: Rain expected in 2 days</p>
            </div>
            <div className="bg-green-100 p-6 rounded-lg shadow-lg hover:bg-green-200 transition-all duration-300 ease-in-out">
              <h2 className="font-semibold text-lg">Soil Condition</h2>
              <p className="text-gray-700">pH Level: 6.5</p>
              <p className="text-gray-700">Moisture: 45%</p>
            </div>
          </div>
        </div>

        {/* Input Data Section */}
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
                  id="nitrogen"
                  name="nitrogen"
                  value={nitrogen}
                  onChange={(e) => setNitrogen(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Phosphorus (kg/ha):
                </label>
                <input
                  type="number"
                  id="phosphorus"
                  name="phosphorus"
                  value={phosphorus}
                  onChange={(e) => setPhosphorus(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition-all duration-300"
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
                  id="potassium"
                  name="potassium"
                  value={potassium}
                  onChange={(e) => setPotassium(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Rainfall (mm):
                </label>
                <input
                  type="number"
                  id="rainfall"
                  name="rainfall"
                  value={rainfall}
                  onChange={(e) => setRainfall(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition-all duration-300"
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
                  id="ph"
                  name="ph"
                  value={ph}
                  onChange={(e) => setPh(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition-all duration-300"
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Temperature (°C):
                </label>
                <input
                  type="number"
                  id="temperature"
                  name="temperature"
                  value={temperature}
                  onChange={(e) => setTemperature(e.target.value)}
                  className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition-all duration-300"
                />
              </div>
            </div>

            <div className="mt-6 flex justify-between">
              <button
                type="submit"
                className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
              >
                Submit
              </button>
              <button
                type="button"
                onClick={handleReset}
                className="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all duration-300"
              >
                Reset
              </button>
            </div>
          </form>
        </div>
      </main>
    </div>
  );
}

export default Dashboard;
