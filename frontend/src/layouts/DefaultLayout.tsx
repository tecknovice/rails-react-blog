import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';

interface DefaultLayoutProps {
  children: ReactNode;
}

export default function DefaultLayout({ children }: DefaultLayoutProps) {
  const { user, isAuthenticated, isAdmin, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <div className="min-h-screen flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold text-gray-800">Blog App</Link>
            <nav className="flex gap-4">
              <Link to="/" className="text-gray-600 hover:text-gray-900">Home</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-gray-600">Hello, {user?.name}</span>
                <Link to="/profile" className="text-blue-500 hover:text-blue-700">Profile</Link>
                {isAdmin && (
                  <Link to="/admin" className="text-purple-500 hover:text-purple-700">Admin</Link>
                )}
                <Link to="/blogs/new" className="bg-green-500 hover:bg-green-600 text-white px-3 py-1 rounded">
                  New Blog
                </Link>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:text-red-700 bg-transparent border-none p-0"
                >
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-blue-500 hover:text-blue-700">Login</Link>
                <Link to="/register" className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded">
                  Register
                </Link>
              </>
            )}
          </div>
        </div>
      </header>

      {/* Main Content */}
      <main className="flex-1 w-full max-w-7xl mx-auto px-4 py-8">
        {children}
      </main>

      {/* Footer */}
      <footer className="bg-gray-100">
        <div className="container mx-auto py-4 text-center">
          <p className="text-gray-500">© 2025 Blog App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 