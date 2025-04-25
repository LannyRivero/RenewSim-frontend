import { describe, it, vi, expect, beforeEach } from 'vitest';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '@/components/forms/LoginForm';
import { MemoryRouter } from 'react-router-dom';
import { useAuth } from '@/context/AuthContext';
import * as authService from '@/services/authService';

vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

vi.mock('@/services/authService', () => ({
  loginUser: vi.fn(),
}));

const mockNavigate = vi.fn();
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom');
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  };
});

describe('LoginForm', () => {
  const mockLogin = vi.fn();

  beforeEach(() => {
    useAuth.mockReturnValue({ user: null, login: mockLogin });
    vi.clearAllMocks();
  });

  it('renders the login form inputs and button', () => {
    render(<LoginForm />, { wrapper: MemoryRouter });

    expect(screen.getByLabelText(/email address/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /login to account/i })).toBeInTheDocument();
  });

  it('calls login and navigates for ADMIN role', async () => {
    authService.loginUser.mockResolvedValue({
      token: 'mockToken',
      username: 'admin@email.com',
      roles: ['ADMIN'],
    });

    render(<LoginForm />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'admin@email.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'admin123' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /login to account/i }));

    await waitFor(() => {
      expect(mockLogin).toHaveBeenCalledWith('mockToken', {
        username: 'admin@email.com',
        roles: ['ADMIN'],
      });
      expect(mockNavigate).toHaveBeenCalledWith('/dashboard/admin/users');
    });
  });

  it('shows alert on failed login', async () => {
    useAuth.mockReturnValue({ user: null, login: mockLogin });

    window.alert = vi.fn();
    authService.loginUser.mockRejectedValue(new Error('Login failed'));

    render(<LoginForm />, { wrapper: MemoryRouter });

    fireEvent.change(screen.getByLabelText(/email address/i), {
      target: { value: 'fail@email.com' },
    });
    fireEvent.change(screen.getByLabelText(/password/i), {
      target: { value: 'wrongpass' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /login to account/i }));

    await waitFor(() => {
      expect(window.alert).toHaveBeenCalledWith('Credenciales incorrectas o error del servidor.');
    });
  });

  it('redirects immediately if user is already logged in', () => {
    useAuth.mockReturnValue({
      user: { username: 'test', roles: ['USER'] },
      login: mockLogin,
    });

    render(<LoginForm />, { wrapper: MemoryRouter });

    expect(mockNavigate).toHaveBeenCalledWith('/dashboard/user');
  });

});
