import { useState } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getAdminBlogs, updateBlogStatus, adminDeleteBlog } from '../../api/admin';
import { Blog } from '../../api/blogs';
import AdminLayout from '../../layouts/AdminLayout';
import { Link } from 'react-router-dom';

export default function AdminBlogsPage() {
  const queryClient = useQueryClient();
  const [error, setError] = useState<string | null>(null);

  // Fetch blogs data
  const { data: blogs, isLoading } = useQuery({
    queryKey: ['admin', 'blogs'],
    queryFn: getAdminBlogs
  });

  // Update blog status mutation
  const updateBlogStatusMutation = useMutation({
    mutationFn: (data: { id: number; status: 'draft' | 'published' }) => 
      updateBlogStatus(data.id, data.status),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blogs'] });
      setError(null);
    },
    onError: (error: any) => {
      setError(error.response?.data?.errors?.[0] || 'Failed to update blog status');
    }
  });

  // Delete blog mutation
  const deleteBlogMutation = useMutation({
    mutationFn: adminDeleteBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['admin', 'blogs'] });
      setError(null);
    },
    onError: () => {
      setError('Failed to delete blog');
    }
  });

  const handleStatusChange = (blog: Blog) => {
    const newStatus = blog.status === 'published' ? 'draft' : 'published';
    updateBlogStatusMutation.mutate({ id: blog.id, status: newStatus });
  };

  const handleDelete = (id: number) => {
    if (window.confirm('Are you sure you want to delete this blog?')) {
      deleteBlogMutation.mutate(id);
    }
  };

  if (isLoading) {
    return (
      <AdminLayout>
        <p className="text-center text-gray-500">Loading blogs...</p>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout>
      <div>
        <h1 className="text-2xl font-bold mb-6">Manage Blogs</h1>

        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}

        <div className="bg-white rounded-lg shadow overflow-hidden">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Title
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Author
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Created
                </th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {blogs?.map(blog => (
                <tr key={blog.id}>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <div className="text-sm font-medium text-gray-900">
                      <Link to={`/blogs/${blog.id}`} className="hover:text-blue-600">
                        {blog.title}
                      </Link>
                    </div>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {blog.user?.name}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    <span className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${
                      blog.status === 'published' ? 'bg-green-100 text-green-800' : 'bg-yellow-100 text-yellow-800'
                    }`}>
                      {blog.status}
                    </span>
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {new Date(blog.created_at).toLocaleDateString()}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium space-x-2">
                    <button
                      onClick={() => handleStatusChange(blog)}
                      className={`${
                        blog.status === 'published' 
                          ? 'text-yellow-600 hover:text-yellow-900' 
                          : 'text-green-600 hover:text-green-900'
                      }`}
                    >
                      {blog.status === 'published' ? 'Unpublish' : 'Publish'}
                    </button>
                    <button
                      onClick={() => handleDelete(blog.id)}
                      className="text-red-600 hover:text-red-900 ml-2"
                    >
                      Delete
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </AdminLayout>
  );
} 