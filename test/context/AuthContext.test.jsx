import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';
import { waitFor } from '@testing-library/react';


const TestComponent = () => {
  const { user, token, login, logout } = useAuth();

  return (
    <div>
      <div>Token: {token || 'none'}</div>
      <div>User: {user ? user.name : 'none'}</div>
      <button onClick={() => login('test-token', { name: 'Test User' })}>Login</button>
      <button onClick={logout}>Logout</button>
    </div>
  );
};

describe('AuthContext', () => {
  beforeEach(() => {
    localStorage.clear();
    vi.restoreAllMocks();
  });

  it('provides default values', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    expect(screen.getByText(/Token: none/i)).toBeInTheDocument();
    expect(screen.getByText(/User: none/i)).toBeInTheDocument();
  });

  it('initializes state from localStorage on mount', async () => {
    localStorage.setItem('token', 'stored-token');
    localStorage.setItem('user', JSON.stringify({ name: 'Stored User' }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    await waitFor(() => {
      expect(screen.getByText(/Token: stored-token/i)).toBeInTheDocument();
      expect(screen.getByText(/User: Stored User/i)).toBeInTheDocument();
    });
  });


  it('updates state and localStorage on login', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const loginButton = screen.getByText('Login');
    loginButton.click();

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBe('test-token');
      expect(localStorage.getItem('user')).toBe(JSON.stringify({ name: 'Test User' }));
      expect(screen.getByText(/Token: test-token/i)).toBeInTheDocument();
      expect(screen.getByText(/User: Test User/i)).toBeInTheDocument();
    });
  });


  it('clears state and localStorage on logout', async () => {
    localStorage.setItem('token', 'stored-token');
    localStorage.setItem('user', JSON.stringify({ name: 'Stored User' }));

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    );

    const logoutButton = screen.getByText('Logout');
    logoutButton.click();

    await waitFor(() => {
      expect(localStorage.getItem('token')).toBeNull();
      expect(localStorage.getItem('user')).toBeNull();
      expect(screen.getByText(/Token: none/i)).toBeInTheDocument();
      expect(screen.getByText(/User: none/i)).toBeInTheDocument();
    });
  });

});
