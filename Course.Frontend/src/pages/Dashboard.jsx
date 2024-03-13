import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Cookies from 'js-cookie';
import { toast } from 'react-toastify';

function Dashboard() {
  const [username, setUsername] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    // Fetch JWT token from the cookie
    const token = Cookies.get('LoginUser');

    if (token) {
      // Decode the JWT token to extract user's name
      const decodedToken = parseJwt(token);
      if (decodedToken && decodedToken.username) {
        setUsername(decodedToken.username);
      }
    } else {
      // If token is not available, navigate to login page
      navigate('/login');
    }
  }, [navigate]);

  const handleLogout = () => {
    // Remove the LoginUser cookie
    Cookies.remove('LoginUser');
    toast.success('User Logged Out Successfully');
    // Navigate to login page
    navigate('/login');
  };

  return (
    <div className="flex justify-between items-center p-4 bg-gray-200">
      <div className="text-xl font-bold">Welcome, {username}</div>
      <button className="text-red-600" onClick={handleLogout}>
        Logout
      </button>
    </div>
  );
}

// Function to decode JWT token
function parseJwt(token) {
  try {
    return JSON.parse(atob(token.split('.')[1]));
  } catch (e) {
    return null;
  }
}

export default Dashboard;
