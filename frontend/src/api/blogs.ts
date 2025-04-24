import api from './axios';
import { User } from './auth';

export interface Blog {
  id: number;
  title: string;
  content: string;
  status: 'draft' | 'published';
  published_at: string | null;
  created_at: string;
  updated_at: string;
  user?: User;
}

interface CreateBlogData {
  title: string;
  content: string;
  status: 'draft' | 'published';
}

interface UpdateBlogData {
  title?: string;
  content?: string;
  status?: 'draft' | 'published';
}

export const getBlogs = async (): Promise<Blog[]> => {
  const response = await api.get<Blog[]>('/blogs');
  return response.data;
};

export const getBlog = async (id: number): Promise<Blog> => {
  const response = await api.get<Blog>(`/blogs/${id}`);
  return response.data;
};

export const createBlog = async (data: CreateBlogData): Promise<Blog> => {
  const response = await api.post<Blog>('/blogs', data);
  return response.data;
};

export const updateBlog = async (id: number, data: UpdateBlogData): Promise<Blog> => {
  const response = await api.put<Blog>(`/blogs/${id}`, data);
  return response.data;
};

export const deleteBlog = async (id: number): Promise<void> => {
  await api.delete(`/blogs/${id}`);
}; 