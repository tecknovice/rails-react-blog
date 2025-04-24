import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { useNavigate } from 'react-router-dom';
import { createBlog } from '../../api/blogs';
import DefaultLayout from '../../layouts/DefaultLayout';
import BlogEditor from '../../components/BlogEditor';

export default function NewBlogPage() {
  const navigate = useNavigate();
  const [error, setError] = useState<string | null>(null);

  const createBlogMutation = useMutation({
    mutationFn: createBlog,
    onSuccess: (blog) => {
      navigate(`/blogs/${blog.id}`);
    },
    onError: (error: any) => {
      setError(error.response?.data?.errors?.[0] || 'Failed to create blog');
    }
  });

  const handleSubmit = (data: { title: string; content: string; status: 'draft' | 'published' }) => {
    createBlogMutation.mutate(data);
  };

  return (
    <DefaultLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Create New Blog</h1>
        
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            {error}
          </div>
        )}
        
        <div className="bg-white p-6 rounded-lg shadow-md">
          <BlogEditor
            onSubmit={handleSubmit}
            isLoading={createBlogMutation.isPending}
          />
        </div>
      </div>
    </DefaultLayout>
  );
} 