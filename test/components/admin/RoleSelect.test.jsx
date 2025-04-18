import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import { vi } from 'vitest';
import RoleSelect from '@/components/admin/RoleSelect';

describe('RoleSelect Component', () => {  

  it('should disable modifying roles assigned by the system', () => {
    const onChange = vi.fn();
    render(
      <RoleSelect 
        selectedRoles={['ADMIN']} 
        onChange={onChange} 
        originalRoles={['ADMIN']} 
      />
    );

    const adminCheckbox = screen.getByLabelText(/Admin/i);
    const userCheckbox = screen.getByLabelText(/Basic User/i);

    // Verify that the "Admin" role checkbox is disabled
    expect(adminCheckbox).toBeDisabled();

    // Verify that the "Basic User" role checkbox is enabled
    expect(userCheckbox).toBeEnabled();
  });

  it('should display a message for roles assigned by the system', () => {
    render(
      <RoleSelect 
        selectedRoles={['ADMIN']} 
        onChange={vi.fn()} 
        originalRoles={['ADMIN']} 
      />
    );

    // Check if the tooltip for system-assigned roles is shown
    const tooltip = screen.getByText(/Este rol está asignado por el sistema/i);
    expect(tooltip).toBeInTheDocument();
  });
});



