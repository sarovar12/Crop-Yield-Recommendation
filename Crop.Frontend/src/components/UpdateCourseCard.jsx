import { useState } from 'react';
import { fetchCourseById, updateCourse } from '../../api/CourseAPI';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { useQuery } from 'react-query';
import Loading from './Loading';

function UpdateCourseCard({
  isOpen,
  onClose,
  courseId,
  courseName,
  courseDescription,
}) {
  const [nameError, setNameError] = useState(false);
  const [descriptionError, setDescriptionError] = useState(false);
  const navigate = useNavigate();
  const { data: course, isLoading } = useQuery('course', () =>
    fetchCourseById(courseId)
  );
  const [name, setName] = useState(courseName);
  const [description, setDescription] = useState(courseDescription);

  const handleUpdate = async () => {
    if (name.length < 5 || description.length < 5) {
      setNameError(name.length < 5);
      setDescriptionError(description.length < 5);
      return;
    }
    course.courseName = name;
    course.courseDescription = description;

    try {
      await updateCourse(course);
      toast.success('Successfully updated the course');
      onClose();
      navigate('/');
    } catch {
      toast.error('Unable to update the course');
    }
  };

  const handleNameChange = (e) => {
    setName(e.target.value);
    setNameError(e.target.value.length < 5);
  };

  const handleDescriptionChange = (e) => {
    setDescription(e.target.value);
    setDescriptionError(e.target.value.length < 5);
  };

  return (
    <>
      {isLoading ? (
        <Loading />
      ) : (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-gray-500 bg-opacity-75">
          <div className="bg-white w-1/2 p-6 rounded-lg shadow-xl">
            <h2 className="text-xl font-bold mb-4">Update Course</h2>
            <form>
              <div className="mb-4">
                <label
                  htmlFor="name"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Name:
                </label>
                <input
                  type="text"
                  id="name"
                  value={name}
                  onChange={handleNameChange}
                  className={`border rounded px-4 py-2 w-full ${
                    nameError ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter course name"
                />
                {nameError && (
                  <p className="text-red-500 text-sm mt-1">
                    Name must be at least 5 characters
                  </p>
                )}
              </div>
              <div className="mb-4">
                <label
                  htmlFor="description"
                  className="block text-gray-700 font-bold mb-2"
                >
                  Description:
                </label>
                <textarea
                  id="description"
                  value={description}
                  onChange={handleDescriptionChange}
                  className={`border rounded px-4 py-2 w-full h-32 ${
                    descriptionError ? 'border-red-500' : ''
                  }`}
                  placeholder="Enter course description"
                />
                {descriptionError && (
                  <p className="text-red-500 text-sm mt-1">
                    Description must be at least 5 characters
                  </p>
                )}
              </div>
              <div className="flex justify-end">
                <button
                  type="button"
                  onClick={onClose}
                  className="mr-4 bg-gray-400 hover:bg-gray-500 text-white font-bold py-2 px-4 rounded"
                >
                  Cancel
                </button>
                <button
                  type="button"
                  onClick={handleUpdate}
                  className="bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded"
                >
                  Update
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

export default UpdateCourseCard;
