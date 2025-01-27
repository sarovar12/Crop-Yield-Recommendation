// SidebarLayout.jsx
import { Link, Outlet, useLocation } from 'react-router-dom';
import { useState } from 'react';
import { Home, MapPin, BarChart } from 'lucide-react';

function SidebarLayout() {
  const location = useLocation();
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  const navLinks = [
    { path: '/', name: 'Home', icon: <Home /> },
    {
      path: '/crop-recommendation',
      name: 'Crop Recommendation',
      icon: <MapPin />,
    },
    {
      path: '/self-yield-recommendation',
      name: 'Self Crop Yield',
      icon: <BarChart />,
    },
  ];

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <div
        className={`${
          isSidebarOpen ? 'w-64' : 'w-16'
        } bg-indigo-700 text-white transition-all duration-300`}
      >
        <button
          onClick={() => setIsSidebarOpen(!isSidebarOpen)}
          className="p-4 focus:outline-none"
        >
          ☰
        </button>
        <nav className="mt-4">
          {navLinks.map((link) => (
            <Link
              to={link.path}
              key={link.name}
              className={`flex items-center p-4 hover:bg-indigo-600 ${
                location.pathname === link.path ? 'bg-indigo-600' : ''
              }`}
            >
              <div className="mr-4">{link.icon}</div>
              {isSidebarOpen && <span>{link.name}</span>}
            </Link>
          ))}
        </nav>
      </div>

      {/* Main Content */}
      <div className="flex-1 bg-gray-100 p-6">
        <Outlet />
      </div>
    </div>
  );
}

export default SidebarLayout;
