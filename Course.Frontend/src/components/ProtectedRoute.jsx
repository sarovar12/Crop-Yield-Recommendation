import { useState } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import Cookies from 'js-cookie';

function ProtectedRoute() {
  const [loggedIn] = useState(() => {
    const loginVariable = Cookies.get('LoginUser');
    return !!loginVariable; // Convert to boolean
  });

  return loggedIn ? <Outlet /> : <Navigate to="/login" />;
}

export default ProtectedRoute;
