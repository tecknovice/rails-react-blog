import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DefaultLayout from '../layouts/DefaultLayout';
import AuthForm from '../components/AuthForm';

export default function LoginPage() {
  const { login, error } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleLogin = async (data: { email: string; password: string }) => {
    try {
      setIsLoading(true);
      await login(data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Login error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Welcome Back</h1>
        
        <AuthForm
          type="login"
          onSubmit={handleLogin}
          isLoading={isLoading}
          error={error}
        />
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Don't have an account?{' '}
            <Link to="/register" className="text-blue-600 hover:text-blue-800">
              Register here
            </Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
} 