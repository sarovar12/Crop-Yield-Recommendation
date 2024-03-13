import axios from 'axios';

function axiosClient() {
  // Retrieve JWT token from cookie
  const token = getCookie('LoginUser');

  // Create Axios instance with token in headers
  return axios.create({
    baseURL: 'https://localhost:7073/api/courses',
    headers: {
      'Content-Type': 'application/json',
      Accept: 'application/json',
      Authorization: `Bearer ${token}`, // Add JWT token as Bearer token
    },
  });
}

// Function to get cookie by name
function getCookie(name) {
  const value = `; ${document.cookie}`;
  const parts = value.split(`; ${name}=`);
  if (parts.length === 2) return parts.pop().split(';').shift();
}

export async function fetchCourses() {
  const response = await axiosClient().get();
  const data = response.data;
  return data;
}

export async function fetchCourseById(id) {
  const response = await axiosClient().get(`/${id}`);
  const data = response.data;
  return data;
}

export async function addCourse(courseName, courseDescription) {
  const response = await axiosClient().post('', {
    courseName,
    courseDescription,
  });
  const data = response.data;
  return data;
}
export async function updateCourse(course) {
  const response = await axiosClient().put(`/${course.courseId}`, course);
  const data = response.data;
  return data;
}

export async function deleteCourse(courseId) {
  const response = await axiosClient().delete(`/${courseId}`);
  const data = response.data;
  return data;
}
