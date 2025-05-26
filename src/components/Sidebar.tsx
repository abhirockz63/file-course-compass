
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Dashboard, 
  Book, 
  FileText, 
  Map, 
  Tool, 
  TestTube, 
  Analysis,
  LogOut,
  Menu,
  X
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  // Navigation menu items with icons and routes
  const menuItems = [
    { name: 'Dashboard', icon: Dashboard, path: '/dashboard' },
    { name: 'Courses', icon: Book, path: '/courses' },
    { name: 'Documents', icon: FileText, path: '/upload' },
    { name: 'Mapping', icon: Map, path: '/mapping' },
    { name: 'Tools', icon: Tool, path: '/tools' },
    { name: 'Tests', icon: TestTube, path: '/tests' },
    { name: 'Analysis', icon: Analysis, path: '/analysis' },
  ];

  // Handle navigation
  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false); // Close mobile menu after navigation
  };

  // Handle logout
  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-4 left-4 z-50 bg-purple-600 text-white p-2 rounded-md"
      >
        {isOpen ? <X size={24} /> : <Menu size={24} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-64 bg-white shadow-lg transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center justify-center h-16 bg-gradient-to-r from-purple-600 to-purple-700">
          <h2 className="text-white font-bold text-lg">CFMS</h2>
        </div>

        {/* Navigation Menu */}
        <nav className="mt-8">
          <ul className="space-y-2 px-4">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center px-4 py-3 text-left rounded-lg transition-colors duration-200
                      ${isActive 
                        ? 'bg-purple-100 text-purple-700 border-r-4 border-purple-600' 
                        : 'text-gray-700 hover:bg-purple-50 hover:text-purple-600'
                      }
                    `}
                  >
                    <item.icon size={20} className="mr-3" />
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-4 left-4 right-4">
          <button
            onClick={handleLogout}
            className="w-full flex items-center px-4 py-3 text-gray-700 hover:bg-red-50 hover:text-red-600 rounded-lg transition-colors duration-200"
          >
            <LogOut size={20} className="mr-3" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black bg-opacity-50 z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
