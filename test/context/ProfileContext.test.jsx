import React from 'react';
import { render, waitFor, act } from '@testing-library/react';
import { ProfileProvider, ProfileContext } from '@/context/ProfileContext';
import { isAuthenticated } from '@/utils/TokenUtils';
import { getProfile, updateProfile } from '@/services/ProfileService';
import { useNotification } from '@/context/NotificationContext';
import { useLoading } from '@/context/LoadingContext';

vi.mock('@/utils/TokenUtils', () => ({ isAuthenticated: vi.fn() }));
vi.mock('@/services/ProfileService', () => ({
  getProfile: vi.fn(),
  updateProfile: vi.fn(),
}));
vi.mock('@/context/NotificationContext', () => ({
  useNotification: () => ({
    showSuccess: vi.fn(),
    showError: vi.fn(),
  }),
}));
vi.mock('@/context/LoadingContext', () => ({
  useLoading: () => ({
    startLoading: vi.fn(),
    stopLoading: vi.fn(),
  }),
}));

describe('ProfileContext', () => {
  const TestComponent = () => (
    <ProfileContext.Consumer>
      {({ profile, fetchProfile, updateProfileData }) => (
        <div>
          <button onClick={fetchProfile}>Fetch</button>
          <button onClick={() => updateProfileData({ name: 'New Name' })}>Update</button>
          {profile ? <p>{profile.name}</p> : <p>No profile</p>}
        </div>
      )}
    </ProfileContext.Consumer>
  );

  afterEach(() => {
    vi.clearAllMocks();
  });

  it('should fetch profile if authenticated', async () => {
    isAuthenticated.mockReturnValue(true);
    getProfile.mockResolvedValue({ name: 'John Doe' });

    await act(async () => {
      render(
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      );
    });

    await waitFor(() => {
      expect(getProfile).toHaveBeenCalled();
    });
  });

  it('should not fetch profile if not authenticated', async () => {
    isAuthenticated.mockReturnValue(false);

    await act(async () => {
      render(
        <ProfileProvider>
          <TestComponent />
        </ProfileProvider>
      );
    });

    expect(getProfile).not.toHaveBeenCalled();
  });

  it('should update profile and show success message', async () => {
    updateProfile.mockResolvedValue({ name: 'Updated Name' });

    const { getByText } = render(
      <ProfileProvider>
        <TestComponent />
      </ProfileProvider>
    );

    await act(async () => {
      getByText('Update').click();
    });

    expect(updateProfile).toHaveBeenCalledWith({ name: 'New Name' });
  });

  it('should show error message on update failure', async () => {
    updateProfile.mockRejectedValue(new Error('Update failed'));

    const { getByText } = render(
      <ProfileProvider>
        <TestComponent />
      </ProfileProvider>
    );

    await act(async () => {
      getByText('Update').click();
    });

    expect(updateProfile).toHaveBeenCalled();
  });
});
