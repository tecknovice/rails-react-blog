import { Link } from 'react-router-dom';
import { Blog } from '../api/blogs';

interface BlogListProps {
  blogs: Blog[];
  isLoading: boolean;
  error: unknown;
}

export default function BlogList({ blogs, isLoading, error }: BlogListProps) {
  if (isLoading) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[200px] bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-gray-500 text-lg">Loading blogs...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="p-4 mb-4 bg-red-50 border border-red-200 rounded-lg text-red-700">
        <p className="font-medium">Error loading blogs</p>
        <p className="text-sm">Please make sure the Rails server is running at http://localhost:3000</p>
      </div>
    );
  }

  if (blogs.length === 0) {
    return (
      <div className="flex items-center justify-center p-8 min-h-[200px] bg-gray-50 rounded-lg border border-gray-100">
        <p className="text-gray-500 text-lg">No blogs found.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-8">
      {blogs.map((blog) => (
        <div key={blog.id} className="bg-white p-6 rounded-lg shadow-sm border border-gray-100">
          <h2 className="text-xl font-bold mb-2">
            <Link to={`/blogs/${blog.id}`} className="text-blue-500 hover:text-blue-700">
              {blog.title}
            </Link>
          </h2>
          
          <div className="flex text-sm text-gray-500 mb-4">
            <span>By {blog.user?.name}</span>
            <span className="mx-2">•</span>
            <span>
              {blog.published_at
                ? new Date(blog.published_at).toLocaleDateString()
                : 'Draft'}
            </span>
          </div>
          
          <p className="text-gray-700 mb-4">
            {blog.content.length > 200
              ? `${blog.content.substring(0, 200)}...`
              : blog.content}
          </p>
          
          <Link
            to={`/blogs/${blog.id}`}
            className="text-blue-500 hover:text-blue-700 inline-flex items-center"
          >
            Read more <span className="ml-1">→</span>
          </Link>
        </div>
      ))}
    </div>
  );
} 