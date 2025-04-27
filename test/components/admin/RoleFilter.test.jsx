import React, { useState } from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import RoleFilter from '@/components/admin/RoleFilter'; 

describe('RoleFilter', () => {
  it('renders the RoleFilter component with options', () => {
    render(<RoleFilter selectedRole="ALL" onChange={vi.fn()} />);

    expect(screen.getByText('Todos')).toBeInTheDocument();
    expect(screen.getByText('Admin')).toBeInTheDocument();  
    expect(screen.getByText('Basic User')).toBeInTheDocument();
  });

  it('should call onChange when an option is selected', () => {
    const onChange = vi.fn();
    render(<RoleFilter selectedRole="ALL" onChange={onChange} />);

    fireEvent.change(screen.getByRole('combobox'), { target: { value: 'ADMIN' } });

    expect(onChange).toHaveBeenCalledWith('ADMIN');
  }); 
});
