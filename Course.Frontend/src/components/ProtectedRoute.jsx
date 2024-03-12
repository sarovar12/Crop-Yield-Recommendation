// ProtectedRoute.jsx
import { useState, useEffect } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoute() {
  const [loggedIn, setLoggedIn] = useState(false);

  useEffect(() => {
    const checkAuthentication = () => {
      const loggedIn = Cookies.get('LoginCredentials');
      if (loggedIn) {
        setLoggedIn(true);
      }
    };

    checkAuthentication();
  }, []);

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
