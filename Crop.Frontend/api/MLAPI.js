import axios from 'axios';

function axiosClient() {
  // Retrieve JWT token from cookie
  const token = getCookie('LoginUser');

  // Create Axios instance with token in headers
  return axios.create({
    baseURL: 'https://localhost:7073/api/ml',
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

export async function getRecommendation(
  nitrogen,
  potassium,
  phosphorus,
  temperature,
  humidity,
  phValue,
  rainfall
) {
  const response = await axiosClient().post('/getRecommendation', {
    nitrogen,
    potassium,
    phosphorus,
    temperature,
    humidity,
    phValue,
    rainfall,
  });
  const data = response.data;
  return data;
}

export async function getRecommendationByLocatoin(latitude, longitude) {
  const response = await axiosClient().post('/getRecommendationByLocation', {
    latitude,
    longitude,
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
