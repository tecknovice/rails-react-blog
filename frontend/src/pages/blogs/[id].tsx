import { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getBlog, updateBlog, deleteBlog } from '../../api/blogs';
import { useAuth } from '../../contexts/AuthContext';
import DefaultLayout from '../../layouts/DefaultLayout';
import BlogEditor from '../../components/BlogEditor';

export default function BlogDetailPage() {
  const { id } = useParams<{ id: string }>();
  const { user, isAuthenticated } = useAuth();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  
  const [isEditing, setIsEditing] = useState(false);
  const [error, setError] = useState<string | null>(null);
  
  // Get blog data
  const { data: blog, isLoading, error: fetchError } = useQuery({
    queryKey: ['blog', id],
    queryFn: () => getBlog(Number(id)),
    enabled: !!id
  });
  
  // Update blog mutation
  const updateBlogMutation = useMutation({
    mutationFn: (data: { title: string; content: string; status: 'draft' | 'published' }) => 
      updateBlog(Number(id), data),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blog', id] });
      setIsEditing(false);
    },
    onError: (error: any) => {
      setError(error.response?.data?.errors?.[0] || 'Failed to update blog');
    }
  });
  
  // Delete blog mutation
  const deleteBlogMutation = useMutation({
    mutationFn: () => deleteBlog(Number(id)),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
      navigate('/');
    },
    onError: () => {
      setError('Failed to delete blog');
    }
  });
  
  const handleUpdate = (data: { title: string; content: string; status: 'draft' | 'published' }) => {
    updateBlogMutation.mutate(data);
  };
  
  const handleDelete = () => {
    if (window.confirm('Are you sure you want to delete this blog post?')) {
      deleteBlogMutation.mutate();
    }
  };
  
  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="max-w-3xl mx-auto">
          <p className="text-center text-gray-500">Loading blog...</p>
        </div>
      </DefaultLayout>
    );
  }
  
  if (fetchError || !blog) {
    return (
      <DefaultLayout>
        <div className="max-w-3xl mx-auto">
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
            Blog not found or error loading blog.
          </div>
        </div>
      </DefaultLayout>
    );
  }
  
  const canEdit = isAuthenticated && user && (user.id === blog.user?.id || user.role === 'admin');
  
  return (
    <DefaultLayout>
      <div className="max-w-3xl mx-auto">
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        {isEditing ? (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <h1 className="text-2xl font-bold mb-4">Edit Blog</h1>
            <BlogEditor
              blog={blog}
              onSubmit={handleUpdate}
              isLoading={updateBlogMutation.isPending}
            />
            <button
              onClick={() => setIsEditing(false)}
              className="mt-4 text-gray-600 hover:text-gray-800"
            >
              Cancel
            </button>
          </div>
        ) : (
          <div className="bg-white p-6 rounded-lg shadow-md">
            <div className="flex justify-between items-start mb-4">
              <h1 className="text-3xl font-bold">{blog.title}</h1>
              
              {canEdit && (
                <div className="flex space-x-2">
                  <button
                    onClick={() => setIsEditing(true)}
                    className="bg-blue-500 hover:bg-blue-600 text-white px-3 py-1 rounded"
                  >
                    Edit
                  </button>
                  <button
                    onClick={handleDelete}
                    className="bg-red-500 hover:bg-red-600 text-white px-3 py-1 rounded"
                  >
                    Delete
                  </button>
                </div>
              )}
            </div>
            
            <div className="flex text-sm text-gray-500 mb-6">
              <span>By {blog.user?.name}</span>
              <span className="mx-2">•</span>
              <span>
                {blog.status === 'published'
                  ? new Date(blog.published_at || blog.created_at).toLocaleDateString()
                  : 'Draft'}
              </span>
            </div>
            
            <div className="prose max-w-none">
              {blog.content.split('\n').map((paragraph, index) => (
                <p key={index} className="my-4">{paragraph}</p>
              ))}
            </div>
          </div>
        )}
      </div>
    </DefaultLayout>
  );
} 