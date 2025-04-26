import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import RoleSelect from '@/components/admin/RoleSelect';

describe('RoleSelect Component', () => {  

  

  it('should display a message for roles assigned by the system', () => {
    render(
      <RoleSelect 
        selectedRoles={['ADMIN']} 
        onChange={vi.fn()} 
        originalRoles={['ADMIN']} 
      />
    );

    const tooltip = screen.getByText(/Este rol está asignado por el sistema/i);
    expect(tooltip).toBeInTheDocument();
  });
});



