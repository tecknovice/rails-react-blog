import { useState, useEffect, useCallback } from 'react';
import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import { getProfile, updateProfile, Profile } from '../api/profile';
import { useAuth } from '../contexts/AuthContext';
import DefaultLayout from '../layouts/DefaultLayout';

export default function ProfilePage() {
  const { user } = useAuth();
  const queryClient = useQueryClient();
  
  const [formData, setFormData] = useState({
    bio: '',
    website: '',
    location: ''
  });
  const [error, setError] = useState<string | null>(null);
  const [successMessage, setSuccessMessage] = useState<string | null>(null);
  
  // Fetch user profile
  const { data: profile, isLoading } = useQuery({
    queryKey: ['profile'],
    queryFn: getProfile,
    enabled: !!user
  });
  
  // Update profile data when it's loaded
  useEffect(() => {
    if (profile) {
      setFormData({
        bio: profile.bio || '',
        website: profile.website || '',
        location: profile.location || ''
      });
    }
  }, [profile]);
  
  // Handle input changes
  const handleChange = useCallback((e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
  }, []);
  
  // Update profile mutation
  const updateProfileMutation = useMutation({
    mutationFn: updateProfile,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['profile'] });
      setSuccessMessage('Profile updated successfully!');
      setTimeout(() => setSuccessMessage(null), 3000);
    },
    onError: (error: any) => {
      setError(error.response?.data?.errors?.[0] || 'Failed to update profile');
      setTimeout(() => setError(null), 5000);
    }
  });
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError(null);
    updateProfileMutation.mutate(formData);
  };
  
  if (isLoading) {
    return (
      <DefaultLayout>
        <div className="max-w-2xl mx-auto">
          <p className="text-center text-gray-500">Loading profile...</p>
        </div>
      </DefaultLayout>
    );
  }
  
  return (
    <DefaultLayout>
      <div className="max-w-2xl mx-auto">
        <h1 className="text-3xl font-bold mb-8">Your Profile</h1>
        
        {successMessage && (
          <div className="mb-4 p-3 bg-green-50 border border-green-200 text-green-700 rounded">
            {successMessage}
          </div>
        )}
        
        {error && (
          <div className="mb-4 p-3 bg-red-50 border border-red-200 text-red-700 rounded">
            {error}
          </div>
        )}
        
        <div className="mb-6">
          <h2 className="text-xl font-bold mb-2">
            {user?.name}
          </h2>
          <p className="text-gray-600">{user?.email}</p>
        </div>
        
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="bio">Bio</label>
            <textarea
              id="bio"
              name="bio"
              className="w-full p-2 border border-gray-300 rounded"
              rows={5}
              value={formData.bio}
              onChange={handleChange}
            />
          </div>
          
          <div className="mb-4">
            <label className="block font-medium mb-1" htmlFor="website">Website</label>
            <input
              type="text"
              id="website"
              name="website"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="https://example.com"
              value={formData.website}
              onChange={handleChange}
            />
          </div>
          
          <div className="mb-6">
            <label className="block font-medium mb-1" htmlFor="location">Location</label>
            <input
              type="text"
              id="location"
              name="location"
              className="w-full p-2 border border-gray-300 rounded"
              placeholder="City, Country"
              value={formData.location}
              onChange={handleChange}
            />
          </div>
          
          <button
            type="submit"
            className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded"
            disabled={updateProfileMutation.isPending}
          >
            {updateProfileMutation.isPending ? 'Saving...' : 'Save Profile'}
          </button>
        </form>
      </div>
    </DefaultLayout>
  );
} 