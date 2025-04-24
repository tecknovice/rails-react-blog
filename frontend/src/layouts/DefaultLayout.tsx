import { ReactNode } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../contexts/AuthContext';
import { Button } from '@/components/ui/button';

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
      <header className="bg-background border-b">
        <div className="container mx-auto px-4 py-4 flex justify-between items-center">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold">Blog App</Link>
            <nav className="flex gap-4">
              <Link to="/" className="text-muted-foreground hover:text-foreground">Home</Link>
            </nav>
          </div>
          <div className="flex items-center gap-4">
            {isAuthenticated ? (
              <>
                <span className="text-muted-foreground">Hello, {user?.name}</span>
                <Link to="/profile" className="text-primary hover:text-primary/80">Profile</Link>
                {isAdmin && (
                  <Link to="/admin" className="text-primary hover:text-primary/80">Admin</Link>
                )}
                <Button variant="default" className="h-9 px-3">
                  <Link to="/blogs/new" className="text-primary-foreground">New Blog</Link>
                </Button>
                <Button variant="ghost" onClick={handleLogout}>
                  Logout
                </Button>
              </>
            ) : (
              <>
                <Link to="/login" className="text-primary hover:text-primary/80">Login</Link>
                <Button variant="default" className="h-9 px-3">
                  <Link to="/register" className="text-primary-foreground">Register</Link>
                </Button>
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
      <footer className="bg-background border-t">
        <div className="container mx-auto py-4 text-center">
          <p className="text-muted-foreground">© 2025 Blog App. All rights reserved.</p>
        </div>
      </footer>
    </div>
  );
} 