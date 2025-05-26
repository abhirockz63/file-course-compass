
import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Eye, EyeOff } from 'lucide-react';

const Login = () => {
  // State to manage form inputs and password visibility
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const navigate = useNavigate();

  // Handle form submission
  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Login attempt:', { username, password });
    
    // Simple validation - in real app, this would connect to a backend
    if (username && password) {
      // Navigate to dashboard on successful login
      navigate('/dashboard');
    } else {
      alert('Please enter both username and password');
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-purple-100 to-purple-50 flex items-center justify-center p-4">
      <div className="bg-white rounded-lg shadow-xl p-8 w-full max-w-md">
        {/* App Title */}
        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-gray-800 mb-2">
            Course File Management System
          </h1>
          <p className="text-gray-600">Welcome back! Please sign in to continue.</p>
        </div>

        {/* Login Form */}
        <form onSubmit={handleLogin} className="space-y-6">
          {/* Username Input */}
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">
              Username
            </label>
            <input
              id="username"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
              placeholder="Enter your username"
              required
            />
          </div>

          {/* Password Input with Show/Hide Toggle */}
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-2">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-3 py-2 pr-10 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent"
                placeholder="Enter your password"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff size={20} /> : <Eye size={20} />}
              </button>
            </div>
          </div>

          {/* Login Button */}
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-purple-500 to-purple-600 text-white py-2 px-4 rounded-md hover:from-purple-600 hover:to-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2 transition duration-200 font-medium"
          >
            Sign In
          </button>

          {/* Forgot Password Link */}
          <div className="text-center">
            <a
              href="#"
              className="text-purple-600 hover:text-purple-800 text-sm font-medium"
              onClick={(e) => {
                e.preventDefault();
                alert('Forgot password functionality would be implemented here');
              }}
            >
              Forgot your password?
            </a>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Login;
