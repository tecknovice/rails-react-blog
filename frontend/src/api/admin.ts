import api from './axios';
import { User } from './auth';
import { Blog } from './blogs';

interface UpdateUserData {
  name?: string;
  email?: string;
  role?: 'user' | 'admin';
  avatar_url?: string;
}

export const getUsers = async (): Promise<User[]> => {
  const response = await api.get<User[]>('/admin/users');
  return response.data;
};

export const getUser = async (id: number): Promise<User> => {
  const response = await api.get<User>(`/admin/users/${id}`);
  return response.data;
};

export const updateUser = async (id: number, data: UpdateUserData): Promise<User> => {
  const response = await api.put<User>(`/admin/users/${id}`, data);
  return response.data;
};

export const deleteUser = async (id: number): Promise<void> => {
  await api.delete(`/admin/users/${id}`);
};

export const getAdminBlogs = async (): Promise<Blog[]> => {
  const response = await api.get<Blog[]>('/admin/blogs');
  return response.data;
};

export const updateBlogStatus = async (id: number, status: 'draft' | 'published'): Promise<Blog> => {
  const response = await api.put<Blog>(`/admin/blogs/${id}`, { status });
  return response.data;
};

export const adminDeleteBlog = async (id: number): Promise<void> => {
  await api.delete(`/admin/blogs/${id}`);
}; 