// RoutingHandler.jsx
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Login from '../pages/Login';
import Signup from '../pages/Signup';
import ProtectedRoute from './ProtectedRoute';
import Dashboard from '../pages/Dashboard';
import LocationPrediction from './LocationPrediction';

function RoutingHandler() {
  return (
    <Router>
      <Routes>
        {/* <Route path="/" element={<ProtectedRoute />}> */}
        <Route path="/" element={<Dashboard />} />
        <Route path="/crop-recommendation" element={<LocationPrediction />} />
        {/* </Route> */}
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
      </Routes>
    </Router>
  );
}

export default RoutingHandler;
