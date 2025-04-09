
import React, { createContext, useState, useEffect } from 'react';
import { getProfile, updateProfile } from '../services/ProfileService';
import { isAuthenticated } from '../utils/TokenUtils';
import { useLoading } from './LoadingContext ';
import { useNotification } from './NotificationContext';

export const ProfileContext = createContext();

export const ProfileProvider = ({ children }) => {
  const [profile, setProfile] = useState(null);

  const { startLoading, stopLoading } = useLoading();
  const { showSuccess, showError } = useNotification();

  const fetchProfile = async () => {
    if (!isAuthenticated()) return;

    startLoading();
    try {
      const data = await getProfile();
      setProfile(data);
    } catch (error) {
      console.error('Error fetching profile:', error);
      showError('Error al cargar el perfil.');
      setProfile(null);
    } finally {
      stopLoading();
    }
  };

  const updateProfileData = async (profileData) => {
    startLoading();
    try {
      const updatedProfile = await updateProfile(profileData);
      setProfile(updatedProfile);
      showSuccess('Perfil actualizado correctamente.');
    } catch (error) {
      console.error('Error updating profile:', error);
      showError('Error al actualizar el perfil.');
    } finally {
      stopLoading();
    }
  };

  useEffect(() => {
    fetchProfile();
  }, []);

  return (
    <ProfileContext.Provider value={{ profile, setProfile, fetchProfile, updateProfileData }}>
      {children}
    </ProfileContext.Provider>
  );
};

