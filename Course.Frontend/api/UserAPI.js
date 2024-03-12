import axios from 'axios';

export async function LoginUser(username, password) {
  const response = await axios.post('https://localhost:7086/api/login', {
    username,
    password,
  });
  const data = response.data;
  return data;
}
