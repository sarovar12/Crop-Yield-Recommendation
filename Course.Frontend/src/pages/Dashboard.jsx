import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useQuery } from 'react-query';
import { fetchCourses } from '../../api/CourseAPI';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import AddCourseCard from '../components/AddCourseCard';
function Dashboard() {
  const [username, setUsername] = useState('');
  const [isModalOpen, setIsModalOpen] = useState(false); // State for modal visibility
  const [courses, setCourses] = useState([]); // State for storing courses
  const navigate = useNavigate();
  const { data: contacts } = useQuery('infoContact', () => fetchCourses());

  useEffect(() => {
    const token = Cookies.get('LoginUser');

    if (token) {
      try {
        const decodedJwt = jwtDecode(token);
        setUsername(decodedJwt.Username);
      } catch (error) {
        navigate('/login');
      }
    } else {
      navigate('/login');
    }
  }, []);

  useEffect(() => {
    if (contacts) {
      setCourses(contacts);
    }
  }, [contacts]);

  const handleLogout = () => {
    Cookies.remove('LoginUser');
    navigate('/login');
  };

  const handleDelete = (courseId) => {
    // Implement delete functionality here
    console.log(`Delete course with ID ${courseId}`);
  };

  const handleEdit = (courseId) => {
    // Implement edit functionality here
    console.log(`Edit course with ID ${courseId}`);
  };


  return (
    <div>
      <div className="flex justify-between items-center p-4 bg-gray-200">
        <div className="text-xl font-bold">Welcome, {username}</div>
        <button className="text-red-600" onClick={handleLogout}>
          Logout
        </button>
      </div>
      <div className="p-4">
        <button
          className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
          onClick={() => setIsModalOpen(true)}
        >
          Add Course
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {courses.map((course) => (
          <div
            key={course.courseId}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">{course.courseName}</h2>
              <div className="flex space-x-2">
                <button
                  className="text-red-600"
                  onClick={() => handleDelete(course.courseId)}
                >
                  <MdDelete />
                </button>
                <button
                  className="text-blue-600"
                  onClick={() => handleEdit(course.courseId)}
                >
                  <MdModeEdit />
                </button>
              </div>
            </div>
            <p className="text-gray-600">{course.courseDescription}</p>
          </div>
        ))}
      </div>
      <AddCourseCard
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
      />
    </div>
  );
}

export default Dashboard;
