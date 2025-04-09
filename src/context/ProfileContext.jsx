
import React, { createContext, useState, useEffect } from 'react';
import { getProfile } from '../services/ProfileService';
import { isAuthenticated } from '../utils/TokenUtils';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);
  const [loading, setLoading] = useState(true);

  const fetchProfile = async () => {
    if (!isAuthenticated()) {
      setLoading(false);
      return;
    }

    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      setProfile(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, loading, fetchProfile }}>
      {children}
    </ProfileContext.Provider>
  );
};
