// import React, { useEffect, useState } from 'react';
// import { useNavigate } from 'react-router-dom';
// import Cookies from 'js-cookie';
// import { jwtDecode } from 'jwt-decode';
// import { useQuery } from 'react-query';
// import { fetchCourses } from '../../api/CourseAPI';
// import { MdDelete, MdModeEdit } from 'react-icons/md';
// import AddCourseCard from '../components/AddCourseCard';
// import UpdateCourseCard from '../components/UpdateCourseCard';
// import DeleteConfirmationModal from '../components/DeleteConfirmationCard';

// function Dashboard() {
//   const [username, setUsername] = useState('');
//   const [isAddModalOpen, setIsAddModalOpen] = useState(false);
//   const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
//   const [selectedCourseId, setSelectedCourseId] = useState(null);
//   const [selectedCourseName, setSelectedCourseName] = useState(null);
//   const [selectedDescription, setSelectedDescription] = useState(null);
//   const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
//   const navigate = useNavigate();
//   const { data: courses } = useQuery('infocourses', () => fetchCourses());

//   useEffect(() => {
//     const token = Cookies.get('LoginUser');

//     if (token) {
//       try {
//         const decodedJwt = jwtDecode(token);
//         setUsername(decodedJwt.Username);
//       } catch (error) {
//         navigate('/login');
//       }
//     } else {
//       navigate('/login');
//     }
//   }, []);

//   const handleLogout = () => {
//     Cookies.remove('LoginUser');
//     navigate('/login');
//   };

//   const handleDelete = (courseId, courseName) => {
//     setSelectedCourseId(courseId);
//     setSelectedCourseName(courseName);
//     setIsDeleteModalOpen(true);
//   };

//   const handleEdit = (courseId, courseName, courseDescription) => {
//     setSelectedCourseId(courseId);
//     setSelectedCourseName(courseName);
//     setSelectedDescription(courseDescription);
//     setIsUpdateModalOpen(true);
//   };

//   return (
//     <div>
//       <div className="flex justify-between items-center p-4 bg-gray-200">
//         <div className="text-xl font-bold">Welcome, {username}</div>
//         <button className="text-red-600" onClick={handleLogout}>
//           Logout
//         </button>
//       </div>
//       <div className="p-4">
//         <button
//           className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
//           onClick={() => setIsAddModalOpen(true)}
//         >
//           Add Course
//         </button>
//       </div>
//       <div className="grid grid-cols-2 gap-4 p-4">
//         {courses?.map((course) => (
//           <div
//             key={course.courseId}
//             className="bg-white rounded-lg shadow-md p-4"
//           >
//             <div className="flex justify-between items-center mb-2">
//               <h2 className="text-xl font-bold">{course.courseName}</h2>
//               <div className="flex space-x-2">
//                 <button
//                   className="text-red-600"
//                   onClick={() =>
//                     handleDelete(course.courseId, course.courseName)
//                   }
//                 >
//                   <MdDelete />
//                 </button>
//                 <button
//                   className="text-blue-600"
//                   onClick={() =>
//                     handleEdit(
//                       course.courseId,
//                       course.courseName,
//                       course.courseDescription
//                     )
//                   }
//                 >
//                   <MdModeEdit />
//                 </button>
//               </div>
//             </div>
//             <p className="text-gray-600">{course.courseDescription}</p>
//           </div>
//         ))}
//       </div>
//       {isAddModalOpen && (
//         <AddCourseCard
//           isOpen={isAddModalOpen}
//           onClose={() => setIsAddModalOpen(false)}
//         />
//       )}
//       {isUpdateModalOpen && (
//         <UpdateCourseCard
//           isOpen={isUpdateModalOpen}
//           onClose={() => setIsUpdateModalOpen(false)}
//           courseId={selectedCourseId}
//           courseName={selectedCourseName}
//           courseDescription={selectedDescription}
//         />
//       )}
//       {isDeleteModalOpen && (
//         <DeleteConfirmationModal
//           isOpen={isDeleteModalOpen}
//           onClose={() => setIsDeleteModalOpen(false)}
//           courseName={selectedCourseName}
//           courseId={selectedCourseId}
//         />
//       )}
//     </div>
//   );
// }

// export default Dashboard;

import React, { useState } from 'react';

function Dashboard() {
  const [location, setLocation] = useState('Kathmandu');
  const [cropType, setCropType] = useState('Sugarcane');
  const [nitrogen, setNitrogen] = useState('');
  const [phosphorus, setPhosphorus] = useState('');
  const [potassium, setPotassium] = useState('');
  const [rainfall, setRainfall] = useState('');
  const [weatherData, setWeatherData] = useState('Pre-filled weather data');
  const [satelliteData, setSatelliteData] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission here
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Home Section */}
      <div id="home" className="p-8 bg-white rounded-lg shadow-lg m-6">
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
      <div id="input" className="p-8 bg-white rounded-lg shadow-lg m-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">Input Data</h1>
        <form id="inputForm" onSubmit={handleSubmit} className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Location:
              </label>
              <select
                id="location"
                name="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition-all duration-300"
              >
                <option value="Kathmandu">Kathmandu</option>
                <option value="location2">Location 2</option>
                <option value="location3">Location 3</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium text-gray-700">
                Crop Type:
              </label>
              <select
                id="cropType"
                name="cropType"
                value={cropType}
                onChange={(e) => setCropType(e.target.value)}
                className="mt-2 p-3 border rounded-lg w-full focus:outline-none focus:ring-2 focus:ring-indigo-500 hover:border-indigo-500 transition-all duration-300"
              >
                <option value="Sugarcane">Sugarcane</option>
                <option value="Wheat">Wheat</option>
                <option value="Rice">Rice</option>
                <option value="Maize">Maize</option>
              </select>
            </div>
          </div>

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

          <div className="mt-6 flex justify-between">
            <button
              type="submit"
              className="px-6 py-3 bg-indigo-600 text-white rounded-lg hover:bg-indigo-700 transition-all duration-300"
            >
              Submit
            </button>
            <button
              type="reset"
              className="px-6 py-3 bg-gray-300 text-black rounded-lg hover:bg-gray-400 transition-all duration-300"
            >
              Reset
            </button>
          </div>
        </form>
      </div>

      {/* Prediction Results Section */}
      <div id="prediction" className="p-8 bg-white rounded-lg shadow-lg m-6">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Prediction Results
        </h1>
        <div className="bg-blue-100 p-6 rounded-lg mb-6">
          <h2 className="font-semibold text-lg">
            Yield Prediction: 3500 kg/ha
          </h2>
          <p className="text-gray-700">Accuracy: 85%</p>
          <h3 className="mt-4 font-semibold">Suggested Actions:</h3>
          <ul className="list-disc pl-6 text-gray-700">
            <li>Increase fertilizer usage by 10%</li>
            <li>Switch to drip irrigation</li>
          </ul>
        </div>

        {/* Chart Display */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold">Yield Trend</h3>
            <canvas id="yieldTrend"></canvas>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold">Weather Impact</h3>
            <canvas id="weatherImpact"></canvas>
          </div>
          <div className="bg-gray-100 p-6 rounded-lg shadow-md">
            <h3 className="font-semibold">Soil Condition Impact</h3>
            <canvas id="soilImpact"></canvas>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Dashboard;
