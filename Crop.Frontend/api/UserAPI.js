import axios from 'axios';

export async function LoginUser(username, password) {
  const response = await axios.post('https://localhost:7073/api/login', {
    EmailAddress: username,
    password,
  });
  const data = response.data;
  return data;
}

export async function RegisterUser(email, password, username) {
  const response = await axios.post('https://localhost:7073/api/register', {
    emailAddress: email,
    password,
    username,
  });
  return response.data;
}
