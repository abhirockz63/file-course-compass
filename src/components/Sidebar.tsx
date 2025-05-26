
import { useState } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { 
  Home, 
  Book, 
  FileText, 
  Map, 
  Settings, 
  TestTube, 
  BarChart3,
  LogOut,
  Menu,
  X,
  Sparkles
} from 'lucide-react';

const Sidebar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: 'Dashboard', icon: Home, path: '/dashboard' },
    { name: 'Courses', icon: Book, path: '/courses' },
    { name: 'Documents', icon: FileText, path: '/upload' },
    { name: 'Mapping', icon: Map, path: '/mapping' },
    { name: 'Tools', icon: Settings, path: '/tools' },
    { name: 'Tests', icon: TestTube, path: '/tests' },
    { name: 'Analysis', icon: BarChart3, path: '/analysis' },
  ];

  const handleNavigation = (path: string) => {
    navigate(path);
    setIsOpen(false);
  };

  const handleLogout = () => {
    console.log('Logging out...');
    navigate('/');
  };

  return (
    <>
      {/* Mobile Menu Button */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="lg:hidden fixed top-6 left-6 z-50 bg-white/80 backdrop-blur-xl border border-slate-200 text-slate-700 p-3 rounded-2xl shadow-lg hover:shadow-xl transition-all duration-200"
      >
        {isOpen ? <X size={20} /> : <Menu size={20} />}
      </button>

      {/* Sidebar */}
      <div className={`
        fixed inset-y-0 left-0 z-40 w-72 bg-white/60 backdrop-blur-xl border-r border-slate-200/50 transform transition-transform duration-300 ease-in-out
        ${isOpen ? 'translate-x-0' : '-translate-x-full'}
        lg:translate-x-0 lg:static lg:inset-0
      `}>
        {/* Sidebar Header */}
        <div className="flex items-center gap-3 h-20 px-6 border-b border-slate-200/50">
          <div className="w-10 h-10 bg-gradient-to-r from-indigo-500 to-purple-600 rounded-xl flex items-center justify-center">
            <Sparkles className="h-5 w-5 text-white" />
          </div>
          <div>
            <h2 className="text-lg font-bold text-slate-800">CFMS</h2>
            <p className="text-xs text-slate-500 font-medium">Course Management</p>
          </div>
        </div>

        {/* Navigation Menu */}
        <nav className="p-6">
          <ul className="space-y-2">
            {menuItems.map((item) => {
              const isActive = location.pathname === item.path;
              return (
                <li key={item.name}>
                  <button
                    onClick={() => handleNavigation(item.path)}
                    className={`
                      w-full flex items-center gap-3 px-4 py-3 text-left rounded-xl transition-all duration-200 group
                      ${isActive 
                        ? 'bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg' 
                        : 'text-slate-600 hover:bg-slate-100/80 hover:text-slate-800'
                      }
                    `}
                  >
                    <item.icon size={18} className={`${isActive ? 'text-white' : 'text-slate-500 group-hover:text-slate-700'}`} />
                    <span className="font-medium">{item.name}</span>
                  </button>
                </li>
              );
            })}
          </ul>
        </nav>

        {/* Logout Button */}
        <div className="absolute bottom-6 left-6 right-6">
          <button
            onClick={handleLogout}
            className="w-full flex items-center gap-3 px-4 py-3 text-slate-600 hover:bg-red-50 hover:text-red-600 rounded-xl transition-all duration-200 group"
          >
            <LogOut size={18} className="text-slate-500 group-hover:text-red-600" />
            <span className="font-medium">Logout</span>
          </button>
        </div>
      </div>

      {/* Overlay for mobile */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-slate-900/20 backdrop-blur-sm z-30 lg:hidden"
          onClick={() => setIsOpen(false)}
        />
      )}
    </>
  );
};

export default Sidebar;
