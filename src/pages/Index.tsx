
import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Index = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Redirect to login page
    navigate('/');
  }, [navigate]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-purple-100 to-purple-50">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4 text-gray-800">Course File Management System</h1>
        <p className="text-xl text-gray-600">Redirecting to login...</p>
      </div>
    </div>
  );
};

export default Index;
