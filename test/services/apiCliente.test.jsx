import axios from 'axios';
import MockAdapter from 'axios-mock-adapter';
import apiCliente from '@/services/ApiClient';
import { toast } from 'react-toastify';

vi.mock('react-toastify', () => ({
  toast: {
    error: vi.fn(),
  },
}));

describe('apiCliente', () => {
  const mock = new MockAdapter(apiCliente);

  beforeEach(() => {
    localStorage.clear();
    vi.clearAllMocks();
  });

  it('should attach token in Authorization header if present', async () => {
    localStorage.setItem('token', 'mock-token');
    mock.onGet('/test').reply(200, { success: true });

    const response = await apiCliente.get('/test');

    expect(response.status).toBe(200);
    expect(mock.history.get[0].headers.Authorization).toBe('Bearer mock-token');
  });

  it('should show toast on 401 error', async () => {
    mock.onGet('/unauthorized').reply(401);

    await expect(apiCliente.get('/unauthorized')).rejects.toThrow();
    expect(toast.error).toHaveBeenCalledWith('⚠️ Sesión expirada. Por favor, inicia sesión nuevamente.');
  });

  it('should show toast on 500 error', async () => {
    mock.onGet('/server-error').reply(500);

    await expect(apiCliente.get('/server-error')).rejects.toThrow();
    expect(toast.error).toHaveBeenCalledWith('💥 Error del servidor. Inténtalo más tarde.');
  });

  it('should show default toast on unknown error', async () => {
    mock.onGet('/unknown-error').reply(404, { message: 'Recurso no encontrado' });

    await expect(apiCliente.get('/unknown-error')).rejects.toThrow();
    expect(toast.error).toHaveBeenCalledWith('❌ Recurso no encontrado');
  });

  it('should show toast when no response is returned (network error)', async () => {
    mock.onGet('/network-error').networkError();

    await expect(apiCliente.get('/network-error')).rejects.toThrow();
    expect(toast.error).toHaveBeenCalledWith('🚫 No se pudo conectar con el servidor. Verifica tu conexión.');
  });
});
