import React from 'react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { render, screen } from '@testing-library/react';
import { AuthProvider, useAuth } from '../../src/context/AuthContext';


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

 
});
