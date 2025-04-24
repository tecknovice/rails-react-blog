import api from './axios';

export interface Profile {
  id: number;
  user_id: number;
  bio: string | null;
  website: string | null;
  location: string | null;
  created_at: string;
  updated_at: string;
}

interface ProfileResponse {
  profile: Profile;
}

interface UpdateProfileData {
  bio?: string;
  website?: string;
  location?: string;
}

export const getProfile = async (): Promise<Profile> => {
  const response = await api.get<ProfileResponse>('/profile');
  return response.data.profile;
};

export const updateProfile = async (data: UpdateProfileData): Promise<Profile> => {
  // Send data directly (backend now handles both formats)
  const response = await api.put<ProfileResponse>('/profile', data);
  return response.data.profile;
}; 