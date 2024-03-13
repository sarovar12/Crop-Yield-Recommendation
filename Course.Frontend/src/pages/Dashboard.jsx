import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useQuery } from 'react-query';
import { fetchCourses } from '../../api/CourseAPI';
import { MdDelete, MdModeEdit } from 'react-icons/md';
import AddCourseCard from '../components/AddCourseCard';
import UpdateCourseCard from '../components/UpdateCourseCard';
import DeleteConfirmationModal from '../components/DeleteConfirmationCard';

function Dashboard() {
  const [username, setUsername] = useState('');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isUpdateModalOpen, setIsUpdateModalOpen] = useState(false);
  const [selectedCourseId, setSelectedCourseId] = useState(null);
  const [selectedCourseName, setSelectedCourseName] = useState(null);
  const [selectedDescription, setSelectedDescription] = useState(null);
  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const navigate = useNavigate();
  const { data: courses } = useQuery('infocourses', () => fetchCourses());

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

  const handleLogout = () => {
    Cookies.remove('LoginUser');
    navigate('/login');
  };

  const handleDelete = (courseId, courseName) => {
    setSelectedCourseId(courseId);
    setSelectedCourseName(courseName);
    setIsDeleteModalOpen(true);
  };

  const handleEdit = (courseId, courseName, courseDescription) => {
    setSelectedCourseId(courseId);
    setSelectedCourseName(courseName);
    setSelectedDescription(courseDescription);
    setIsUpdateModalOpen(true);
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
          onClick={() => setIsAddModalOpen(true)}
        >
          Add Course
        </button>
      </div>
      <div className="grid grid-cols-2 gap-4 p-4">
        {courses?.map((course) => (
          <div
            key={course.courseId}
            className="bg-white rounded-lg shadow-md p-4"
          >
            <div className="flex justify-between items-center mb-2">
              <h2 className="text-xl font-bold">{course.courseName}</h2>
              <div className="flex space-x-2">
                <button
                  className="text-red-600"
                  onClick={() =>
                    handleDelete(course.courseId, course.courseName)
                  }
                >
                  <MdDelete />
                </button>
                <button
                  className="text-blue-600"
                  onClick={() =>
                    handleEdit(
                      course.courseId,
                      course.courseName,
                      course.courseDescription
                    )
                  }
                >
                  <MdModeEdit />
                </button>
              </div>
            </div>
            <p className="text-gray-600">{course.courseDescription}</p>
          </div>
        ))}
      </div>
      {isAddModalOpen && (
        <AddCourseCard
          isOpen={isAddModalOpen}
          onClose={() => setIsAddModalOpen(false)}
        />
      )}
      {isUpdateModalOpen && (
        <UpdateCourseCard
          isOpen={isUpdateModalOpen}
          onClose={() => setIsUpdateModalOpen(false)}
          courseId={selectedCourseId}
          courseName={selectedCourseName}
          courseDescription={selectedDescription}
        />
      )}
      {isDeleteModalOpen && (
        <DeleteConfirmationModal
          isOpen={isDeleteModalOpen}
          onClose={() => setIsDeleteModalOpen(false)}
          courseName={selectedCourseName}
          courseId={selectedCourseId}
        />
      )}
    </div>
  );
}

export default Dashboard;
