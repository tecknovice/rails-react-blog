import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import DefaultLayout from '../layouts/DefaultLayout';
import AuthForm from '../components/AuthForm';

export default function RegisterPage() {
  const { register, error } = useAuth();
  const navigate = useNavigate();
  const [isLoading, setIsLoading] = useState(false);

  const handleRegister = async (data: { name: string; email: string; password: string }) => {
    try {
      setIsLoading(true);
      await register(data.name, data.email, data.password);
      navigate('/');
    } catch (error) {
      console.error('Registration error:', error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <DefaultLayout>
      <div className="max-w-md mx-auto">
        <h1 className="text-3xl font-bold mb-8 text-center">Create an Account</h1>
        
        <AuthForm
          type="register"
          onSubmit={handleRegister}
          isLoading={isLoading}
          error={error}
        />
        
        <div className="mt-4 text-center">
          <p className="text-gray-600">
            Already have an account?{' '}
            <Link to="/login" className="text-blue-600 hover:text-blue-800">
              Login here
            </Link>
          </p>
        </div>
      </div>
    </DefaultLayout>
  );
} 