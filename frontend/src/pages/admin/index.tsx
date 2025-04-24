import { useQuery } from '@tanstack/react-query';
import { getUsers } from '../../api/admin';
import { getAdminBlogs } from '../../api/admin';
import AdminLayout from '../../layouts/AdminLayout';

export default function AdminDashboardPage() {
  // Fetch users and blogs data
  const { data: users } = useQuery({
    queryKey: ['admin', 'users'],
    queryFn: getUsers
  });
  
  const { data: blogs } = useQuery({
    queryKey: ['admin', 'blogs'],
    queryFn: getAdminBlogs
  });
  
  return (
    <AdminLayout>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Users</h2>
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <span>Total Users</span>
            <span className="text-2xl font-bold text-blue-600">{users?.length || 0}</span>
          </div>
          <a href="/admin/users" className="text-blue-600 hover:text-blue-800">
            View all users →
          </a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Blogs</h2>
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <span>Total Blogs</span>
            <span className="text-2xl font-bold text-blue-600">{blogs?.length || 0}</span>
          </div>
          <a href="/admin/blogs" className="text-blue-600 hover:text-blue-800">
            View all blogs →
          </a>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Published Blogs</h2>
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <span>Total Published</span>
            <span className="text-2xl font-bold text-green-600">
              {blogs?.filter(blog => blog.status === 'published').length || 0}
            </span>
          </div>
        </div>
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold mb-4">Draft Blogs</h2>
          <div className="flex items-center justify-between text-gray-600 mb-4">
            <span>Total Drafts</span>
            <span className="text-2xl font-bold text-yellow-600">
              {blogs?.filter(blog => blog.status === 'draft').length || 0}
            </span>
          </div>
        </div>
      </div>
    </AdminLayout>
  );
} 