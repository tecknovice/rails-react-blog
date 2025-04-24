import { useQuery } from '@tanstack/react-query';
import { getBlogs } from '../api/blogs';
import DefaultLayout from '../layouts/DefaultLayout';
import BlogList from '../components/BlogList';

export default function HomePage() {
  const { data: blogs, isLoading, error } = useQuery({
    queryKey: ['blogs'],
    queryFn: getBlogs
  });

  return (
    <DefaultLayout>
      <div className="max-w-3xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Latest Blogs</h1>
        
        <BlogList
          blogs={blogs || []}
          isLoading={isLoading}
          error={error}
        />
      </div>
    </DefaultLayout>
  );
} 