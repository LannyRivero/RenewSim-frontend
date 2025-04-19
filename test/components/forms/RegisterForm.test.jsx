import { describe, it, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import RegisterForm from '@/components/forms/RegisterForm';

describe('RegisterForm', () => {
    it('renders all input fields and button', () => {
        render(<RegisterForm onRegister={() => {}} />);
      
        expect(screen.getByRole('heading', { name: /create account/i })).toBeInTheDocument();
        expect(screen.getByLabelText('Full Name')).toBeInTheDocument();
        expect(screen.getByLabelText('Email')).toBeInTheDocument();
        expect(screen.getByLabelText('Password')).toBeInTheDocument();
        expect(screen.getByLabelText('Confirm Password')).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /create account/i })).toBeInTheDocument();
      });
      

  it('calls onRegister when form is submitted', () => {
    const handleRegister = vi.fn();
    render(<RegisterForm onRegister={handleRegister} />);

    fireEvent.change(screen.getByLabelText('Full Name'), {
      target: { value: 'John Doe' },
    });
    fireEvent.change(screen.getByLabelText('Email'), {
      target: { value: 'john@example.com' },
    });
    fireEvent.change(screen.getByLabelText('Password'), {
      target: { value: 'password123' },
    });
    fireEvent.change(screen.getByLabelText('Confirm Password'), {
      target: { value: 'password123' },
    });

    fireEvent.submit(screen.getByRole('button', { name: /create account/i }));

    expect(handleRegister).toHaveBeenCalledTimes(1);
  });
});
