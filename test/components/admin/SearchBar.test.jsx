import { render, screen, fireEvent } from '@testing-library/react';
import { describe, it, expect, vi } from 'vitest';
import SearchBar from '@/components/admin/SearchBar'; // Ajusta la ruta si está diferente

describe('SearchBar', () => {
  it('renders the search input and icon', () => {
    render(
      <SearchBar
        searchTerm=""
        onChange={vi.fn()}
        inputRef={null}
        showNoResults={false}
      />
    );

    expect(screen.getByPlaceholderText(/Buscar usuario.../i)).toBeInTheDocument();
    expect(screen.getByRole('textbox')).toBeInTheDocument();
    expect(screen.getByTestId('search-icon')).toBeInTheDocument(); // Si quieres testear el icono (te muestro ahora cómo)
  });

  it('calls onChange when typing', () => {
    const handleChange = vi.fn();

    render(
      <SearchBar
        searchTerm=""
        onChange={handleChange}
        inputRef={null}
        showNoResults={false}
      />
    );

    const input = screen.getByPlaceholderText(/Buscar usuario.../i);

    fireEvent.change(input, { target: { value: 'admin' } });

    expect(handleChange).toHaveBeenCalledTimes(1);
  });

  it('displays no results message when showNoResults is true', () => {
    render(
      <SearchBar
        searchTerm=""
        onChange={vi.fn()}
        inputRef={null}
        showNoResults={true}
      />
    );

    expect(
      screen.getByText(/No se encontraron usuarios con ese nombre/i)
    ).toBeInTheDocument();
  });
});
