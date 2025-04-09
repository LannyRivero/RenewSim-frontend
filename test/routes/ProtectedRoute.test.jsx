import React, { use } from 'react';
import { describe, it, expect, vi } from 'vitest';
import { MemoryRouter, Routes, Route } from 'react-router-dom';
import { render, screen } from '@testing-library/react';
import ProtectedRoute from '../../src/routes/ProtectedRoute';
import { useAuth } from '@/context/AuthContext';


// Mock del hook useAuth
vi.mock('@/context/AuthContext', () => ({
  useAuth: vi.fn(),
}));

// Componente para rutas protegidas
const DummyComponent = () => <div>Protected Content</div>;

describe('ProtectedRoute', () => {
  it('redirects to /login if user is not authenticated', () => {
    useAuth.mockReturnValue({ user: null, token: null });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/login" element={<div>Login Page</div>} />
          <Route element={<ProtectedRoute />}>
            <Route path="/protected" element={<DummyComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders the protected component if user is authenticated and has allowed role', () => {
    useAuth.mockReturnValue({
      user: { roles: ['ADMIN'] },
      token: 'valid-token',
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/protected" element={<DummyComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('redirects to /unauthorized if user does not have required role', () => {
    useAuth.mockReturnValue({
      user: { roles: ['USER'] },
      token: 'valid-token',
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route path="/unauthorized" element={<div>Unauthorized Page</div>} />
          <Route element={<ProtectedRoute allowedRoles={['ADMIN']} />}>
            <Route path="/protected" element={<DummyComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Unauthorized Page')).toBeInTheDocument();
  });

  it('renders protected component if user has one of multiple allowed roles', () => {
    useAuth.mockReturnValue({
      user: { roles: ['USER'] },
      token: 'valid-token',
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute allowedRoles={['ADMIN', 'USER']} />}>
            <Route path="/protected" element={<DummyComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(screen.getByText('Protected Content')).toBeInTheDocument();
  });

  it('calls useAuth hook to get user and token', () => {
    const mockUseAuth = useAuth.mockReturnValue({
      user: { roles: ['USER'] },
      token: 'valid-token',
    });

    render(
      <MemoryRouter initialEntries={['/protected']}>
        <Routes>
          <Route element={<ProtectedRoute allowedRoles={['USER']} />}>
            <Route path="/protected" element={<DummyComponent />} />
          </Route>
        </Routes>
      </MemoryRouter>
    );

    expect(mockUseAuth).toHaveBeenCalled();
  });


});
