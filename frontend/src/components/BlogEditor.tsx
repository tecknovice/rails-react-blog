import { useState, useEffect } from 'react';
import { Blog } from '../api/blogs';

interface BlogEditorProps {
  blog?: Blog;
  onSubmit: (data: { title: string; content: string; status: 'draft' | 'published' }) => void;
  isLoading: boolean;
}

export default function BlogEditor({ blog, onSubmit, isLoading }: BlogEditorProps) {
  const [title, setTitle] = useState(blog?.title || '');
  const [content, setContent] = useState(blog?.content || '');
  const [status, setStatus] = useState<'draft' | 'published'>(blog?.status || 'draft');

  useEffect(() => {
    if (blog) {
      setTitle(blog.title);
      setContent(blog.content);
      setStatus(blog.status);
    }
  }, [blog]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSubmit({ title, content, status });
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div>
        <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
          Title
        </label>
        <input
          id="title"
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div>
        <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
          Content
        </label>
        <textarea
          id="content"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          required
          rows={12}
          className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
        />
      </div>

      <div className="flex items-center space-x-4">
        <div className="flex items-center">
          <input
            id="draft"
            type="radio"
            value="draft"
            checked={status === 'draft'}
            onChange={() => setStatus('draft')}
            className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
          />
          <label htmlFor="draft" className="ml-2 block text-sm text-gray-700">
            Save as Draft
          </label>
        </div>
        
        <div className="flex items-center">
          <input
            id="published"
            type="radio"
            value="published"
            checked={status === 'published'}
            onChange={() => setStatus('published')}
            className="focus:ring-blue-500 h-4 w-4 text-blue-500 border-gray-300"
          />
          <label htmlFor="published" className="ml-2 block text-sm text-gray-700">
            Publish
          </label>
        </div>
      </div>

      <div className="flex justify-end">
        <button
          type="submit"
          disabled={isLoading}
          className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50"
        >
          {isLoading ? 'Saving...' : blog ? 'Update Blog' : 'Create Blog'}
        </button>
      </div>
    </form>
  );
} 